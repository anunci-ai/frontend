/* eslint-disable react-refresh/only-export-components */
import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"

import { Sidebar } from "@/components/sidebar"
import { FeedbackWidget } from "@/components/feedback-widget"
import { SeoScoreCard } from "@/components/create/seo-score-card"
import { GenerateTextForm } from "@/components/generate-text-form"
import { UploadImageForm } from "@/components/upload-image-form"
import { ListingResult } from "@/components/listing-result"
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
import { requireAuth } from "@/auth/auth"

export const Route = createFileRoute("/create/")({
  beforeLoad: async () => {
    await requireAuth()
  },
  component: CreateListing,
})

interface FormData {
  description: string
  marketplace: string
  imageUrl: string | null
  imageFile: File | null
}

const INITIAL_FORM: FormData = {
  description: "",
  marketplace: "MERCADO_LIVRE",
  imageUrl: null,
  imageFile: null,
}

const steps = [
  { value: 1, title: "Produto" },
  { value: 2, title: "Imagem" },
  { value: 3, title: "Resultado" },
]

function CreateListing() {
  const [step, setStep] = useState(1)
  const [furthestStep, setFurthestStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [form, setForm] = useState<FormData>(INITIAL_FORM)

  function patchForm(patch: Partial<FormData>) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  function goNext() {
    const next = step + 1
    setFurthestStep((prev) => Math.max(prev, next))
    setStep(next)
  }

  function goBack() {
    setStep((prev) => prev - 1)
  }

  function handleGenerate() {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      goNext()
    }, 1800)
  }

  function handleReset() {
    if (form.imageUrl) URL.revokeObjectURL(form.imageUrl)
    setForm(INITIAL_FORM)
    setStep(1)
    setFurthestStep(1)
    setIsGenerating(false)
  }

  function handleStepChange(value: number) {
    if (value <= furthestStep) setStep(value)
  }

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
            {/* <CostBanner cost={200} balance={1000} /> */}

            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Criar novo anúncio
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Em poucos passos, nossa IA gera um anúncio completo e otimizado.
              </p>
            </div>

            <Stepper value={step} onValueChange={handleStepChange}>
              <StepperNav>
                {steps.map((s, idx) => (
                  <StepperItem
                    key={s.value}
                    step={s.value}
                    completed={s.value < step}
                    disabled={s.value > furthestStep}
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

              {/* Two-column layout: form on left, live preview + SEO on right */}
              <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Left column: step content */}
                <div className="lg:col-span-2">
                  <StepperPanel>
                    <StepperContent value={1}>
                      <div className="animate-in duration-300 fade-in">
                        <GenerateTextForm
                          description={form.description}
                          marketplace={form.marketplace}
                          onChange={patchForm}
                          onNext={goNext}
                        />
                      </div>
                    </StepperContent>

                    <StepperContent value={2}>
                      <div className="animate-in duration-300 fade-in">
                        <UploadImageForm
                          imageUrl={form.imageUrl}
                          imageFile={form.imageFile}
                          onChange={patchForm}
                          onBack={goBack}
                          onGenerate={handleGenerate}
                          isGenerating={isGenerating}
                        />
                      </div>
                    </StepperContent>

                    <StepperContent value={3}>
                      <div className="animate-in duration-300 fade-in">
                        <ListingResult
                          imageUrl={form.imageUrl}
                          onReset={handleReset}
                        />
                      </div>
                    </StepperContent>
                  </StepperPanel>
                </div>

                {/* Right column: live preview + SEO score (sticky on desktop) */}
                <div className="flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start">
                  {/* <ListingPreview
                    description={form.description}
                    marketplace={form.marketplace}
                    imageUrl={form.imageUrl}
                  /> */}
                  <SeoScoreCard
                    description={form.description}
                    marketplace={form.marketplace}
                    hasImage={!!form.imageUrl}
                  />
                </div>
              </div>
            </Stepper>
          </div>
        </main>
      </div>
    </div>
  )
}
