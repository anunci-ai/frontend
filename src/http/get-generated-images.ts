import { api } from "./api-client"

interface GetGeneratedImagesRequest {
  listingId: string
}

interface GetGeneratedImagesResponse {
  images: {
    id: string
    url: string
    createdAt: string
  }[]
}

export async function getGeneratedImages({
  listingId,
}: GetGeneratedImagesRequest) {
  const result = await api
    .get(`images/${listingId}`)
    .json<GetGeneratedImagesResponse>()

  return result
}
