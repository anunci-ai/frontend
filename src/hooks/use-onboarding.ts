import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"

function getStorageKey(userId: string) {
  return `onboarding-completed:${userId}`
}

export function useOnboarding() {
  const { user } = useAuth()

  const [completed, setCompleted] = useState(() => {
    if (!user?.id) return false
    return localStorage.getItem(getStorageKey(user.id)) === "true"
  })

  const isOpen = !!user && !user.subscription?.isActive && !completed

  function completeOnboarding() {
    if (!user?.id) return
    localStorage.setItem(getStorageKey(user.id), "true")
    setCompleted(true)
  }

  return { isOpen, completeOnboarding }
}
