import { HTTPError } from "ky"
import { api } from "./api-client"

interface FetchRecentListingsResponse {
  listings: {
    id: string
    inputDescription: string
    marketplace: string
    createdAt: string
    originalImageUrl: string | null
  }[]
}

export async function fetchRecentListings({ page }: { page: number }) {
  try {
    const result = await api
      .get("listings", { searchParams: { page } })
      .json<FetchRecentListingsResponse>()

    return result
  } catch (error) {
    if (error instanceof HTTPError) {
      return null
    }

    throw error
  }
}
