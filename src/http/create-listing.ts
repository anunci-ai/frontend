import { api } from "./api-client"

interface CreateListingRequest {
  marketplace: string
  inputDescription: string
}

interface CreateListingResponse {
  listingId: string
}

export async function createListing({
  marketplace,
  inputDescription,
}: CreateListingRequest) {
  const result = await api
    .post("listings", {
      json: {
        marketplace,
        inputDescription,
      },
    })
    .json<CreateListingResponse>()

  return result
}
