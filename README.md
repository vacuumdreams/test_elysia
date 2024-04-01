Created this playground repo to check out Elysia's e2e type safety.

### Prerequisites

You will need to have the following installed:

- [Bun](https://bun.sh/) >= v1.0.29

### Database

You'll also need a database connection URI. I've used [Neon](https://neon.tech/), where I've created a Postgres database and pasted my connection URI into an `.env.local` file into the root folder of the repo.

If you want to use a different database, you'll need to change:

- `./drizzle.config.ts`: check out the [Drizzle documentation](https://orm.drizzle.team/kit-docs/conf) for more info
- `./src/lib/db/index.ts`: change the `postgres` library to the database engine you want to use instead

When you have your database connection set up, you'll need to set up the database schema used for the project, for which you can just run (assuming you stick with Postgres):

```bash
bunx drizzle-kit push:pg
```

### Running the project

You're all set by this point, you can run:

```bash
bun dev
```
