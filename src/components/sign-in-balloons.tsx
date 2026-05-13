import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import {
  AiViewIcon,
  Chart03Icon,
  CopyIcon,
  DashboardSquareEditIcon,
  MagicWand05Icon,
  QuillWrite01Icon,
  ShoppingBasketDone03Icon,
  SparklesIcon,
  StoreIcon,
  Target01Icon,
  UploadIcon,
  ZapIcon,
} from "@hugeicons/core-free-icons"

function pathFor(left: number, top: number) {
  const ax = 50
  const ay = 50
  const mx = (ax + left) / 2
  const my = (ay + top) / 2
  const sag = 4
  return `M ${ax} ${ay} Q ${mx} ${my + sag} ${left} ${top}`
}

interface Balloon {
  label: string
  icon: IconSvgElement
  top: number
  left: number
}

const BALLOONS: Balloon[] = [
  { label: "Marketplace",   icon: StoreIcon,                top: 22, left: 26 },
  { label: "IA",            icon: SparklesIcon,             top: 16, left: 42 },
  { label: "Anúncios",      icon: MagicWand05Icon,          top: 20, left: 58 },
  { label: "SEO",           icon: Chart03Icon,              top: 22, left: 74 },
  { label: "Rápido",        icon: ZapIcon,                  top: 36, left: 20 },
  { label: "Upload",        icon: UploadIcon,               top: 34, left: 80 },
  { label: "Texto",         icon: QuillWrite01Icon,         top: 50, left: 18 },
  { label: "Análise",       icon: AiViewIcon,               top: 50, left: 82 },
  { label: "Conversão",     icon: Target01Icon,             top: 64, left: 20 },
  { label: "Vendas",        icon: ShoppingBasketDone03Icon, top: 66, left: 80 },
  { label: "Editor",        icon: DashboardSquareEditIcon,  top: 78, left: 30 },
  { label: "Cópia",         icon: CopyIcon,                 top: 78, left: 70 },
]

export function SignInBalloons() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {BALLOONS.map((b, i) => (
          <path
            key={i}
            d={pathFor(b.left, b.top)}
            fill="none"
            stroke="color-mix(in oklch, var(--foreground) 30%, transparent)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      {BALLOONS.map((b, i) => (
        <div
          key={i}
          className="animate-float absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-card-foreground shadow-sm"
          style={{
            top: `${b.top}%`,
            left: `${b.left}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          <HugeiconsIcon icon={b.icon} size={14} className="text-primary" />
          {b.label}
        </div>
      ))}
    </div>
  )
}
