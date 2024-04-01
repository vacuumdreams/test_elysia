"use client"

import { useResourceGetList } from "@/lib/client"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ResourceItem } from "./item"
import { NewResourceItem } from "./new-item"

export const Resources = () => {
  const { data, refetch, isLoading, isRefetching } = useResourceGetList()

  return (
    <div className="container mt-12">
      <h1 className="mb-12 text-3xl">Resources</h1>
      {!isLoading && (
        <p className="text-right text-sm text-muted-foreground">
          {data?.length ? data.length : "No"}{" "}
          {data?.length === 1 ? "resource" : "resources"}
        </p>
      )}
      {isLoading && (
        <Card className="mt-6">
          <CardContent className="flex items-center justify-between gap-4 pt-6">
            <Skeleton className="h-8 w-48" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-12" />
              <Skeleton className="h-10 w-12" />
            </div>
          </CardContent>
        </Card>
      )}
      <ul className="my-4 flex-col gap-4">
        {data?.map((resource, index) => (
          <li key={resource.id}>
            <ResourceItem index={index} data={resource} refetch={refetch} />
          </li>
        ))}
      </ul>
      {!isLoading && (
        <NewResourceItem refetch={refetch} isPending={isRefetching} />
      )}
    </div>
  )
}
