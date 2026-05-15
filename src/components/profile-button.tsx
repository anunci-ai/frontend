import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { CreditCard, LogOut, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { CollapsedTooltip } from "./collapsed-tooltip"
import { Button } from "./ui/button"
import { useAuth } from "@/hooks/use-auth"

function getInitials(name?: string) {
  if (!name) return "?"
  const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2)
  return (
    parts
      .map((p) => p[0])
      .join("")
      .toUpperCase() || "?"
  )
}

interface ProfileButtonProps {
  isSidebarCollapsed: boolean
}

export function ProfileButton({ isSidebarCollapsed }: ProfileButtonProps) {
  const { signInOut, user } = useAuth()

  return (
    <DropdownMenu>
      <CollapsedTooltip
        collapsed={isSidebarCollapsed}
        label={user?.name ?? "Conta"}
      >
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label={
              user?.name ? `Abrir menu de ${user.name}` : "Abrir menu da conta"
            }
            className={cn(
              "flex min-w-0 items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isSidebarCollapsed ? "" : "flex-1 px-1 py-1 hover:bg-muted"
            )}
          >
            <Avatar size="lg">
              {user?.avatarUrl && (
                <AvatarImage src={user.avatarUrl} alt={name ?? ""} />
              )}
              <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
            </Avatar>
            {!isSidebarCollapsed && user?.name && user?.email && (
              <div className="flex flex-col">
                <span className="min-w-0 flex-1 truncate text-left text-sm font-semibold text-foreground">
                  {user.name}
                </span>
                <span className="min-w-0 flex-1 truncate text-left text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
            )}
          </button>
        </DropdownMenuTrigger>
      </CollapsedTooltip>
      <DropdownMenuContent side="top" align="start" className="min-w-48">
        <DropdownMenuItem disabled>
          <Settings />
          Configurações
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <CreditCard />
          Cobrança
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" asChild>
          <Button
            variant="ghost"
            className="flex w-full items-center justify-start"
            onClick={signInOut}
          >
            <LogOut />
            Sair
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
