import { api } from "./api-client"

interface GetProfileResponse {
  user: {
    id: string
    name: string
    avatarUrl?: string
    email: string
    subscription?: {
      isActive: boolean
      tokensTotal: number
      tokensRemaining: number
      plan: {
        id: string
        name: string
      }
    }
  }
}

export async function getProfile() {
  const result = await api.get("auth/me").json<GetProfileResponse>()

  return result
}
