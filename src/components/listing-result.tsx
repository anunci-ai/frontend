import { useState } from "react"
import {
  CheckCircle2,
  Copy,
  Download,
  Eye,
  ImageOff,
  Sparkles,
  Tag,
} from "lucide-react"
import { toast } from "sonner"
import { Link } from "@tanstack/react-router"
import { Button } from "./ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Separator } from "./ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { cn } from "@/lib/utils"

const mockResult = {
  title:
    "Garrafa Térmica Stanley 700ml Inox — Mantém Quente por 24h e Fria por 28h",
  category: "Casa, Móveis e Decoração > Cozinha > Garrafas Térmicas",
  price: 289.9,
  description:
    "A garrafa térmica Stanley 700ml é feita em aço inox 18/8 de grau alimentar, garantindo durabilidade e segurança para uso diário. Com tampa hermética antivazamento, você leva sua bebida favorita a qualquer lugar sem preocupações. Ideal para trilhas, acampamentos, viagens ou o dia a dia no escritório, essa garrafa mantém líquidos quentes por até 24h e frios por até 28h.",
  features: [
    "Tampa hermética 100% antivazamento",
    "Aço inox 18/8 de grau alimentar, sem BPA",
    "Mantém quente por 24h e frio por 28h",
    "Resistente a impactos e quedas",
    "Inclui alça ergonômica e copo dosador",
    "Capacidade: 700ml — ideal para uso diário",
  ],
}

const variants = [
  { label: "Variante 1", filter: "" },
  { label: "Variante 2", filter: "saturate-150 brightness-105" },
  { label: "Variante 3", filter: "contrast-110 hue-rotate-15 brightness-95" },
]

function copyText(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => toast.success("Copiado para a área de transferência"))
    .catch(() => toast.error("Não foi possível copiar"))
}

function downloadImage(url: string, label: string) {
  const a = document.createElement("a")
  a.href = url
  a.download = `anuncio-${label.toLowerCase().replace(" ", "-")}.jpg`
  a.click()
  toast.success("Download iniciado")
}

interface ImageCellProps {
  imageUrl: string | null
  variant: (typeof variants)[number]
  onPreview: () => void
}

function ImageCell({ imageUrl, variant, onPreview }: ImageCellProps) {
  return (
    <div className="group relative aspect-square overflow-hidden rounded-xl bg-muted ring-1 ring-border">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={variant.label}
          className={cn("size-full object-cover", variant.filter)}
        />
      ) : (
        <div className="flex size-full flex-col items-center justify-center gap-2 text-muted-foreground">
          <ImageOff size={32} />
          <span className="text-xs">{variant.label}</span>
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          type="button"
          size="icon"
          variant="secondary"
          className="size-9"
          aria-label="Visualizar imagem"
          onClick={onPreview}
        >
          <Eye size={16} />
        </Button>
        {imageUrl && (
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="size-9"
            aria-label="Baixar imagem"
            onClick={() => downloadImage(imageUrl, variant.label)}
          >
            <Download size={16} />
          </Button>
        )}
      </div>

      <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-0.5 text-xs text-white">
        {variant.label}
      </span>
    </div>
  )
}

interface ListingResultProps {
  imageUrl: string | null
  onReset: () => void
}

export function ListingResult({ imageUrl, onReset }: ListingResultProps) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewVariant, setPreviewVariant] = useState(0)

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(mockResult.price)

  const fullText = [
    `Título: ${mockResult.title}`,
    `Categoria: ${mockResult.category}`,
    `Preço sugerido: ${formattedPrice}`,
    `\nDescrição:\n${mockResult.description}`,
    `\nDiferenciais:\n${mockResult.features.map((f) => `• ${f}`).join("\n")}`,
  ].join("\n")

  return (
    <div className="flex w-full flex-col gap-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="gradient-bg flex size-14 items-center justify-center rounded-full">
          <Sparkles size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Seu anúncio está pronto!
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Confira o conteúdo otimizado para SEO e baixe as imagens geradas
            pela IA.
          </p>
        </div>
      </div>

      {/* Two-column layout on large screens */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Images section */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Imagens geradas</CardTitle>
            <CardDescription>
              3 variantes prontas para usar no Mercado Livre
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {variants.map((variant, i) => (
                <ImageCell
                  key={variant.label}
                  imageUrl={imageUrl}
                  variant={variant}
                  onPreview={() => {
                    setPreviewVariant(i)
                    setPreviewOpen(true)
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Listing content card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Conteúdo do anúncio</CardTitle>
            <CardDescription>
              Copie e cole diretamente no marketplace
            </CardDescription>
            <CardAction>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => copyText(fullText)}
              >
                <Copy size={16} />
                Copiar tudo
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Título
              </span>
              <div className="flex items-start justify-between gap-2">
                <p className="text-base font-semibold leading-snug">
                  {mockResult.title}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8 shrink-0"
                  aria-label="Copiar título"
                  onClick={() => copyText(mockResult.title)}
                >
                  <Copy size={15} />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Category + Price */}
            <div className="flex flex-wrap items-start gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Categoria
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-accent px-2 py-1 text-xs text-accent-foreground">
                  <Tag size={12} className="text-primary" />
                  {mockResult.category}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Preço sugerido
                </span>
                <p className="text-2xl font-bold text-foreground">
                  {formattedPrice}
                </p>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Descrição
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  aria-label="Copiar descrição"
                  onClick={() => copyText(mockResult.description)}
                >
                  <Copy size={15} />
                </Button>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {mockResult.description}
              </p>
            </div>

            <Separator />

            {/* Features */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Diferenciais
              </span>
              <ul className="flex flex-col gap-2">
                {mockResult.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer actions */}
      <div className="flex flex-col-reverse items-center justify-end gap-2 sm:flex-row">
        <Button type="button" variant="ghost" asChild>
          <Link to="/">Voltar ao painel</Link>
        </Button>
        <Button type="button" variant="outline" onClick={onReset}>
          Criar outro anúncio
        </Button>
      </div>

      {/* Image preview dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{variants[previewVariant].label}</DialogTitle>
          </DialogHeader>
          {imageUrl && (
            <img
              src={imageUrl}
              alt={variants[previewVariant].label}
              className={cn(
                "mx-auto max-h-[70vh] w-auto rounded-xl object-contain",
                variants[previewVariant].filter
              )}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
