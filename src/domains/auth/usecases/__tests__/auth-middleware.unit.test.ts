import { expect } from "chai";
import { InvalidAuthorizationHeaders, InvalidToken } from "errors";
import { AuthMiddlewareUsecase } from "../auth-middleware";
import { tokenManagerStub } from "__tests__/unit/stubs";
import { JWT_TOKEN_SECRET } from "infrastructure/settings";

const authMiddleware = new AuthMiddlewareUsecase(tokenManagerStub);
describe("Auth middleware usecase", () => {
  afterEach(() => {
    tokenManagerStub.verifyToken.reset();
  });
  it("should throw an Unauthorized error if authorization headear is invalid", async () => {
    await expect(authMiddleware.execute()).to.be.rejectedWith(
      InvalidAuthorizationHeaders
    );
    await expect(authMiddleware.execute("bearer token")).to.be.rejectedWith(
      InvalidAuthorizationHeaders
    );
    await expect(authMiddleware.execute("Bearer")).to.be.rejectedWith(
      InvalidAuthorizationHeaders
    );
  });

  it("should throw InvalidToken error if token validation fails", async () => {
    tokenManagerStub.decode.throws(new InvalidToken());
    await expect(authMiddleware.execute("Bearer token")).to.be.rejectedWith(
      InvalidToken
    );
  });

  it("should throw InvalidToken if decoded token does not contain an email", async () => {
    tokenManagerStub.decode.returns({});
    await expect(authMiddleware.execute("Bearer token")).to.be.rejectedWith(
      InvalidToken
    );
  });

  it("should return the email that is contained in the token", async () => {
    tokenManagerStub.decode.returns({ email: "mock@emial.com" });
    await expect(authMiddleware.execute("Bearer token")).to.eventually.eql({
      email: "mock@emial.com",
    });
  });

  it("should throw error if verifyToken fails", async () => {
    tokenManagerStub.decode.returns({ email: "mock@emial.com" });

    tokenManagerStub.verifyToken.throws(new InvalidToken());
    await expect(authMiddleware.execute("Bearer token")).to.be.rejectedWith(
      InvalidToken
    );

    tokenManagerStub.verifyToken.should.have.been.calledOnceWithExactly(
      JWT_TOKEN_SECRET,
      "token"
    );
  });
});
