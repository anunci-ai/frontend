import { ScoreChart } from "./score-chart"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export function ScorePreview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Score SEO (prévia)</CardTitle>
      </CardHeader>
      <CardContent className="flex h-screen">
        <ScoreChart />
        <div>
          <h3 className="text-lg font-semibold text-primary">Muito bom!</h3>
          <p className="text-muted-foreground">
            Seu anúncio tem grande potencial de ranqueamento.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
