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

const chartData = (() => {
  const today = new Date()
  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (29 - i))
    const isWeekend = d.getDay() === 0 || d.getDay() === 6
    const trend = 5 + Math.round((i / 29) * 9)
    const noise = Math.round(Math.abs(Math.sin(i * 2.1)) * 5)
    const listings = Math.max(1, trend + noise + (isWeekend ? -3 : 0))
    return {
      date: `${d.getDate()} ${ptMonths[d.getMonth()]}`,
      listings,
    }
  })
})()

const total = chartData.reduce((s, d) => s + d.listings, 0)

const chartConfig = {
  listings: {
    label: "Anúncios",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ListingsChartCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Anúncios gerados nos últimos 30 dias</CardTitle>
        <CardDescription>Total: {total} anúncios</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-56 w-full md:h-64">
          <AreaChart
            data={chartData}
            margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
          >
            <defs>
              <linearGradient id="listingsGradient" x1="0" y1="0" x2="0" y2="1">
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
      </CardContent>
    </Card>
  )
}
