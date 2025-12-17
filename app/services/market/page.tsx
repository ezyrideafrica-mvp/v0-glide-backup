"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { MapComponent } from "@/components/map-component"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Plus, Trash2, Calculator, Calendar, MapPin } from "lucide-react"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { useSearchParams } from "next/navigation"

interface MarketItem {
  id: number
  name: string
  quantity: string
  notes: string
}

export default function MarketRunsPage() {
  const searchParams = useSearchParams()

  const [items, setItems] = useState<MarketItem[]>([{ id: 1, name: "", quantity: "", notes: "" }])
  const [dropoff, setDropoff] = useState(searchParams.get("dropoff") || "")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [isCalculating, setIsCalculating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [estimate, setEstimate] = useState<{
    subtotal: number
    vat: number
    service: number
    total: number
  } | null>(null)

  const [step, setStep] = useState<"list" | "delivery" | "summary">("list")

  const addItem = () => {
    setItems([...items, { id: Date.now(), name: "", quantity: "", notes: "" }])
  }

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id))
    }
  }

  const updateItem = (id: number, field: keyof MarketItem, value: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const calculateEstimate = () => {
    setIsCalculating(true)

    setTimeout(() => {
      const mockSubtotal = items.length * 5000 + Math.random() * 10000
      const service = 2500
      const vat = (mockSubtotal + service) * 0.075

      setEstimate({
        subtotal: Math.round(mockSubtotal),
        service,
        vat: Math.round(vat),
        total: Math.round(mockSubtotal + service + vat),
      })

      setIsCalculating(false)
      setStep("delivery")
    }, 1500)
  }

  // 🚀 UPDATED: Submit order + redirect to WhatsApp with dynamic message
  const submitOrder = async () => {
    if (!estimate) return

    setIsSubmitting(true)

    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          dropoff,
          deliveryDate,
          estimate,
          userId: null,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setIsSubmitting(false)
        alert("Error creating order: " + data.error)
        return
      }

      // Redirect to vendor WhatsApp link returned by API
      if (data.vendorLink) {
        window.location.href = data.vendorLink
      } else {
        setIsSubmitting(false)
        alert("Order saved, but WhatsApp link missing.")
      }
    } catch (err) {
      setIsSubmitting(false)
      alert("Unable to submit order. Check your internet connection.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col md:flex-row h-[calc(100vh-64px)]">
        {/* LEFT SIDE */}
        <div className="w-full md:w-[500px] lg:w-[600px] bg-white p-6 shadow-xl z-10 overflow-y-auto border-r border-gray-100">
          <div className="space-y-6">
            
            {/* HEADER */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart className="w-6 h-6 text-primary" />
                <h1 className="text-2xl font-bold text-primary">Market Runs</h1>
              </div>
              <p className="text-sm text-gray-500">
                Professional agents shop for fresh groceries and essentials.
              </p>
            </div>

            {/* ===================== LIST STEP ===================== */}
            {step === "list" && (
              <div className="space-y-6 animate-in slide-in-from-left-4 duration-300">
                <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
                  List your items below. Our AI will estimate the cost based on current market prices.
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-2 items-start">
                      <div className="flex-1 space-y-2">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Item name (e.g. Tomatoes)"
                            value={item.name}
                            onChange={(e) => updateItem(item.id, "name", e.target.value)}
                            className="flex-[2]"
                          />
                          <Input
                            placeholder="Qty"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, "quantity", e.target.value)}
                            className="flex-1"
                          />
                        </div>

                        <Input
                          placeholder="Notes (e.g. Fresh, Ripe, Brand)"
                          value={item.notes}
                          onChange={(e) => updateItem(item.id, "notes", e.target.value)}
                          className="text-xs h-8"
                        />
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-1"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button variant="outline" onClick={addItem} className="w-full border-dashed border-2">
                  <Plus className="w-4 h-4 mr-2" /> Add Another Item
                </Button>

                <Button
                  className="w-full py-6 text-lg font-semibold"
                  onClick={calculateEstimate}
                  disabled={isCalculating || items.some((i) => !i.name)}
                >
                  {isCalculating ? (
                    <span className="flex items-center gap-2">
                      <Calculator className="w-4 h-4 animate-spin" /> Calculating...
                    </span>
                  ) : (
                    "Calculate Estimate"
                  )}
                </Button>
              </div>
            )}

            {/* ===================== DELIVERY STEP ===================== */}
            {step === "delivery" && estimate && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">

                <div className="bg-gray-50 p-6 rounded-xl space-y-3">
                  <h3 className="font-bold text-lg">Estimated Cost</h3>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Market Items (Est.)</span>
                    <span>₦{estimate.subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Service Fee</span>
                    <span>₦{estimate.service.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">VAT (7.5%)</span>
                    <span>₦{estimate.vat.toLocaleString()}</span>
                  </div>

                  <div className="border-t pt-3 flex justify-between font-bold text-lg text-primary">
                    <span>Total Estimate</span>
                    <span>₦{estimate.total.toLocaleString()}</span>
                  </div>

                  <p className="text-xs text-gray-400 mt-2">
                    *Final price may vary based on actual market rates.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Delivery Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        value={dropoff}
                        onChange={(e) => setDropoff(e.target.value)}
                        placeholder="Enter delivery address"
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Preferred Delivery Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="pl-9"
                      />
                    </div>

                    <p className="text-xs text-blue-600 mt-1">
                      We recommend weekends for bulk market runs.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep("list")}
                  >
                    Back
                  </Button>

                  <Button
                    className="flex-[2]"
                    disabled={!dropoff || !deliveryDate}
                    onClick={() => setStep("summary")}
                  >
                    Proceed to Summary
                  </Button>
                </div>
              </div>
            )}

            {/* ===================== SUMMARY STEP ===================== */}
            {step === "summary" && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 text-center py-8">
                
                <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900">Order Ready!</h3>
                <p className="text-gray-500">Your market list has been prepared. Submit to our agents.</p>

                <div className="pt-8 space-y-3">
                  <Button
                    className="w-full py-6 text-lg bg-green-600 hover:bg-green-700"
                    onClick={submitOrder}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Order"}
                  </Button>

                  <p className="text-sm text-gray-500 pt-4">Need to chat with an agent?</p>
                  <Button variant="outline" className="gap-2 w-full" asChild>
                    <a href="https://wa.link/55z2rb" target="_blank" rel="noopener noreferrer">
                      Chat on WhatsApp
                    </a>
                  </Button>
                </div>

              </div>
            )}

          </div>
        </div>

        {/* RIGHT SIDE MAP */}
        <div className="flex-1 relative bg-gray-100 hidden md:block">
          <MapComponent dropoff={dropoff} />
        </div>
      </main>

      <WhatsAppButton />
    </div>
  )
}
