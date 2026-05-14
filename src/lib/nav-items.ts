import {
  LayoutDashboardIcon,
  SettingsIcon,
  StoreIcon,
  type LucideIcon,
} from "lucide-react"

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  activePattern: RegExp
}

export const NAV_ITEMS: NavItem[] = [
  {
    to: "/",
    label: "Dashboard",
    icon: LayoutDashboardIcon,
    activePattern: /^\/$/,
  },
  {
    to: "/listings",
    label: "Anúncios",
    icon: StoreIcon,
    activePattern: /^\/listings/,
  },
  {
    to: "/",
    label: "Configurações",
    icon: SettingsIcon,
    activePattern: /^\/settings/,
  },
]
