import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const PHONE    = "0768 464 997";
const EMAIL    = "kelvinwangechi500@gmail.com";
const WHATSAPP = "https://wa.me/254768464997";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      {/* Main footer */}
      <div className="page-container py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-2xl">🌾</div>
            <div>
              <p className="font-display font-extrabold text-white text-base leading-none">AgriTech Solutions</p>
              <p className="text-[10px] text-amber-400 uppercase tracking-widest">Kenya's Premium Farm Store</p>
            </div>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed mb-5">
            Your direct source for quality livestock, professional veterinary services, premium animal feeds, and farm-fresh products. Everything sold is guaranteed by AgriTech Solutions.
          </p>
          <div className="space-y-2.5 text-sm">
            <a href={`tel:+254768464997`} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <Phone size={14} className="text-brand-400 shrink-0" />
              {PHONE}
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <Mail size={14} className="text-brand-400 shrink-0" />
              {EMAIL}
            </a>
            <p className="flex items-center gap-2 text-gray-400">
              <MapPin size={14} className="text-brand-400 shrink-0" />
              Meru County, Kenya 🇰🇪
            </p>
          </div>
        </div>

        {/* Store */}
        <div>
          <h3 className="font-display font-bold text-white text-sm mb-4 uppercase tracking-wide">AgriTech Store</h3>
          <ul className="space-y-2.5 text-sm">
            {[
              { label: "🐄 Livestock", href: "/livestock" },
              { label: "🩺 Vet Services", href: "/vet-services" },
              { label: "🌽 Animal Feeds", href: "/feeds" },
              { label: "🥛 Farm Products", href: "/products" },
              { label: "🔍 Search Store", href: "/search" },
              { label: "📋 Request an Item", href: "/request" },
            ].map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="font-display font-bold text-white text-sm mb-4 uppercase tracking-wide">Quick Links</h3>
          <ul className="space-y-2.5 text-sm">
            {[
              { label: "About Us", href: "/about" },
              { label: "How It Works", href: "/how-it-works" },
              { label: "Contact Us", href: "/contact" },
              { label: "Privacy Policy", href: "/privacy" },
            ].map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div>
          <h3 className="font-display font-bold text-white text-sm mb-4 uppercase tracking-wide">Get in Touch</h3>
          <p className="text-sm text-gray-400 mb-4">
            Can't find what you're looking for? Reach us directly and we'll help you source it.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full justify-center text-sm mb-3"
          >
            {/* WhatsApp SVG */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
          <a
            href={`tel:+254768464997`}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-gray-600 text-sm font-medium hover:border-gray-400 hover:text-white transition-all"
          >
            <Phone size={14} /> Call {PHONE}
          </a>

          {/* Social links */}
          <div className="flex items-center gap-3 mt-5">
            {[
              { icon: Facebook,  href: "#", label: "Facebook" },
              { icon: Twitter,   href: "#", label: "Twitter" },
              { icon: Instagram, href: "#", label: "Instagram" },
              { icon: Youtube,   href: "#", label: "YouTube" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-brand-700 flex items-center justify-center transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="page-container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {year} AgriTech Solutions Kenya. All rights reserved.</p>
          <p>
            Built for Kenyan Farmers 🇰🇪 &nbsp;·&nbsp;
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
            &nbsp;·&nbsp;
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
