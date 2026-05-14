/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"
import { PageHeader } from "@/components/page-header"
import { ListingsTable } from "@/components/listings-table"

const listingsSearchSchema = z.object({
  page: z.coerce.number().int().min(1).catch(1),
})

export const Route = createFileRoute("/_app/listings/")({
  validateSearch: listingsSearchSchema,
  component: ListingsPage,
})

function ListingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Seus anúncios"
        subtitle="Gerencie e acompanhe todos os seus anúncios."
      />
      <ListingsTable />
    </div>
  )
}
