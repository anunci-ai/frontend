/* eslint-disable react-refresh/only-export-components */
import { FeedbackWidget } from "@/components/feedback-widget"
import { ListingsTable } from "@/components/listings-table"
import { Sidebar } from "@/components/sidebar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"

const listingsSearchSchema = z.object({
  page: z.coerce.number().int().min(1).catch(1),
})

export const Route = createFileRoute("/listings/")({
  validateSearch: listingsSearchSchema,
  component: ListingsPage,
})

function ListingsPage() {
  return (
    <div className="flex min-h-svh w-full">
      <Sidebar />
      <BottomNavigation />

      <div className="flex w-full flex-col">
        <header className="flex h-20 w-full items-center px-4">
          <div className="ml-auto">
            <FeedbackWidget />
          </div>
        </header>
        <div className="flex flex-col gap-6 p-4 pb-28 md:p-6 md:pb-28 lg:p-8 lg:pb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Seus anúncios
            </h1>
            <p className="text-muted-foreground">
              Gerencie e acompanhe todos os seus anúncios.
            </p>
          </div>
          <ListingsTable />
        </div>
      </div>
    </div>
  )
}
