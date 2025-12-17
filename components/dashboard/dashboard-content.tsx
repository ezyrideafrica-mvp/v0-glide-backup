"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Clock, CheckCircle, AlertCircle, ArrowRight, Settings, User } from "lucide-react"
import type { User as SupabaseUser } from "@supabase/supabase-js"

type Profile = {
  id: string
  email?: string
  full_name?: string | null
  first_name?: string | null
  last_name?: string | null
  phone?: string | null
  avatar_url?: string | null
  role?: string
  created_at?: string
} | null

type Order = {
  id: string
  service_type?: string
  status?: string
  total_amount?: number | null
  estimate?: { total?: number } | null
  dropoff?: string
  created_at: string
}

type DashboardContentProps = {
  user: SupabaseUser
  profile: Profile
  orders: Order[]
}

export function DashboardContent({ user, profile, orders }: DashboardContentProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "cancelled":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Processing</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status || "Unknown"}</Badge>
    }
  }

  const displayName = profile?.full_name || profile?.first_name || user.email?.split("@")[0] || "User"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {displayName}!</h1>
        <p className="mt-1 text-muted-foreground">Here&apos;s an overview of your recent activity</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Quick Actions */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with our services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link href="/services/market" className="group">
                <div className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Market Runs</h3>
                    <p className="text-sm text-muted-foreground">Order groceries and items</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
              <Link href="/profile" className="group">
                <div className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/50">
                    <User className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">My Profile</h3>
                    <p className="text-sm text-muted-foreground">View and edit your profile</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
              <Link href="/services" className="group">
                <div className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    <Clock className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">All Services</h3>
                    <p className="text-sm text-muted-foreground">Browse available services</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
              <Link href="/contact" className="group">
                <div className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    <Settings className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Get Help</h3>
                    <p className="text-sm text-muted-foreground">Contact support</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Account Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Account Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Orders</span>
              <span className="font-semibold">{orders.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Account Status</span>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Member Since</span>
              <span className="text-sm font-medium">
                {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "N/A"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Your latest service requests</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 font-semibold text-foreground">No orders yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">Book your first service to get started</p>
              <Button className="mt-4" asChild>
                <Link href="/services">Browse Services</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(order.status || "pending")}
                    <div>
                      <p className="font-medium text-foreground">{order.service_type || "Market Run"}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.dropoff
                          ? order.dropoff.slice(0, 30) + "..."
                          : new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {(order.total_amount || order.estimate?.total) && (
                      <span className="font-medium">
                        ₦{(order.total_amount || order.estimate?.total || 0).toLocaleString()}
                      </span>
                    )}
                    {getStatusBadge(order.status || "pending")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
