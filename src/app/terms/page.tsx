import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = { title: "Terms of Service | AgriTech Solutions Kenya" };

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing or using the AgriTech Solutions platform ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Platform.

These terms apply to all visitors, users and others who access or use the Platform.`,
  },
  {
    title: "2. Use of the Platform",
    body: `You may use the Platform for lawful agricultural commerce purposes only. You agree NOT to:
• Post false, misleading or fraudulent listings
• Impersonate another person or organisation
• Use the Platform to sell illegal goods or services
• Attempt to hack, scrape or disrupt the Platform
• Harass or harm other users
• List items you do not own or have authority to sell

AgriTech Solutions reserves the right to remove any listing or suspend any user who violates these terms.`,
  },
  {
    title: "3. Listings & Content",
    body: `By submitting a listing, you confirm that:
• You own or have the legal right to sell the listed item or service
• All information provided is accurate, complete and up-to-date
• Your listing complies with all applicable Kenyan laws
• Photos used are your own or you have permission to use them

AgriTech Solutions may edit or remove listings that do not meet our quality standards, without notice.`,
  },
  {
    title: "4. Sales & Transactions",
    body: `AgriTech Solutions is the direct seller of all products and services listed on the Platform. When you purchase an item, you are buying directly from AgriTech Solutions.
• All payments are made directly to AgriTech Solutions via approved channels (e.g. M-Pesa).
• We guarantee the quality and authenticity of every item sold.
• Delivery is arranged and managed by AgriTech Solutions or our verified logistics partners.`,
  },
  {
    title: "5. Intellectual Property",
    body: `The AgriTech Solutions name, logo, website design and content are protected intellectual property. You may not reproduce, distribute or use our brand without written permission.`,
  },
  {
    title: "6. Limitation of Liability",
    body: `To the fullest extent permitted by Kenyan law, AgriTech Solutions' liability for any product sold shall be limited to the purchase price of said product. We are committed to customer satisfaction and will handle any quality concerns directly.`,
  },
  {
    title: "7. Governing Law",
    body: `These Terms are governed by the laws of the Republic of Kenya. Any disputes shall be subject to the exclusive jurisdiction of Kenyan courts.`,
  },
  {
    title: "8. Changes to Terms",
    body: `We may update these Terms at any time. Continued use of the Platform after changes constitutes acceptance of the new Terms. Material changes will be announced on the Platform.`,
  },
  {
    title: "9. Contact",
    body: `Questions about these Terms?\n\nAgriTech Solutions Kenya\nEmail: kelvinwangechi500@gmail.com\nPhone: 0768 464 997`,
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="page-container py-12 max-w-3xl">
        <div className="mb-8">
          <Link href="/" className="text-brand-600 text-sm hover:underline">← Back to Home</Link>
          <h1 className="font-display font-extrabold text-3xl text-gray-900 mt-4 mb-2">Terms of Service</h1>
          <p className="text-gray-500 text-sm">
            Last updated: <strong>March 2025</strong> &nbsp;·&nbsp; Applies to: agritechsolutions.co.ke
          </p>
        </div>

        <div className="card p-6 sm:p-8 space-y-8 text-sm leading-relaxed">
          <p className="text-gray-600 border-l-4 border-amber-400 pl-4 bg-amber-50 py-3 rounded-r-xl">
            Please read these Terms of Service carefully before using AgriTech Solutions. By using our platform, you agree to these terms.
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
