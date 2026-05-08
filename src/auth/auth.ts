import { getProfile } from "@/http/get-profile"
import { queryClient } from "@/lib/query-client"
import { redirect } from "@tanstack/react-router"
import { destroyCookie, parseCookies, setCookie } from "nookies"

export function getToken() {
  const cookies = parseCookies()

  return cookies["token"]
}

export function isAuthenticated() {
  return !!getToken()
}

export function saveToken(token: string) {
  if (!token) {
    return
  }

  setCookie(null, "token", token, {
    maxAge: 24 * 60 * 60 * 7,
    path: "/",
  })
}

export function clearToken() {
  destroyCookie(null, "token", {
    path: "/",
  })
}

export async function requireAuth() {
  try {
    return await queryClient.fetchQuery({
      queryKey: ["sessions"],
      queryFn: getProfile,
    })
  } catch {
    clearToken()
    throw redirect({ to: "/sign-in" })
  }
}
