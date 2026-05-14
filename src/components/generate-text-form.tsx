import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowRight, LoaderCircleIcon, Sparkles } from "lucide-react"
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
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field"
import mercadoLibreIcon from "@/assets/mercado-libre.svg"

const schema = z.object({
  description: z
    .string()
    .trim()
    .min(20, "Descreva o produto com pelo menos 20 caracteres."),
  marketplace: z.string().min(1, "Selecione um marketplace."),
})

type Schema = z.infer<typeof schema>

interface GenerateTextFormProps {
  defaultValues?: { description: string; marketplace: string }
  isPending: boolean
  onSubmit: (values: { description: string; marketplace: string }) => void
}

export function GenerateTextForm({
  defaultValues,
  isPending,
  onSubmit,
}: GenerateTextFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: defaultValues?.description ?? "",
      marketplace: defaultValues?.marketplace ?? "MERCADO_LIVRE",
    },
  })

  const description = watch("description")

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
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="description">
                  Descrição do produto
                </FieldLabel>
                <Textarea
                  id="description"
                  placeholder="Ex: Garrafa térmica Stanley 700ml, mantém líquidos quentes por 12h, aço inox, cor preta, perfeita para atividades ao ar livre..."
                  rows={5}
                  {...register("description")}
                />
                <p className="text-xs text-muted-foreground">
                  {description.trim().length} / 20+ caracteres
                </p>
                <FieldError errors={[errors.description]} />
              </Field>

              <Field>
                <FieldLabel htmlFor="marketplace">Marketplace</FieldLabel>
                <Controller
                  name="marketplace"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
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
                  )}
                />
                <FieldError errors={[errors.marketplace]} />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            form="step1-form"
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            {isPending ? (
              <>
                <LoaderCircleIcon size={18} className="animate-spin" />
                Criando…
              </>
            ) : (
              <>
                Continuar
                <ArrowRight size={18} />
              </>
            )}
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
