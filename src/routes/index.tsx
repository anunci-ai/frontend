/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router"

import { CreateListingForm } from "@/components/create-listing-form"
import { Sidebar } from "@/components/sidebar"

export const Route = createFileRoute("/")({
  component: Home,
})

function Home() {
  return (
    <div className="flex min-h-svh w-full">
      <Sidebar />
      <CreateListingForm />
    </div>
  )
}
