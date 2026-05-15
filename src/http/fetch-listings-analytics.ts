import { HTTPError } from "ky"
import { api } from "./api-client"

interface FetchListingsAnalyticsResponse {
  analytics: {
    listings: {
      total: number
      lastMonth: {
        date: string // YYYY-mm-dd
        count: number
      }[]
    }
  }
}

export async function fetchListingsAnalytics() {
  try {
    const result = await api
      .get("analytics")
      .json<FetchListingsAnalyticsResponse>()

    return result
  } catch (error) {
    if (error instanceof HTTPError) {
      return null
    }

    throw error
  }
}
