import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Common questions about Stoltzfus Custom Tile services, pricing, and installation process.",
};

const faqs = [
  {
    question: "What areas do you serve?",
    answer: "We proudly serve Lancaster County, PA and surrounding areas within a 50-mile radius. This includes cities like Lititz, Ephrata, Manheim, Lancaster, and more."
  },
  {
    question: "How do I get a free estimate?",
    answer: "Simply fill out our contact form or give us a call. We'll schedule a convenient time to visit your home, discuss your project, and provide a detailed, no-obligation estimate."
  },
  {
    question: "What types of tile do you install?",
    answer: "We install all types of tile including ceramic, porcelain, natural stone (marble, granite, travertine), glass, and mosaic tiles. We can help you choose the best material for your specific project."
  },
  {
    question: "Do you provide tile materials or should I purchase them?",
    answer: "We can work either way! We have relationships with quality tile suppliers and can source materials for you, or we're happy to install tiles you've already purchased."
  },
  {
    question: "How long does a typical bathroom tile project take?",
    answer: "A standard bathroom remodel typically takes 3-5 days, depending on the scope. Larger projects or custom work may take longer. We'll provide a detailed timeline during your estimate."
  },
  {
    question: "Are you licensed and insured?",
    answer: "Yes, Stoltzfus Custom Tile is fully licensed and insured. We carry comprehensive liability insurance and workers' compensation coverage for your protection."
  },
  {
    question: "What waterproofing systems do you use?",
    answer: "We use industry-leading waterproofing systems from Schluter and Laticrete. Proper waterproofing is essential for shower and wet area installations, and we never cut corners on this critical step."
  },
  {
    question: "Do you offer warranties on your work?",
    answer: "Yes, we stand behind our craftsmanship with a warranty on all labor. Additionally, most tile materials come with manufacturer warranties that we'll help you understand."
  },
  {
    question: "Can you work with contractors on larger projects?",
    answer: "Absolutely! We regularly work as tile subcontractors for general contractors on residential and commercial projects. Contact us to discuss your project needs."
  },
  {
    question: "What is your payment structure?",
    answer: "We typically require a deposit to secure your project date, with the remaining balance due upon completion. We accept checks, cash, and major credit cards."
  }
];

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20 bg-slate-50 min-h-screen">
        {/* Decorative teal accent bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-teal-600 to-teal-400 z-[51]" aria-hidden="true" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold uppercase tracking-widest text-teal-600">
              Help Center
            </span>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Find answers to common questions about our tile installation services.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 border-l-4 border-l-teal-500"
              >
                <h2 className="text-lg font-semibold text-slate-900 mb-3">
                  {faq.question}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">
              Still have questions? We&apos;re here to help!
            </p>
            <Link 
              href="/#contact"
              className="inline-flex items-center rounded-xl bg-teal-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-teal-700"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
