import { CheckCircle2, CircleDot, Loader2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ListingStatus } from "@/http/get-listing"

const STATUS_CONFIG: Record<
  ListingStatus,
  { label: string; icon: React.ElementType; className: string; spin?: boolean }
> = {
  DRAFT: {
    label: "Rascunho",
    icon: CircleDot,
    className:
      "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
  },
  TEXT_PROCESSING: {
    label: "Gerando texto…",
    icon: Loader2,
    className:
      "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
    spin: true,
  },
  TEXT_COMPLETED: {
    label: "Texto pronto",
    icon: CheckCircle2,
    className:
      "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
  },
  IMAGE_PROCESSING: {
    label: "Gerando imagens…",
    icon: Loader2,
    className:
      "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
    spin: true,
  },
  IMAGE_COMPLETED: {
    label: "Imagens prontas",
    icon: CheckCircle2,
    className:
      "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
  },
  COMPLETED: {
    label: "Concluído",
    icon: CheckCircle2,
    className:
      "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
  },
  FAILED: {
    label: "Falhou",
    icon: XCircle,
    className:
      "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
  },
}

interface ListingStatusBadgeProps {
  status: ListingStatus
  className?: string
}

export function ListingStatusBadge({
  status,
  className,
}: ListingStatusBadgeProps) {
  const config = STATUS_CONFIG[status]
  const Icon = config.icon

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      <Icon size={12} className={cn(config.spin && "animate-spin")} />
      {config.label}
    </span>
  )
}
