# Pii Shop

This is the backend application of the Pii.shop platform

### Setup
- Clone the repo
- Install depensencies
```bash
    npm install
```
- Add the env variables using .env.example
- Run migrations
```bash
  npx sequelize db:migrate
```

### Running Redis
Make sure redis is installed on your system and run the command

- On Windows
```bash
  redis-server
```


### Start up development server
```bash
  npm run dev
```

### Add new domain

To add a new domain to the application run:

```bash
npm run create-domain -- [domain-name]
```

This would add a new domain in the src/domains folder

### Dependency injection

Wiring is done with [awilix](https://github.com/jeffijoe/awilix), using
`InjectionMode.CLASSIC` (no decorators/tokens needed - Awilix matches constructor
parameter names to registered names).

**Every domain owns its own container** at `domains/<name>/container.ts`. There is
no shared/global container. This is deliberate: a single app-wide container would
let any domain resolve any other domain's internals by string key, with no import
statement anywhere to show it happened - which quietly defeats the whole point of
splitting the app into domains. Per-domain containers make that structurally
impossible, since a domain has no reference to another domain's container object at
all.

Two rules to follow when adding dependencies:

1. **Same-domain dependencies** (a domain's own repositories, clients) - register
   with `asValue()` right where the singleton is constructed, into that domain's own
   container, and let usecases pick them up by auto-wired constructor parameter name
   (see `domains/auth/clients/index.ts`, `domains/example/repositories/ExampleRepository.ts`).
   Usecases themselves are registered with `asClass()` and resolved in that domain's
   `usecases/index.ts` (see `domains/auth/usecases/index.ts`).
2. **Cross-domain dependencies** - never resolved by name. A domain that needs
   another domain's capability imports that domain's public `apis.ts` facade
   explicitly, and hands it to the usecase with `.inject()` instead of relying on
   ambient name matching. See `domains/example/usecases/index.ts` importing
   `authAPI` from `domains/auth` - that import is what a lint rule (or a reviewer)
   can actually see and enforce; nothing about the container can do that job for you.

`domains/example` exists purely as a worked reference for this pattern - it's a
generated domain (via `create-domain`) that was then hand-wired to depend on
`domains/auth`'s `authAPI`, showing both rules side by side in one place.

Keep constructor parameter names identical to the registered name for same-domain,
auto-wired dependencies - e.g. `constructor(private tokenManager: ITokenManager)`
resolves because `tokenManager` is the exact key registered in
`domains/auth/clients/index.ts`. A mismatched name fails at resolve time, not
compile time, so this is the one place in the codebase where a rename needs a
manual double-check across both sides.

### A note on the existing tests

The tests currently in this repo (e.g. under `domains/auth/usecases/__tests__`)
should be treated as **examples of the testing pattern**, not as a fixed contract.
They cover a generic, illustrative OAuth login flow, and we expect their specifics
- what they assert, what fixtures they use, even which usecase behaviors exist at
all - to change significantly as this boilerplate gets adapted for a real project.
Copy the *shape* (unit tests constructing a usecase directly with stubbed
dependencies; `parameterized` for repeating a case across inputs; global test env
defaults set in `src/__tests__/fixtures.ts`), not the specific assertions.
