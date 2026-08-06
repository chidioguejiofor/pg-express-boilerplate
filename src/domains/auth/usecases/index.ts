import { asClass } from "awilix";
import { LoginUserUsecase } from "./login-user";
import { AuthMiddlewareUsecase } from "./auth-middleware";
import { container } from "../container";
import "../clients"; // ensures tokenManager is registered before we resolve below

container.register({
  loginUserUsecase: asClass(LoginUserUsecase),
  authMiddlewareUsecase: asClass(AuthMiddlewareUsecase),
});

export const loginUserUsecase =
  container.resolve<LoginUserUsecase>("loginUserUsecase");

export const authMiddlewareUsecase = container.resolve<AuthMiddlewareUsecase>(
  "authMiddlewareUsecase"
);

export * from "./interfaces";
