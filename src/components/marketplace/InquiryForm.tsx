"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { submitLead } from "@/lib/api";
import type { Item } from "@/types";

const schema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters"),
  phone:   z.string().regex(/^(?:0|\+254|254)[17]\d{8}$/, "Enter a valid Kenyan phone number"),
  email:   z.string().email("Invalid email").optional().or(z.literal("")),
  message: z.string().min(5, "Please enter a short message").max(500),
});

type FormData = z.infer<typeof schema>;

interface Props { item: Item }

export default function InquiryForm({ item }: Props) {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { message: `Hi, I'm interested in "${item.title}". Is it still available?` },
  });

  async function onSubmit(data: FormData) {
    await submitLead({
      item_id: item.id,
      item_title: item.title,
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      message: data.message,
    });
    setSent(true);
  }

  if (sent) {
    return (
      <div className="card-flat p-6 text-center">
        <CheckCircle className="w-12 h-12 text-brand-500 mx-auto mb-3" />
        <h3 className="font-display font-bold text-gray-900 text-lg mb-1">Inquiry Sent!</h3>
        <p className="text-gray-500 text-sm">Our team at AgriTech Solutions will contact you shortly. Check your phone for a response.</p>
      </div>
    );
  }

  return (
    <div className="card-flat p-5">
      <h3 className="font-display font-bold text-gray-900 mb-4">Send Inquiry</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="label">Your Name *</label>
          <input {...register("name")} className="input" placeholder="e.g. John Kamau" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="label">Phone Number *</label>
          <input {...register("phone")} className="input" placeholder="e.g. 0712 345678" type="tel" />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="label">Email (Optional)</label>
          <input {...register("email")} className="input" placeholder="john@email.com" type="email" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="label">Message *</label>
          <textarea {...register("message")} className="textarea" rows={3} />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>
        <button type="submit" className="btn-primary w-full justify-center" disabled={isSubmitting}>
          {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : "Send Inquiry"}
        </button>
      </form>
    </div>
  );
}
