"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Loader2, CheckCircle, MapPin, Phone, User, ShoppingBag, ShieldCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { formatPrice } from "@/lib/utils";
import type { Item } from "@/types";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemId = searchParams.get("item_id");

  const [item,      setItem]      = useState<Item | null>(null);
  const [loading,   setLoading]   = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success,   setSuccess]   = useState(false);

  // Form state
  const [name,    setName]    = useState("");
  const [phone,   setPhone]   = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!itemId) {
      router.push("/");
      return;
    }
    const load = async () => {
      try {
        const { getItemById } = await import("@/lib/api");
        const data = await getItemById(itemId);
        setItem(data);
      } finally { setLoading(false); }
    };
    load();
  }, [itemId, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { createOrder } = await import("@/lib/api");
      const success = await createOrder({
        item_id: item!.id,
        buyer_id: "", // In a real app, get from auth session
        seller_id: item!.seller_id || "",
        status: "pending",
        total_price: item!.price,
        quantity: 1,
        delivery_address: address,
        buyer_name: name,
        buyer_phone: phone,
      });

      if (success || USE_MOCK) {
        setSuccess(true);
        setTimeout(() => router.push("/"), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loader2 className="animate-spin text-brand-600" size={40} />
    </div>
  );

  if (!item) return null;

  if (success) return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <CheckCircle size={48} />
        </div>
        <h1 className="text-4xl font-display font-black text-gray-900 mb-4">Order Received!</h1>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Thank you for shopping with AgriTech Solutions. Your order for <span className="font-bold text-brand-700">{item.title}</span> has been placed. The seller will contact you shortly to coordinate delivery.
        </p>
        <Link href="/" className="btn-primary w-full justify-center">Back to Marketplace</Link>
        <p className="text-xs text-gray-400 mt-6 uppercase tracking-widest font-bold">Redirecting in 5 seconds...</p>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen pb-20">
        <div className="page-container py-10">
          <Link href={`/item/${item.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-brand-600 mb-8 transition-colors uppercase tracking-widest">
            <ArrowLeft size={16} /> Back to Details
          </Link>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-gray-200/50 border border-gray-100">
                <h2 className="text-3xl font-display font-black text-gray-900 mb-8 flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 text-xl">🚚</div>
                  Delivery Information
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                       <User size={14} className="text-brand-500" /> Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Kelvin Wangechi"
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-500 transition-colors font-bold text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                       <Phone size={14} className="text-brand-500" /> Phone Number (M-Pesa)
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0712 345 678"
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-500 transition-colors font-bold text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                       <MapPin size={14} className="text-brand-500" /> Delivery Address / Nearest Town
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Nkubu Town, Meru County"
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-500 transition-colors font-bold text-gray-900"
                    />
                  </div>

                  <div className="pt-6">
                     <button
                       type="submit"
                       disabled={submitting}
                       className="w-full bg-brand-600 hover:bg-brand-700 text-white font-black py-5 rounded-2xl text-xl transition-all shadow-xl shadow-brand-900/20 flex items-center justify-center gap-3 disabled:opacity-50 group"
                     >
                       {submitting ? (
                         <Loader2 className="animate-spin" />
                       ) : (
                         <>
                           <ShieldCheck size={24} className="group-hover:scale-110 transition-transform" /> 
                           Place Order Now
                         </>
                       )}
                     </button>
                     <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-6">
                        🔒 Secured By AgriTech Solutions Kenya
                     </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-brand-900 text-white rounded-[2.5rem] p-10 sticky top-24 shadow-2xl">
                 <h3 className="text-xl font-display font-black mb-8 flex items-center gap-3">
                    <ShoppingBag size={20} className="text-amber-400" />
                    Order Summary
                 </h3>

                 <div className="flex gap-6 mb-8 pb-8 border-b border-white/10">
                    <div className="w-24 aspect-square bg-white/10 rounded-2xl overflow-hidden relative shrink-0">
                       {item.images?.[0] ? (
                         <Image src={item.images[0]} alt={item.title} fill className="object-cover" />
                       ) : (
                         <div className="absolute inset-0 flex items-center justify-center text-4xl">🚜</div>
                       )}
                    </div>
                    <div>
                       <p className="font-bold text-lg leading-tight mb-2">{item.title}</p>
                       <p className="text-amber-400 text-sm font-black uppercase tracking-widest">{item.location}</p>
                    </div>
                 </div>

                 <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center text-brand-200">
                       <span className="text-sm font-bold uppercase tracking-widest">Subtotal</span>
                       <span className="font-bold">{formatPrice(item.price)}</span>
                    </div>
                    <div className="flex justify-between items-center text-brand-200">
                       <span className="text-sm font-bold uppercase tracking-widest">Delivery Fee</span>
                       <span className="font-bold text-amber-400 uppercase text-xs">Calculated Later</span>
                    </div>
                    <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                       <span className="text-lg font-black uppercase tracking-widest">Total</span>
                       <span className="text-3xl font-display font-black text-amber-400">{formatPrice(item.price)}</span>
                    </div>
                 </div>

                 <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-300 mb-3">Guaranteed Satisfaction</p>
                    <p className="text-xs text-brand-100 leading-relaxed">
                       Our team verifies all items before final transaction. You only pay after confirmation of quality and availability.
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
