import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Stoltzfus Custom Tile - Guidelines for using our services.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20 bg-slate-50 min-h-screen">
        {/* Decorative teal accent bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-teal-600 to-teal-400 z-[51]" aria-hidden="true" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold uppercase tracking-widest text-teal-600">
              Legal
            </span>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-4 text-slate-600">
              Last updated: February 2026
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 border-l-4 border-l-teal-500 prose prose-slate max-w-none">
            <h2 className="text-xl font-semibold text-slate-900 mt-0">Agreement to Terms</h2>
            <p className="text-slate-600">
              By accessing our website or engaging Stoltzfus Custom Tile for services, you agree to be bound by 
              these Terms of Service. If you do not agree with any part of these terms, please do not use our 
              website or services.
            </p>

            <h2 className="text-xl font-semibold text-slate-900">Services</h2>
            <p className="text-slate-600">
              Stoltzfus Custom Tile provides professional tile installation services including but not limited to:
            </p>
            <ul className="text-slate-600 space-y-2">
              <li>Bathroom tile installation and remodeling</li>
              <li>Kitchen backsplash installation</li>
              <li>Floor tile installation</li>
              <li>Shower and tub surrounds</li>
              <li>Custom tile work and patterns</li>
              <li>Commercial tile installation</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900">Estimates and Pricing</h2>
            <p className="text-slate-600">
              All estimates provided are based on the information available at the time of assessment. Final 
              pricing may vary if:
            </p>
            <ul className="text-slate-600 space-y-2">
              <li>Unforeseen conditions are discovered during the project</li>
              <li>Changes are made to the original scope of work</li>
              <li>Additional materials or labor are required</li>
            </ul>
            <p className="text-slate-600">
              Any changes to the estimate will be discussed and approved by you before work proceeds.
            </p>

            <h2 className="text-xl font-semibold text-slate-900">Payment Terms</h2>
            <p className="text-slate-600">
              Payment terms will be outlined in your project agreement. Generally:
            </p>
            <ul className="text-slate-600 space-y-2">
              <li>A deposit is required to secure your project date</li>
              <li>Progress payments may be required for larger projects</li>
              <li>Final payment is due upon satisfactory completion of work</li>
              <li>We accept checks, cash, and major credit cards</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900">Project Scheduling</h2>
            <p className="text-slate-600">
              We will make every effort to complete your project within the estimated timeframe. However, 
              delays may occur due to:
            </p>
            <ul className="text-slate-600 space-y-2">
              <li>Weather conditions (for outdoor projects)</li>
              <li>Material availability or shipping delays</li>
              <li>Unforeseen structural or plumbing issues</li>
              <li>Changes requested by the client</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900">Warranty</h2>
            <p className="text-slate-600">
              Stoltzfus Custom Tile provides a workmanship warranty on all labor performed. This warranty covers 
              defects in installation but does not cover:
            </p>
            <ul className="text-slate-600 space-y-2">
              <li>Normal wear and tear</li>
              <li>Damage from misuse or accidents</li>
              <li>Defects in materials (covered by manufacturer warranty)</li>
              <li>Issues arising from improper maintenance</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900">Client Responsibilities</h2>
            <p className="text-slate-600">To ensure successful project completion, clients agree to:</p>
            <ul className="text-slate-600 space-y-2">
              <li>Provide accurate project information and access to the work area</li>
              <li>Remove personal items and valuables from the work area</li>
              <li>Ensure utilities (water, electricity) are available as needed</li>
              <li>Communicate any concerns or changes promptly</li>
              <li>Make timely payments as agreed</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900">Limitation of Liability</h2>
            <p className="text-slate-600">
              Stoltzfus Custom Tile shall not be liable for any indirect, incidental, or consequential damages 
              arising from our services. Our total liability shall not exceed the amount paid for the specific 
              service in question.
            </p>

            <h2 className="text-xl font-semibold text-slate-900">Intellectual Property</h2>
            <p className="text-slate-600">
              All content on this website, including text, images, logos, and design, is the property of 
              Stoltzfus Custom Tile and is protected by copyright laws. You may not reproduce, distribute, 
              or use our content without written permission.
            </p>

            <h2 className="text-xl font-semibold text-slate-900">Governing Law</h2>
            <p className="text-slate-600">
              These Terms of Service shall be governed by the laws of the Commonwealth of Pennsylvania. Any 
              disputes arising from these terms shall be resolved in the courts of Lancaster County, Pennsylvania.
            </p>

            <h2 className="text-xl font-semibold text-slate-900">Contact Information</h2>
            <p className="text-slate-600">
              For questions about these Terms of Service, please contact us:
            </p>
            <p className="text-slate-600">
              <strong>Stoltzfus Custom Tile</strong><br />
              Lancaster County, PA<br />
              Email: info@stoltzfuscustomtiles.com<br />
              Phone: (717) 555-0142
            </p>

            <h2 className="text-xl font-semibold text-slate-900">Changes to Terms</h2>
            <p className="text-slate-600">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective 
              immediately upon posting to this website. Your continued use of our services constitutes 
              acceptance of the updated terms.
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link 
              href="/"
              className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
