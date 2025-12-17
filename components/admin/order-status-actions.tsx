"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Clock, Truck, CheckCircle, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

const statuses = [
  { value: "pending", label: "Pending", icon: Clock },
  { value: "in_progress", label: "In Progress", icon: Truck },
  { value: "completed", label: "Completed", icon: CheckCircle },
  { value: "cancelled", label: "Cancelled", icon: XCircle },
]

export function OrderStatusActions({
  orderId,
  currentStatus,
}: {
  orderId: string
  currentStatus: string
}) {
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const updateStatus = async (newStatus: string) => {
    if (newStatus === currentStatus) return

    setIsUpdating(true)
    try {
      const { error } = await supabase.from("market_orders").update({ status: newStatus }).eq("id", orderId)

      if (error) throw error
      router.refresh()
    } catch (error) {
      alert("Failed to update status")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" disabled={isUpdating}>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {statuses.map((status) => {
          const Icon = status.icon
          return (
            <DropdownMenuItem
              key={status.value}
              onClick={() => updateStatus(status.value)}
              className={currentStatus === status.value ? "bg-gray-100" : ""}
            >
              <Icon className="w-4 h-4 mr-2" />
              {status.label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
