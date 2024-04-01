import { useResourceCreate } from "@/lib/client"
import { Card, CardContent } from "@/components/ui/card"
import { ResourceForm } from "./form"

type NewResourceItemProps = {
  refetch: () => void;
  isPending?: boolean;
};

export function NewResourceItem({ refetch, isPending }: NewResourceItemProps) {
  const { mutate, isPending: isCreatePending } = useResourceCreate({
    onSuccess: () => refetch(),
  })

  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <ResourceForm
          id={`create-form`}
          isPending={isPending || isCreatePending}
          onSubmit={mutate}
          placeholder="Add new resource..."
        />
      </CardContent>
    </Card>
  )
}
