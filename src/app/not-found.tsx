import Link from "next/link";
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-4 text-center">
      <p className="text-7xl mb-6">🌾</p>
      <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">Page Not Found</h1>
      <p className="text-gray-500 mb-2">This listing may have been removed or doesn't exist.</p>
      <p className="text-gray-400 text-sm mb-8">
        Need help? Call AgriTech Solutions:{" "}
        <a href="tel:+254768464997" className="text-brand-600 font-semibold">0768 464 997</a>
      </p>
      <Link href="/" className="btn-primary">← Back to Store</Link>
    </div>
  );
}
