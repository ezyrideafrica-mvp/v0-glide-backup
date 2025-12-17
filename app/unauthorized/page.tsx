import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShieldX } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center space-y-6">
        <Link href="/" className="inline-block">
          <Image src="/logo.png" alt="Glide Network" width={120} height={60} className="mx-auto" />
        </Link>

        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <ShieldX className="w-12 h-12 text-red-600" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Access Denied</h1>
          <p className="text-gray-600">
            You do not have permission to view this page. Please contact an administrator if you believe this is an
            error.
          </p>
        </div>

        <div className="space-y-3">
          <Button asChild className="w-full" size="lg">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" className="w-full bg-transparent" size="lg">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>

        <p className="text-sm text-gray-500">
          Need help?{" "}
          <a
            href="https://wa.link/55z2rb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Contact support
          </a>
        </p>
      </div>
    </div>
  )
}
