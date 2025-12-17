import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage system settings and configurations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>Update your business details displayed on invoices</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input id="businessName" defaultValue="Glide Network" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessEmail">Email</Label>
              <Input id="businessEmail" defaultValue="info@glidenetwork.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessPhone">Phone</Label>
              <Input id="businessPhone" defaultValue="+234 800 000 0000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessAddress">Address</Label>
              <Input id="businessAddress" defaultValue="Lagos, Nigeria" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Fees</CardTitle>
            <CardDescription>Configure service fees and pricing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="marketFee">Market Runs Service Fee (₦)</Label>
              <Input id="marketFee" type="number" defaultValue="2500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vatRate">VAT Rate (%)</Label>
              <Input id="vatRate" type="number" defaultValue="7.5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliveryBase">Base Delivery Fee (₦)</Label>
              <Input id="deliveryBase" type="number" defaultValue="1000" />
            </div>
            <Button>Update Fees</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>WhatsApp Integration</CardTitle>
            <CardDescription>Configure WhatsApp business link</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsappLink">WhatsApp Link</Label>
              <Input id="whatsappLink" defaultValue="https://wa.link/55z2rb" />
            </div>
            <Button>Update Link</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure email notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New Order Alerts</p>
                <p className="text-sm text-gray-500">Get notified when new orders come in</p>
              </div>
              <input type="checkbox" defaultChecked className="h-5 w-5" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Provider Applications</p>
                <p className="text-sm text-gray-500">Get notified of new provider applications</p>
              </div>
              <input type="checkbox" defaultChecked className="h-5 w-5" />
            </div>
            <Button>Save Preferences</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
