import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Glide Network account",
}

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-200px)] items-center justify-center bg-muted/30 px-4 py-12">
        <LoginForm />
      </main>
      <Footer />
    </>
  )
}
