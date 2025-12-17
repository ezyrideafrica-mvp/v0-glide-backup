"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  FileText,
  Settings,
  LogOut,
  Truck,
  UserCheck,
  Receipt,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

type MenuItem = {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  roles: string[]
}

const menuItems: MenuItem[] = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["owner", "dev_admin", "marketing_admin", "sales_admin"],
  },
  { href: "/admin/users", label: "Users", icon: Users, roles: ["owner", "dev_admin", "marketing_admin"] },
  {
    href: "/admin/providers",
    label: "Service Providers",
    icon: UserCheck,
    roles: ["owner", "dev_admin", "marketing_admin"],
  },
  {
    href: "/admin/orders",
    label: "Orders",
    icon: ShoppingBag,
    roles: ["owner", "dev_admin", "marketing_admin", "sales_admin"],
  },
  {
    href: "/admin/invoices",
    label: "Invoices",
    icon: FileText,
    roles: ["owner", "dev_admin", "marketing_admin", "sales_admin"],
  },
  {
    href: "/admin/operation-hub",
    label: "Operation Hub",
    icon: Receipt,
    roles: ["owner", "dev_admin", "marketing_admin", "sales_admin"],
  },
  { href: "/admin/logistics", label: "Logistics", icon: Truck, roles: ["owner", "dev_admin"] },
  { href: "/admin/settings", label: "Settings", icon: Settings, roles: ["owner", "dev_admin"] },
]

export function AdminSidebar({ userRole }: { userRole: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  // Filter menu items based on user role
  const visibleMenuItems = menuItems.filter((item) => item.roles.includes(userRole))

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-primary text-white flex flex-col">
      <div className="p-6 border-b border-white/10">
        <Link href="/admin">
          <Image src="/logo.png" alt="Glide Network Admin" width={120} height={60} className="brightness-0 invert" />
        </Link>
        <p className="text-xs text-white/60 mt-2">Admin Dashboard</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {visibleMenuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="px-4 py-2 mb-2">
          <p className="text-xs text-white/60">Role</p>
          <p className="text-sm font-semibold capitalize">{userRole?.replace("_", " ")}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
