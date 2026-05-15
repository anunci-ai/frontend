import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import logo from "@/assets/logo.png"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { saveToken } from "@/auth/auth"
import { useNavigate } from "@tanstack/react-router"
import { LoaderCircleIcon, Eye, EyeOff } from "lucide-react"
import { HTTPError } from "ky"
import { toast } from "sonner"

const signInWithPasswordFormSchema = z.object({
  email: z.email({ message: "E-mail inválido." }),
  password: z.string().min(8, { message: "Senha inválida." }),
})

type SignInWithPasswordFormSchema = z.infer<typeof signInWithPasswordFormSchema>

export function SignInWithPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInWithPasswordFormSchema>({
    resolver: zodResolver(signInWithPasswordFormSchema),
  })

  const [showPassword, setShowPassword] = useState(false)

  const {
    signIn: { mutate, isPending },
  } = useAuth()

  const navigate = useNavigate()

  async function handleSignIn({
    email,
    password,
  }: SignInWithPasswordFormSchema) {
    mutate(
      { email, password },
      {
        onSuccess(data) {
          if (!data?.token) {
            return
          }

          saveToken(data?.token)
          navigate({ to: "/" })
        },
        onError: (error) => {
          if (error instanceof HTTPError) {
            toast.error(error.data.error)
          }
        },
      }
    )
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <div className="flex w-full justify-center">
            <img src={logo} alt="Logo" className="w-16" />
          </div>
          <CardTitle className="mx-auto text-2xl font-semibold">
            Acesse sua conta
          </CardTitle>
          <CardDescription className="mx-auto">
            Entre com suas credenciais abaixo:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleSignIn)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="E-mail"
                  {...register("email")}
                  className={cn(errors.email && "border-destructive")}
                />
                {errors.email && (
                  <span className="text-sm font-semibold text-destructive">
                    {errors.email.message}
                  </span>
                )}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha"
                    {...register("password")}
                    className={cn("pr-10", errors.password && "border-destructive")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                    aria-pressed={showPassword}
                    className="absolute top-1/2 right-1 -translate-y-1/2 text-muted-foreground hover:bg-transparent"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
                {errors.password && (
                  <span className="text-sm font-semibold text-destructive">
                    {errors.password.message}
                  </span>
                )}
              </Field>
              <Field>
                <Button type="submit" disabled={isPending}>
                  {isPending && <LoaderCircleIcon className="animate-spin" />}
                  Entrar na conta
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
