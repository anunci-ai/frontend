import { Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/hooks/use-auth"

export function TokenUsageCard() {
  const { user } = useAuth()

  if (!user?.subscription) {
    return null
  }

  const { tokensRemaining, tokensTotal } = user.subscription

  const usedTokens = tokensTotal - tokensRemaining

  const pct = Math.round((usedTokens / tokensTotal) * 100)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Tokens disponíveis
        </CardTitle>

        <div className="rounded-lg bg-muted p-2">
          <Zap size={18} className="text-muted-foreground" />
        </div>
      </CardHeader>

      <CardContent className="pt-3">
        <p className="text-3xl font-bold tracking-tight">
          {tokensRemaining}

          <span className="ml-1 text-lg font-normal text-muted-foreground">
            / {tokensTotal}
          </span>
        </p>

        <Progress value={pct} className="mt-3 h-2" />

        {pct === 100 ? (
          <p className="mt-2 text-xs text-muted-foreground">
            Você antingiu o limite máximo de crição de anúncios.
          </p>
        ) : (
          <p className="mt-2 text-xs text-muted-foreground">
            Você utilizou {pct}% do seus tokens
          </p>
        )}
      </CardContent>
    </Card>
  )
}
