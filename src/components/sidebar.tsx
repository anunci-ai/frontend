import logo from "../assets/logo.png"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { TooltipProvider } from "@/components/ui/tooltip"
import { CollapsedTooltip } from "./collapsed-tooltip"
import { FeedbackWidget } from "./feedback-widget"
import { ModeToggle } from "./mode-toogle"
import { ProfileButton } from "./profile-button"
import {
  ClockIcon,
  HomeIcon,
  PanelLeftIcon,
  PlusIcon,
  StoreIcon,
  X,
  ZapIcon,
} from "lucide-react"

// type SidebarClientProps = {
//   activeId?: string
// }

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isCollapsedView = collapsed && !mobileOpen

  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [mobileOpen])

  return (
    <TooltipProvider>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Abrir menu"
        onClick={() => setMobileOpen(true)}
        className={cn(
          "fixed top-3 left-3 z-40 bg-sidebar transition-opacity duration-200 lg:hidden",
          mobileOpen ? "pointer-events-none opacity-0" : "opacity-100"
        )}
      >
        <PanelLeftIcon />
      </Button>

      <aside
        aria-label="Navegação principal"
        className={cn(
          "fixed inset-0 z-50 flex h-dvh w-full flex-col gap-2 border-r border-sidebar-border bg-sidebar p-3 transition-transform duration-300 ease-in-out will-change-transform",
          mobileOpen
            ? "translate-x-0"
            : "pointer-events-none -translate-x-full",
          "lg:pointer-events-auto lg:sticky lg:inset-auto lg:top-0 lg:z-auto lg:translate-x-0 lg:transition-all lg:duration-200",
          isCollapsedView ? "lg:w-16" : "lg:w-85"
        )}
      >
        {/* Header */}
        <div
          className={cn(
            "flex items-center",
            isCollapsedView ? "lg:flex-col lg:gap-2" : "justify-between"
          )}
        >
          <img
            src={logo}
            alt="Logo"
            className={cn("size-16", isCollapsedView && "size-8")}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Fechar menu"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden"
          >
            <X />
          </Button>

          <CollapsedTooltip
            collapsed={isCollapsedView}
            label={collapsed ? "Expandir" : "Recolher"}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed((v) => !v)}
              aria-label={
                collapsed ? "Expandir barra lateral" : "Recolher barra lateral"
              }
              className="hidden lg:inline-flex"
            >
              <PanelLeftIcon />
            </Button>
          </CollapsedTooltip>
        </div>

        {/* Primary CTA */}
        <CollapsedTooltip collapsed={isCollapsedView} label="Novo Anúncio">
          <Button
            asChild
            size="lg"
            aria-label="Novo Anúncio"
            className={cn(
              "my-5",
              isCollapsedView ? "size-10 p-0" : "w-full justify-start gap-2"
            )}
          >
            <a href="/">
              {!isCollapsedView ? (
                <span className="w-full text-center">Novo Anúncio</span>
              ) : (
                <PlusIcon />
              )}
            </a>
          </Button>
        </CollapsedTooltip>

        {/* Fixed nav */}

        {/* History */}
        {!isCollapsedView && (
          <>
            <nav
              aria-label="Histórico de anúncios"
              className="flex min-h-0 min-w-0 flex-1 flex-col gap-4"
            >
              <Button
                asChild
                variant="ghost"
                aria-label="Novo Anúncio"
                className="w-full gap-2"
                size="lg"
              >
                <a
                  href="/"
                  className="flex flex-row items-center justify-start gap-3"
                >
                  <HomeIcon />
                  <span className="">Início</span>
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                aria-label="Novo Anúncio"
                className="w-full gap-2"
                size="lg"
              >
                <a
                  href="/"
                  className="flex flex-row items-center justify-start gap-3"
                >
                  <StoreIcon />
                  <span className="">Anúncios</span>
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                aria-label="Novo Anúncio"
                className="w-full gap-2"
                size="lg"
              >
                <a
                  href="/"
                  className="flex flex-row items-center justify-start gap-3"
                >
                  <ClockIcon />
                  <span className="">Histórico</span>
                </a>
              </Button>
            </nav>
          </>
        )}
        {isCollapsedView && <div className="flex-1" />}
        {/* Footer */}
        <div
          className={cn(
            "flex flex-col",
            isCollapsedView ? "items-center gap-2" : "gap-2"
          )}
        >
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

          <div
            className={cn(
              "flex items-center",
              isCollapsedView ? "justify-center" : "justify-between gap-2"
            )}
          >
            <ProfileButton isSidebarCollapsed={isCollapsedView} />

            {!isCollapsedView && (
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
