/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router"
import { TrendingUp } from "lucide-react"

import { Sidebar } from "@/components/sidebar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { FeedbackWidget } from "@/components/feedback-widget"
import { StatCard } from "@/components/dashboard/stat-card"
import { PlanCard } from "@/components/dashboard/plan-card"
import { TokenUsageCard } from "@/components/dashboard/token-usage-card"
import { ListingsChartCard } from "@/components/dashboard/listings-chart-card"

import { requireAuth } from "@/auth/auth"

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    await requireAuth()
  },
  component: Home,
})

function Home() {
  return (
    <div className="flex min-h-svh w-full">
      <Sidebar />
      <BottomNavigation />

      <div className="flex min-h-0 w-full flex-col">
        <header className="flex h-20 w-full shrink-0 items-center px-4">
          <div className="ml-auto">
            <FeedbackWidget />
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-6 overflow-y-auto p-4 pb-28 md:p-6 md:pb-28 lg:p-8 lg:pb-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Acompanhe o uso da sua conta e os anúncios gerados.
            </p>
          </div>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
        </main>
      </div>
    </div>
  )
}
