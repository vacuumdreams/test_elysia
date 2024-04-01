import { createApi } from "@/lib/api"

const api = createApi({ prefix: "/api" })

export const GET = api.handle
export const POST = api.handle
export const PATCH = api.handle
export const DELETE = api.handle
export const OPTIONS = api.handle
