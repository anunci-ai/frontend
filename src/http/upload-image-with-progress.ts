import { getToken } from "@/auth/auth"

interface UploadImageWithProgressOptions {
  listingId: string
  file: File
  onProgress?: (percent: number) => void
  signal?: AbortSignal
}

interface UploadImageResponse {
  url: string
}

export function uploadImageWithProgress({
  listingId,
  file,
  onProgress,
  signal,
}: UploadImageWithProgressOptions): Promise<UploadImageResponse> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const formData = new FormData()
    formData.append("image", file)

    const baseUrl = import.meta.env.VITE_API_URL as string
    const url = new URL(
      `listings/${listingId}/upload`,
      baseUrl.endsWith("/") ? baseUrl : baseUrl + "/"
    )

    xhr.open("PATCH", url.toString())

    const token = getToken()
    if (token) xhr.setRequestHeader("Authorization", `Bearer ${token}`)

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        onProgress?.(Math.min(Math.round((e.loaded / e.total) * 100), 99))
      }
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress?.(100)
        try {
          resolve(JSON.parse(xhr.responseText) as UploadImageResponse)
        } catch (e) {
          reject(e)
        }
      } else {
        reject(new Error(`Upload failed (${xhr.status})`))
      }
    }

    xhr.onerror = () => reject(new Error("Upload network error"))
    xhr.onabort = () => reject(new DOMException("Upload aborted", "AbortError"))

    signal?.addEventListener("abort", () => xhr.abort())

    xhr.send(formData)
  })
}
