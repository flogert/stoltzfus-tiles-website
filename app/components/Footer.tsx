"use client";

import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { label: "Services", href: "/#services" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Reviews", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
  { label: "FAQ", href: "/faq" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com/stoltzfuscustomtiles",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/stoltzfuscustomtiles",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-teal-900 text-teal-100/80">
      {/* Subtle tile-pattern texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 12px), repeating-linear-gradient(-45deg, #fff 0px, #fff 1px, transparent 1px, transparent 12px)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-8">
        {/* Main row: logo + links + contact + socials */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">

          {/* Logo & tagline */}
          <div className="shrink-0">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
              <Image
                src="/stoltzfus-logo.png"
                alt="Stoltzfus Custom Tile"
                width={800}
                height={260}
                unoptimized
                className="h-24 w-auto"
                style={{ filter: "drop-shadow(0 0 1px rgba(15, 15, 15, 0.9)) drop-shadow(0 0 0.5px rgba(15, 15, 15, 0.7))" }}
              />
            </Link>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-teal-200/60">
              Lancaster County&apos;s trusted tile craftsmen.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation" className="flex gap-12 sm:gap-16">
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-teal-300 mb-3">Navigate</h3>
              <ul className="space-y-1.5">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-teal-100/65 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-teal-300 mb-3">Legal</h3>
              <ul className="space-y-1.5">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-teal-100/65 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Contact + socials */}
          <div className="text-sm">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-teal-300 mb-3">Contact</h3>
            <ul className="space-y-1.5 text-teal-200/65">
              <li>
                <a href="tel:+17175550142" className="hover:text-white transition-colors">(717) 555-0142</a>
              </li>
              <li>
                <a href="mailto:info@stoltzfuscustomtiles.com" className="hover:text-white transition-colors">info@stoltzfuscustomtiles.com</a>
              </li>
              <li className="text-teal-300/50 text-xs">Lancaster County, PA</li>
            </ul>

            {/* Social icons */}
            <div className="mt-4 flex gap-2">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-800/80 text-teal-300 ring-1 ring-teal-700/60 hover:bg-teal-600 hover:text-white transition-all duration-200"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex items-center justify-between border-t border-teal-800/60 pt-5">
          <p className="text-[11px] text-teal-400/50">
            &copy; {new Date().getFullYear()} Stoltzfus Custom Tile. All rights reserved.
          </p>
          <p className="text-[11px] text-teal-400/40">
            Mon–Fri 7–5 &middot; Sat 8–12
          </p>
        </div>
      </div>
    </footer>
  );
}
