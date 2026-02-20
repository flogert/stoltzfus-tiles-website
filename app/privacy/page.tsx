import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Stoltzfus Custom Tile - How we collect, use, and protect your information.",
};

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="mt-4 text-slate-600">
              Last updated: February 2026
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 border-l-4 border-l-teal-500 prose prose-slate max-w-none">
            <h2 className="text-xl font-semibold text-slate-900 mt-0">Introduction</h2>
            <p className="text-slate-600">
              Stoltzfus Custom Tile (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting 
              the personal information you share with us. This Privacy Policy explains how we collect, use, and 
              safeguard your information when you visit our website or use our services.
            </p>

            <h2 className="text-xl font-semibold text-slate-900">Information We Collect</h2>
            <p className="text-slate-600">We may collect the following types of information:</p>
            <ul className="text-slate-600 space-y-2">
              <li><strong>Contact Information:</strong> Name, email address, phone number, and mailing address when you request a quote or contact us.</li>
              <li><strong>Project Information:</strong> Details about your tile installation project, including photos and measurements you provide.</li>
              <li><strong>Website Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, and pages visited.</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900">How We Use Your Information</h2>
            <p className="text-slate-600">We use the information we collect to:</p>
            <ul className="text-slate-600 space-y-2">
              <li>Respond to your inquiries and provide estimates</li>
              <li>Schedule and complete tile installation services</li>
              <li>Communicate with you about your project</li>
              <li>Improve our website and services</li>
              <li>Send you relevant updates about our services (with your consent)</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900">Information Sharing</h2>
            <p className="text-slate-600">
              We do not sell, trade, or rent your personal information to third parties. We may share your 
              information only in the following circumstances:
            </p>
            <ul className="text-slate-600 space-y-2">
              <li>With service providers who assist in our business operations</li>
              <li>When required by law or to protect our legal rights</li>
              <li>With your explicit consent</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900">Data Security</h2>
            <p className="text-slate-600">
              We implement appropriate security measures to protect your personal information from unauthorized 
              access, alteration, disclosure, or destruction. However, no method of transmission over the Internet 
              is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-xl font-semibold text-slate-900">Cookies</h2>
            <p className="text-slate-600">
              Our website may use cookies to enhance your browsing experience. You can choose to disable cookies 
              through your browser settings, though this may affect some website functionality.
            </p>

            <h2 className="text-xl font-semibold text-slate-900">Your Rights</h2>
            <p className="text-slate-600">You have the right to:</p>
            <ul className="text-slate-600 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing communications</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-900">Contact Us</h2>
            <p className="text-slate-600">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <p className="text-slate-600">
              <strong>Stoltzfus Custom Tile</strong><br />
              Lancaster County, PA<br />
              Email: info@stoltzfuscustomtiles.com<br />
              Phone: (717) 555-0142
            </p>

            <h2 className="text-xl font-semibold text-slate-900">Changes to This Policy</h2>
            <p className="text-slate-600">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with 
              an updated revision date.
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
