import { HTTPError } from "ky"
import { api } from "./api-client"

interface SubscribeToPlanRequest {
  planId: string
}

export async function subscribeToPlan({ planId }: SubscribeToPlanRequest) {
  try {
    await api.post("subscriptions", {
      json: {
        planId,
      },
    })
  } catch (error) {
    if (error instanceof HTTPError && error.response.status === 404) {
      return null
    }

    throw error
  }
}
