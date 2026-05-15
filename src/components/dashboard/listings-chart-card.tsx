import { useQuery } from "@tanstack/react-query"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { fetchListingsAnalytics } from "@/http/fetch-listings-analytics"

const ptMonths = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
]

const chartConfig = {
  listings: {
    label: "Anúncios",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

function formatDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number)
  const d = new Date(year, month - 1, day)
  return `${d.getDate()} ${ptMonths[d.getMonth()]}`
}

export function ListingsChartCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["listings-analytics"],
    queryFn: fetchListingsAnalytics,
  })

  const chartData =
    data?.analytics.listings.lastMonth.map(({ date, count }) => ({
      date: formatDate(date),
      listings: count,
    })) ?? []

  const total = data?.analytics.listings.total ?? 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Anúncios gerados nos últimos 30 dias</CardTitle>
        <CardDescription>
          {isLoading ? "Total: — anúncios" : `Total: ${total} anúncios`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-56 w-full animate-pulse rounded-md bg-muted md:h-64" />
        ) : (
          <ChartContainer config={chartConfig} className="h-56 w-full md:h-64">
            <AreaChart
              data={chartData}
              margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="listingsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-listings)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-listings)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} className="stroke-border/50" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                interval={5}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                type="monotone"
                dataKey="listings"
                stroke="var(--color-listings)"
                strokeWidth={2}
                fill="url(#listingsGradient)"
                dot={false}
                activeDot={{ r: 4, fill: "var(--color-listings)" }}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
