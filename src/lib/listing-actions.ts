import { toast } from "sonner"

export function copyText(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => toast.success("Copiado para a área de transferência"))
    .catch(() => toast.error("Não foi possível copiar"))
}

export function downloadImage(url: string, filename: string) {
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  toast.success("Download iniciado")
}
