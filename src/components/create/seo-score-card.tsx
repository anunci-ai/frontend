import { useEffect, useRef, useState } from "react"
import { AlertCircle, CheckCircle2, Info, Sparkles } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// ─── Scoring ─────────────────────────────────────────────────────────────────

export function calculateSeoScore({
  description,
  marketplace,
  hasImage,
}: {
  description: string
  marketplace: string
  hasImage: boolean
}) {
  const len = description.trim().length
  let score = 20
  if (marketplace) score += 15
  if (len >= 20) score += 10
  if (len >= 80) score += 15
  if (len >= 160) score += 12
  if (hasImage) score += 20
  if (len > 200) score += 5
  return Math.min(100, score)
}

type Status = "ok" | "info" | "warn"

function getRecommendations(
  description: string,
  marketplace: string,
  hasImage: boolean
): { status: Status; message: string }[] {
  const len = description.trim().length
  return [
    {
      status: marketplace ? "ok" : "warn",
      message: marketplace
        ? "Marketplace selecionado: Mercado Livre"
        : "Selecione um marketplace para começar",
    },
    {
      status: len >= 160 ? "ok" : len >= 20 ? "info" : "warn",
      message:
        len >= 160
          ? "Descrição com tamanho ideal para SEO"
          : len >= 80
            ? "Bom tamanho de descrição — adicione mais detalhes"
            : len >= 20
              ? "Inclua mais palavras-chave na descrição"
              : "Descrição muito curta — adicione mais detalhes",
    },
    {
      status: hasImage ? "ok" : "warn",
      message: hasImage
        ? "Imagem adicionada — ótimo destaque visual"
        : "Adicione uma imagem para aumentar conversões",
    },
    {
      status: "info" as const,
      message: "Alta relevância de palavras-chave para Mercado Livre",
    },
  ]
}

// ─── Animated number hook ─────────────────────────────────────────────────────

function useAnimatedNumber(target: number, duration = 700) {
  const [display, setDisplay] = useState(target)
  const prevRef = useRef(target)

  useEffect(() => {
    const start = prevRef.current
    const end = target
    if (start === end) return

    const startTime = performance.now()
    let raf: number

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration)
      const eased = 1 - Math.pow(1 - t, 3) // ease-out-cubic
      setDisplay(Math.round(start + (end - start) * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
      else prevRef.current = end
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return display
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const STATE_CONFIG = {
  excellent: {
    label: "Excelente",
    color: "#10b981", // emerald-500
    textClass: "text-emerald-500",
  },
  good: {
    label: "Bom",
    color: "#f59e0b", // amber-500
    textClass: "text-amber-500",
  },
  "needs-work": {
    label: "Precisa melhorar",
    color: "#f43f5e", // rose-500
    textClass: "text-rose-500",
  },
} as const

type StateKey = keyof typeof STATE_CONFIG

function resolveState(score: number): StateKey {
  if (score >= 80) return "excellent"
  if (score >= 60) return "good"
  return "needs-work"
}

const RADIUS = 42
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

interface ScoreRingProps {
  score: number
  displayScore: number
}

function ScoreRing({ score, displayScore }: ScoreRingProps) {
  const state = resolveState(score)
  const { color, label, textClass } = STATE_CONFIG[state]
  const offset = (1 - score / 100) * CIRCUMFERENCE

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="size-28 -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            strokeWidth="8"
            fill="none"
            className="stroke-muted"
          />
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            stroke={color}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{
              transition: "stroke-dashoffset 700ms cubic-bezier(0.25,0.46,0.45,0.94), stroke 400ms ease",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold tabular-nums leading-none text-foreground">
            {displayScore}
          </span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>
      <span
        className={cn(
          "text-sm font-semibold transition-colors duration-400",
          textClass
        )}
      >
        {label}
      </span>
    </div>
  )
}

const STATUS_ICON = {
  ok: { icon: CheckCircle2, chipClass: "bg-emerald-500/15 text-emerald-600" },
  info: { icon: Info, chipClass: "bg-amber-500/15 text-amber-600" },
  warn: { icon: AlertCircle, chipClass: "bg-rose-500/15 text-rose-600" },
}

function RecommendationRow({
  status,
  message,
}: {
  status: Status
  message: string
}) {
  const { icon: Icon, chipClass } = STATUS_ICON[status]
  return (
    <div className="flex items-start gap-2.5">
      <div
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
          chipClass
        )}
      >
        <Icon size={12} />
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">{message}</p>
    </div>
  )
}

// ─── Main card ────────────────────────────────────────────────────────────────

interface SeoScoreCardProps {
  description: string
  marketplace: string
  hasImage: boolean
}

export function SeoScoreCard({
  description,
  marketplace,
  hasImage,
}: SeoScoreCardProps) {
  const score = calculateSeoScore({ description, marketplace, hasImage })
  const displayScore = useAnimatedNumber(score)
  const recommendations = getRecommendations(description, marketplace, hasImage)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Análise de SEO</CardTitle>
            <CardDescription>IA avalia seu anúncio em tempo real</CardDescription>
          </div>
          <div className="gradient-bg flex size-8 shrink-0 items-center justify-center rounded-lg">
            <Sparkles size={16} className="text-white" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <ScoreRing score={score} displayScore={displayScore} />

        <Separator />

        <div className="flex flex-col gap-3">
          {recommendations.map((rec, i) => (
            <RecommendationRow key={i} status={rec.status} message={rec.message} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
