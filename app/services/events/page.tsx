"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { MapComponent } from "@/components/map-component"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, MapPin, Users, PartyPopper, Bus, Shield } from "lucide-react"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function EventMobilityPage() {
  const [venue, setVenue] = useState("")
  const [step, setStep] = useState<"details" | "needs" | "confirm">("details")
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    guests: "",
    needs: [] as string[],
  })

  const toggleNeed = (need: string) => {
    setFormData((prev) => ({
      ...prev,
      needs: prev.needs.includes(need) ? prev.needs.filter((n) => n !== need) : [...prev.needs, need],
    }))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col md:flex-row h-[calc(100vh-64px)]">
        {/* Left Panel - Booking Controls */}
        <div className="w-full md:w-[500px] bg-white p-8 shadow-xl z-10 overflow-y-auto border-r border-gray-100">
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <PartyPopper className="w-6 h-6 text-primary" />
                <h1 className="text-2xl font-bold text-primary">Event Mobility</h1>
              </div>
              <p className="text-sm text-gray-500">
                Coordinated transportation and logistics for events, weddings, and corporate outings.
              </p>
            </div>

            {step === "details" && (
              <div className="space-y-6 animate-in slide-in-from-left-4 duration-300">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Event Title</label>
                    <Input
                      placeholder="e.g. Annual Tech Conference 2025"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          type="date"
                          className="pl-9"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Est. Guests</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          type="number"
                          placeholder="100"
                          className="pl-9"
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Venue Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Enter venue address"
                        className="pl-9"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full py-6 text-lg font-semibold"
                  onClick={() => setStep("needs")}
                  disabled={!formData.title || !formData.date || !venue}
                >
                  Next: Logistics Needs
                </Button>
              </div>
            )}

            {step === "needs" && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Transportation Requirements</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: "shuttle", label: "Guest Shuttles (Buses)", icon: <Bus className="w-4 h-4" /> },
                      { id: "vip", label: "VIP Chauffeur Service", icon: <Shield className="w-4 h-4" /> },
                      { id: "logistics", label: "Equipment Logistics", icon: <PartyPopper className="w-4 h-4" /> },
                      { id: "tourism", label: "Tourism / City Tours", icon: <MapPin className="w-4 h-4" /> },
                    ].map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${formData.needs.includes(item.id) ? "border-primary bg-blue-50" : "border-gray-200 hover:bg-gray-50"}`}
                        onClick={() => toggleNeed(item.id)}
                      >
                        <Checkbox checked={formData.needs.includes(item.id)} />
                        <div className="flex items-center gap-2">
                          {item.icon}
                          <span className="text-sm font-medium">{item.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Additional Details</label>
                  <Textarea placeholder="Tell us more about your event needs..." className="h-32" />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setStep("details")}>
                    Back
                  </Button>
                  <Button className="flex-1 py-6 font-semibold" onClick={() => setStep("confirm")}>
                    Request Proposal
                  </Button>
                </div>
              </div>
            )}

            {step === "confirm" && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 text-center py-8">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PartyPopper className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Request Received!</h3>
                <p className="text-gray-500">
                  Our event logistics team will review your requirements and send a custom proposal within 24 hours.
                </p>

                <div className="pt-8 space-y-3">
                  <Button className="w-full py-6 text-lg bg-primary hover:bg-primary/90">Return to Dashboard</Button>

                  <p className="text-sm text-gray-500 pt-4">Urgent request?</p>
                  <Button variant="outline" className="gap-2 w-full bg-transparent" asChild>
                    <a href="https://wa.link/55z2rb" target="_blank" rel="noopener noreferrer">
                      Speak with Event Planner
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Map */}
        <div className="flex-1 relative bg-gray-100 hidden md:block">
          <MapComponent dropoff={venue} />
        </div>
      </main>
      <WhatsAppButton />
    </div>
  )
}
