import { Download, Eye, ImageOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { downloadImage } from "@/lib/listing-actions"

interface ImageCellProps {
  url: string | null
  label: string
  downloadFilename: string
  onPreview: () => void
}

export function ImageCell({
  url,
  label,
  downloadFilename,
  onPreview,
}: ImageCellProps) {
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
            onClick={() => downloadImage(url, downloadFilename)}
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
