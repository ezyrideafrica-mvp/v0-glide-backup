import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="bg-primary py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-4 text-pretty text-lg text-primary-foreground/80">
            Join thousands of satisfied customers who trust Glide Network for their service needs. Book your first
            service today and experience the difference.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" asChild className="gap-2">
              <Link href="/services">
                Book a Service
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              <Link href="/provider/register">Become a Provider</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
