/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { PageHeader } from "@/components/page-header"
import { GenerateTextForm } from "@/components/generate-text-form"
import { CreateFlowStepper } from "@/components/create-flow/create-flow-stepper"
import { createListing } from "@/http/create-listing"

export const Route = createFileRoute("/_app/create/")({
  component: CreateListing,
})

function CreateListing() {
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: createListing,
    onSuccess: ({ listingId }) => {
      navigate({ to: "/create/$listingId", params: { listingId } })
    },
    onError: () => {
      toast.error("Não foi possível criar o anúncio.")
    },
  })

  return (
    <div className="mx-auto flex w-full flex-col gap-8">
      <PageHeader
        title="Criar novo anúncio"
        subtitle="Em poucos passos, nossa IA gera um anúncio completo e otimizado."
      />

      <CreateFlowStepper
        value={1}
        completedFor={() => false}
        disabledFor={(step) => step !== 1}
      >
        <GenerateTextForm
          isPending={isPending}
          onSubmit={({ description, marketplace }) =>
            mutate({
              inputDescription: description,
              marketplace,
            })
          }
        />
      </CreateFlowStepper>
    </div>
  )
}
