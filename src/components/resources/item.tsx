import { useState } from "react"
import { EditIcon, TrashIcon, CheckIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Resource, useResourceUpdate, useResourceDelete } from "@/lib/client"
import { ResourceForm } from "./form"

type ResourceItemProps = {
  index: number;
  data: Resource;
  refetch: () => void;
};

export function ResourceItem({ index, data, refetch }: ResourceItemProps) {
  const { toast } = useToast()
  const [isEditing, setEditing] = useState(false)
  const { mutate: mutateUpdate, isPending: isUpdatePending } =
    useResourceUpdate({
      onSuccess: () => {
        setEditing(false)
        refetch()
      },
      onError: (err) => {
        toast({
          title: "Error",
          description: <div className="pl-8">{err.message}</div>,
          variant: "destructive",
        })
      },
    })
  const { mutate: mutateDelete, isPending: isDeletePending } =
    useResourceDelete({
      onSuccess: () => refetch(),
    })
  const isPending = isUpdatePending || isDeletePending

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex w-full items-center justify-center gap-2">
            {index + 1}.{" "}
            {!isEditing && (
              <div className="w-full text-muted-foreground">{data.value}</div>
            )}
            {isEditing && (
              <ResourceForm
                id={`update-form-${data.id}`}
                data={{ value: data.value }}
                isPending={isPending}
                placeholder="Resource value..."
                onSubmit={(form) => {
                  mutateUpdate({ id: data.id, value: form.value })
                }}
              />
            )}
          </div>
          {!isEditing && (
            <div className="flex gap-4">
              <Button onClick={() => setEditing(true)}>
                <EditIcon />
              </Button>
              <Button
                disabled={isPending}
                onClick={() => mutateDelete({ id: data.id })}
              >
                <TrashIcon />
              </Button>
            </div>
          )}
          {isEditing && (
            <div className="flex gap-4">
              <Button onClick={() => setEditing(false)}>
                <XIcon />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
