import { useAuth } from "@/hooks/use-auth"
import { Card, CardHeader, CardTitle } from "./ui/card"
import { RocketIcon, ZapIcon } from "lucide-react"
import { CollapsedTooltip } from "./collapsed-tooltip"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

interface SubscriptionCardProps {
  isCollapsedView: boolean
}

export function SubscriptionCard({ isCollapsedView }: SubscriptionCardProps) {
  const { user } = useAuth()

  return (
    <>
      {user?.subscription ? (
        <Card size="sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <RocketIcon size={18} className="text-primary" />
              Plano{" "}
              {user?.subscription?.plan.name === "DEMO"
                ? "Demonstração"
                : user?.subscription?.plan.name}
            </CardTitle>
          </CardHeader>
        </Card>
      ) : (
        <CollapsedTooltip collapsed={isCollapsedView} label="Fazer upgrade">
          <Button
            asChild
            variant="outline"
            aria-label="Fazer upgrade"
            className={cn(
              isCollapsedView
                ? "size-10 p-0"
                : "w-full justify-center gap-2 font-semibold"
            )}
          >
            <a
              href="https://www.anunciaai.com/#precos"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ZapIcon />
              {!isCollapsedView && <span>Upgrade</span>}
            </a>
          </Button>
        </CollapsedTooltip>
      )}
    </>
  )
}
