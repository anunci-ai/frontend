import { clearToken } from "@/auth/auth"
import { getProfile } from "@/http/get-profile"
import { signInWithPassword } from "@/http/sign-in-with-password"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"

type SignInMutationParams = {
  email: string
  password: string
}

export function useAuth() {
  const navigate = useNavigate()

  const signIn = useMutation({
    mutationFn: async ({ email, password }: SignInMutationParams) => {
      return await signInWithPassword({ email, password })
    },
  })

  const signInOut = () => {
    clearToken()
    navigate({ to: "/app/sign-in" })
  }

  const { data: { user } = {} } = useQuery({
    queryKey: ["sessions"],
    queryFn: getProfile,
    retry: false,
  })

  return {
    signIn,
    signInOut,
    user,
  }
}
