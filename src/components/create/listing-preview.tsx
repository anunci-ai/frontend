import { ImageOff } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import mercadoLibreIcon from "@/assets/mercado-libre.svg"

const MOCK_PRICE = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
}).format(289.9)

function deriveTitle(description: string): string {
  if (!description.trim()) return ""
  const firstSentence = description.split(/[.\n]/)[0].trim()
  return firstSentence.length > 60
    ? firstSentence.slice(0, 60) + "…"
    : firstSentence
}

interface ListingPreviewProps {
  description: string
  marketplace: string
  imageUrl: string | null
}

export function ListingPreview({
  description,
  marketplace,
  imageUrl,
}: ListingPreviewProps) {
  const title = deriveTitle(description)
  const hasContent = !!description.trim()

  return (
    <Card className="overflow-hidden">
      {/* Image area */}
      <div className="relative aspect-square bg-muted">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Prévia do produto"
            className="size-full animate-in object-contain p-4 duration-500 fade-in"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <ImageOff size={32} />
            <span className="text-xs">Imagem do produto</span>
          </div>
        )}

        {/* Mercado Livre badge */}
        {marketplace && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-md bg-[#FFE600] px-2 py-1 text-xs font-semibold text-zinc-900 shadow-sm">
            <img
              src={mercadoLibreIcon}
              alt="Mercado Livre"
              className="size-3.5"
            />
            Mercado Livre
          </div>
        )}

        {/* Preview label */}
        <div className="absolute top-3 right-3 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white">
          Pré-visualização
        </div>
      </div>

      {/* Body */}
      <CardContent className="space-y-2 p-4">
        {/* Title */}
        <p
          className={cn(
            "line-clamp-2 min-h-[2.5rem] text-sm leading-snug font-medium transition-all duration-300",
            !hasContent && "text-muted-foreground italic"
          )}
        >
          {title || "Seu título aparecerá aqui"}
        </p>

        {/* Price */}
        <p className="text-2xl font-semibold text-foreground tabular-nums">
          {MOCK_PRICE}
        </p>

        {/* Frete grátis */}
        <p className="text-xs font-medium text-emerald-600">Frete grátis</p>

        {/* Description preview */}
        <p
          className={cn(
            "line-clamp-3 min-h-[3rem] text-xs leading-relaxed transition-all duration-300",
            hasContent
              ? "text-muted-foreground"
              : "text-muted-foreground/60 italic"
          )}
        >
          {description.trim() || "Sua descrição aparecerá aqui..."}
        </p>
      </CardContent>
    </Card>
  )
}
