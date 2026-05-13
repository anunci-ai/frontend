import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Textarea } from "./ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "./ui/label"
import mercadoLibreIcon from "@/assets/mercado-libre.svg"

interface GenerateTextFormProps {
  description: string
  marketplace: string
  onChange: (patch: { description?: string; marketplace?: string }) => void
  onNext: () => void
}

const MIN_CHARS = 20

export function GenerateTextForm({
  description,
  marketplace,
  onChange,
  onNext,
}: GenerateTextFormProps) {
  const isValid = description.trim().length >= MIN_CHARS && marketplace !== ""

  return (
    <div className="flex w-full flex-col gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Informações do produto</CardTitle>
          <CardDescription>
            Conte para a IA sobre o produto que você quer anunciar.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="step1-form"
            onSubmit={(e) => {
              e.preventDefault()
              if (isValid) onNext()
            }}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Descrição do produto</Label>
              <Textarea
                id="description"
                placeholder="Ex: Garrafa térmica Stanley 700ml, mantém líquidos quentes por 12h, aço inox, cor preta, perfeita para atividades ao ar livre..."
                rows={5}
                value={description}
                onChange={(e) => onChange({ description: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                {description.trim().length} / {MIN_CHARS}+ caracteres
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="marketplace">Marketplace</Label>
              <Select
                value={marketplace}
                onValueChange={(val) => onChange({ marketplace: val })}
              >
                <SelectTrigger id="marketplace" className="w-full">
                  <SelectValue placeholder="Selecione um marketplace" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="MERCADO_LIVRE">
                      <span className="flex items-center gap-2">
                        <img
                          src={mercadoLibreIcon}
                          alt="Mercado Livre"
                          className="size-5"
                        />
                        Mercado Livre
                      </span>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            form="step1-form"
            disabled={!isValid}
            className="w-full sm:w-auto"
          >
            Continuar
            <ArrowRight size={18} />
          </Button>
        </CardFooter>
      </Card>

      <div className="flex items-start gap-3 rounded-xl border border-dashed bg-muted/50 p-4">
        <Sparkles size={16} className="mt-0.5 shrink-0 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Dica:</span> descreva
          tamanho, cor, material e diferenciais — quanto mais detalhes, melhor o
          anúncio gerado pela IA.
        </p>
      </div>
    </div>
  )
}
