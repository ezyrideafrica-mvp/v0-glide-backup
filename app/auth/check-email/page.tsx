import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Mail } from "lucide-react"

export default function CheckEmailPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-4 text-center">
            <Link href="/" className="mx-auto">
              <Image src="/logo.png" alt="Glide Network" width={120} height={60} />
            </Link>

            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Mail className="w-8 h-8 text-primary" />
            </div>

            <CardTitle className="text-2xl">Check Your Email</CardTitle>
            <CardDescription>We've sent you a confirmation link</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Click the link in the email we just sent you to confirm your account and get started with Glide Network.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or contact support.
              </p>
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full bg-transparent" variant="outline">
                <Link href="/">Back to Home</Link>
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already confirmed?{" "}
                <Link href="/auth/login" className="text-primary hover:underline font-semibold">
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
