"use client";

import Link from "next/link";

const socialLinks = [
  { name: 'Facebook', href: '#' },
  { name: 'Instagram', href: '#' },
  { name: 'LinkedIn', href: '#' },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-900/10 bg-slate-900 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block text-2xl font-bold tracking-tight text-white hover:text-teal-400 transition-colors">
              STOLTZFUS TILES
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Expert tile installation services specializing in custom bathrooms, kitchens, and backsplashes. 
              Quality craftsmanship guaranteed.
            </p>
            <div className="mt-6 flex space-x-6">
              {socialLinks.map((item) => (
                <a key={item.name} href={item.href} className="text-slate-400 hover:text-teal-400 transition-colors">
                  <span className="sr-only">{item.name}</span>
                  <div className="h-6 w-6 rounded bg-slate-800" /> {/* Placeholder for icons */}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="#services" className="hover:text-teal-400 transition-colors">Design & Install</Link></li>
              <li><Link href="#gallery" className="hover:text-teal-400 transition-colors">Renovations</Link></li>
              <li><Link href="#services" className="hover:text-teal-400 transition-colors">Tile Repair</Link></li>
              <li><Link href="#contact" className="hover:text-teal-400 transition-colors">Consultations</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="#about" className="hover:text-teal-400 transition-colors">About Us</Link></li>
              <li><Link href="#gallery" className="hover:text-teal-400 transition-colors">Project Gallery</Link></li>
              <li><Link href="#testimonials" className="hover:text-teal-400 transition-colors">Testimonials</Link></li>
              <li><Link href="#contact" className="hover:text-teal-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Support</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="#" className="hover:text-teal-400 transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-teal-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Stoltzfus Tiles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
