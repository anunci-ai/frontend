import { Zap } from "lucide-react"

interface CostBannerProps {
  cost: number
  balance: number
}

export function CostBanner({ cost, balance }: CostBannerProps) {
  return (
    <div className="gradient-bg flex items-center justify-between gap-4 rounded-2xl px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="shrink-0 rounded-lg bg-white/15 p-2">
          <Zap size={20} className="text-white" />
        </div>
        <div>
          <p className="text-xs tracking-wide text-white/70 uppercase">
            Custo de geração
          </p>
          <p className="text-lg font-semibold text-white">
            {cost.toLocaleString("pt-BR")} tokens
          </p>
        </div>
      </div>

      <div className="hidden flex-col items-end sm:flex">
        <p className="text-xs tracking-wide text-white/70 uppercase">
          Saldo disponível
        </p>
        <p className="text-lg font-semibold text-white">
          {balance.toLocaleString("pt-BR")} tokens
        </p>
      </div>
    </div>
  )
}
