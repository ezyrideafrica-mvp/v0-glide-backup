"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { MapComponent } from "@/components/map-component"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Car, Clock, CreditCard } from "lucide-react"
import { WhatsAppButton } from "@/components/whatsapp-button"

const RIDE_OPTIONS = [
  {
    id: "lite",
    name: "Glide Lite",
    description: "Affordable compact rides",
    price: 1200,
    time: "4 min",
    icon: <Car className="w-6 h-6" />,
  },
  {
    id: "comfort",
    name: "Glide Comfort",
    description: "Sedans with extra legroom",
    price: 1800,
    time: "6 min",
    icon: <Car className="w-6 h-6 text-primary" />,
  },
  {
    id: "exec",
    name: "Glide Executive",
    description: "Premium business class rides",
    price: 3500,
    time: "8 min",
    icon: <Car className="w-6 h-6 text-secondary" />,
  },
]

export default function CityRidesPage() {
  const searchParams = useSearchParams()
  const [pickup, setPickup] = useState(searchParams.get("pickup") || "")
  const [dropoff, setDropoff] = useState(searchParams.get("dropoff") || "")
  const [selectedRide, setSelectedRide] = useState<string | null>(null)
  const [step, setStep] = useState<"location" | "vehicle" | "confirm">("location")

  const handleLocationSubmit = () => {
    if (pickup && dropoff) setStep("vehicle")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col md:flex-row h-[calc(100vh-64px)]">
        {/* Left Panel - Booking Controls */}
        <div className="w-full md:w-[400px] lg:w-[450px] bg-white p-6 shadow-xl z-10 overflow-y-auto border-r border-gray-100">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-primary mb-2">City Rides</h1>
              <p className="text-sm text-gray-500">Fast, safe, and reliable movement across Lagos</p>
            </div>

            {/* Location Inputs */}
            <div className="space-y-4 relative">
              {/* Connecting Line */}
              <div className="absolute left-[15px] top-[38px] bottom-[38px] w-0.5 bg-gray-200 z-0"></div>

              <div className="relative z-10">
                <label className="text-xs font-semibold text-gray-500 ml-8 mb-1 block">PICKUP</label>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <Input
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Enter pickup location"
                    className="flex-1 bg-gray-50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div className="relative z-10">
                <label className="text-xs font-semibold text-gray-500 ml-8 mb-1 block">DROPOFF</label>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <div className="w-3 h-3 bg-black rounded-sm"></div>
                  </div>
                  <Input
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    placeholder="Enter destination"
                    className="flex-1 bg-gray-50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
                  />
                </div>
              </div>
            </div>

            {step === "location" && (
              <Button
                className="w-full py-6 text-lg font-semibold"
                onClick={handleLocationSubmit}
                disabled={!pickup || !dropoff}
              >
                Find Rides
              </Button>
            )}

            {step === "vehicle" && (
              <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                <h3 className="font-semibold text-gray-900">Suggested Rides</h3>
                <div className="space-y-3">
                  {RIDE_OPTIONS.map((ride) => (
                    <Card
                      key={ride.id}
                      className={`p-4 cursor-pointer transition-all hover:border-primary ${selectedRide === ride.id ? "border-2 border-primary bg-blue-50/50" : "border-gray-100"}`}
                      onClick={() => setSelectedRide(ride.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            {ride.icon}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{ride.name}</h4>
                            <p className="text-xs text-gray-500">{ride.description}</p>
                            <div className="flex items-center gap-1 mt-1 text-xs text-green-600 font-medium">
                              <Clock className="w-3 h-3" />
                              {ride.time} away
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">₦{ride.price.toLocaleString()}</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-4 px-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <CreditCard className="w-4 h-4" />
                      <span>Cash</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary h-auto p-0 hover:bg-transparent">
                      Change
                    </Button>
                  </div>
                  <Button
                    className="w-full py-6 text-lg font-semibold"
                    disabled={!selectedRide}
                    onClick={() => setStep("confirm")}
                  >
                    Request Glide
                  </Button>
                </div>
              </div>
            )}

            {step === "confirm" && (
              <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 text-center py-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Connecting to Driver...</h3>
                <p className="text-gray-500">We are finding the best driver for your ride.</p>
                <div className="flex justify-center gap-2">
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>

                <div className="pt-8">
                  <p className="text-sm text-gray-500 mb-4">Want to follow up?</p>
                  <Button variant="outline" className="gap-2 w-full bg-transparent" asChild>
                    <a href="https://wa.link/55z2rb" target="_blank" rel="noopener noreferrer">
                      Chat on WhatsApp
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
