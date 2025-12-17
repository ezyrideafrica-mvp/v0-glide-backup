import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProviderActions } from "@/components/admin/provider-actions"

export default async function AdminProvidersPage() {
  const supabase = await createClient()

  const { data: providers } = await supabase
    .from("service_providers")
    .select("*, profiles(first_name, last_name, email)")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Service Providers</h1>
        <p className="text-gray-500 mt-1">Approve and manage service provider applications</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Provider Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Business Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Owner</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Applied</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {providers?.map((provider: any) => (
                  <tr key={provider.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium">{provider.business_name}</td>
                    <td className="py-3 px-4 text-sm">
                      {provider.profiles?.first_name} {provider.profiles?.last_name}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{provider.profiles?.email}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                          provider.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : provider.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {provider.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {new Date(provider.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <ProviderActions
                        providerId={provider.id}
                        userId={provider.user_id}
                        currentStatus={provider.status}
                      />
                    </td>
                  </tr>
                ))}
                {(!providers || providers.length === 0) && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">
                      No provider applications yet
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
