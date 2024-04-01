import { useEffect } from "react"
import { Static } from "@sinclair/typebox"
import { CheckIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { typeboxResolver } from "@hookform/resolvers/typebox"
import { schema } from "@/lib/api/schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type ResourcesFormProps = {
  id?: string;
  isPending?: boolean;
  data?: Static<typeof schema.resource.insert>;
  placeholder?: string;
  onSubmit: (data: Static<typeof schema.resource.insert>) => void;
};

export const ResourceForm = ({
  id,
  data,
  isPending,
  placeholder,
  onSubmit,
}: ResourcesFormProps) => {
  const { register, handleSubmit, reset, formState } = useForm<
    Static<typeof schema.resource.insert>
  >({
    resolver: typeboxResolver(schema.resource.insert),
    defaultValues: data,
  })

  console.log(
    "DISABLED?",
    isPending || !formState.isDirty || !formState.isValid,
  )

  useEffect(() => {
    if (!isPending) {
      reset()
    }
  }, [reset, isPending])

  return (
    <form
      id={id}
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full items-center justify-between gap-4"
    >
      <Input
        {...register("value")}
        type="text"
        placeholder={placeholder}
        disabled={isPending}
      />
      <Button
        type="submit"
        disabled={isPending || !formState.isDirty || !formState.isValid}
      >
        <CheckIcon />
      </Button>
    </form>
  )
}
