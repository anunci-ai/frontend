import { HTTPError } from "ky"
import { api } from "./api-client"

interface ListingFormat {
  id: string
  marketplace: string
  inputDescription: string
  status:
    | "DRAFT"
    | "TEXT_PROCESSING"
    | "TEXT_COMPLETED"
    | "IMAGE_PROCESSING"
    | "IMAGE_COMPLETED"
    | "COMPLETED"
    | "FAILED"
  generatedTitle?: string
  generatedDescription?: string
  generatedMetaDescription?: string
  generatedTags: string[]
  generatedSlug?: string
  createdAt: string
}

interface GetListingResponse {
  listing: ListingFormat
}

export async function getListing(listingId: string) {
  try {
    return await api.get(`listings/${listingId}`).json<GetListingResponse>()
  } catch (error) {
    if (error instanceof HTTPError && error.response.status === 404) {
      return null
    }

    throw error
  }
}
