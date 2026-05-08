import { cn } from "@/lib/utils"
import { Field, FieldGroup } from "@/components/ui/field"
import { SignInWithGoogleButton } from "./sign-with-google-button"

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-5xl font-semibold text-foreground">
            Bem-vindo(a) ao <span className="gradient-text">anuncia.ai</span>
          </h1>
          <p className="text-sm text-balance text-muted-foreground">
            Teste gratuitamente entrando com a sua conta e comece a aproveitar
            nossa plataforma.
          </p>
        </div>
        <Field>
          <SignInWithGoogleButton />
        </Field>
      </FieldGroup>
    </form>
  )
}
