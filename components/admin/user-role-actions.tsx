"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Shield, User, Truck } from "lucide-react"
import { useRouter } from "next/navigation"

const roles = [
  { value: "user", label: "User", icon: User },
  { value: "provider", label: "Provider", icon: Truck },
  { value: "admin", label: "Admin", icon: Shield },
]

export function UserRoleActions({
  userId,
  currentRole,
}: {
  userId: string
  currentRole: string
}) {
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()

  const updateRole = async (newRole: string) => {
    if (newRole === currentRole) return

    setIsUpdating(true)
    try {
      const res = await fetch("/api/admin/update-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, role: newRole }),
      })

      if (!res.ok) {
        const data = await res.json()
        alert("Error: " + data.error)
      } else {
        router.refresh()
      }
    } catch (error) {
      alert("Failed to update role")
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
        {roles.map((role) => {
          const Icon = role.icon
          return (
            <DropdownMenuItem
              key={role.value}
              onClick={() => updateRole(role.value)}
              className={currentRole === role.value ? "bg-gray-100" : ""}
            >
              <Icon className="w-4 h-4 mr-2" />
              Set as {role.label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
