import type { Metadata } from "next"
import { RegisterForm } from "@/components/auth/register-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a new Glide Network account",
}

export default function RegisterPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-200px)] items-center justify-center bg-muted/30 px-4 py-12">
        <RegisterForm />
      </main>
      <Footer />
    </>
  )
}
