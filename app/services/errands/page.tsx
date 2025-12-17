"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { MapComponent } from "@/components/map-component"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Package, User, Phone, Truck, Bike } from "lucide-react"
import { WhatsAppButton } from "@/components/whatsapp-button"

const DELIVERY_TYPES = [
  {
    id: "bike",
    name: "Motorbike",
    description: "Fast for small items & docs",
    basePrice: 800,
    icon: <Bike className="w-6 h-6" />,
  },
  {
    id: "van",
    name: "Delivery Van",
    description: "For larger boxes & bulk",
    basePrice: 2500,
    icon: <Truck className="w-6 h-6" />,
  },
]

export default function ErrandsPage() {
  const searchParams = useSearchParams()
  const [pickup, setPickup] = useState(searchParams.get("pickup") || "")
  const [dropoff, setDropoff] = useState(searchParams.get("dropoff") || "")
  const [step, setStep] = useState<"route" | "details" | "confirm">("route")
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [recipient, setRecipient] = useState({ name: "", phone: "" })
  const [packageDetails, setPackageDetails] = useState("")

  const handleRouteSubmit = () => {
    if (pickup && dropoff) setStep("details")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col md:flex-row h-[calc(100vh-64px)]">
        {/* Left Panel - Booking Controls */}
        <div className="w-full md:w-[450px] bg-white p-6 shadow-xl z-10 overflow-y-auto border-r border-gray-100">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-6 h-6 text-primary" />
                <h1 className="text-2xl font-bold text-primary">On-Demand Errands</h1>
              </div>
              <p className="text-sm text-gray-500">Send packages, documents, and run errands instantly.</p>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-between px-2">
              {["Route", "Details", "Confirm"].map((s, i) => {
                const isActive = ["route", "details", "confirm"].indexOf(step) >= i
                return (
                  <div key={s} className="flex flex-col items-center gap-1">
                    <div className={`w-3 h-3 rounded-full ${isActive ? "bg-primary" : "bg-gray-200"}`} />
                    <span className={`text-[10px] font-medium ${isActive ? "text-primary" : "text-gray-400"}`}>
                      {s}
                    </span>
                  </div>
                )
              })}
            </div>

            {step === "route" && (
              <div className="space-y-6 animate-in slide-in-from-left-4 duration-300">
                <div className="space-y-4 relative">
                  <div className="absolute left-[15px] top-[38px] bottom-[38px] w-0.5 bg-gray-200 z-0"></div>

                  <div className="relative z-10">
                    <label className="text-xs font-semibold text-gray-500 ml-8 mb-1 block">PICKUP FROM</label>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                      </div>
                      <Input
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        placeholder="Sender's address"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="relative z-10">
                    <label className="text-xs font-semibold text-gray-500 ml-8 mb-1 block">DELIVER TO</label>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                        <div className="w-3 h-3 bg-black rounded-sm"></div>
                      </div>
                      <Input
                        value={dropoff}
                        onChange={(e) => setDropoff(e.target.value)}
                        placeholder="Recipient's address"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full py-6 text-lg font-semibold"
                  onClick={handleRouteSubmit}
                  disabled={!pickup || !dropoff}
                >
                  Next: Package Details
                </Button>
              </div>
            )}

            {step === "details" && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Select Vehicle</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {DELIVERY_TYPES.map((type) => (
                      <Card
                        key={type.id}
                        className={`p-3 cursor-pointer transition-all hover:border-primary ${selectedType === type.id ? "border-2 border-primary bg-blue-50" : "border-gray-100"}`}
                        onClick={() => setSelectedType(type.id)}
                      >
                        <div className="flex flex-col items-center text-center gap-2">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                            {type.icon}
                          </div>
                          <div>
                            <div className="font-bold text-sm">{type.name}</div>
                            <div className="text-[10px] text-gray-500">{type.description}</div>
                          </div>
                          <div className="font-bold text-primary">₦{type.basePrice}+</div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Recipient Info</h3>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Recipient Name"
                      value={recipient.name}
                      onChange={(e) => setRecipient({ ...recipient, name: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Recipient Phone"
                      value={recipient.phone}
                      onChange={(e) => setRecipient({ ...recipient, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Package Description</h3>
                  <Textarea
                    placeholder="What are we delivering? (e.g. Documents, Laptop, Food)"
                    value={packageDetails}
                    onChange={(e) => setPackageDetails(e.target.value)}
                    className="h-24"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setStep("route")}>
                    Back
                  </Button>
                  <Button
                    className="flex-1 py-6 font-semibold"
                    disabled={!selectedType || !recipient.name || !recipient.phone}
                    onClick={() => setStep("confirm")}
                  >
                    Review Order
                  </Button>
                </div>
              </div>
            )}

            {step === "confirm" && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 text-center py-8">
                <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Ready to Send?</h3>
                <p className="text-gray-500">A courier will be assigned immediately after payment.</p>

                <div className="bg-gray-50 p-4 rounded-lg text-left space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Delivery Fee</span>
                    <span className="font-bold">₦{(selectedType === "bike" ? 1200 : 3500).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Distance</span>
                    <span className="font-bold">5.2 km</span>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <Button className="w-full py-6 text-lg bg-green-600 hover:bg-green-700">Proceed to Payment</Button>

                  <p className="text-sm text-gray-500 pt-2">Special instructions?</p>
                  <Button variant="outline" className="gap-2 w-full bg-transparent" asChild>
                    <a href="https://wa.link/55z2rb" target="_blank" rel="noopener noreferrer">
                      Message Courier on WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Map */}
        <div className="flex-1 relative bg-gray-100 hidden md:block">
          <MapComponent pickup={pickup} dropoff={dropoff} />
        </div>
      </main>
      <WhatsAppButton />
    </div>
  )
}
