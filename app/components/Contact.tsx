"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="section-padding bg-slate-50"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Info */}
          <div className="lg:pr-10">
            <span className="text-sm font-semibold uppercase tracking-widest text-teal-600">
              Get In Touch
            </span>
            <h2
              id="contact-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              Start Your Tile Project
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Contact us today for a free estimate. Serving homeowners and contractors
              throughout Lancaster County.
            </p>

            <div className="mt-8 space-y-6">
              {[
                { title: "Phone", value: "(717) 555-0142", href: "tel:+17175550142" },
                { title: "Email", value: "info@stoltzfustiles.com", href: "mailto:info@stoltzfustiles.com" },
                { title: "Service Area", value: "Lancaster County, PA", href: null },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-600/10 text-teal-600">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
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
                  className="mt-1 block w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-teal-500 focus:ring-teal-500/20"
                  placeholder="John Doe"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700"> Email </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-teal-500 focus:ring-teal-500/20"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700"> Phone </label>
                  <input
                    type="tel"
                    id="phone"
                    className="mt-1 block w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-teal-500 focus:ring-teal-500/20"
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
