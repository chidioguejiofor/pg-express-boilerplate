import { createContainer, InjectionMode } from "awilix";

/**
 * Container private to this domain. Only this domain's own files should
 * import it - other domains never see it, so anything registered here stays
 * unreachable from outside.
 *
 * Anything another domain needs from this one must be added to `./apis.ts`
 * and consumed by the other domain via an explicit import + `.inject()` in
 * its own container, never resolved ambiently by name. See
 * domains/auth/container.ts + domains/auth/apis.ts for a worked example, and
 * domains/example for a domain that consumes it.
 */
export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});
