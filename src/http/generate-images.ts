import { api } from "./api-client"

export async function generateImages(listingId: string) {
  // const apiClient =
  //   process.env.NEXT_PUBLIC_NODE_ENV === "development" ? apiNgrok : api

  await api.patch(`listings/generate-images/${listingId}`).json<void>()
}
