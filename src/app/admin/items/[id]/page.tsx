"use client";
import { useParams } from "next/navigation";
import ItemForm from "../ItemForm";
import { MOCK_ITEMS } from "@/lib/mock-data";

export default function EditItemPage() {
  const { id } = useParams<{ id: string }>();
  const item = MOCK_ITEMS.find((i) => i.id === id);
  if (!item) return <div className="p-8 text-center text-gray-500">Item not found.</div>;
  return <ItemForm initialData={{ ...item, id: item.id }} isEdit />;
}
