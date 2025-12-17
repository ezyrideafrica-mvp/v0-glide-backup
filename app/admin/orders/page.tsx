import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OrderStatusActions } from "@/components/admin/order-status-actions"

export default async function AdminOrdersPage() {
  const supabase = await createClient()

  const { data: orders } = await supabase.from("market_orders").select("*").order("created_at", { ascending: false })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
        <p className="text-gray-500 mt-1">View and manage all customer orders</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Order ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Items</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Dropoff</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Delivery Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Total</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order: any) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-mono">#{order.id?.slice(0, 8)}</td>
                    <td className="py-3 px-4 text-sm">{order.items?.length || 0} items</td>
                    <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">{order.dropoff}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{order.delivery_date || "N/A"}</td>
                    <td className="py-3 px-4 text-sm font-semibold">
                      ₦{order.estimate?.total?.toLocaleString() || "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "in_progress"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status?.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <OrderStatusActions orderId={order.id} currentStatus={order.status} />
                    </td>
                  </tr>
                ))}
                {(!orders || orders.length === 0) && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500">
                      No orders yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
