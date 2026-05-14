import { useState } from "react"
import {
  CheckCircle2,
  Copy,
  Download,
  Eye,
  ImageOff,
  Sparkles,
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
import type { ListingFormat } from "@/http/get-listing"

function copyText(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => toast.success("Copiado para a área de transferência"))
    .catch(() => toast.error("Não foi possível copiar"))
}

function downloadImage(url: string, index: number) {
  const a = document.createElement("a")
  a.href = url
  a.download = `anuncio-variante-${index + 1}.jpg`
  a.click()
  toast.success("Download iniciado")
}

interface ImageCellProps {
  url: string | null
  label: string
  onPreview: () => void
}

function ImageCell({ url, label, onPreview }: ImageCellProps) {
  return (
    <div className="group relative aspect-square overflow-hidden rounded-xl bg-muted ring-1 ring-border">
      {url ? (
        <img src={url} alt={label} className="size-full object-cover" />
      ) : (
        <div className="flex size-full flex-col items-center justify-center gap-2 text-muted-foreground">
          <div className="h-5 w-24 animate-pulse rounded bg-muted-foreground/20" />
          <ImageOff size={24} />
        </div>
      )}

      {url && (
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
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="size-9"
            aria-label="Baixar imagem"
            onClick={() => downloadImage(url, 0)}
          >
            <Download size={16} />
          </Button>
        </div>
      )}

      <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-0.5 text-xs text-white">
        {label}
      </span>
    </div>
  )
}

interface ListingResultProps {
  listing: Pick<
    ListingFormat,
    | "generatedTitle"
    | "generatedDescription"
    | "generatedMetaDescription"
    | "generatedTags"
    | "generatedSlug"
    | "marketplace"
  >
  generatedImages: { id: string; url: string }[]
  originalImageUrl?: string | null
  onReset: () => void
}

export function ListingResult({
  listing,
  generatedImages,
  originalImageUrl,
  onReset,
}: ListingResultProps) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewIndex, setPreviewIndex] = useState(0)

  const displayImages =
    generatedImages.length > 0
      ? generatedImages
      : originalImageUrl
        ? [{ id: "original", url: originalImageUrl }]
        : []

  const imageSlots = displayImages.length > 0 ? displayImages : [{}, {}, {}]

  const fullText = [
    listing.generatedTitle && `Título: ${listing.generatedTitle}`,
    listing.generatedDescription &&
      `\nDescrição:\n${listing.generatedDescription}`,
    listing.generatedMetaDescription &&
      `\nMeta descrição:\n${listing.generatedMetaDescription}`,
    listing.generatedTags.length > 0 &&
      `\nTags: ${listing.generatedTags.join(", ")}`,
    listing.generatedSlug && `\nSlug: ${listing.generatedSlug}`,
  ]
    .filter(Boolean)
    .join("\n")

  return (
    <div className="flex w-full flex-col gap-6 animate-in fade-in duration-300">
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

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Imagens geradas</CardTitle>
            <CardDescription>
              {generatedImages.length > 0
                ? `${generatedImages.length} variante${generatedImages.length > 1 ? "s" : ""} prontas para usar`
                : "Aguardando geração…"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {imageSlots.map((img, i) => {
                const item = img as { id?: string; url?: string }
                return (
                  <ImageCell
                    key={item.id ?? i}
                    url={item.url ?? null}
                    label={`Variante ${i + 1}`}
                    onPreview={() => {
                      setPreviewIndex(i)
                      setPreviewOpen(true)
                    }}
                  />
                )
              })}
            </div>
          </CardContent>
        </Card>

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
            {listing.generatedTitle && (
              <>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Título
                  </span>
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-base font-semibold leading-snug">
                      {listing.generatedTitle}
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-8 shrink-0"
                      aria-label="Copiar título"
                      onClick={() => copyText(listing.generatedTitle!)}
                    >
                      <Copy size={15} />
                    </Button>
                  </div>
                </div>
                <Separator />
              </>
            )}

            {listing.generatedDescription && (
              <>
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
                      onClick={() => copyText(listing.generatedDescription!)}
                    >
                      <Copy size={15} />
                    </Button>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {listing.generatedDescription}
                  </p>
                </div>
                <Separator />
              </>
            )}

            {listing.generatedMetaDescription && (
              <>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Meta descrição
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      aria-label="Copiar meta descrição"
                      onClick={() =>
                        copyText(listing.generatedMetaDescription!)
                      }
                    >
                      <Copy size={15} />
                    </Button>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {listing.generatedMetaDescription}
                  </p>
                </div>
                <Separator />
              </>
            )}

            {listing.generatedTags.length > 0 && (
              <>
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Tags
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {listing.generatedTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-0.5 text-xs text-accent-foreground"
                      >
                        <CheckCircle2 size={10} className="text-primary" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {listing.generatedSlug && <Separator />}
              </>
            )}

            {listing.generatedSlug && (
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Slug
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    aria-label="Copiar slug"
                    onClick={() => copyText(listing.generatedSlug!)}
                  >
                    <Copy size={15} />
                  </Button>
                </div>
                <p className="font-mono text-sm text-muted-foreground">
                  {listing.generatedSlug}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col-reverse items-center justify-end gap-2 sm:flex-row">
        <Button type="button" variant="ghost" asChild>
          <Link to="/">Voltar ao painel</Link>
        </Button>
        <Button type="button" variant="outline" onClick={onReset}>
          Criar outro anúncio
        </Button>
      </div>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Variante {previewIndex + 1}</DialogTitle>
          </DialogHeader>
          {displayImages[previewIndex]?.url && (
            <img
              src={displayImages[previewIndex].url}
              alt={`Variante ${previewIndex + 1}`}
              className={cn(
                "mx-auto max-h-[70vh] w-auto rounded-xl object-contain"
              )}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
