import { asValue } from "awilix";
import { TokenManager } from "./token-manager";
import { container } from "../container";

export * from "./token-manager";

export const tokenManager = new TokenManager();

container.register({ tokenManager: asValue(tokenManager) });
