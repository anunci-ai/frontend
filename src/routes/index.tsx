/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router"

import { Sidebar } from "@/components/sidebar"
import { FeedbackWidget } from "@/components/feedback-widget"

import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/reui/stepper"
import { GenerateTextForm } from "@/components/generate-text-form"
import { UploadImageForm } from "@/components/upload-image-form"
import { requireAuth } from "@/auth/auth"

const steps = [
  { title: "Descreva seu produto", component: <GenerateTextForm /> },
  { title: "Upload de imagem", component: <UploadImageForm /> },
  { title: "Resultado", component: <h1>hello, world</h1> },
]

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    await requireAuth()
  },
  component: Home,
})

function Home() {
  return (
    <div className="flex min-h-svh w-full">
      <Sidebar />

      <div className="flex w-full flex-col">
        <header className="flex h-20 w-full items-center px-4">
          <div className="ml-auto">
            <FeedbackWidget />
          </div>
        </header>
        <div className="p-8">
          <h1 className="text-2xl font-bold text-foreground">
            Criar novo anúncio
          </h1>
          <p className="text-muted-foreground">
            Preencha as informações do seu produto e nossa IA criará um anúncio
            SEO Friendly para você
          </p>

          <div className="mx-auto my-16 w-full max-w-4xl">
            <Stepper defaultValue={2} className="w-full max-w-md space-y-8">
              <StepperNav>
                {steps.map((step, index) => (
                  <StepperItem
                    key={index}
                    step={index + 1}
                    className="relative flex-1 items-start"
                  >
                    <StepperTrigger className="flex flex-col gap-2.5">
                      <StepperIndicator>{index + 1}</StepperIndicator>
                      <StepperTitle>{step.title}</StepperTitle>
                    </StepperTrigger>
                    {steps.length > index + 1 && (
                      <StepperSeparator className="absolute inset-x-0 top-3 left-[calc(50%+0.875rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none group-data-[state=completed]/step:bg-primary" />
                    )}
                  </StepperItem>
                ))}
              </StepperNav>
              <StepperPanel className="text-sm">
                {steps.map((step, index) => (
                  <StepperContent
                    key={index}
                    value={index + 1}
                    className="flex items-center justify-center"
                  >
                    {step.component}
                  </StepperContent>
                ))}
              </StepperPanel>
            </Stepper>
          </div>
        </div>
      </div>
    </div>
  )
}
