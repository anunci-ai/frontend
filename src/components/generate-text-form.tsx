import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
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
import { ArrowRight02Icon } from "@hugeicons/core-free-icons"
import mercadoLibreIcon from "@/assets/mercado-libre.svg"

export function GenerateTextForm() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Informações do produto</CardTitle>
        <CardDescription>
          Forneça os dados básicos sobre o produto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <Textarea placeholder="Ex: Garrafa Térmica Stanley 700ml" />
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Marketplace" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="MERCADO_LIVRE">
                  <img
                    src={mercadoLibreIcon}
                    alt="Mercado Libre"
                    className="w-6"
                  />{" "}
                  Mercado Livre
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button>
            Continuar <HugeiconsIcon icon={ArrowRight02Icon} />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
