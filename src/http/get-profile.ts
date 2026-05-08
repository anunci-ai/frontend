import { api } from "./api-client"

interface GetProfileResponse {
  user: {
    id: string
    name: string
    avatarUrl?: string
    email: string
  }
}

export async function getProfile() {
  const result = await api.get("auth/me").json<GetProfileResponse>()

  return result
}
