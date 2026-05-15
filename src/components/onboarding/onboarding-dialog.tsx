import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { useOnboarding } from "@/hooks/use-onboarding"
import { ONBOARDING_PLANS } from "@/lib/onboarding-plans"
import { OnboardingHero } from "@/components/onboarding/onboarding-hero"
import { PricingCard } from "@/components/onboarding/pricing-card"
import type { OnboardingStatus } from "@/components/onboarding/pricing-card"

export function OnboardingDialog() {
  const { isOpen, completeOnboarding } = useOnboarding()
  const [status, setStatus] = useState<OnboardingStatus>("idle")
  const plan = ONBOARDING_PLANS[0]!

  function handleSelect() {
    setStatus("submitting")
    setTimeout(() => setStatus("complete"), 700)
    setTimeout(() => completeOnboarding(), 2000)
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent
        showCloseButton={false}
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        className="flex h-dvh max-w-full flex-col gap-0 overflow-hidden rounded-none p-0 sm:h-auto sm:max-w-4xl sm:rounded-4xl lg:flex-row"
      >
        <DialogTitle className="sr-only">
          Bem-vindo ao anuncia.ai — Escolha seu plano
        </DialogTitle>
        <DialogDescription className="sr-only">
          Selecione um plano para começar a usar a plataforma de criação de
          anúncios com inteligência artificial.
        </DialogDescription>
        <OnboardingHero />
        <PricingCard plan={plan} onSelect={handleSelect} status={status} />
      </DialogContent>
    </Dialog>
  )
}
