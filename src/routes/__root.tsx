import { queryClient } from "@/lib/query-client"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { QueryClientProvider } from "@tanstack/react-query"
import { createRootRoute, Outlet } from "@tanstack/react-router"
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { Toaster } from "sonner"

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Toaster richColors theme="system" />
        <Outlet />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  ),
})
