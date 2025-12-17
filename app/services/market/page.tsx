"use client"

import type React from "react"

import { useState, Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Plus, Trash2, MapPin, Calendar, Upload, FileText, ImageIcon } from "lucide-react"
import { useSearchParams } from "next/navigation"

interface MarketItem {
  id: number
  name: string
  quantity: string
  notes: string
}

function MarketRunsContent() {
  const searchParams = useSearchParams()

  const [items, setItems] = useState<MarketItem[]>([{ id: 1, name: "", quantity: "", notes: "" }])
  const [dropoff, setDropoff] = useState(searchParams.get("dropoff") || "")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [manualList, setManualList] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [step, setStep] = useState<"input" | "summary">("input")
  const [inputMethod, setInputMethod] = useState<"items" | "text" | "upload">("items")
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files))
    }
  }

  const buildOrderList = () => {
    let orderText = ""

    if (inputMethod === "items") {
      orderText = items
        .filter((item) => item.name.trim())
        .map((item) => `- ${item.name} (${item.quantity || "1"})${item.notes ? ` - ${item.notes}` : ""}`)
        .join("\n")
    } else if (inputMethod === "text") {
      orderText = manualList
    } else if (inputMethod === "upload") {
      orderText = `[${uploadedFiles.length} file(s) uploaded - please check WhatsApp for attachments]`
    }

    return orderText
  }

  const submitOrder = () => {
    setIsSubmitting(true)

    const orderList = buildOrderList()
    const message = encodeURIComponent(
      `🛒 *NEW MARKET RUNS ORDER*\n\n` +
        `📍 *Delivery Location:* ${dropoff}\n` +
        `📅 *Preferred Date:* ${deliveryDate || "ASAP"}\n\n` +
        `📝 *Order List:*\n${orderList}\n\n` +
        `---\nSent from Glide Network App`,
    )

    // Redirect to WhatsApp with the order details
    window.location.href = `https://wa.me/2347015471676?text=${message}`
  }

  const canProceed = () => {
    if (!dropoff) return false

    if (inputMethod === "items") {
      return items.some((item) => item.name.trim())
    } else if (inputMethod === "text") {
      return manualList.trim().length > 0
    } else if (inputMethod === "upload") {
      return uploadedFiles.length > 0
    }
    return false
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Market Runs</h1>
            <p className="text-muted-foreground">
              Professional agents shop for fresh groceries and essentials from local markets
            </p>
          </div>

          {step === "input" && (
            <div className="space-y-8">
              {/* Input Method Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>How would you like to submit your list?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      variant={inputMethod === "items" ? "default" : "outline"}
                      className={`h-auto py-4 flex flex-col gap-2 ${inputMethod !== "items" ? "bg-transparent" : ""}`}
                      onClick={() => setInputMethod("items")}
                    >
                      <ShoppingCart className="w-6 h-6" />
                      <span>Add Items</span>
                    </Button>
                    <Button
                      variant={inputMethod === "text" ? "default" : "outline"}
                      className={`h-auto py-4 flex flex-col gap-2 ${inputMethod !== "text" ? "bg-transparent" : ""}`}
                      onClick={() => setInputMethod("text")}
                    >
                      <FileText className="w-6 h-6" />
                      <span>Type/Paste List</span>
                    </Button>
                    <Button
                      variant={inputMethod === "upload" ? "default" : "outline"}
                      className={`h-auto py-4 flex flex-col gap-2 ${inputMethod !== "upload" ? "bg-transparent" : ""}`}
                      onClick={() => setInputMethod("upload")}
                    >
                      <Upload className="w-6 h-6" />
                      <span>Upload File/Image</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Items Input */}
              {inputMethod === "items" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Shopping List</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                            className="text-sm"
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
                    <Button
                      variant="outline"
                      onClick={addItem}
                      className="w-full border-dashed border-2 bg-transparent"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Another Item
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Text Input */}
              {inputMethod === "text" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Paste or Type Your List</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Enter your shopping list here...&#10;&#10;Example:&#10;- 2kg Tomatoes&#10;- 1 bag Rice (50kg)&#10;- Fresh fish (medium size)&#10;- Cooking oil (5 liters)"
                      value={manualList}
                      onChange={(e) => setManualList(e.target.value)}
                      rows={10}
                      className="resize-none"
                    />
                  </CardContent>
                </Card>
              )}

              {/* File Upload */}
              {inputMethod === "upload" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Your List</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        multiple
                        accept=".txt,.doc,.docx,.pdf,image/*"
                        onChange={handleFileUpload}
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">Click to upload or drag and drop</p>
                            <p className="text-sm text-muted-foreground">
                              Supports images, PDFs, Word docs, and text files
                            </p>
                          </div>
                        </div>
                      </label>
                      {uploadedFiles.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-center gap-2 text-sm text-primary">
                              <FileText className="w-4 h-4" />
                              {file.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Delivery Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dropoff">Delivery Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="dropoff"
                        value={dropoff}
                        onChange={(e) => setDropoff(e.target.value)}
                        placeholder="Enter your delivery address"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Delivery Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="date"
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button className="w-full py-6 text-lg" onClick={() => setStep("summary")} disabled={!canProceed()}>
                Continue to Summary
              </Button>
            </div>
          )}

          {step === "summary" && (
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-muted-foreground">Delivery Location</p>
                    <p className="font-medium">{dropoff}</p>
                  </div>
                  {deliveryDate && (
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <p className="text-sm text-muted-foreground">Preferred Date</p>
                      <p className="font-medium">{new Date(deliveryDate).toLocaleDateString()}</p>
                    </div>
                  )}
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-muted-foreground">Your Order</p>
                    <pre className="whitespace-pre-wrap text-sm font-mono">{buildOrderList()}</pre>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep("input")}>
                  Back to Edit
                </Button>
                <Button
                  className="flex-[2] py-6 bg-green-600 hover:bg-green-700"
                  onClick={submitOrder}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Send Order via WhatsApp"}
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Your order will be sent to our WhatsApp for processing. An agent will confirm pricing and delivery.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function MarketRunsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      }
    >
      <MarketRunsContent />
    </Suspense>
  )
}
