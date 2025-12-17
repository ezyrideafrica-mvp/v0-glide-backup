"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Upload,
  Plus,
  Trash2,
  Download,
  Send,
  ClipboardPaste,
  ImageIcon,
  FileUp,
  Receipt,
  History,
  Eye,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface InvoiceItem {
  id: number
  description: string
  quantity: number
  unit_price: number
}

interface GeneratedInvoice {
  id: string
  invoice_number: string
  customer_name: string
  items: InvoiceItem[]
  subtotal: number
  vat: number
  total: number
  created_at: string
  status: string
}

export default function OperationHubPage() {
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form state
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [pastedText, setPastedText] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [items, setItems] = useState<InvoiceItem[]>([{ id: 1, description: "", quantity: 1, unit_price: 0 }])
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState("manual")

  // Generated invoice state
  const [generatedInvoice, setGeneratedInvoice] = useState<GeneratedInvoice | null>(null)
  const [invoiceHistory, setInvoiceHistory] = useState<GeneratedInvoice[]>([])
  const [showHistory, setShowHistory] = useState(false)

  // Item management
  const addItem = () => {
    setItems([...items, { id: Date.now(), description: "", quantity: 1, unit_price: 0 }])
  }

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id))
    }
  }

  const updateItem = (id: number, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0)
  const vat = subtotal * 0.075
  const total = subtotal + vat

  // Parse pasted text into items
  const parseTextToItems = (text: string): InvoiceItem[] => {
    const lines = text.split("\n").filter((line) => line.trim())
    return lines.map((line, index) => {
      // Try to parse formats like "Item Name - ₦1000" or "Item Name 1000" or "2x Item Name ₦500"
      const priceMatch = line.match(/[₦N]?\s*(\d+[\d,]*)/g)
      const qtyMatch = line.match(/^(\d+)\s*[xX]/)

      let quantity = 1
      let price = 0
      let description = line

      if (qtyMatch) {
        quantity = Number.parseInt(qtyMatch[1])
        description = line.replace(/^\d+\s*[xX]\s*/, "")
      }

      if (priceMatch) {
        const lastPrice = priceMatch[priceMatch.length - 1]
        price = Number.parseInt(lastPrice.replace(/[₦N,\s]/g, ""))
        description = description.replace(/[-–]\s*[₦N]?\s*[\d,]+\s*$/, "").trim()
      }

      return {
        id: Date.now() + index,
        description: description.trim() || line.trim(),
        quantity,
        unit_price: price,
      }
    })
  }

  // Handle paste action
  const handlePaste = () => {
    if (pastedText.trim()) {
      const parsedItems = parseTextToItems(pastedText)
      setItems(parsedItems)
      setActiveTab("manual")
    }
  }

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files))
    }
  }

  // Generate invoice
  const generateInvoice = async () => {
    if (!customerName.trim()) {
      alert("Please enter customer name")
      return
    }

    if (items.every((item) => !item.description.trim())) {
      alert("Please add at least one item")
      return
    }

    setIsProcessing(true)

    try {
      const invoiceNumber = `GN-${Date.now().toString().slice(-8)}`

      const invoiceData: GeneratedInvoice = {
        id: crypto.randomUUID(),
        invoice_number: invoiceNumber,
        customer_name: customerName,
        items: items.filter((item) => item.description.trim()),
        subtotal,
        vat,
        total,
        created_at: new Date().toISOString(),
        status: "generated",
      }

      // Save to Supabase
      const { error } = await supabase.from("invoices").insert({
        invoice_number: invoiceNumber,
        customer_name: customerName,
        customer_phone: customerPhone,
        items: items.filter((item) => item.description.trim()),
        subtotal,
        vat,
        total,
        status: "generated",
      })

      if (error) {
        console.error("Error saving invoice:", error)
      }

      setGeneratedInvoice(invoiceData)
      setInvoiceHistory((prev) => [invoiceData, ...prev])
    } catch (error) {
      console.error("Error generating invoice:", error)
      alert("Failed to generate invoice")
    } finally {
      setIsProcessing(false)
    }
  }

  // Download invoice as text/PDF placeholder
  const downloadInvoice = () => {
    if (!generatedInvoice) return

    const invoiceText = `
GLIDE NETWORK INVOICE
=====================
Invoice #: ${generatedInvoice.invoice_number}
Date: ${new Date(generatedInvoice.created_at).toLocaleDateString()}

BILL TO:
${generatedInvoice.customer_name}
${customerPhone || ""}

ITEMS:
${generatedInvoice.items.map((item) => `${item.description} (${item.quantity}x) - ₦${(item.quantity * item.unit_price).toLocaleString()}`).join("\n")}

---------------------
Subtotal: ₦${generatedInvoice.subtotal.toLocaleString()}
VAT (7.5%): ₦${generatedInvoice.vat.toLocaleString()}
TOTAL: ₦${generatedInvoice.total.toLocaleString()}

Thank you for your business!
Glide Network | glidenetwork.com
    `.trim()

    const blob = new Blob([invoiceText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `invoice-${generatedInvoice.invoice_number}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Send via WhatsApp
  const sendViaWhatsApp = () => {
    if (!generatedInvoice) return

    const itemsList = generatedInvoice.items
      .map(
        (item) => `• ${item.description} (${item.quantity}x) - ₦${(item.quantity * item.unit_price).toLocaleString()}`,
      )
      .join("\n")

    const message = encodeURIComponent(
      `📄 *GLIDE NETWORK INVOICE*\n\n` +
        `Invoice #: ${generatedInvoice.invoice_number}\n` +
        `Date: ${new Date(generatedInvoice.created_at).toLocaleDateString()}\n\n` +
        `*Bill To:* ${generatedInvoice.customer_name}\n\n` +
        `*Items:*\n${itemsList}\n\n` +
        `-------------------\n` +
        `Subtotal: ₦${generatedInvoice.subtotal.toLocaleString()}\n` +
        `VAT (7.5%): ₦${generatedInvoice.vat.toLocaleString()}\n` +
        `*TOTAL: ₦${generatedInvoice.total.toLocaleString()}*\n\n` +
        `Thank you for your business!\n` +
        `Glide Network`,
    )

    const phoneNumber = customerPhone ? customerPhone.replace(/\D/g, "") : "2347015471676"
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  // Reset form
  const resetForm = () => {
    setCustomerName("")
    setCustomerPhone("")
    setPastedText("")
    setUploadedFiles([])
    setItems([{ id: 1, description: "", quantity: 1, unit_price: 0 }])
    setGeneratedInvoice(null)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Operation Hub</h1>
          <p className="text-gray-500 mt-1">Generate and manage invoices from order lists</p>
        </div>
        <Button variant="outline" onClick={() => setShowHistory(!showHistory)} className="gap-2">
          <History className="w-4 h-4" />
          {showHistory ? "Hide History" : "View History"}
        </Button>
      </div>

      {showHistory && invoiceHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {invoiceHistory.slice(0, 5).map((inv) => (
                <div key={inv.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{inv.invoice_number}</p>
                    <p className="text-sm text-muted-foreground">{inv.customer_name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₦{inv.total.toLocaleString()}</p>
                    <Badge variant="secondary">{inv.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="w-5 h-5" />
                Customer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name *</Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter customer name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerPhone">Phone Number</Label>
                  <Input
                    id="customerPhone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Input Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Order Input</CardTitle>
              <CardDescription>Add items manually, paste a list, or upload a file</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="manual" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Manual
                  </TabsTrigger>
                  <TabsTrigger value="paste" className="gap-2">
                    <ClipboardPaste className="w-4 h-4" />
                    Paste
                  </TabsTrigger>
                  <TabsTrigger value="upload" className="gap-2">
                    <Upload className="w-4 h-4" />
                    Upload
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="manual" className="space-y-4 mt-4">
                  {items.map((item, index) => (
                    <div key={item.id} className="flex gap-3 items-start">
                      <div className="flex-[3] space-y-1">
                        <Label className="text-xs text-muted-foreground">Item {index + 1}</Label>
                        <Input
                          value={item.description}
                          onChange={(e) => updateItem(item.id, "description", e.target.value)}
                          placeholder="Item description"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <Label className="text-xs text-muted-foreground">Qty</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, "quantity", Number.parseInt(e.target.value) || 1)}
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <Label className="text-xs text-muted-foreground">Price (₦)</Label>
                        <Input
                          type="number"
                          min="0"
                          value={item.unit_price}
                          onChange={(e) => updateItem(item.id, "unit_price", Number.parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="pt-6">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          disabled={items.length === 1}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" onClick={addItem} className="w-full border-dashed bg-transparent">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </TabsContent>

                <TabsContent value="paste" className="space-y-4 mt-4">
                  <Textarea
                    value={pastedText}
                    onChange={(e) => setPastedText(e.target.value)}
                    placeholder={`Paste your order list here...

Example formats:
- 2kg Tomatoes - ₦3000
- Rice (50kg) ₦45000
- 3x Cooking Oil - 5000`}
                    rows={10}
                  />
                  <Button onClick={handlePaste} disabled={!pastedText.trim()} className="w-full">
                    <ClipboardPaste className="w-4 h-4 mr-2" />
                    Parse and Add Items
                  </Button>
                </TabsContent>

                <TabsContent value="upload" className="space-y-4 mt-4">
                  <div
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      multiple
                      accept=".txt,.doc,.docx,.pdf,image/*"
                      onChange={handleFileUpload}
                    />
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                        <FileUp className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">Click to upload or drag and drop</p>
                        <p className="text-sm text-muted-foreground">TXT, DOC, DOCX, PDF, or images with order lists</p>
                      </div>
                    </div>
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                          {file.type.startsWith("image/") ? (
                            <ImageIcon className="w-4 h-4 text-primary" />
                          ) : (
                            <FileText className="w-4 h-4 text-primary" />
                          )}
                          <span className="text-sm">{file.name}</span>
                          <Badge variant="secondary" className="ml-auto">
                            {(file.size / 1024).toFixed(1)} KB
                          </Badge>
                        </div>
                      ))}
                      <p className="text-sm text-muted-foreground">
                        Note: File parsing requires manual review. Please extract items manually.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Invoice Preview / Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {items.filter((item) => item.description.trim()).length > 0 ? (
                  items
                    .filter((item) => item.description.trim())
                    .map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.description} ({item.quantity}x)
                        </span>
                        <span>₦{(item.quantity * item.unit_price).toLocaleString()}</span>
                      </div>
                    ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No items added yet</p>
                )}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">VAT (7.5%)</span>
                  <span>₦{vat.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary">₦{total.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" onClick={generateInvoice} disabled={isProcessing || !customerName.trim()}>
                {isProcessing ? (
                  "Generating..."
                ) : (
                  <>
                    <Receipt className="w-4 h-4 mr-2" />
                    Generate Invoice
                  </>
                )}
              </Button>

              {generatedInvoice && (
                <>
                  <Button variant="outline" className="w-full bg-transparent" onClick={downloadInvoice}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Invoice
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-green-50 border-green-500 text-green-700 hover:bg-green-100"
                    onClick={sendViaWhatsApp}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send via WhatsApp
                  </Button>
                </>
              )}

              <Button variant="ghost" className="w-full" onClick={resetForm}>
                Clear & Start New
              </Button>
            </CardContent>
          </Card>

          {generatedInvoice && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Eye className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="font-medium text-green-800">Invoice Generated!</p>
                  <p className="text-sm text-green-600">#{generatedInvoice.invoice_number}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
