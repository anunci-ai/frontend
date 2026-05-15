import { useState } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { MoreHorizontalIcon, Trash2Icon } from "lucide-react"
import mercadoLibreIcon from "@/assets/mercado-libre.svg"
import { dayjs } from "@/lib/dayjs"
import { DeleteListingDialog } from "@/components/delete-listing-dialog"
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
import { fetchRecentListings } from "@/http/fetch-recent-listings"

const SKELETON_COUNT = 8

export function ListingsTable() {
  const { page } = useSearch({ from: "/_app/listings/" })
  const navigate = useNavigate()
  const [confirmingId, setConfirmingId] = useState<string | null>(null)

  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ["listings", { page }],
    queryFn: () => fetchRecentListings({ page }),
    placeholderData: keepPreviousData,
  })

  const rows = data?.listings ?? []
  const hasNextPage = rows.length === 20
  const confirming = confirmingId
    ? rows.find((l) => l.id === confirmingId)
    : null

  function goToPage(next: number) {
    navigate({ to: "/listings", search: { page: next } })
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16" />
              <TableHead>Descrição</TableHead>
              <TableHead className="hidden w-44 md:table-cell">
                Marketplace
              </TableHead>
              <TableHead className="hidden w-44 md:table-cell">
                Data de criação
              </TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="h-5 animate-pulse rounded-md bg-muted" />
                  </TableCell>
                  <TableCell>
                    <div className="h-5 animate-pulse rounded-md bg-muted" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="h-5 animate-pulse rounded-md bg-muted" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="h-5 animate-pulse rounded-md bg-muted" />
                  </TableCell>
                  <TableCell>
                    <div className="h-5 animate-pulse rounded-md bg-muted" />
                  </TableCell>
                </TableRow>
              ))
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-12 text-center text-sm text-muted-foreground"
                >
                  {page > 1 ? (
                    <div className="flex flex-col items-center gap-3">
                      <span>Sem mais anúncios.</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => goToPage(1)}
                      >
                        Voltar para a primeira página
                      </Button>
                    </div>
                  ) : (
                    "Você ainda não criou nenhum anúncio."
                  )}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((l) => (
                <TableRow key={l.id}>
                  <TableCell>
                    {l.originalImageUrl ? (
                      <img
                        src={l.originalImageUrl}
                        alt=""
                        className="size-10 rounded-md object-cover"
                      />
                    ) : (
                      <div
                        aria-hidden
                        className="size-10 rounded-md bg-muted"
                      />
                    )}
                  </TableCell>
                  <TableCell className="max-w-0 font-medium md:max-w-xs">
                    <span className="block truncate">{l.inputDescription}</span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {l.marketplace === "MERCADO_LIVRE" ? (
                      <div className="flex items-center gap-2">
                        <img src={mercadoLibreIcon} alt="" className="size-5" />
                        <span>Mercado Livre</span>
                      </div>
                    ) : (
                      <span>{l.marketplace}</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {dayjs(l.createdAt).fromNow()}
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
              ))
            )}
          </TableBody>
        </Table>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => goToPage(page - 1)}
                aria-disabled={page === 1}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
                text="Anterior"
              />
            </PaginationItem>
            <PaginationItem>
              <span className="px-4 text-sm text-muted-foreground">
                Página {page}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => goToPage(page + 1)}
                aria-disabled={!hasNextPage || isPlaceholderData}
                className={
                  !hasNextPage || isPlaceholderData
                    ? "pointer-events-none opacity-50"
                    : ""
                }
                text="Próximo"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <DeleteListingDialog
        listing={confirming ?? null}
        onOpenChange={(open) => {
          if (!open) setConfirmingId(null)
        }}
      />
    </>
  )
}
