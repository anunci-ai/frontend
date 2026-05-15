import { type LucideIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  hint?: string
  isLoading?: boolean
}

export function StatCard({ label, value, icon, hint, isLoading }: StatCardProps) {
  const Icon = icon
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
        <div className="rounded-lg bg-muted p-2">
          <Icon size={18} className="text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="pt-3">
        {isLoading ? (
          <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
        ) : (
          <p className="text-3xl font-bold tracking-tight">{value}</p>
        )}
        {hint && (
          <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
        )}
      </CardContent>
    </Card>
  )
}
