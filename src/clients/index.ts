import { asValue } from "awilix";
import { TokenManager } from "domains/auth/clients/token-manager";
import { container } from "infrastructure/container";

export const tokenManager = new TokenManager();

container.register({ tokenManager: asValue(tokenManager) });
