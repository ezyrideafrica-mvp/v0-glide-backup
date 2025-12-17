"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export function ProviderActions({
  providerId,
  userId,
  currentStatus,
}: {
  providerId: string
  userId: string
  currentStatus: string
}) {
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const updateStatus = async (newStatus: string) => {
    if (newStatus === currentStatus) return

    setIsUpdating(true)
    try {
      // Update provider status
      const { error } = await supabase.from("service_providers").update({ status: newStatus }).eq("id", providerId)

      if (error) throw error

      // If approved, update user role to provider
      if (newStatus === "approved") {
        await fetch("/api/admin/update-role", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId, role: "provider" }),
        })
      }

      router.refresh()
    } catch (error) {
      alert("Failed to update status")
    } finally {
      setIsUpdating(false)
    }
  }

  if (currentStatus === "approved") {
    return <span className="text-sm text-green-600 font-medium">Approved</span>
  }

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="outline"
        className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent"
        onClick={() => updateStatus("approved")}
        disabled={isUpdating}
      >
        <Check className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
        onClick={() => updateStatus("rejected")}
        disabled={isUpdating}
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  )
}
