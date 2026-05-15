import { Check, ArrowRight, LoaderCircle, RefreshCw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { OnboardingPlan, OnboardingStatus } from "@/lib/onboarding-plans"

type PricingCardProps = {
  plan: OnboardingPlan
  onSelect: () => void
  status: OnboardingStatus
}

const featureListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.25,
    },
  },
}

const featureItemVariants = {
  hidden: { opacity: 0, x: 16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
}

export function PricingCard({ plan, onSelect, status }: PricingCardProps) {
  const isDisabled = status !== "idle"

  return (
    <div className="flex flex-1 flex-col justify-between overflow-y-auto p-6 lg:p-10">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              {plan.name}
            </h2>
            {plan.badge && (
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {plan.badge}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{plan.description}</p>
        </div>

        {/* Price */}
        <div className="flex items-end gap-1">
          <span className="text-4xl font-bold tracking-tight text-foreground">
            {plan.price}
          </span>
          {plan.priceSuffix && (
            <span className="mb-1 text-sm text-muted-foreground">
              {plan.priceSuffix}
            </span>
          )}
        </div>

        {/* Feature list */}
        <motion.ul
          variants={featureListVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-3"
          aria-label="Recursos incluídos"
        >
          {plan.features.map((feature) => (
            <motion.li
              key={feature}
              variants={featureItemVariants}
              className="flex items-center gap-3 text-sm text-foreground"
            >
              <span
                className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10"
                aria-hidden="true"
              >
                <Check size={12} className="text-primary" strokeWidth={2.5} />
              </span>
              {feature}
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* CTA */}
      <div
        className={cn(
          "mt-8 overflow-hidden rounded-4xl transition-colors duration-500",
          status === "complete" ? "bg-green-500" : "gradient-bg",
        )}
      >
        <button
          type="button"
          onClick={onSelect}
          disabled={isDisabled}
          className="flex w-full items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed"
          aria-live="polite"
        >
          <AnimatePresence mode="wait" initial={false}>
            {status === "idle" && (
              <motion.span
                key="idle"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                {plan.ctaLabel}
                <ArrowRight size={16} aria-hidden="true" />
              </motion.span>
            )}
            {status === "submitting" && (
              <motion.span
                key="submitting"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <LoaderCircle
                  size={16}
                  className="animate-spin"
                  aria-hidden="true"
                />
                Ativando plano...
              </motion.span>
            )}
            {status === "complete" && (
              <motion.span
                key="complete"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <Check size={16} aria-hidden="true" />
                Tudo certo! Entrando...
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  )
}

export function PricingCardSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6 lg:p-10">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="h-6 w-36 animate-pulse rounded-lg bg-muted" />
          <div className="h-5 w-12 animate-pulse rounded-full bg-muted" />
        </div>
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
      </div>
      <div className="h-10 w-24 animate-pulse rounded-lg bg-muted" />
      <div className="flex flex-col gap-3">
        {(["85%", "70%", "80%", "65%"] as const).map((w) => (
          <div key={w} className="flex items-center gap-3">
            <div className="size-5 animate-pulse rounded-full bg-muted" />
            <div
              className="h-4 animate-pulse rounded bg-muted"
              style={{ width: w }}
            />
          </div>
        ))}
      </div>
      <div className="mt-auto h-12 animate-pulse rounded-4xl bg-muted" />
    </div>
  )
}

export function PricingCardError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center lg:p-10">
      <p className="text-sm text-muted-foreground">
        Não foi possível carregar o plano.
      </p>
      <Button variant="outline" size="sm" onClick={onRetry}>
        <RefreshCw size={14} aria-hidden="true" />
        Tentar novamente
      </Button>
    </div>
  )
}
