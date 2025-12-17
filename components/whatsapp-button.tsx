"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppButton() {
  return (
    <a
      href="https://chat.whatsapp.com/HbTCRXXhGVzFsHIpqFQEaN"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 animate-bounce"
    >
      <Button
        size="lg"
        className="rounded-full w-16 h-16 bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg p-0 flex items-center justify-center transition-transform hover:scale-110"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="sr-only">Chat on WhatsApp</span>
      </Button>
    </a>
  )
}
