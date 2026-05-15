import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import { SparklesIcon, StoreIcon, ZapIcon } from "@hugeicons/core-free-icons"
import { motion } from "framer-motion"

type ValueProp = {
  icon: IconSvgElement
  text: string
}

const VALUE_PROPS: ValueProp[] = [
  { icon: SparklesIcon, text: "Anúncios criados por inteligência artificial" },
  { icon: StoreIcon, text: "Integração com os principais marketplaces" },
  { icon: ZapIcon, text: "Do upload ao anúncio em segundos" },
]

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
}

export function OnboardingHero() {
  return (
    <div
      className="gradient-bg relative flex shrink-0 flex-col overflow-hidden p-6 lg:w-100 lg:justify-between lg:p-10"
      aria-hidden="true"
    >
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -top-16 -right-16 size-64 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-20 -left-12 size-72 rounded-full bg-white/5" />

      <div className="relative z-10">
        {/* Brand */}
        <span className="text-lg font-bold tracking-tight text-white">
          anuncia<span className="text-white/60">.ai</span>
        </span>

        {/* Headline — desktop only */}
        <div className="mt-8 hidden lg:block">
          <h3 className="text-3xl leading-tight font-bold text-white">
            Crie anúncios
            <br />
            profissionais
            <br />
            com IA
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Escolha seu plano e comece a vender mais com anúncios otimizados
            para cada marketplace.
          </p>
        </div>

        {/* Mobile compact subtitle */}
        <p className="mt-2 text-sm text-white/70 lg:hidden">
          Escolha seu plano para continuar
        </p>
      </div>

      {/* Value props — desktop only */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 mt-10 hidden flex-col gap-4 lg:flex"
      >
        {VALUE_PROPS.map((prop) => (
          <motion.div
            key={prop.text}
            variants={itemVariants}
            className="flex items-center gap-3"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
              <HugeiconsIcon
                icon={prop.icon}
                size={18}
                className="text-white"
              />
            </div>
            <span className="text-sm font-medium text-white/90">
              {prop.text}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Social proof — desktop only */}
      <p className="relative z-10 mt-6 hidden text-xs text-white/40 lg:block">
        Mais de 1.000 vendedores já usam o anuncia.ai
      </p>
    </div>
  )
}
