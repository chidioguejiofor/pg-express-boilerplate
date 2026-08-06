import { asClass } from "awilix";
import { GetExampleDataUsecase } from "./GetExampleDataUsecase";
import { container } from "../container";
import { authAPI } from "domains/auth"; // cross-domain dep: explicit import, not name-based auto-resolution
import "../repositories"; // ensures exampleRepository is registered before we resolve below

container.register({
  // authAPI comes from another domain's container, so it's handed in
  // explicitly via .inject() instead of being resolved by name - that keeps
  // the cross-domain dependency visible as a real import above, and doesn't
  // require exampleContainer to know anything about auth's container.
  getExampleDataUsecase: asClass(GetExampleDataUsecase).inject(() => ({
    authAPI,
  })),
});

export const getExampleDataUsecase = container.resolve<GetExampleDataUsecase>(
  "getExampleDataUsecase"
);
