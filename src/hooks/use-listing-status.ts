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
  const [hasTimedOut, setHasTimedOut] = useState(false)
  const phaseRef = useRef<{ status: ListingStatus; startedAt: number } | null>(
    null
  )

  const query = useQuery({
    queryKey: ["listing", listingId],
    queryFn: () => getListing(listingId),
    enabled: !!listingId,
    refetchInterval: (q) => {
      const status = q.state.data?.listing.status
      if (!isProcessing(status) || hasTimedOut) return false
      return LISTING_POLL_INTERVAL
    },
  })

  const status = query.data?.listing.status

  useEffect(() => {
    if (!status || !isProcessing(status)) {
      phaseRef.current = null
      setHasTimedOut(false)
      return
    }

    if (phaseRef.current?.status !== status) {
      phaseRef.current = { status, startedAt: Date.now() }
      setHasTimedOut(false)
    }

    const elapsed = Date.now() - phaseRef.current.startedAt
    const remaining = Math.max(0, LISTING_POLL_TIMEOUT_MS - elapsed)

    if (remaining <= 0) {
      setHasTimedOut(true)
      return
    }

    const id = setTimeout(() => setHasTimedOut(true), remaining)
    return () => clearTimeout(id)
  }, [status])

  return {
    listing: query.data?.listing ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isPolling: isProcessing(status) && !hasTimedOut,
    hasTimedOut,
    error: query.error,
    refetch: query.refetch,
  }
}
