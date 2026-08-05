import { createContainer, InjectionMode } from "awilix";

/**
 * Single app-wide container. Domains register their own dependencies into
 * this instance where those dependencies are constructed (e.g. clients/index.ts,
 * repositories/index.ts), then usecases/index.ts files register+resolve usecases.
 *
 * Rule of thumb:
 * - Already-built singletons with no constructor deps of their own (clients,
 *   repositories, cross-domain APIs) -> asValue(), registered where they're built.
 * - Usecases, whose constructors need auto-wiring -> asClass(), registered next
 *   to where they're currently exported.
 *
 * CLASSIC mode resolves constructor args by matching parameter names to
 * registration names, so no decorators/tokens are required - just keep
 * constructor parameter names identical to the registered name (this codebase
 * already does that by convention).
 */
export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});
