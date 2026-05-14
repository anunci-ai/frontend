import { useEffect, useRef, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getListing } from "@/http/get-listing"
import type { ListingStatus } from "@/http/get-listing"

export const LISTING_POLL_INTERVAL = 2000
export const LISTING_POLL_TIMEOUT_MS = 120_000

export function isProcessing(s?: ListingStatus) {
  return s === "TEXT_PROCESSING" || s === "IMAGE_PROCESSING"
}

export function isTerminal(s?: ListingStatus) {
  return s === "COMPLETED" || s === "IMAGE_COMPLETED" || s === "FAILED"
}

export function useListingStatus(listingId: string) {
  // Stores which status triggered the timeout; hasTimedOut is derived by
  // comparing this against the current status — so it resets automatically
  // when the status changes without any synchronous setState in effects.
  const [timedOutForStatus, setTimedOutForStatus] = useState<ListingStatus | null>(null)
  const phaseRef = useRef<{ status: ListingStatus; startedAt: number } | null>(null)

  const query = useQuery({
    queryKey: ["listing", listingId],
    queryFn: () => getListing(listingId),
    enabled: !!listingId,
    refetchInterval: (q) => {
      const s = q.state.data?.listing.status
      if (!isProcessing(s)) return false
      if (timedOutForStatus !== null && timedOutForStatus === s) return false
      return LISTING_POLL_INTERVAL
    },
  })

  const status = query.data?.listing.status
  const hasTimedOut = timedOutForStatus !== null && timedOutForStatus === status

  useEffect(() => {
    if (!status || !isProcessing(status)) {
      phaseRef.current = null
      return
    }
    if (phaseRef.current?.status !== status) {
      phaseRef.current = { status, startedAt: Date.now() }
    }
    const elapsed = Date.now() - phaseRef.current.startedAt
    const remaining = Math.max(0, LISTING_POLL_TIMEOUT_MS - elapsed)
    const id = setTimeout(() => setTimedOutForStatus(status), remaining)
    return () => clearTimeout(id)
  }, [status])

  function resetTimeout() {
    setTimedOutForStatus(null)
    phaseRef.current = null
  }

  return {
    listing: query.data?.listing ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isPolling: isProcessing(status) && !hasTimedOut,
    hasTimedOut,
    error: query.error,
    refetch: query.refetch,
    resetTimeout,
  }
}
