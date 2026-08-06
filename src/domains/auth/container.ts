import { createContainer, InjectionMode } from "awilix";

/**
 * Container private to the auth domain. Only auth's own files ever import
 * this - other domains never see it, so auth's internals (repositories,
 * clients) registered here are unreachable from outside.
 *
 * Anything another domain needs from auth must go through `./apis.ts` -
 * imported explicitly and handed in via `.inject()` in the consuming
 * domain's own container, never resolved ambiently by name.
 */
export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});
