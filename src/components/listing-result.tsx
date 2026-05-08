import { SparklesIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Button } from "./ui/button"
import { CopyIcon } from "lucide-react"

export function ListingResult() {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <div className="gradient-bg flex size-12 items-center justify-center rounded-full">
        <HugeiconsIcon icon={SparklesIcon} className="text-white" />
      </div>

      <h3 className="text-lg font-semibold text-foreground">
        Anúncio gerado com sucesso!
      </h3>
      <p className="text-muted-foreground">
        Confira abaixo o conteúdo otimizado para SEO do seu anúncio.
      </p>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="seo-title">Título SEO</TabsTrigger>
          <TabsTrigger value="description">Descrição</TabsTrigger>
          <TabsTrigger value="keywords">Palavras-chave</TabsTrigger>
        </TabsList>
        <TabsContent value="seo-title">
          <Card>
            <CardHeader>
              <CardTitle>
                Fone de Ouvido com Cancelamento de ruído e 30h de Bateria
              </CardTitle>
              <CardDescription className="text-xs font-medium text-green-500">
                SEO Score: 98/10
              </CardDescription>
              <CardAction>
                <Button variant="ghost" size="icon">
                  <CopyIcon />
                </Button>
              </CardAction>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="description">
          Change your password here.
        </TabsContent>
        <TabsContent value="keywords">Change your password here.</TabsContent>
      </Tabs>
    </div>
  )
}
