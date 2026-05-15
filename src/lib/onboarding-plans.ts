import type { fetchPlans } from "@/http/fetch-plans"

export type Plan =
  NonNullable<Awaited<ReturnType<typeof fetchPlans>>>["plans"][number]

export type OnboardingPlan = {
  id: string
  name: string
  price: string
  priceSuffix?: string
  badge?: string
  description: string
  features: string[]
  ctaLabel: string
}

export type OnboardingStatus = "idle" | "submitting" | "complete"

const ONBOARDING_PLAN_COPY = {
  description:
    "Comece a criar anúncios profissionais com inteligência artificial.",
  benefits: [
    "Otimização de SEO automática",
    "Exportação para os principais marketplaces",
    "Suporte por e-mail",
  ],
  ctaLabel: "Começar agora",
}

const priceFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

const numberFormatter = new Intl.NumberFormat("pt-BR")

export function formatPrice(priceInCents: number) {
  return priceFormatter.format(priceInCents / 100)
}

export function formatTokensFeature(tokensQuantity: number) {
  return `${numberFormatter.format(tokensQuantity)} tokens para gerar anúncios`
}

export function mapPlanToOnboarding(plan: Plan): OnboardingPlan {
  return {
    id: plan.id,
    name: plan.name,
    price: formatPrice(plan.priceInCents),
    priceSuffix: plan.priceInCents > 0 ? "/mês" : undefined,
    badge: plan.priceInCents === 0 ? "Grátis" : undefined,
    description: ONBOARDING_PLAN_COPY.description,
    features: [
      formatTokensFeature(plan.tokensQuantity),
      ...ONBOARDING_PLAN_COPY.benefits,
    ],
    ctaLabel: ONBOARDING_PLAN_COPY.ctaLabel,
  }
}
