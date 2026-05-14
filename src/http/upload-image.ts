import { api } from "./api-client"

interface UploadImageResponse {
  url: string
}

export async function uploadImage(listingId: string, file: File) {
  const formData = new FormData()

  formData.append("image", file)

  const result = await api
    .patch(`listings/${listingId}/upload`, {
      body: formData,
    })
    .json<UploadImageResponse>()

  return result
}
