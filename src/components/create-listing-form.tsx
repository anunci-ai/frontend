import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Textarea } from "./ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTrigger,
} from "@/components/reui/stepper"

const steps = [1, 2]

export function CreateListingForm() {
  return (
    <div className="mx-auto my-16 w-full max-w-4xl">
      <Stepper defaultValue={2} className="w-full max-w-md space-y-8">
        <StepperNav>
          {steps.map((step) => (
            <StepperItem key={step} step={step}>
              <StepperTrigger>
                <StepperIndicator>{step}</StepperIndicator>
              </StepperTrigger>
              {steps.length > step && (
                <StepperSeparator className="group-data-[state=completed]/step:bg-primary" />
              )}
            </StepperItem>
          ))}
        </StepperNav>
        <StepperPanel className="text-sm">
          {steps.map((step) => (
            <StepperContent
              key={step}
              value={step}
              className="flex items-center justify-center"
            >
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Informações do produto</CardTitle>
                  <CardDescription>
                    Forneça os dados básicos sobre o produto
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="flex flex-col gap-4">
                    <Textarea placeholder="Ex: Garrafa Térmica Stanley 700ml" />
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Marketplace" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="light">Mercado Livre</SelectItem>
                          <SelectItem value="dark">Shoppee</SelectItem>
                          <SelectItem value="system">Amazon</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Button>Continuar</Button>
                  </form>
                </CardContent>
              </Card>
            </StepperContent>
          ))}
        </StepperPanel>
      </Stepper>
    </div>
  )
}
