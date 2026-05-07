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
                <SelectItem value="light">Mercado Livre</SelectItem>
                <SelectItem value="dark">Shoppee</SelectItem>
                <SelectItem value="system">Amazon</SelectItem>
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
