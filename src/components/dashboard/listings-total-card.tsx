import { useQuery } from "@tanstack/react-query"
import { TrendingUp } from "lucide-react"
import { fetchListingsAnalytics } from "@/http/fetch-listings-analytics"
import { StatCard } from "@/components/dashboard/stat-card"

export function ListingsTotalCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["listings-analytics"],
    queryFn: fetchListingsAnalytics,
  })

  return (
    <StatCard
      label="Anúncios gerados"
      value={data?.analytics.listings.total ?? 0}
      icon={TrendingUp}
      hint="Total acumulado"
      isLoading={isLoading}
    />
  )
}
