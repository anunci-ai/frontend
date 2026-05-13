import { useState } from "react"
import { MoreHorizontalIcon, Trash2Icon } from "lucide-react"
import mercadoLibreIcon from "@/assets/mercado-libre.svg"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Listing = { id: string; description: string; createdAt: Date }

const PAGE_SIZE = 8
const now = Date.now()
const mins = (m: number) => new Date(now - m * 60_000)
const hrs = (h: number) => new Date(now - h * 3_600_000)
const days = (d: number) => new Date(now - d * 86_400_000)

const LISTINGS: Listing[] = [
  {
    id: "01",
    description: "Fone de Ouvido com Cancelamento de Ruído e 30h de Bateria",
    createdAt: mins(2),
  },
  {
    id: "02",
    description: 'Smart TV 55" 4K UHD com Wi-Fi e HDR',
    createdAt: mins(18),
  },
  {
    id: "03",
    description: "Notebook Gamer i7 16GB RAM RTX 4060",
    createdAt: hrs(1),
  },
  {
    id: "04",
    description: "Tênis Esportivo Masculino para Corrida",
    createdAt: hrs(4),
  },
  {
    id: "05",
    description: "Cafeteira Espresso Automática com Moedor",
    createdAt: hrs(9),
  },
  {
    id: "06",
    description: "Câmera DSLR Profissional 24MP com Lente 18-55mm",
    createdAt: days(1),
  },
  {
    id: "07",
    description: 'Mochila para Notebook 15.6" Anti-furto',
    createdAt: days(2),
  },
  {
    id: "08",
    description: "Cadeira Gamer Ergonômica Reclinável",
    createdAt: days(3),
  },
  {
    id: "09",
    description: "Liquidificador 1200W com Jarra de Vidro",
    createdAt: days(5),
  },
  {
    id: "10",
    description: "Mesa de Escritório em L com Gavetas",
    createdAt: days(7),
  },
  {
    id: "11",
    description: "Air Fryer 5L Digital com 8 Funções",
    createdAt: days(11),
  },
  {
    id: "12",
    description: "Robô Aspirador Inteligente com Mapeamento",
    createdAt: days(15),
  },
  {
    id: "13",
    description: "Geladeira Frost Free 400L Inverter",
    createdAt: days(22),
  },
  {
    id: "14",
    description: "Smartphone Android 128GB Câmera Tripla",
    createdAt: days(31),
  },
  {
    id: "15",
    description: "Console de Videogame com 2 Controles",
    createdAt: days(58),
  },
  {
    id: "16",
    description: "Bicicleta Aro 29 Mountain Bike 21 Marchas",
    createdAt: days(74),
  },
  {
    id: "17",
    description: "Patinete Elétrico Dobrável 350W",
    createdAt: days(95),
  },
  {
    id: "18",
    description: "Drone 4K com GPS e Estabilização",
    createdAt: days(120),
  },
  {
    id: "19",
    description: "Relógio Smartwatch com Monitor Cardíaco",
    createdAt: days(160),
  },
  {
    id: "20",
    description: "Caixa de Som Bluetooth à Prova d'Água",
    createdAt: days(190),
  },
  {
    id: "21",
    description: "Forno Microondas 32L Inox com Grill",
    createdAt: days(245),
  },
  {
    id: "22",
    description: "Impressora Multifuncional Wi-Fi Duplex",
    createdAt: days(370),
  },
]

const rtf = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" })

function relativeTime(date: Date): string {
  const diffSec = Math.round((date.getTime() - Date.now()) / 1000)
  const abs = Math.abs(diffSec)
  if (abs < 60) return rtf.format(diffSec, "second")
  if (abs < 3_600) return rtf.format(Math.round(diffSec / 60), "minute")
  if (abs < 86_400) return rtf.format(Math.round(diffSec / 3_600), "hour")
  if (abs < 2_592_000) return rtf.format(Math.round(diffSec / 86_400), "day")
  if (abs < 31_536_000)
    return rtf.format(Math.round(diffSec / 2_592_000), "month")
  return rtf.format(Math.round(diffSec / 31_536_000), "year")
}

export function ListingsTable() {
  const [page, setPage] = useState(1)
  const [confirmingId, setConfirmingId] = useState<string | null>(null)

  const totalPages = Math.ceil(LISTINGS.length / PAGE_SIZE)
  const start = (page - 1) * PAGE_SIZE
  const rows = LISTINGS.slice(start, start + PAGE_SIZE)
  const confirming = confirmingId
    ? LISTINGS.find((l) => l.id === confirmingId)
    : null

  return (
    <>
      <div className="flex flex-col gap-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16" />
              <TableHead>Descrição</TableHead>
              <TableHead className="w-44">Marketplace</TableHead>
              <TableHead className="w-44">Data de criação</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((l) => (
              <TableRow key={l.id}>
                <TableCell>
                  <div aria-hidden className="size-10 rounded-md bg-muted" />
                </TableCell>
                <TableCell className="font-medium">{l.description}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img src={mercadoLibreIcon} alt="" className="size-5" />
                    <span>Mercado Livre</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {relativeTime(l.createdAt)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label="Ações">
                        <MoreHorizontalIcon className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        variant="destructive"
                        onSelect={() => setConfirmingId(l.id)}
                      >
                        <Trash2Icon />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                aria-disabled={page === 1}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i + 1}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                aria-disabled={page === totalPages}
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <AlertDialog
        open={confirmingId !== null}
        onOpenChange={(open) => {
          if (!open) setConfirmingId(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir anúncio?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita.
              {confirming && (
                <>
                  {" "}
                  O anúncio{" "}
                  <span className="font-medium text-foreground">
                    &ldquo;{confirming.description}&rdquo;
                  </span>{" "}
                  será removido permanentemente.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => setConfirmingId(null)}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
