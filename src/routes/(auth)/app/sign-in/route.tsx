/* eslint-disable react-refresh/only-export-components */
import { SignInWithPasswordForm } from "@/components/sign-in-with-password-form"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/(auth)/app/sign-in")({
  component: AppSignIn,
})

function AppSignIn() {
  return (
    <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden p-6 md:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,color-mix(in_oklch,var(--primary)_50%,transparent)_0%,transparent_70%)]"
      />
      <div className="relative w-full max-w-sm">
        <SignInWithPasswordForm />
      </div>
    </div>
  )
}
