import { HTTPError } from "ky"
import { api, ngrok } from "./api-client"

export async function generateText(listingId: string) {
  const nodeEnv = import.meta.env.VITE_NODE_ENV

  const apiClient = nodeEnv === "development" ? ngrok : api

  try {
    await apiClient.patch(`listings/generate-text/${listingId}`)
  } catch (error) {
    if (error instanceof HTTPError && error.response.status === 404) {
      return null
    }

    throw error
  }
}
