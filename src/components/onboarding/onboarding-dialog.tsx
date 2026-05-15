import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { useOnboarding } from "@/hooks/use-onboarding"
import { OnboardingHero } from "@/components/onboarding/onboarding-hero"
import {
  PricingCard,
  PricingCardError,
  PricingCardSkeleton,
} from "@/components/onboarding/pricing-card"

export function OnboardingDialog() {
  const { isOpen, plan, isPlansError, refetchPlans, subscribe, status } =
    useOnboarding()

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
        {!plan ? (
          isPlansError ? (
            <PricingCardError onRetry={refetchPlans} />
          ) : (
            <PricingCardSkeleton />
          )
        ) : (
          <PricingCard plan={plan} onSelect={subscribe} status={status} />
        )}
      </DialogContent>
    </Dialog>
  )
}
