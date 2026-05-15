export type OnboardingPlan = {
  id: string
  name: string
  price: string
  priceSuffix?: string
  badge?: string
  description: string
  features: string[]
  ctaLabel: string
  highlighted?: boolean
}

export const ONBOARDING_PLANS: OnboardingPlan[] = [
  {
    id: "free",
    name: "Gratuito",
    price: "R$ 0",
    badge: "Grátis",
    description:
      "Comece a criar anúncios profissionais com inteligência artificial sem nenhum custo.",
    features: [
      "Criação de anúncios com inteligência artificial",
      "Otimização automática de SEO",
      "Exportação para os principais marketplaces",
      "Até 5 anúncios por mês",
    ],
    ctaLabel: "Começar agora",
    highlighted: true,
  },
]
