"use client";

import IsometricGridBg from "./IsometricGridBg";

export default function Contact() {
  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <IsometricGridBg decorative className="opacity-[0.18] z-0" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Info */}
          <div className="lg:pr-10">
            <span className="text-sm font-semibold uppercase tracking-widest text-teal-600">
              Get In Touch
            </span>
            <h2
              id="contact-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl"
            >
              Start Your Tile Project
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
              Contact us today for a free estimate. Serving homeowners and contractors
              throughout Lancaster County.
            </p>

            <div className="mt-8 space-y-6">
              {[
                {
                  title: "Phone",
                  value: "(717) 555-0142",
                  href: "tel:+17175550142",
                  icon: (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  ),
                },
                {
                  title: "Email",
                  value: "info@stoltzfuscustomtiles.com",
                  href: "mailto:info@stoltzfuscustomtiles.com",
                  icon: (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  ),
                },
                {
                  title: "Service Area",
                  value: "Lancaster County, PA",
                  href: null,
                  icon: (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-600/10 text-teal-600">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    {item.href ? (
                      <a href={item.href} className="text-base text-slate-600 hover:text-teal-600">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-base text-slate-600">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-8">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700"> Name </label>
                <input
                  type="text"
                  id="name"
                  required
                  autoComplete="name"
                  className="mt-1 block w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-teal-500 focus:ring-teal-500/20"
                  placeholder="John Doe"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700"> Email </label>
                  <input
                    type="email"
                    id="email"                  required
                  autoComplete="email"                    className="mt-1 block w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-teal-500 focus:ring-teal-500/20"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700"> Phone </label>
                  <input
                    type="tel"
                    id="phone"                  autoComplete="tel"                    className="mt-1 block w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-teal-500 focus:ring-teal-500/20"
                    placeholder="(717) 555-0000"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="msg" className="block text-sm font-medium text-slate-700"> Message </label>
                <textarea
                  id="msg"
                  rows={3}
                  className="mt-1 block w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 resize-none focus:border-teal-500 focus:ring-teal-500/20"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-teal-600 px-8 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-teal-700 hover:shadow-lg"
              >
                Request Estimate
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
