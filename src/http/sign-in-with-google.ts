import { api } from "./api-client"

interface SignInWithGoogleRequest {
  googleIdToken: string
}

interface SignInWithGoogleResponse {
  token: string
}

export async function signInWithGoogle({
  googleIdToken,
}: SignInWithGoogleRequest) {
  const result = await api
    .post("auth/sessions/google", {
      json: {
        googleIdToken,
      },
    })
    .json<SignInWithGoogleResponse>()

  return result
}
