import { Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"

function resolvePlanName(name: string) {
  return name === "DEMO" ? "Demonstração" : name
}

export function PlanCard() {
  const { user } = useAuth()
  const planName = user?.subscription?.plan.name
    ? resolvePlanName(user.subscription.plan.name)
    : null

  return (
    <div className="gradient-bg flex flex-col justify-between gap-4 overflow-hidden rounded-2xl p-6">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-white/80">Plano atual</p>
        <div className="rounded-lg bg-white/20 p-2">
          <Crown size={18} className="text-white" />
        </div>
      </div>

      {planName ? (
        <div>
          <p className="text-3xl font-bold tracking-tight text-white">
            {planName}
          </p>
          <p className="mt-1 text-xs text-white/70">Assinatura ativa</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-3xl font-bold tracking-tight text-white">
              Sem plano
            </p>
            <p className="mt-1 text-xs text-white/70">
              Faça upgrade para desbloquear mais recursos
            </p>
          </div>
          <Button
            asChild
            size="sm"
            className="w-fit bg-white text-blue-600 hover:bg-white/90"
          >
            <a
              href="https://www.anunciaai.com/#precos"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver planos
            </a>
          </Button>
        </div>
      )}
    </div>
  )
}
