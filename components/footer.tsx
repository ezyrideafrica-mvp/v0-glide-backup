import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="Glide Network"
                width={128}
                height={64}
                className="h-16 w-32"
              />
            </div>
            <p className="text-sm text-foreground/70">
              Your one stop to all services. Fast, reliable, and professional.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-primary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-foreground/70 hover:text-primary">Home</Link></li>
              <li><Link href="/#services" className="text-sm text-foreground/70 hover:text-primary">Services</Link></li>
              <li><Link href="/#about" className="text-sm text-foreground/70 hover:text-primary">About</Link></li>
              <li><Link href="/contact" className="text-sm text-foreground/70 hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-primary mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary">City Rides</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary">Market Runs</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary">On-Demand Errands</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-primary">Premium Mobility</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-primary mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><a href="mailto:info@glidenetwork.biz" className="text-sm text-foreground/70 hover:text-primary">info@glidenetwork.biz</a></li>
              <li><a href="tel:+2347015471676" className="text-sm text-foreground/70 hover:text-primary">+234 (701) 547 1676</a></li>
              <li><p className="text-sm text-foreground/70">Lagos, Nigeria</p></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/70">
            © 2025 Glide Network. All rights reserved. [Built By Golden Creed Technologies]
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-foreground/70 hover:text-primary">Privacy</a>
            <a href="#" className="text-sm text-foreground/70 hover:text-primary">Terms</a>
            <a href="#" className="text-sm text-foreground/70 hover:text-primary">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
