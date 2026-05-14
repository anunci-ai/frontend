import type { ReactNode } from "react"
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/reui/stepper"

const steps = [
  { value: 1, title: "Produto" },
  { value: 2, title: "Imagem" },
  { value: 3, title: "Resultado" },
]

interface CreateFlowStepperProps {
  value: number
  completedFor: (step: number) => boolean
  disabledFor: (step: number) => boolean
  children: ReactNode
}

export function CreateFlowStepper({
  value,
  completedFor,
  disabledFor,
  children,
}: CreateFlowStepperProps) {
  return (
    <Stepper value={value} onValueChange={() => {}}>
      <StepperNav>
        {steps.map((s, idx) => (
          <StepperItem
            key={s.value}
            step={s.value}
            completed={completedFor(s.value)}
            disabled={disabledFor(s.value)}
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
      <div className="mt-8">{children}</div>
    </Stepper>
  )
}
