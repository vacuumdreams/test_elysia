import { t } from "elysia"
import { resourceTable } from "@/lib/db/schema"
import { createInsertSchema, createSelectSchema } from "drizzle-typebox"

const resourceInsertSchema = createInsertSchema(resourceTable)

export const schema = {
  resource: {
    select: createSelectSchema(resourceTable),
    insert: t.Omit(resourceInsertSchema, ["id", "createdAt", "updatedAt"]),
  },
}
