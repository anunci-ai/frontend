import { useState } from "react"
import { Link, useLocation } from "@tanstack/react-router"
import { MenuIcon, PlusIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { NAV_ITEMS, type NavItem } from "@/lib/nav-items"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"
import { ProfileButton } from "@/components/profile-button"
import { ModeToggle } from "@/components/mode-toogle"
import { FeedbackWidget } from "@/components/feedback-widget"
import { SubscriptionCard } from "@/components/subscription-card"
import { Button } from "./ui/button"

function NavTab({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon
  return (
    <Link
      to={item.to}
      aria-label={item.label}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex flex-1 flex-col items-center gap-0.5 rounded-xl py-2.5 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        active ? "text-primary" : "text-muted-foreground hover:text-foreground"
      )}
    >
      <span
        className={cn(
          "rounded-lg p-1.5 transition-all duration-200",
          active ? "bg-primary/10" : ""
        )}
      >
        <Icon size={20} strokeWidth={active ? 2.5 : 2} />
      </span>
      <span className="text-[10px] leading-none font-medium">{item.label}</span>
    </Link>
  )
}

function CtaTab() {
  return (
    <Button asChild size="icon-lg">
      <Link to="/create" aria-label="Novo Anúncio">
        <PlusIcon size={20} />
        <span className="sr-only">Novo anúncio</span>
      </Link>
    </Button>
  )
}

function MaisTab({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <button
          type="button"
          aria-label="Mais opções"
          className={cn(
            "flex flex-1 flex-col items-center gap-0.5 rounded-xl py-2.5 text-muted-foreground transition-all duration-200 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
            open && "text-primary"
          )}
        >
          <span
            className={cn(
              "rounded-lg p-1.5 transition-all duration-200",
              open && "bg-primary/10"
            )}
          >
            <MenuIcon size={20} strokeWidth={open ? 2.5 : 2} />
          </span>
          <span className="text-[10px] leading-none font-medium">Mais</span>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Conta</DrawerTitle>
        </DrawerHeader>

        <div
          className="flex flex-col gap-4 px-4 pb-8"
          style={{ paddingBottom: "calc(2rem + env(safe-area-inset-bottom))" }}
        >
          <ProfileButton isSidebarCollapsed={false} />

          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Tema</span>
            <ModeToggle />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Feedback</span>
            <FeedbackWidget />
          </div>

          <Separator />

          <SubscriptionCard isCollapsedView={false} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export function BottomNavigation() {
  const { pathname } = useLocation()
  const [drawerOpen, setSheetOpen] = useState(false)

  const leftItems = NAV_ITEMS.slice(0, 2)
  const rightItems = NAV_ITEMS.slice(2)

  return (
    <nav
      aria-label="Navegação inferior"
      className="fixed inset-x-3 z-40 lg:hidden"
      style={{ bottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center gap-0.5 rounded-2xl border bg-background px-2 py-1 shadow-lg backdrop-blur-lg supports-backdrop-filter:bg-background/60">
        {leftItems.map((item) => (
          <NavTab
            key={item.label}
            item={item}
            active={item.activePattern.test(pathname)}
          />
        ))}

        <CtaTab />

        {rightItems.map((item) => (
          <NavTab
            key={item.label}
            item={item}
            active={item.activePattern.test(pathname)}
          />
        ))}

        <MaisTab open={drawerOpen} onOpenChange={setSheetOpen} />
      </div>
    </nav>
  )
}
