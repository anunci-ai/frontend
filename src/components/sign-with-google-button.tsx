import { Button } from "./ui/button"
import { GoogleIcon } from "./google-icon"
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google"
import { useEffect, useRef, useState, useTransition } from "react"
import { signInWithGoogle } from "@/http/sign-in-with-google"
import { LoaderCircleIcon } from "lucide-react"
import { saveToken } from "@/auth/auth"
import { useNavigate } from "@tanstack/react-router"

const GOOGLE_BUTTON_WIDTH = 400
const GOOGLE_BUTTON_HEIGHT = 40

export function SignInWithGoogleButton() {
  const [isPending, startTransition] = useTransition()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const [isError, setIsError] = useState(false)
  const [scale, setScale] = useState({ x: 1, y: 1 })

  useEffect(() => {
    const node = wrapperRef.current
    if (!node) return

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setScale({
        x: width / GOOGLE_BUTTON_WIDTH,
        y: height / GOOGLE_BUTTON_HEIGHT,
      })
    })

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  async function handleSuccess(credentialResponse: CredentialResponse) {
    const googleIdToken = credentialResponse.credential

    if (!googleIdToken) {
      handleOnError()
      return
    }

    startTransition(async () => {
      const { token } = await signInWithGoogle({ googleIdToken })
      saveToken(token)
      navigate({ to: "/" })
    })
  }

  function handleOnError() {
    setIsError(true)
  }

  return (
    <div ref={wrapperRef} className="relative w-full">
      <Button
        variant="outline"
        type="button"
        className="pointer-events-none w-full"
        aria-invalid={isError || undefined}
        disabled={isPending}
      >
        {isPending ? (
          <LoaderCircleIcon />
        ) : (
          <div className="flex flex-row items-center gap-1 text-foreground">
            <GoogleIcon />
            Entrar com Google
          </div>
        )}
      </Button>
      <div
        className="absolute inset-0 origin-top-left opacity-0"
        style={{ transform: `scale(${scale.x}, ${scale.y})` }}
      >
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleOnError}
          width={String(GOOGLE_BUTTON_WIDTH)}
        />
      </div>
    </div>
  )
}
