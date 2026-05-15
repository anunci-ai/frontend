/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, Outlet } from "@tanstack/react-router"
import { Sidebar } from "@/components/sidebar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { FeedbackWidget } from "@/components/feedback-widget"
import { requireAuth } from "@/auth/auth"
import { OnboardingDialog } from "@/components/onboarding/onboarding-dialog"

export const Route = createFileRoute("/_app")({
  beforeLoad: async () => {
    await requireAuth()
  },
  component: AppLayout,
})

function AppLayout() {
  return (
    <div className="flex min-h-svh w-full">
      <Sidebar />
      <BottomNavigation />
      <div className="flex min-h-0 w-full flex-col">
        <header className="flex w-full shrink-0 items-center px-4 pt-4 lg:px-8 lg:pt-8">
          <div className="ml-auto">
            <FeedbackWidget />
          </div>
        </header>
        <main className="flex flex-1 flex-col overflow-y-auto p-4 pb-28 md:p-6 md:pb-28 lg:p-8 lg:pb-8">
          <Outlet />
        </main>
      </div>
      <OnboardingDialog />
    </div>
  )
}
