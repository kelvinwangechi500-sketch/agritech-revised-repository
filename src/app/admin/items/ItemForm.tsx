"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save, ArrowLeft, ImagePlus, X } from "lucide-react";
import Link from "next/link";
import { CATEGORIES, KENYA_COUNTIES } from "@/types";

const schema = z.object({
  title:       z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price:       z.coerce.number().positive("Price must be positive"),
  price_unit:  z.string().optional(),
  category:    z.enum(["livestock", "vet", "feeds", "products"]),
  sub_category:z.string().optional(),
  location:    z.string().min(3, "Enter a location"),
  county:      z.string().min(2, "Select a county"),
  status:      z.enum(["available", "sold", "reserved"]),
  featured:    z.boolean().optional(),
  seller_name: z.string().optional(),
  seller_phone:z.string().optional(),
  // Livestock
  breed:       z.string().optional(),
  age_months:  z.coerce.number().optional().or(z.literal("")),
  weight_kg:   z.coerce.number().optional().or(z.literal("")),
  gender:      z.enum(["male", "female", "mixed", ""]).optional(),
  // Vet
  vet_specialization: z.string().optional(),
  vet_qualifications: z.string().optional(),
  // Feeds
  feed_weight_kg:  z.coerce.number().optional().or(z.literal("")),
  feed_composition:z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  initialData?: Partial<FormData> & { id?: string; images?: string[] };
  isEdit?: boolean;
}

export default function ItemForm({ initialData, isEdit = false }: Props) {
  const router = useRouter();
  const [images,  setImages]  = useState<string[]>(initialData?.images ?? []);
  const [imgInput,setImgInput]= useState("");
  const [saved,   setSaved]   = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      status: "available",
      featured: false,
      seller_phone: "0768464997",
      ...initialData,
    },
  });

  const categoryWatch = watch("category");

  async function onSubmit(data: FormData) {
    const payload = { ...data, images };
    if (isEdit) {
      console.log("[MOCK] Updated item:", initialData?.id, payload);
    } else {
      console.log("[MOCK] Created item:", payload);
    }
    await new Promise((r) => setTimeout(r, 500));
    setSaved(true);
    setTimeout(() => router.push("/admin/items"), 1200);
  }

  function addImage() {
    if (imgInput.trim() && !images.includes(imgInput.trim())) {
      setImages((prev) => [...prev, imgInput.trim()]);
      setImgInput("");
    }
  }

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin/items" className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <ArrowLeft size={18} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="font-display font-extrabold text-2xl text-gray-900">
            {isEdit ? "Edit Listing" : "Add New Listing"}
          </h1>
          <p className="text-gray-500 text-sm">AgriTech Solutions Marketplace</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Basic Info */}
        <div className="card p-6 space-y-4">
          <h2 className="font-display font-bold text-gray-900 border-b border-gray-100 pb-3">Basic Information</h2>

          <div>
            <label className="label">Title *</label>
            <input {...register("title")} className="input" placeholder="e.g. Friesian Dairy Cow – High Yielding" />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="label">Description *</label>
            <textarea {...register("description")} className="textarea" rows={4}
              placeholder="Describe the item in detail — age, condition, quantity, health status, etc." />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Category *</label>
              <select {...register("category")} className="select">
                <option value="">— Select —</option>
                {CATEGORIES.map((c) => (
                  <option key={c.key} value={c.key}>{c.emoji} {c.label}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
            </div>
            <div>
              <label className="label">Sub-Category</label>
              <input {...register("sub_category")} className="input" placeholder="e.g. Cattle, Poultry, etc." />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Price (KES) *</label>
              <input {...register("price")} type="number" className="input" placeholder="85000" />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
            </div>
            <div>
              <label className="label">Price Unit</label>
              <input {...register("price_unit")} className="input" placeholder="e.g. per head, per bag" />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="card p-6 space-y-4">
          <h2 className="font-display font-bold text-gray-900 border-b border-gray-100 pb-3">Location</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Location *</label>
              <input {...register("location")} className="input" placeholder="e.g. Nkubu, Meru County" />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
            </div>
            <div>
              <label className="label">County *</label>
              <select {...register("county")} className="select">
                <option value="">— Select county —</option>
                {KENYA_COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.county && <p className="text-red-500 text-xs mt-1">{errors.county.message}</p>}
            </div>
          </div>
        </div>

        {/* Status & Visibility */}
        <div className="card p-6 space-y-4">
          <h2 className="font-display font-bold text-gray-900 border-b border-gray-100 pb-3">Status & Visibility</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Status *</label>
              <select {...register("status")} className="select">
                <option value="available">✅ Available</option>
                <option value="reserved">🟡 Reserved</option>
                <option value="sold">🔴 Sold</option>
              </select>
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input {...register("featured")} type="checkbox"
                  className="w-4 h-4 rounded accent-brand-600" />
                <span className="text-sm font-medium text-gray-700">⭐ Featured listing</span>
              </label>
            </div>
          </div>
        </div>

        {/* Seller Info */}
        <div className="card p-6 space-y-4">
          <h2 className="font-display font-bold text-gray-900 border-b border-gray-100 pb-3">Seller Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Seller Name</label>
              <input {...register("seller_name")} className="input" placeholder="AgriTech Solutions" />
            </div>
            <div>
              <label className="label">Seller Phone</label>
              <input {...register("seller_phone")} className="input" placeholder="0768464997" />
            </div>
          </div>
        </div>

        {/* Category-specific fields */}
        {(categoryWatch === "livestock") && (
          <div className="card p-6 space-y-4">
            <h2 className="font-display font-bold text-gray-900 border-b border-gray-100 pb-3">🐄 Livestock Details</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="label">Breed</label>
                <input {...register("breed")} className="input" placeholder="Friesian" />
              </div>
              <div>
                <label className="label">Age (months)</label>
                <input {...register("age_months")} type="number" className="input" placeholder="48" />
              </div>
              <div>
                <label className="label">Weight (kg)</label>
                <input {...register("weight_kg")} type="number" className="input" placeholder="450" />
              </div>
              <div>
                <label className="label">Gender</label>
                <select {...register("gender")} className="select">
                  <option value="">—</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {(categoryWatch === "vet") && (
          <div className="card p-6 space-y-4">
            <h2 className="font-display font-bold text-gray-900 border-b border-gray-100 pb-3">🩺 Vet Details</h2>
            <div>
              <label className="label">Specialization</label>
              <input {...register("vet_specialization")} className="input" placeholder="Large Animal Medicine" />
            </div>
            <div>
              <label className="label">Qualifications</label>
              <input {...register("vet_qualifications")} className="input" placeholder="BVM, University of Nairobi" />
            </div>
          </div>
        )}

        {(categoryWatch === "feeds") && (
          <div className="card p-6 space-y-4">
            <h2 className="font-display font-bold text-gray-900 border-b border-gray-100 pb-3">🌽 Feed Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Weight (kg)</label>
                <input {...register("feed_weight_kg")} type="number" className="input" placeholder="50" />
              </div>
              <div>
                <label className="label">Composition</label>
                <input {...register("feed_composition")} className="input" placeholder="Maize germ, sunflower cake…" />
              </div>
            </div>
          </div>
        )}

        {/* Images */}
        <div className="card p-6 space-y-4">
          <h2 className="font-display font-bold text-gray-900 border-b border-gray-100 pb-3">Images</h2>
          <div className="flex gap-2">
            <input
              type="url"
              value={imgInput}
              onChange={(e) => setImgInput(e.target.value)}
              className="input flex-1 text-sm"
              placeholder="Paste image URL (Supabase storage or Unsplash)"
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
            />
            <button type="button" onClick={addImage} className="btn-secondary shrink-0">
              <ImagePlus size={16} /> Add
            </button>
          </div>
          {images.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {images.map((url, i) => (
                <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200">
                  <img src={url} alt={`img-${i}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImages((prev) => prev.filter((_, j) => j !== i))}
                    className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <p className="text-xs text-gray-400">
            Upload images to Supabase Storage and paste the public URL. Max 10 images.
          </p>
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <button type="submit" className="btn-primary px-8 py-3" disabled={isSubmitting || saved}>
            {saved ? (
              "✅ Saved!"
            ) : isSubmitting ? (
              <><Loader2 size={16} className="animate-spin" /> Saving…</>
            ) : (
              <><Save size={16} /> {isEdit ? "Save Changes" : "Publish Listing"}</>
            )}
          </button>
          <Link href="/admin/items" className="btn-secondary py-3">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
