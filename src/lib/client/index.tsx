"use client"

import { edenTreaty } from "@elysiajs/eden"
import {
  useQuery,
  useMutation,
  UseMutationOptions,
  MutationFunction,
} from "@tanstack/react-query"
import { Api } from "@/lib/api"

const client = edenTreaty<Api>("http://localhost:3001")

export type Resource = NonNullable<
  Awaited<ReturnType<typeof client.api.resources.post>>["data"]
>;

export function useResourceGetList() {
  return useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      const { data, error } = await client.api.resources.get()
      if (error) {
        throw error
      }
      return data
    },
  })
}

export function useResourceGet(id: string) {
  return useQuery({
    queryKey: ["resource", id],
    queryFn: async () => {
      const { data, error } = await client.api.resources[id].get()
      if (error) {
        throw error
      }
      return data
    },
  })
}

export function useResourceCreate(
  options: Omit<
    UseMutationOptions<
      Awaited<ReturnType<typeof client.api.resources.post>>["data"],
      Error,
      Parameters<typeof client.api.resources.post>[0]
    >,
    "mutationFn"
  >,
) {
  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof client.api.resources.post>>["data"],
    Parameters<typeof client.api.resources.post>[0]
  > = async (payload) => {
    const { data, error } = await client.api.resources.post(payload)
    if (error) {
      throw error
    }
    return data
  }

  return useMutation({
    ...options,
    mutationFn,
  })
}

export function useResourceUpdate(
  options: Omit<
    UseMutationOptions<
      Awaited<ReturnType<typeof client.api.resources.post>>,
      Error,
      Partial<Parameters<typeof client.api.resources.post>[0]> & { id: string }
    >,
    "mutationFn"
  >,
) {
  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof client.api.resources.post>>,
    Partial<Parameters<typeof client.api.resources.post>[0]> & { id: string }
  > = ({ id, ...data }) => {
    return client.api.resources[id].patch(data)
  }

  return useMutation({
    ...options,
    mutationFn,
  })
}

export function useResourceDelete(
  options: Omit<UseMutationOptions<null, Error, { id: string }>, "mutationFn">,
) {
  const mutationFn: MutationFunction<null, { id: string }> = async ({ id }) => {
    const { error } = await client.api.resources[id].delete()
    if (error) {
      throw error
    }
    return null
  }

  return useMutation({
    ...options,
    mutationFn,
  })
}
