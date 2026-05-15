/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router"
import { PageHeader } from "@/components/page-header"

export const Route = createFileRoute("/_app/settings/")({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Configurações"
        subtitle="Gerencie as configurações da sua conta."
      />
      <div className="flex flex-1 flex-col items-center justify-center gap-2 py-24 text-center">
        <p className="text-sm font-medium text-foreground">
          Esta página está em desenvolvimento.
        </p>
        <p className="text-sm text-muted-foreground">
          Em breve você poderá ajustar as configurações da sua conta aqui.
        </p>
      </div>
    </div>
  )
}
