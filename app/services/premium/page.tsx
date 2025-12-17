"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { MapComponent } from "@/components/map-component"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Car, Star, Shield } from "lucide-react"
import { WhatsAppButton } from "@/components/whatsapp-button"

const PREMIUM_OPTIONS = [
  {
    id: "lux",
    name: "Glide Lux",
    description: "High-end luxury sedans",
    price: 5000,
    time: "10 min",
    icon: <Star className="w-6 h-6 text-yellow-500" />,
  },
  {
    id: "suv",
    name: "Glide SUV",
    description: "Spacious premium SUVs",
    price: 8500,
    time: "12 min",
    icon: <Shield className="w-6 h-6 text-primary" />,
  },
  {
    id: "vip",
    name: "VIP Executive",
    description: "Chauffeur driven luxury",
    price: 15000,
    time: "24h notice",
    icon: <Car className="w-6 h-6 text-purple-600" />,
  },
]

export default function PremiumMobilityPage() {
  const searchParams = useSearchParams()
  const [pickup, setPickup] = useState(searchParams.get("pickup") || "")
  const [dropoff, setDropoff] = useState(searchParams.get("dropoff") || "")
  const [selectedRide, setSelectedRide] = useState<string | null>(null)
  const [step, setStep] = useState<"location" | "vehicle" | "confirm">("location")

  const handleLocationSubmit = () => {
    if (pickup && dropoff) setStep("vehicle")
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 flex flex-col md:flex-row h-[calc(100vh-64px)]">
        {/* Left Panel - Booking Controls */}
        <div className="w-full md:w-[450px] bg-white p-8 shadow-2xl z-10 overflow-y-auto border-r border-gray-200">
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-bold tracking-widest text-primary uppercase">Premium Service</span>
              </div>
              <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Premium Mobility</h1>
              <p className="text-slate-500">High-end ride services with upgraded comfort and priority access.</p>
            </div>

            {/* Location Inputs */}
            <div className="space-y-6 relative p-6 bg-slate-50 rounded-xl border border-slate-100">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 mb-1.5 block tracking-wide">PICKUP LOCATION</label>
                  <Input
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Enter pickup location"
                    className="bg-white border-slate-200 h-12"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 mb-1.5 block tracking-wide">DESTINATION</label>
                  <Input
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    placeholder="Enter destination"
                    className="bg-white border-slate-200 h-12"
                  />
                </div>
              </div>
            </div>

            {step === "location" && (
              <Button
                className="w-full py-6 text-lg font-semibold bg-slate-900 hover:bg-slate-800 text-white"
                onClick={handleLocationSubmit}
                disabled={!pickup || !dropoff}
              >
                View Premium Options
              </Button>
            )}

            {step === "vehicle" && (
              <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                <h3 className="font-serif font-bold text-slate-900 text-lg">Select Vehicle Class</h3>
                <div className="space-y-4">
                  {PREMIUM_OPTIONS.map((ride) => (
                    <Card
                      key={ride.id}
                      className={`p-5 cursor-pointer transition-all hover:shadow-md ${selectedRide === ride.id ? "border-2 border-slate-900 bg-slate-50" : "border-slate-100"}`}
                      onClick={() => setSelectedRide(ride.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg">
                            {ride.icon}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-lg">{ride.name}</h4>
                            <p className="text-sm text-slate-500">{ride.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-xl text-slate-900">₦{ride.price.toLocaleString()}</div>
                          <div className="text-xs text-slate-400 font-medium mt-1">{ride.time}</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <Button
                    className="w-full py-6 text-lg font-semibold bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/20"
                    disabled={!selectedRide}
                    onClick={() => setStep("confirm")}
                  >
                    Request Premium Ride
                  </Button>
                </div>
              </div>
            )}

            {step === "confirm" && (
              <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 text-center py-8">
                <div className="w-20 h-20 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Star className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900">Confirming VIP Request</h3>
                <p className="text-slate-500">A dedicated concierge is reviewing your request.</p>

                <div className="pt-8">
                  <Button className="gap-2 w-full bg-[#25D366] hover:bg-[#128C7E] text-white border-0" asChild>
                    <a href="https://wa.link/55z2rb" target="_blank" rel="noopener noreferrer">
                      Contact Concierge via WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Map */}
        <div className="flex-1 relative bg-slate-200 hidden md:block">
          <MapComponent pickup={pickup} dropoff={dropoff} className="grayscale contrast-125" />
        </div>
      </main>
      <WhatsAppButton />
    </div>
  )
}
