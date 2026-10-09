"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { submitRequest } from "@/lib/api";
import { CATEGORIES, KENYA_COUNTIES } from "@/types";

const schema = z.object({
  name:        z.string().min(2, "Enter your full name"),
  phone:       z.string().regex(/^(?:0|\+254|254)[17]\d{8}$/, "Enter a valid Kenyan phone number"),
  email:       z.string().email("Invalid email").optional().or(z.literal("")),
  category:    z.enum(["livestock", "vet", "feeds", "products"]),
  description: z.string().min(20, "Please describe what you need (min 20 characters)").max(1000),
  location:    z.string().min(3, "Enter your location"),
  county:      z.string().min(2, "Select your county"),
  budget:      z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function RequestPage() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    await submitRequest(data);
    setSent(true);
  }

  return (
    <>
      <Navbar />
      <main className="page-container py-10 max-w-2xl">
        <div className="mb-8">
          <h1 className="font-display font-extrabold text-3xl text-gray-900 mb-2">
            📋 Request an Item
          </h1>
          <p className="text-gray-500">
            Can't find what you're looking for? Tell us what you need and our team at{" "}
            <span className="font-semibold text-brand-700">AgriTech Solutions</span> will source it for you.
          </p>
        </div>

        {sent ? (
          <div className="card p-10 text-center">
            <CheckCircle className="w-16 h-16 text-brand-500 mx-auto mb-4" />
            <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">Request Submitted!</h2>
            <p className="text-gray-500 mb-6">
              Thank you! Our team will review your request and get back to you within 24 hours on{" "}
              <span className="font-semibold">0768 464 997</span>.
            </p>
            <button onClick={() => setSent(false)} className="btn-secondary">
              Submit Another Request
            </button>
          </div>
        ) : (
          <div className="card p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <label className="label">Full Name *</label>
                <input {...register("name")} className="input" placeholder="e.g. John Kamau" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="label">Phone Number *</label>
                <input {...register("phone")} className="input" placeholder="e.g. 0768 464 997" type="tel" />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="label">Email (Optional)</label>
                <input {...register("email")} className="input" placeholder="john@email.com" type="email" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="label">Category *</label>
                <select {...register("category")} className="select">
                  <option value="">— Select a category —</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.emoji} {c.label}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="label">What do you need? *</label>
                <textarea
                  {...register("description")}
                  className="textarea"
                  rows={4}
                  placeholder="e.g. I need 2 Friesian dairy cows, in-calf, producing at least 20 litres/day. Prefer Meru or Embu area."
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
              </div>

              {/* Location + County */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Location *</label>
                  <input {...register("location")} className="input" placeholder="e.g. Nkubu Town" />
                  {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
                </div>
                <div>
                  <label className="label">County *</label>
                  <select {...register("county")} className="select">
                    <option value="">— Select county —</option>
                    {KENYA_COUNTIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.county && <p className="text-red-500 text-xs mt-1">{errors.county.message}</p>}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="label">Budget (Optional)</label>
                <input {...register("budget")} className="input" placeholder="e.g. KES 50,000 – 80,000" />
              </div>

              <button
                type="submit"
                className="btn-primary w-full justify-center py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <><Loader2 size={16} className="animate-spin" /> Submitting…</>
                ) : (
                  "Submit Request"
                )}
              </button>
            </form>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
