/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState } from "react"
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { AlertCircle, Loader2, RefreshCw } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { CreateFlowStepper } from "@/components/create-flow/create-flow-stepper"
import {
  UploadImageForm,
  type UploadPhase,
} from "@/components/upload-image-form"
import { ListingResult } from "@/components/listing-result"
import { ListingStatusBadge } from "@/components/listing-status-badge"
import {
  StepperContent,
  StepperPanel,
} from "@/components/reui/stepper"
import { generateText } from "@/http/generate-text"
import { generateImages } from "@/http/generate-images"
import { getGeneratedImages } from "@/http/get-generated-images"
import { useListingStatus, isProcessing } from "@/hooks/use-listing-status"
import { uploadImageWithProgress } from "@/http/upload-image-with-progress"
import { Button } from "@/components/ui/button"
import type { ListingStatus } from "@/http/get-listing"

export const Route = createFileRoute("/_app/create/$listingId")({
  component: CreateListingFlow,
})

type View =
  | "loading"
  | "text-generating"
  | "image-upload"
  | "image-uploading"
  | "image-generating"
  | "result"
  | "error"

function deriveView(
  isLoading: boolean,
  status: ListingStatus | undefined,
  uploadPhase: UploadPhase,
  hasTimedOut: boolean
): View {
  if (isLoading) return "loading"
  if (!status) return "error"
  if (status === "FAILED" || hasTimedOut) return "error"
  if (status === "COMPLETED" || status === "IMAGE_COMPLETED") return "result"
  if (status === "IMAGE_PROCESSING") return "image-generating"
  if (uploadPhase === "generating-images") return "image-generating"
  if (uploadPhase === "uploading") return "image-uploading"
  if (uploadPhase === "error") return "image-upload"
  if (status === "TEXT_COMPLETED") return "image-upload"
  return "text-generating"
}

function CreateListingFlow() {
  const { listingId } = Route.useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { listing, isLoading, hasTimedOut, resetTimeout } =
    useListingStatus(listingId)

  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploadPhase, setUploadPhase] = useState<UploadPhase>("idle")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadErrorMsg, setUploadErrorMsg] = useState<string | undefined>()
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)

  const view = deriveView(isLoading, listing?.status, uploadPhase, hasTimedOut)

  const activeStep =
    view === "image-generating" || view === "result" || view === "error" ? 3 : 2

  const step2Completed =
    listing?.status === "IMAGE_PROCESSING" ||
    listing?.status === "IMAGE_COMPLETED" ||
    listing?.status === "COMPLETED" ||
    view === "image-generating"

  const step3Completed =
    listing?.status === "IMAGE_COMPLETED" || listing?.status === "COMPLETED"

  useEffect(() => {
    if (listing === null && !isLoading) {
      toast.error("Anúncio não encontrado.")
      navigate({ to: "/create" })
    }
  }, [listing, isLoading, navigate])

  const { mutate: mutateText, isPending: isTextPending } = useMutation({
    mutationFn: generateText,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listing", listingId] })
    },
    onError: () => {
      toast.error("Erro ao gerar texto. Tente novamente.")
    },
  })

  const hasTriggeredTextRef = useRef(false)

  useEffect(() => {
    if (
      !listing ||
      listing.status !== "DRAFT" ||
      hasTriggeredTextRef.current ||
      isTextPending
    )
      return
    hasTriggeredTextRef.current = true
    mutateText(listingId)
  }, [listing?.status, listingId, mutateText, isTextPending])

  const generateImagesMutation = useMutation({
    mutationFn: generateImages,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listing", listingId] })
    },
    onError: () => {
      setUploadPhase("error")
      setUploadErrorMsg("Não foi possível iniciar a geração de imagens.")
      toast.error("Erro ao gerar imagens.")
    },
  })

  const uploadAbortRef = useRef<AbortController | null>(null)

  async function handleGenerate() {
    if (!imageFile) return
    resetTimeout()

    uploadAbortRef.current?.abort()
    const controller = new AbortController()
    uploadAbortRef.current = controller

    setUploadPhase("uploading")
    setUploadProgress(0)
    setUploadErrorMsg(undefined)

    try {
      const { url } = await uploadImageWithProgress({
        listingId,
        file: imageFile,
        onProgress: setUploadProgress,
        signal: controller.signal,
      })

      setUploadedImageUrl(url)
      setUploadPhase("generating-images")
      generateImagesMutation.mutate(listingId)
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return
      setUploadPhase("error")
      setUploadErrorMsg("Não foi possível enviar a imagem. Tente novamente.")
      toast.error("Erro no upload da imagem.")
    }
  }

  const { data: imagesData } = useQuery({
    queryKey: ["generated-images", listingId],
    queryFn: () => getGeneratedImages({ listingId }),
    enabled:
      listing?.status === "IMAGE_COMPLETED" || listing?.status === "COMPLETED",
  })

  const generatedImages = imagesData?.images ?? []

  function handleRetryTextGen() {
    resetTimeout()
    hasTriggeredTextRef.current = false
    generateImagesMutation.reset()
    queryClient.invalidateQueries({ queryKey: ["listing", listingId] })
  }

  if (view === "loading") {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader2 size={32} className="animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full flex-col gap-8">
      <PageHeader
        title="Criar novo anúncio"
        subtitle="Em poucos passos, nossa IA gera um anúncio completo e otimizado."
        right={
          listing?.status && <ListingStatusBadge status={listing.status} />
        }
      />

      <CreateFlowStepper
        value={activeStep}
        completedFor={(step) => {
          if (step === 1) return true
          if (step === 2) return step2Completed
          return step3Completed
        }}
        disabledFor={(step) => {
          if (step === 3) return view !== "result" && view !== "error"
          return false
        }}
      >
        <StepperPanel>
          <StepperContent value={2}>
            <div className="animate-in duration-300 fade-in">
              {view === "text-generating" ? (
                <TextGeneratingPanel
                  hasTimedOut={hasTimedOut}
                  isPolling={isProcessing(listing?.status) && !hasTimedOut}
                  onRetry={handleRetryTextGen}
                />
              ) : (
                <UploadImageForm
                  imageUrl={imageUrl}
                  imageFile={imageFile}
                  onChange={(patch) => {
                    if ("imageUrl" in patch)
                      setImageUrl(patch.imageUrl ?? null)
                    if ("imageFile" in patch)
                      setImageFile(patch.imageFile ?? null)
                  }}
                  onBack={() =>
                    navigate({
                      to: "/listings",
                      search: { page: 1 },
                    })
                  }
                  onGenerate={handleGenerate}
                  phase={uploadPhase}
                  uploadProgress={uploadProgress}
                  errorMessage={uploadErrorMsg}
                />
              )}
            </div>
          </StepperContent>

          <StepperContent value={3}>
            <div className="animate-in duration-300 fade-in">
              {view === "error" ? (
                <ErrorPanel
                  hasTimedOut={hasTimedOut}
                  status={listing?.status}
                  onRetryText={handleRetryTextGen}
                  onRetryImages={handleGenerate}
                />
              ) : view === "image-generating" ? (
                <ImageGeneratingPanel
                  hasTimedOut={hasTimedOut}
                  onRetry={handleGenerate}
                />
              ) : listing ? (
                <ListingResult
                  listing={listing}
                  generatedImages={generatedImages}
                  originalImageUrl={
                    uploadedImageUrl ?? listing.originalImageUrl
                  }
                  onReset={() => navigate({ to: "/create" })}
                />
              ) : null}
            </div>
          </StepperContent>
        </StepperPanel>
      </CreateFlowStepper>
    </div>
  )
}

interface TextGeneratingPanelProps {
  hasTimedOut: boolean
  isPolling: boolean
  onRetry: () => void
}

function TextGeneratingPanel({
  hasTimedOut,
  isPolling,
  onRetry,
}: TextGeneratingPanelProps) {
  if (hasTimedOut) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-destructive/30 bg-destructive/5 p-10 text-center">
        <AlertCircle size={40} className="text-destructive" />
        <div>
          <p className="font-semibold text-foreground">
            Demorou mais do que o esperado
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            A geração de texto está demorando mais do que o normal. Tente
            novamente.
          </p>
        </div>
        <Button variant="outline" onClick={onRetry}>
          <RefreshCw size={16} />
          Tentar novamente
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border bg-muted/30 p-10 text-center">
      <Loader2 size={40} className="animate-spin text-primary" />
      <div>
        <p className="font-semibold text-foreground">
          Gerando o texto do anúncio…
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {isPolling
            ? "Nossa IA está criando um título, descrição e tags otimizados para SEO."
            : "Iniciando…"}
        </p>
      </div>
    </div>
  )
}

interface ImageGeneratingPanelProps {
  hasTimedOut: boolean
  onRetry: () => void
}

function ImageGeneratingPanel({
  hasTimedOut,
  onRetry,
}: ImageGeneratingPanelProps) {
  if (hasTimedOut) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-destructive/30 bg-destructive/5 p-10 text-center">
        <AlertCircle size={40} className="text-destructive" />
        <div>
          <p className="font-semibold text-foreground">
            Demorou mais do que o esperado
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            A geração de imagens está demorando mais do que o normal. Tente
            novamente.
          </p>
        </div>
        <Button variant="outline" onClick={onRetry}>
          <RefreshCw size={16} />
          Tentar novamente
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border bg-muted/30 p-10 text-center">
      <Loader2 size={40} className="animate-spin text-primary" />
      <div>
        <p className="font-semibold text-foreground">
          Gerando variantes de imagem…
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Nossa IA está criando variantes otimizadas da sua foto de produto.
        </p>
      </div>
    </div>
  )
}

interface ErrorPanelProps {
  hasTimedOut: boolean
  status?: ListingStatus
  onRetryText: () => void
  onRetryImages: () => void
}

function ErrorPanel({
  hasTimedOut,
  status,
  onRetryText,
  onRetryImages,
}: ErrorPanelProps) {
  const wasImagePhase =
    status === "IMAGE_PROCESSING" ||
    status === "IMAGE_COMPLETED" ||
    status === "COMPLETED"

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-destructive/30 bg-destructive/5 p-10 text-center">
      <AlertCircle size={40} className="text-destructive" />
      <div>
        <p className="font-semibold text-foreground">
          {hasTimedOut ? "Tempo esgotado" : "Algo deu errado"}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {hasTimedOut
            ? "A operação demorou mais do que o esperado."
            : "Ocorreu um erro durante a geração do anúncio."}
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={wasImagePhase ? onRetryImages : onRetryText}
        >
          <RefreshCw size={16} />
          Tentar novamente
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/listings" search={{ page: 1 }}>
            Ver meus anúncios
          </Link>
        </Button>
      </div>
    </div>
  )
}
