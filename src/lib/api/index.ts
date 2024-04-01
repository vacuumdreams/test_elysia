import { eq } from "drizzle-orm"
import { Elysia, t, getSchemaValidator } from "elysia"
import { Array } from "@sinclair/typebox"
import { swagger } from "@elysiajs/swagger"
import { cors } from "@elysiajs/cors"
import { createPinoLogger } from "@bogeychan/elysia-logger"
import { db } from "@/lib/db"
import { resourceTable } from "@/lib/db/schema"
import { schema } from "./schema"

const logger = createPinoLogger({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
})

const resourceRoutes = new Elysia()
  .get(
    "/resources",
    async () => {
      return db.select().from(resourceTable)
    },
    {
      response: t.Array(schema.resource.select),
    },
  )
  .get(
    "/resources/:id",
    async (req) => {
      const [res] = await db
        .select()
        .from(resourceTable)
        .where(eq(resourceTable.id, req.params.id))
        .limit(1)
      return res
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      response: schema.resource.select,
    },
  )
  .post(
    "/resources",
    async (req) => {
      const [res] = await db.insert(resourceTable).values(req.body).returning()
      return res
    },
    {
      body: schema.resource.insert,
      response: schema.resource.select,
    },
  )
  .patch(
    "/resources/:id",
    async (req) => {
      const now = new Date()
      const [res] = await db
        .update(resourceTable)
        .set({
          ...req.body,
          updatedAt: now,
        })
        .where(eq(resourceTable.id, req.params.id))
        .returning()
      return res
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Partial(schema.resource.insert),
      response: schema.resource.select,
    },
  )
  .delete(
    "/resources/:id",
    async (req) => {
      await db.delete(resourceTable).where(eq(resourceTable.id, req.params.id))
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    },
  )

export const createApi = ({ prefix }: { prefix: string }) =>
  new Elysia({ prefix })
    .use(swagger({ path: "/docs" }))
    .use(cors())
    .use(logger.into())
    .onError((ctx) => {
      logger.error(ctx, ctx.error.name)
      return "onError"
    })
    .use(resourceRoutes)

export type Api = ReturnType<typeof createApi>;
