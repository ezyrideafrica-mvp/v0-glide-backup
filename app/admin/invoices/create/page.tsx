"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { Plus, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface InvoiceItem {
  id: number
  description: string
  quantity: number
  unit_price: number
}

export default function CreateInvoicePage() {
  const router = useRouter()
  const supabase = createClient()

  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [customerAddress, setCustomerAddress] = useState("")
  const [notes, setNotes] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [items, setItems] = useState<InvoiceItem[]>([{ id: 1, description: "", quantity: 1, unit_price: 0 }])
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0)
  const vat = subtotal * 0.075
  const total = subtotal + vat

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Generate invoice number
      const invoiceNumber = `${Date.now().toString().slice(-6)}`

      const { error } = await supabase.from("invoices").insert({
        invoice_number: invoiceNumber,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        customer_address: customerAddress,
        items: items,
        subtotal: subtotal,
        vat: vat,
        total: total,
        notes: notes,
        due_date: dueDate,
        status: "pending",
      })

      if (error) throw error

      router.push("/admin/invoices")
      router.refresh()
    } catch (error) {
      alert("Failed to create invoice")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/invoices">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create Invoice</h1>
          <p className="text-gray-500 mt-1">Generate a new customer invoice</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Customer Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Customer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerEmail">Email</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerPhone">Phone</Label>
                <Input
                  id="customerPhone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+234 800 000 0000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerAddress">Address</Label>
              <Textarea
                id="customerAddress"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="Customer address"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">VAT (7.5%)</span>
              <span>₦{vat.toLocaleString()}</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">₦{total.toLocaleString()}</span>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Invoice"}
            </Button>
          </CardContent>
        </Card>

        {/* Line Items */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Line Items</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addItem}>
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={item.id} className="flex gap-4 items-start">
                  <div className="flex-[3]">
                    <Label className="text-xs text-gray-500">Description</Label>
                    <Input
                      value={item.description}
                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                      placeholder="Item description"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <Label className="text-xs text-gray-500">Qty</Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, "quantity", Number.parseInt(e.target.value) || 1)}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <Label className="text-xs text-gray-500">Unit Price (₦)</Label>
                    <Input
                      type="number"
                      min="0"
                      value={item.unit_price}
                      onChange={(e) => updateItem(item.id, "unit_price", Number.parseFloat(e.target.value) || 0)}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <Label className="text-xs text-gray-500">Total</Label>
                    <p className="py-2 font-semibold">₦{(item.quantity * item.unit_price).toLocaleString()}</p>
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
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional notes for this invoice..."
              rows={3}
            />
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
