import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "How It Works | AgriTech Solutions Kenya",
};

const BUYER_STEPS = [
  { n: "01", emoji: "🔍", title: "Browse Our Store",      desc: "Explore our premium selection of livestock, vet services, feeds and farm products. Guaranteed quality in every listing." },
  { n: "02", emoji: "📋", title: "Select Your Item",     desc: "View detailed specifications, photos, and pricing. All items are managed and sold directly by AgriTech Solutions." },
  { n: "03", emoji: "💬", title: "Contact Our Team",      desc: "Tap the WhatsApp button to chat with our specialists. Get advice or arrange a purchase in seconds." },
  { n: "04", emoji: "🚀", title: "Direct Delivery",       desc: "Complete your order and we'll arrange safe, fast delivery to your farm across any of the 47 counties." },
];

const FAQS = [
  { q: "Is everything sold by AgriTech Solutions?",       a: "Yes. We are a direct store. We source, verify, and sell every product ourselves to ensure Kenyan farmers get the highest quality every time." },
  { q: "How do I know the products are genuine?",         a: "Since you are buying directly from us, we stand behind every product with a 100% authenticity guarantee. Our in-house experts verify everything." },
  { q: "Do you handle payments and delivery?",            a: "Yes, we handle the entire process. Payments are secure via M-Pesa, and we manage delivery directly to your location." },
  { q: "Which counties do you serve?",                     a: "All 47 counties in Kenya. Our logistics network ensures you get your farm inputs no matter where you are located." },
  { q: "What if I need something not in the store?",      a: "Use our 'Special Request' feature. Our sourcing team will find exactly what you need and deliver it to you." },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-900 to-brand-700 text-white">
        <div className="page-container py-14 text-center max-w-2xl mx-auto">
          <p className="text-brand-300 font-semibold text-sm uppercase tracking-widest mb-3">How It Works</p>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl leading-tight mb-5">
            Quality. Direct. <span className="text-amber-300">Guaranteed.</span>
          </h1>
          <p className="text-brand-100 text-lg">
            AgriTech Solutions brings the best of Kenyan farming directly to your doorstep. Here's how to shop.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="page-container py-14">
        <div className="text-center mb-10">
          <span className="inline-block bg-brand-50 text-brand-700 font-semibold text-sm px-4 py-1.5 rounded-full mb-3">Your Journey</span>
          <h2 className="section-title">How to Shop With Us</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BUYER_STEPS.map(({ n, emoji, title, desc }, i) => (
            <div key={n} className="relative">
              {i < BUYER_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-brand-100 z-0" style={{ width: "calc(100% - 64px)", left: "calc(50% + 32px)" }} />
              )}
              <div className="card-flat p-6 text-center relative z-10 bg-white border border-gray-100">
                <div className="w-14 h-14 bg-brand-600 text-white rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-green">
                  {emoji}
                </div>
                <p className="text-brand-500 font-bold text-xs uppercase tracking-widest mb-1">{n}</p>
                <h3 className="font-display font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/search" className="btn-primary py-3.5 px-10 text-base shadow-lg">
            Start Shopping Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-14">
        <div className="page-container max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="section-title">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="card p-5 group cursor-pointer bg-white border border-gray-100">
                <summary className="flex items-center justify-between font-display font-semibold text-gray-900 list-none select-none">
                  {q}
                  <span className="text-brand-600 text-xl font-normal ml-4 shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <p className="text-gray-600 text-sm leading-relaxed mt-3 pt-3 border-t border-gray-100">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="page-container py-14">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-10 text-white text-center">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl mb-3">Still have questions?</h2>
          <p className="text-amber-100 mb-7">Our team is available 6am–8pm, Monday to Saturday.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+254768464997"
              className="bg-white text-amber-700 font-bold px-8 py-3.5 rounded-xl hover:bg-amber-50 transition-all shadow-lg">
              📞 Call 0768 464 997
            </a>
            <Link href="/contact"
              className="border-2 border-white/40 hover:border-white text-white font-semibold px-8 py-3.5 rounded-xl transition-all">
              Send a Message
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
