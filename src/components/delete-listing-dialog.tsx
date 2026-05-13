import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteListing } from "@/http/delete-listing"
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
import { LoaderCircleIcon } from "lucide-react"

interface DeleteListingDialogProps {
  listing: { id: string; inputDescription: string } | null
  onOpenChange: (open: boolean) => void
}

export function DeleteListingDialog({
  listing,
  onOpenChange,
}: DeleteListingDialogProps) {
  const queryClient = useQueryClient()

  const { isPending, mutate } = useMutation({
    mutationFn: async (id: string) => await deleteListing(id),
    onSuccess: () => {
      toast.success("Anúncio excluído")
      onOpenChange(false)
      queryClient.invalidateQueries({ queryKey: ["listings"] })
    },
    onError: () => {
      toast.error("Não foi possível excluir o anúncio.")
    },
  })

  return (
    <AlertDialog
      open={listing !== null}
      onOpenChange={(open) => {
        if (isPending) return
        if (!open) onOpenChange(false)
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir anúncio?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita.{" "}
            {listing?.inputDescription && (
              <>
                O anúncio{" "}
                <span className="font-medium text-foreground">
                  &ldquo;{listing.inputDescription}&rdquo;
                </span>{" "}
                será removido permanentemente.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault()
              if (listing) mutate(listing.id)
            }}
          >
            {isPending ? <LoaderCircleIcon /> : "Sim, excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
