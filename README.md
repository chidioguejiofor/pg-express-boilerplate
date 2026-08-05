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

Wiring is done with [awilix](https://github.com/jeffijoe/awilix) through a single
app-wide container at `src/infrastructure/container.ts`, using `InjectionMode.CLASSIC`
(no decorators/tokens needed - Awilix matches constructor parameter names to
registered names).

Two rules to follow when adding dependencies:

1. **Already-built singletons with no constructor deps of their own** (clients,
   repositories, cross-domain APIs) - register with `asValue()`, right where the
   singleton is constructed (see `src/clients/index.ts`,
   `templates/domain/repositories/SampleRepository.ts`).
2. **Usecases** (or anything else whose constructor needs auto-wired dependencies)
   - register with `asClass()` and resolve from the container in that domain's
   `usecases/index.ts` (see `src/domains/auth/usecases/index.ts`).

Keep constructor parameter names identical to the registered name - e.g.
`constructor(private tokenManager: ITokenManager)` resolves because `tokenManager`
is the exact key registered in `src/clients/index.ts`. A mismatched name fails at
resolve time, not at compile time, so this is the one place in the codebase where a
rename needs a manual double-check across both sides.
