import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

const connectionString = String(process.env.DATABASE_URL)

const sql = postgres(connectionString)
export const db = drizzle(sql)

export type Database = typeof db;
