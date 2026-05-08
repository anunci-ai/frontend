import ky from "ky"
import { getToken } from "@/auth/auth"

export const api = ky.create({
  baseUrl: import.meta.env.VITE_API_URL,
  hooks: {
    beforeRequest: [
      async ({ request }) => {
        const token = getToken()

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`)
        }
      },
    ],
  },
})
