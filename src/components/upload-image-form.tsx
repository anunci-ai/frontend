import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { MagicWand05Icon } from "@hugeicons/core-free-icons"
import { UploadIcon } from "lucide-react"

export function UploadImageForm() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Envie uma foto do seu produto</CardTitle>
        <CardDescription>
          Forneça os dados básicos sobre o produto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <div className="flex h-32 w-full flex-col items-center justify-center gap-3 rounded-md border border-dashed border-zinc-300 p-6 text-center dark:border-zinc-700">
            <UploadIcon />
            <p className="text-xs text-muted-foreground">
              Arraste a foto aqui ou <br />
              <span className="underline">clique aqui para selecioná-la</span>
            </p>
          </div>
          <span className="mt-4 block text-xs text-muted-foreground">
            Apenas JPG, PNG e WEBP são suportados.
          </span>
          <Button>
            Gerar anúncio
            <HugeiconsIcon icon={MagicWand05Icon} />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
