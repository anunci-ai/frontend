/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router"
import { TrendingUp } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/dashboard/stat-card"
import { PlanCard } from "@/components/dashboard/plan-card"
import { TokenUsageCard } from "@/components/dashboard/token-usage-card"
import { ListingsChartCard } from "@/components/dashboard/listings-chart-card"

export const Route = createFileRoute("/_app/")({
  component: Home,
})

function Home() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Dashboard"
        subtitle="Acompanhe o uso da sua conta e os anúncios gerados."
      />

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Anúncios gerados"
          value={248}
          icon={TrendingUp}
          hint="Total acumulado"
        />
        <PlanCard />
        <TokenUsageCard />
      </section>

      <ListingsChartCard />
    </div>
  )
}
