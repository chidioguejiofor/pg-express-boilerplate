import { tokenManager } from "./clients";

export interface IAuthAPI {
  decodeAccessToken: (token: string) => Record<string, string>;
}

class AuthAPI implements IAuthAPI {
  decodeAccessToken(token: string) {
    return tokenManager.decode(token);
  }
}

export const authAPI = new AuthAPI();
