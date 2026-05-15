import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Copy, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { ImageCell } from "@/components/image-cell"
import { ListingStatusBadge } from "@/components/listing-status-badge"
import { getListing } from "@/http/get-listing"
import { getGeneratedImages } from "@/http/get-generated-images"
import { copyText } from "@/lib/listing-actions"
import { dayjs } from "@/lib/dayjs"
import mercadoLibreIcon from "@/assets/mercado-libre.svg"

interface ListingDetailDialogProps {
  listingId: string | null
  onOpenChange: (open: boolean) => void
}

export function ListingDetailDialog({
  listingId,
  onOpenChange,
}: ListingDetailDialogProps) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewIndex, setPreviewIndex] = useState(0)
  const [previewIsOriginal, setPreviewIsOriginal] = useState(false)

  const { data: listingData, isLoading } = useQuery({
    queryKey: ["listing", listingId],
    queryFn: () => getListing(listingId!),
    enabled: !!listingId,
  })

  const listing = listingData?.listing ?? null

  const hasImages =
    listing?.status === "IMAGE_COMPLETED" || listing?.status === "COMPLETED"

  const { data: imagesData } = useQuery({
    queryKey: ["generated-images", listingId],
    queryFn: () => getGeneratedImages({ listingId: listingId! }),
    enabled: !!listingId && hasImages,
  })

  const generatedImages = imagesData?.images ?? []

  const fullText = listing
    ? [
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
    : ""

  const previewUrl = previewIsOriginal
    ? listing?.originalImageUrl ?? null
    : (generatedImages[previewIndex]?.url ?? null)

  const previewLabel = previewIsOriginal
    ? "Imagem original"
    : `Variante ${previewIndex + 1}`

  return (
    <>
      <Dialog open={listingId !== null} onOpenChange={onOpenChange}>
        <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl">
          <DialogHeader className="shrink-0 border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <DialogTitle>Detalhes do anúncio</DialogTitle>
              {listing && <ListingStatusBadge status={listing.status} />}
            </div>
            {listing && (
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="max-w-xs truncate">{listing.inputDescription}</span>
                <span>·</span>
                {listing.marketplace === "MERCADO_LIVRE" ? (
                  <span className="flex items-center gap-1">
                    <img src={mercadoLibreIcon} alt="" className="size-3.5" />
                    Mercado Livre
                  </span>
                ) : (
                  <span>{listing.marketplace}</span>
                )}
                <span>·</span>
                <span>{dayjs(listing.createdAt).fromNow()}</span>
              </div>
            )}
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 py-5">
            {isLoading ? (
              <div className="flex h-40 items-center justify-center">
                <Loader2 size={28} className="animate-spin text-muted-foreground" />
              </div>
            ) : !listing ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Anúncio não encontrado.
              </p>
            ) : (
              <div className="flex flex-col gap-5">
                {/* Original image */}
                <Card>
                  <CardHeader>
                    <CardTitle>Imagem original</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {listing.originalImageUrl ? (
                      <div className="max-w-xs">
                        <ImageCell
                          url={listing.originalImageUrl}
                          label="Original"
                          downloadFilename={`imagem-original-${listing.id}.jpg`}
                          onPreview={() => {
                            setPreviewIsOriginal(true)
                            setPreviewOpen(true)
                          }}
                        />
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Nenhuma imagem enviada.
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Generated variants */}
                <Card>
                  <CardHeader>
                    <CardTitle>Variantes geradas</CardTitle>
                    <CardDescription>
                      {generatedImages.length > 0
                        ? `${generatedImages.length} variante${generatedImages.length > 1 ? "s" : ""} prontas para usar`
                        : listing.status === "IMAGE_PROCESSING"
                          ? "Em geração…"
                          : "Nenhuma variante gerada"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {listing.status === "IMAGE_PROCESSING" &&
                    generatedImages.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        As imagens estão sendo geradas. Volte em instantes.
                      </p>
                    ) : generatedImages.length > 0 ? (
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {generatedImages.map((img, i) => (
                          <ImageCell
                            key={img.id}
                            url={img.url}
                            label={`Variante ${i + 1}`}
                            downloadFilename={`anuncio-variante-${i + 1}.jpg`}
                            onPreview={() => {
                              setPreviewIsOriginal(false)
                              setPreviewIndex(i)
                              setPreviewOpen(true)
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Nenhuma variante gerada.
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Text content */}
                {!listing.generatedTitle &&
                !listing.generatedDescription &&
                !listing.generatedMetaDescription &&
                listing.generatedTags.length === 0 &&
                !listing.generatedSlug ? (
                  <Card>
                    <CardContent className="py-8 text-center text-sm text-muted-foreground">
                      Texto ainda não gerado.
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
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
                                onClick={() =>
                                  copyText(listing.generatedTitle!)
                                }
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
                                onClick={() =>
                                  copyText(listing.generatedDescription!)
                                }
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
                                <button
                                  key={tag}
                                  type="button"
                                  onClick={() => copyText(tag)}
                                  className="inline-flex cursor-pointer items-center gap-1 rounded-md bg-accent px-2 py-0.5 text-xs text-accent-foreground transition-colors hover:bg-accent/70"
                                  aria-label={`Copiar tag ${tag}`}
                                >
                                  <Copy size={10} />
                                  {tag}
                                </button>
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
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Image preview dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{previewLabel}</DialogTitle>
          </DialogHeader>
          {previewUrl && (
            <img
              src={previewUrl}
              alt={previewLabel}
              className="mx-auto max-h-[70vh] w-auto rounded-xl object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
