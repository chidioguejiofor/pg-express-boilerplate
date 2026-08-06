import { InvalidToken } from "../errors";
import { ITokenManager, ValidateInput } from "./interfaces";
import {
  JWT_TOKEN_SECRET,
  GOOGLE_CLIENT_ID,
  MICROSOFT_CLIENT_ID,
  ALLOWED_LOGIN_EMAILS,
} from "infrastructure/settings";

type Network = ValidateInput["network"];

type Input = {
  network: Network;
  idToken: string;
};

// The client ID our app is registered under for each network - a token's
// `aud` claim must match this or it was issued for a different application.
const EXPECTED_CLIENT_ID: Partial<Record<Network, string>> = {
  google: GOOGLE_CLIENT_ID,
  microsoft: MICROSOFT_CLIENT_ID,
};

// Expected issuer per network, only where it's meaningful to check here -
// Microsoft's issuer is already validated via its own JWKS signature check
// in TokenManager, so it's intentionally not duplicated here.
const EXPECTED_ISSUERS: Partial<Record<Network, string[]>> = {
  google: ["https://accounts.google.com", "accounts.google.com"],
};

export class LoginUserUsecase {
  constructor(private tokenManager: ITokenManager) {}

  public async execute(input: Input) {
    const { tokenData } = await this.verifyToken(input);

    const appTokenData = { email: tokenData.email };
    const token = await this.tokenManager.generateToken(
      JWT_TOKEN_SECRET,
      appTokenData
    );

    return { user: appTokenData, token };
  }

  private async verifyToken(input: Input) {
    const { idToken, network } = input;
    const tokenData = await this.tokenManager.validateToken(network, idToken);

    if (!tokenData.emailIsVerified)
      throw new InvalidToken("Email is not verified");

    const expectedClientId = EXPECTED_CLIENT_ID[network];
    if (expectedClientId && tokenData.aud !== expectedClientId)
      throw new InvalidToken("Token was not issued for this application");

    const expectedIssuers = EXPECTED_ISSUERS[network];
    if (expectedIssuers && !expectedIssuers.includes(tokenData.iss))
      throw new InvalidToken("The token you provided is invalid");

    if (
      ALLOWED_LOGIN_EMAILS.length > 0 &&
      !ALLOWED_LOGIN_EMAILS.includes(tokenData.email)
    )
      throw new InvalidToken("This email is not permitted to log in");

    return { tokenData };
  }
}
