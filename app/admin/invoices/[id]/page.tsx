import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Printer, Download } from "lucide-react"

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: invoice } = await supabase.from("invoices").select("*").eq("id", id).single()

  if (!invoice) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/invoices">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Invoice #{invoice.invoice_number}</h1>
            <p className="text-gray-500 mt-1">Created on {new Date(invoice.created_at).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-transparent">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" className="bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Invoice Preview */}
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <Image src="/logo.png" alt="Glide Network" width={150} height={75} />
              <p className="text-sm text-gray-500 mt-2">
                Lagos, Nigeria
                <br />
                info@glidenetwork.com
                <br />
                +234 800 000 0000
              </p>
            </div>
            <div className="text-right">
              <h2 className="text-3xl font-bold text-primary">INVOICE</h2>
              <p className="text-gray-500 mt-2">
                Invoice #: {invoice.invoice_number}
                <br />
                Date: {new Date(invoice.created_at).toLocaleDateString()}
                <br />
                Due: {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : "N/A"}
              </p>
              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                  invoice.status === "paid"
                    ? "bg-green-100 text-green-800"
                    : invoice.status === "overdue"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {invoice.status}
              </span>
            </div>
          </div>

          {/* Bill To */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">BILL TO</h3>
            <p className="text-gray-800">
              <strong>{invoice.customer_name}</strong>
              <br />
              {invoice.customer_email && (
                <>
                  {invoice.customer_email}
                  <br />
                </>
              )}
              {invoice.customer_phone && (
                <>
                  {invoice.customer_phone}
                  <br />
                </>
              )}
              {invoice.customer_address}
            </p>
          </div>

          {/* Items Table */}
          <table className="w-full mb-8">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 text-sm font-semibold text-gray-500">Description</th>
                <th className="text-center py-3 text-sm font-semibold text-gray-500">Qty</th>
                <th className="text-right py-3 text-sm font-semibold text-gray-500">Unit Price</th>
                <th className="text-right py-3 text-sm font-semibold text-gray-500">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items?.map((item: any, index: number) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 text-gray-800">{item.description}</td>
                  <td className="py-3 text-center text-gray-600">{item.quantity}</td>
                  <td className="py-3 text-right text-gray-600">₦{item.unit_price?.toLocaleString()}</td>
                  <td className="py-3 text-right font-medium">
                    ₦{(item.quantity * item.unit_price)?.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>₦{invoice.subtotal?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">VAT (7.5%)</span>
                <span>₦{invoice.vat?.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">₦{invoice.total?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">NOTES</h3>
              <p className="text-gray-600 text-sm">{invoice.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
            <p>Thank you for your business!</p>
            <p className="mt-1">Glide Network - Your One Stop to All Services</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
