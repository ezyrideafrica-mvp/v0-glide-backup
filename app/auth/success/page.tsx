import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center space-y-6">
        <Link href="/" className="inline-block">
          <Image src="/logo.png" alt="Glide Network" width={120} height={60} className="mx-auto" />
        </Link>

        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-primary">Email Verified!</h1>
          <p className="text-gray-600">Your account is now activated. You can now sign in to access your dashboard.</p>
        </div>

        <Button asChild className="w-full" size="lg">
          <Link href="/auth/login">Sign In to Dashboard</Link>
        </Button>

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
