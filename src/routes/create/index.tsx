/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { Sidebar } from "@/components/sidebar"
import { FeedbackWidget } from "@/components/feedback-widget"
import { GenerateTextForm } from "@/components/generate-text-form"
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/reui/stepper"
import { requireAuth } from "@/auth/auth"
import { createListing } from "@/http/create-listing"

export const Route = createFileRoute("/create/")({
  beforeLoad: async () => {
    await requireAuth()
  },
  component: CreateListing,
})

const steps = [
  { value: 1, title: "Produto" },
  { value: 2, title: "Imagem" },
  { value: 3, title: "Resultado" },
]

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
    <div className="flex min-h-svh w-full">
      <Sidebar />

      <div className="flex min-h-0 w-full flex-col">
        <header className="flex h-20 w-full shrink-0 items-center px-4">
          <div className="ml-auto">
            <FeedbackWidget />
          </div>
        </header>

        <main className="flex flex-1 flex-col overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto flex w-full flex-col gap-8">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Criar novo anúncio
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Em poucos passos, nossa IA gera um anúncio completo e otimizado.
              </p>
            </div>

            <Stepper value={1} onValueChange={() => {}}>
              <StepperNav>
                {steps.map((s, idx) => (
                  <StepperItem
                    key={s.value}
                    step={s.value}
                    completed={false}
                    disabled={s.value !== 1}
                    className="relative flex-1 items-start"
                  >
                    <StepperTrigger className="flex flex-col gap-2.5">
                      <StepperIndicator>{s.value}</StepperIndicator>
                      <StepperTitle>{s.title}</StepperTitle>
                    </StepperTrigger>
                    {idx < steps.length - 1 && (
                      <StepperSeparator className="absolute inset-x-0 top-3 left-[calc(50%+0.875rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none group-data-[state=completed]/step:bg-primary" />
                    )}
                  </StepperItem>
                ))}
              </StepperNav>

              <div className="mt-8">
                <GenerateTextForm
                  isPending={isPending}
                  onSubmit={({ description, marketplace }) =>
                    mutate({
                      inputDescription: description,
                      marketplace,
                    })
                  }
                />
              </div>
            </Stepper>
          </div>
        </main>
      </div>
    </div>
  )
}
