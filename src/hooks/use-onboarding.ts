import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuth } from "@/hooks/use-auth"
import { fetchPlans } from "@/http/fetch-plans"
import { subscribeToPlan } from "@/http/subscribe-to-plan"
import { mapPlanToOnboarding } from "@/lib/onboarding-plans"
import type { OnboardingStatus } from "@/lib/onboarding-plans"

export function useOnboarding() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [hasSubscribed, setHasSubscribed] = useState(false)

  const isOpen = !!user && !user.subscription?.isActive

  const {
    data: plan,
    isLoading: isLoadingPlans,
    isError: isPlansError,
    refetch,
  } = useQuery({
    queryKey: ["plans"],
    enabled: isOpen,
    queryFn: async () => {
      const result = await fetchPlans()
      if (!result || result.plans.length === 0) {
        throw new Error("no-plans")
      }
      return mapPlanToOnboarding(result.plans[0]!)
    },
  })

  const refetchPlans = () => {
    void refetch()
  }

  const { isPending, mutate } = useMutation({
    mutationFn: async (planId: string) => {
      await subscribeToPlan({ planId })
    },
    onSuccess: () => {
      setHasSubscribed(true)
      setTimeout(() => {
        void queryClient.invalidateQueries({ queryKey: ["sessions"] })
      }, 1200)
    },
    onError: () => {
      toast.error("Não foi possível ativar o plano. Tente novamente.")
    },
  })

  const status: OnboardingStatus = hasSubscribed
    ? "complete"
    : isPending
      ? "submitting"
      : "idle"

  function subscribe() {
    if (!plan) return
    mutate(plan.id)
  }

  return {
    isOpen,
    plan: plan ?? null,
    isLoadingPlans,
    isPlansError,
    refetchPlans,
    subscribe,
    status,
  }
}
