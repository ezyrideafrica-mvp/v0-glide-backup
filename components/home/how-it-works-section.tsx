import { ClipboardList, UserCheck, Clock, CheckCircle } from "lucide-react"

const steps = [
  {
    step: 1,
    title: "Choose a Service",
    description: "Browse our available services and select the one that fits your needs.",
    icon: ClipboardList,
  },
  {
    step: 2,
    title: "Provide Details",
    description: "Fill in your requirements, upload lists or images, and specify preferences.",
    icon: UserCheck,
  },
  {
    step: 3,
    title: "We Process",
    description: "Our trusted providers handle your request with care and professionalism.",
    icon: Clock,
  },
  {
    step: 4,
    title: "Get Delivery",
    description: "Receive your items or service completion with satisfaction guaranteed.",
    icon: CheckCircle,
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">How It Works</h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Getting started with Glide Network is easy. Follow these simple steps to book your first service.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Connection line */}
          <div className="absolute left-1/2 top-12 hidden h-0.5 w-[calc(100%-200px)] -translate-x-1/2 bg-border lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.step} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border-4 border-background bg-primary/10 shadow-lg">
                    <Icon className="h-10 w-10 text-primary" />
                    <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
