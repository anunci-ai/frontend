import { useRef, useState, useEffect } from "react"
import { ArrowLeft, ImageUp, Loader2, Trash2, Wand2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { cn } from "@/lib/utils"

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_SIZE_MB = 10

interface UploadImageFormProps {
  imageUrl: string | null
  imageFile: File | null
  onChange: (patch: { imageUrl?: string | null; imageFile?: File | null }) => void
  onBack: () => void
  onGenerate: () => void
  isGenerating: boolean
}

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function UploadImageForm({
  imageUrl,
  imageFile,
  onChange,
  onBack,
  onGenerate,
  isGenerating,
}: UploadImageFormProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const currentUrlRef = useRef<string | null>(imageUrl)

  useEffect(() => {
    currentUrlRef.current = imageUrl
  }, [imageUrl])

  useEffect(() => {
    return () => {
      if (currentUrlRef.current) URL.revokeObjectURL(currentUrlRef.current)
    }
  }, [])

  function handleFile(file: File) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Formato não suportado. Use JPG, PNG ou WEBP.")
      return
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`Imagem muito grande. Máximo ${MAX_SIZE_MB}MB.`)
      return
    }
    if (currentUrlRef.current) URL.revokeObjectURL(currentUrlRef.current)
    const url = URL.createObjectURL(file)
    onChange({ imageUrl: url, imageFile: file })
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ""
  }

  function handleRemove() {
    if (imageUrl) URL.revokeObjectURL(imageUrl)
    onChange({ imageUrl: null, imageFile: null })
  }

  function openPicker() {
    inputRef.current?.click()
  }

  return (
    <Card className="w-full" aria-busy={isGenerating}>
      <CardHeader>
        <CardTitle>Foto do produto</CardTitle>
        <CardDescription>
          Envie uma imagem do seu produto. A IA irá gerar variantes otimizadas.
        </CardDescription>
      </CardHeader>

      <CardContent className={cn(isGenerating && "pointer-events-none opacity-60")}>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={handleInputChange}
        />

        {imageUrl ? (
          <div className="flex flex-col gap-3">
            <div className="overflow-hidden rounded-xl ring-1 ring-border">
              <img
                src={imageUrl}
                alt="Prévia do produto"
                className="mx-auto max-h-80 w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {imageFile?.name ?? "imagem.jpg"}
                </p>
                {imageFile && (
                  <p className="text-xs text-muted-foreground">
                    {formatBytes(imageFile.size)}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={openPicker}
                >
                  Trocar imagem
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={handleRemove}
                  aria-label="Remover imagem"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div
            role="button"
            tabIndex={0}
            data-dragging={isDragging}
            className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 text-center transition-colors hover:bg-muted/50 data-[dragging=true]:border-primary data-[dragging=true]:bg-primary/5"
            onClick={openPicker}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") openPicker()
            }}
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <div className="rounded-xl bg-muted p-4">
              <ImageUp size={32} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Arraste sua imagem aqui</p>
              <p className="text-sm text-muted-foreground">
                ou{" "}
                <span className="text-primary underline underline-offset-2">
                  clique para selecionar
                </span>
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              JPG, PNG ou WEBP até {MAX_SIZE_MB}MB
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isGenerating}
        >
          <ArrowLeft size={18} />
          Voltar
        </Button>
        <Button
          type="button"
          onClick={onGenerate}
          disabled={!imageUrl || isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              Gerar anúncio
              <Wand2 size={18} />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
