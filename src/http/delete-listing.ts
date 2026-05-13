import { api } from "./api-client"

export async function deleteListing(listingId: string) {
  const response = await api.delete(`listings/${listingId}/delete`)

  if (!response.ok) {
    throw new Error("Failed to delete listing")
  }
}
