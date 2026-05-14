import { api, ngrok } from "./api-client"

export async function generateText(listingId: string) {
  const nodeEnv = import.meta.env.VITE_NODE_ENV

  const apiClient = nodeEnv === "development" ? ngrok : api

  await apiClient.patch(`listings/generate-text/${listingId}`).json<void>()
}
