import logo from "../assets/logo.png"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { TooltipProvider } from "@/components/ui/tooltip"
import { CollapsedTooltip } from "./collapsed-tooltip"
import { FeedbackWidget } from "./feedback-widget"
import { ModeToggle } from "./mode-toogle"
import { ProfileButton } from "./profile-button"
import { PanelLeftIcon, PlusIcon } from "lucide-react"
import { SubscriptionCard } from "./subscription-card"
import { Link } from "@tanstack/react-router"
import { NAV_ITEMS } from "@/lib/nav-items"

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <TooltipProvider>
      <aside
        aria-label="Navegação principal"
        className={cn(
          "sticky top-0 hidden h-dvh flex-col gap-2 border-r border-sidebar-border bg-sidebar p-3 transition-all duration-200 lg:flex",
          collapsed ? "w-16" : "w-85"
        )}
      >
        {/* Header */}
        <div
          className={cn(
            "flex items-center",
            collapsed ? "flex-col gap-2" : "justify-between"
          )}
        >
          <img
            src={logo}
            alt="Logo"
            className={cn("size-16", collapsed && "size-8")}
          />

          <CollapsedTooltip
            collapsed={collapsed}
            label={collapsed ? "Expandir" : "Recolher"}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed((v) => !v)}
              aria-label={
                collapsed ? "Expandir barra lateral" : "Recolher barra lateral"
              }
            >
              <PanelLeftIcon />
            </Button>
          </CollapsedTooltip>
        </div>

        {/* Primary CTA */}
        <CollapsedTooltip collapsed={collapsed} label="Novo Anúncio">
          <Button
            asChild
            size="lg"
            aria-label="Novo Anúncio"
            className={cn(
              "my-5",
              collapsed ? "size-10 p-0" : "w-full justify-start gap-2"
            )}
          >
            <Link to="/create">
              {!collapsed ? (
                <span className="w-full text-center">Novo Anúncio</span>
              ) : (
                <PlusIcon />
              )}
            </Link>
          </Button>
        </CollapsedTooltip>

        {/* Primary nav */}
        {!collapsed && (
          <nav
            aria-label="Histórico de anúncios"
            className="flex min-h-0 min-w-0 flex-1 flex-col gap-4"
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.label}
                  asChild
                  variant="ghost"
                  aria-label={item.label}
                  className="w-full gap-2"
                  size="lg"
                >
                  <Link
                    to={item.to}
                    className="flex flex-row items-center justify-start gap-3"
                  >
                    <Icon />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              )
            })}
          </nav>
        )}
        {collapsed && <div className="flex-1" />}

        {/* Footer */}
        <div
          className={cn(
            "flex flex-col",
            collapsed ? "items-center gap-2" : "gap-2"
          )}
        >
          <SubscriptionCard isCollapsedView={collapsed} />

          <div
            className={cn(
              "flex items-center",
              collapsed ? "justify-center" : "justify-between gap-2"
            )}
          >
            <ProfileButton isSidebarCollapsed={collapsed} />

            {!collapsed && (
              <div className="flex items-center justify-between gap-1">
                <ModeToggle />
                <FeedbackWidget />
              </div>
            )}
          </div>
        </div>
      </aside>
    </TooltipProvider>
  )
}
