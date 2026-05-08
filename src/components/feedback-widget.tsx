import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { FieldContent } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { HelpCircleIcon, LoaderCircleIcon } from "lucide-react"
// import { toast } from "sonner"

const feedbackFormSchema = z.object({
  feedback: z.string(),
  emotion: z.string().optional(),
})

type FeedbackFormSchema = z.infer<typeof feedbackFormSchema>

export function FeedbackWidget() {
  const { register, handleSubmit, control, watch, reset } =
    useForm<FeedbackFormSchema>({
      resolver: zodResolver(feedbackFormSchema),
    })

  const feedback = watch("feedback")

  // just mock
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmitFeedback(data: FeedbackFormSchema) {
    console.log(data)
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      // toast("Feedback enviado")
      reset()
    }, 1500)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Ajuda">
          <HelpCircleIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg">Deixe seu feedback</DialogTitle>
          <DialogDescription className="leading-5 font-medium">
            Gostaríamos muito de saber o que correu bem e como podemos melhorar
            a experiência com o produto.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleSubmitFeedback)}
          className="space-y-4"
        >
          <Textarea placeholder="Digite aqui..." {...register("feedback")} />
          <div className="flex items-center justify-between">
            <Controller
              name="emotion"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  className="flex max-w-sm"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <label
                    htmlFor="good"
                    className="rounded-xl border border-accent bg-secondary p-3 has-data-checked:border-accent-foreground/20"
                  >
                    <FieldContent>😁</FieldContent>
                    <RadioGroupItem hidden value="good" id="good" />
                  </label>
                  <label
                    htmlFor="bad"
                    className="rounded-xl border border-accent bg-secondary p-3 has-data-checked:border-accent-foreground/20"
                  >
                    <FieldContent>😐</FieldContent>
                    <RadioGroupItem hidden value="bad" id="bad" />
                  </label>
                  <label
                    htmlFor="very-bad"
                    className="rounded-xl border border-accent bg-secondary p-3 has-data-checked:border-accent-foreground/20"
                  >
                    <FieldContent>😭</FieldContent>
                    <RadioGroupItem hidden value="very-bad" id="very-bad" />
                  </label>
                </RadioGroup>
              )}
            />
            <Button
              type="submit"
              disabled={!feedback}
              size={isLoading ? "icon" : "default"}
            >
              {isLoading ? (
                <LoaderCircleIcon className="animate-spin" />
              ) : (
                "Enviar"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
