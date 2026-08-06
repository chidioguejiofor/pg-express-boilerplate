import { InvalidAuthorizationHeaders, InvalidToken } from "errors";
import { ITokenManager } from "./interfaces";
import { JWT_TOKEN_SECRET } from "infrastructure/settings";

export class AuthMiddlewareUsecase {
  constructor(private tokenManager: ITokenManager) {}
  async execute(authorization = "") {
    const token = await this.getToken(authorization);
    const decoded = await this.decodeToken(token);
    await this.tokenManager.verifyToken(JWT_TOKEN_SECRET, token);

    return { email: decoded.email };
  }

  private async getToken(authorization: string) {
    const authParts = authorization?.split(" ");
    if (authParts?.length !== 2) throw new InvalidAuthorizationHeaders();

    const [bearer, token] = authParts;

    if (bearer !== "Bearer") throw new InvalidAuthorizationHeaders();

    return token;
  }

  private async decodeToken(token: any) {
    const decoded: any = await this.tokenManager.decode(token);

    if (!decoded?.email) throw new InvalidToken();

    return decoded;
  }
}
