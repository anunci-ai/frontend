import ky from "ky"
import { getToken } from "@/auth/auth"

function createAPI(baseUrl: string) {
  return ky.create({
    baseUrl,
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
}

export const api = createAPI(import.meta.env.VITE_API_URL)
export const ngrok = createAPI(import.meta.env.VITE_NGROK_URL)
