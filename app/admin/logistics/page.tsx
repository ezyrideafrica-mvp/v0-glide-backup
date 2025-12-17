import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, MapPin, Clock, CheckCircle } from "lucide-react"

export default function AdminLogisticsPage() {
  const stats = [
    { title: "Active Deliveries", value: 12, icon: Truck, color: "text-blue-500" },
    { title: "Pending Pickups", value: 8, icon: MapPin, color: "text-orange-500" },
    { title: "In Transit", value: 5, icon: Clock, color: "text-purple-500" },
    { title: "Completed Today", value: 23, icon: CheckCircle, color: "text-green-500" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Logistics Hub</h1>
        <p className="text-gray-500 mt-1">Track and manage all delivery operations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <Icon className={`w-10 h-10 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Live Tracking Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Live map tracking coming soon</p>
              <p className="text-sm text-gray-400 mt-1">Real-time delivery tracking will be displayed here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
