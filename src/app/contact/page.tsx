"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Clock, CheckCircle, Loader2, MessageCircleMore } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const schema = z.object({
  name:    z.string().min(2, "Enter your name"),
  phone:   z.string().regex(/^(?:0|\+254|254)[17]\d{8}$/, "Enter a valid Kenyan phone number"),
  email:   z.string().email("Invalid email").optional().or(z.literal("")),
  subject: z.string().min(3, "Enter a subject"),
  message: z.string().min(10, "Please write a message").max(1000),
});
type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    await new Promise((r) => setTimeout(r, 800));
    console.log("Contact form submitted:", data);
    setSent(true);
  }

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-brand-900 to-brand-700 text-white">
        <div className="page-container py-14">
          <p className="text-brand-300 font-semibold text-sm uppercase tracking-widest mb-2">Get in Touch</p>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl mb-3">Contact AgriTech Solutions</h1>
          <p className="text-brand-100 text-lg max-w-xl">
            Have a question, partnership idea, or need help? Our team is ready to assist you.
          </p>
        </div>
      </section>

      <main className="page-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Contact info sidebar */}
          <div className="space-y-5">
            <div className="card p-6 space-y-4">
              <h2 className="font-display font-bold text-gray-900 text-lg">Contact Details</h2>

              <a href="tel:+254768464997" className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-brand-100 transition-colors">
                  <Phone size={18} className="text-brand-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Phone / WhatsApp</p>
                  <p className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">0768 464 997</p>
                  <p className="text-xs text-gray-400">Mon–Sat, 6am–8pm</p>
                </div>
              </a>

              <a href="mailto:kelvinwangechi500@gmail.com" className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                  <Mail size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Email</p>
                  <p className="font-semibold text-gray-900 text-sm group-hover:text-brand-700 transition-colors">
                    kelvinwangechi500@gmail.com
                  </p>
                  <p className="text-xs text-gray-400">Reply within 24 hours</p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Location</p>
                  <p className="font-semibold text-gray-900">Meru County, Kenya</p>
                  <p className="text-xs text-gray-400">Serving all 47 counties 🇰🇪</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Business Hours</p>
                  <p className="font-semibold text-gray-900">Mon – Saturday</p>
                  <p className="text-xs text-gray-400">6:00 AM – 8:00 PM EAT</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/254768464997?text=Hello%20AgriTech%20Solutions%2C%20I%20have%20a%20question."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full justify-center text-base"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            {sent ? (
              <div className="card p-12 text-center">
                <CheckCircle className="w-16 h-16 text-brand-500 mx-auto mb-4" />
                <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">Message Sent!</h2>
                <p className="text-gray-500 mb-6">
                  Thank you for reaching out. We'll get back to you within 24 hours on{" "}
                  <span className="font-semibold">kelvinwangechi500@gmail.com</span>.
                </p>
                <button onClick={() => setSent(false)} className="btn-secondary">Send Another Message</button>
              </div>
            ) : (
              <div className="card p-6 sm:p-8">
                <h2 className="font-display font-bold text-xl text-gray-900 mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Full Name *</label>
                      <input {...register("name")} className="input" placeholder="John Kamau" />
                      {errors.name && <p className="form-error">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="label">Phone Number *</label>
                      <input {...register("phone")} className="input" placeholder="0712 345 678" type="tel" />
                      {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="label">Email (Optional)</label>
                    <input {...register("email")} className="input" placeholder="john@email.com" type="email" />
                    {errors.email && <p className="form-error">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="label">Subject *</label>
                    <input {...register("subject")} className="input" placeholder="e.g. I want to list my farm products" />
                    {errors.subject && <p className="form-error">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <label className="label">Message *</label>
                    <textarea {...register("message")} className="textarea" rows={5}
                      placeholder="Tell us how we can help you…" />
                    {errors.message && <p className="form-error">{errors.message.message}</p>}
                  </div>
                  <button type="submit" className="btn-primary py-3 px-8" disabled={isSubmitting}>
                    {isSubmitting
                      ? <><Loader2 size={16} className="animate-spin" /> Sending…</>
                      : <><MessageCircleMore size={16} /> Send Message</>
                    }
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
