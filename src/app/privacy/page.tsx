import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = { title: "Privacy Policy | AgriTech Solutions Kenya" };

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: `When you use AgriTech Solutions, we may collect the following information:
• Name, phone number and email address when you submit an inquiry or farmer request
• Browsing data such as pages visited and search terms (via analytics)
• Device and location information when you use the map feature
• Any information you voluntarily provide in forms or messages

We do not collect payment information. All transactions are conducted directly between buyers and sellers.`,
  },
  {
    title: "2. How We Use Your Information",
    body: `We use your information to:
• Connect you with sellers or service providers relevant to your inquiry
• Respond to your messages and requests in a timely manner
• Improve the platform and understand how users interact with it
• Send you relevant updates about your inquiries (via SMS or WhatsApp)
• Comply with applicable Kenyan laws and regulations

We will never sell your personal information to third parties.`,
  },
  {
    title: "3. Data Sharing",
    body: `Your contact information (name and phone number) may be shared with sellers or service providers when you submit an inquiry about their listing. This is necessary to facilitate the connection you requested.

We use Supabase (a secure cloud database provider) to store data. Supabase complies with international data protection standards.`,
  },
  {
    title: "4. Data Security",
    body: `We implement appropriate technical and organisational measures to protect your data:
• All data is stored on encrypted servers
• Admin access is protected by authentication
• We regularly review our security practices
• We never store sensitive financial information

While we take every precaution, no internet transmission is 100% secure. Please use strong passwords and keep your contact details safe.`,
  },
  {
    title: "5. Cookies",
    body: `We use minimal cookies for essential platform functionality (such as keeping you logged in to the admin panel). We do not use tracking cookies or third-party advertising cookies.

You can disable cookies in your browser settings, though some platform features may not function correctly.`,
  },
  {
    title: "6. Your Rights",
    body: `Under Kenyan law and international best practice, you have the right to:
• Request access to the personal data we hold about you
• Request correction of inaccurate data
• Request deletion of your data
• Object to how we process your data
• Withdraw consent at any time

To exercise any of these rights, contact us at kelvinwangechi500@gmail.com or call 0768 464 997.`,
  },
  {
    title: "7. Children's Privacy",
    body: `AgriTech Solutions is designed for adult farmers and agricultural businesses. We do not knowingly collect information from anyone under 18 years of age. If you believe we have collected information from a minor, please contact us immediately.`,
  },
  {
    title: "8. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. Significant changes will be communicated via a notice on our website. The date of the last update is shown at the bottom of this page.`,
  },
  {
    title: "9. Contact",
    body: `If you have questions about this Privacy Policy or how we handle your data, contact:\n\nAgriTech Solutions Kenya\nEmail: kelvinwangechi500@gmail.com\nPhone: 0768 464 997\nLocation: Meru County, Kenya`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="page-container py-12 max-w-3xl">
        <div className="mb-8">
          <Link href="/" className="text-brand-600 text-sm hover:underline">← Back to Home</Link>
          <h1 className="font-display font-extrabold text-3xl text-gray-900 mt-4 mb-2">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">
            Last updated: <strong>March 2025</strong> &nbsp;·&nbsp; Applies to: agritechsolutions.co.ke
          </p>
        </div>

        <div className="card p-6 sm:p-8 space-y-8 text-sm leading-relaxed">
          <p className="text-gray-600 border-l-4 border-brand-400 pl-4 bg-brand-50 py-3 rounded-r-xl">
            AgriTech Solutions is committed to protecting your privacy. This policy explains what data we collect,
            why we collect it, and how we use it.
          </p>

          {SECTIONS.map(({ title, body }) => (
            <section key={title}>
              <h2 className="font-display font-bold text-gray-900 text-base mb-3">{title}</h2>
              <div className="text-gray-600 whitespace-pre-line">{body}</div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
