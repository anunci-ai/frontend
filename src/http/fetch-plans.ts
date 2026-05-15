import { HTTPError } from "ky"
import { api } from "./api-client"

interface FetchPlansResponse {
  plans: {
    id: string
    name: string
    priceInCents: number
    tokensQuantity: number
    createdAt: string
  }[]
}

export async function fetchPlans() {
  try {
    const result = await api.get("plans").json<FetchPlansResponse>()

    return result
  } catch (error) {
    if (error instanceof HTTPError) {
      return null
    }

    throw error
  }
}
