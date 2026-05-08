import { clearToken } from "@/auth/auth"
import { getProfile } from "@/http/get-profile"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"

export function useAuth() {
  const navigate = useNavigate()

  const signInOut = () => {
    clearToken()
    navigate({ to: "/sign-in" })
  }

  const { data: { user } = {} } = useQuery({
    queryKey: ["sessions"],
    queryFn: getProfile,
    retry: false,
  })

  return {
    signInOut,
    user,
  }
}
