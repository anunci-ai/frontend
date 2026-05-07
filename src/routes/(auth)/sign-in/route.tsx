/* eslint-disable react-refresh/only-export-components */
import { SignInForm } from "@/components/sign-in-form"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { createFileRoute } from "@tanstack/react-router"
import logo from "@/assets/logo.png"

export const Route = createFileRoute("/(auth)/sign-in")({
  component: SignIn,
})

function SignIn() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/">
            <img src={logo} alt="Logo" className="w-16" />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <SignInForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <TestimonialCarousel />
      </div>
    </div>
  )
}
