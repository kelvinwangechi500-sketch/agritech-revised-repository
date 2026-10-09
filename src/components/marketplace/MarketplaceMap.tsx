"use client";
import { useEffect, useRef } from "react";
import type { MapMarker } from "@/types";
import { formatPrice } from "@/lib/utils";

interface Props {
  markers: MapMarker[];
  height?: string;
  center?: [number, number];
  zoom?: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  livestock: "#16a34a",
  vet:       "#2563eb",
  feeds:     "#d97706",
  products:  "#7c3aed",
};

const CATEGORY_EMOJI: Record<string, string> = {
  livestock: "🐄",
  vet:       "🩺",
  feeds:     "🌽",
  products:  "🥛",
};

export default function MarketplaceMap({
  markers,
  height = "400px",
  center = [0.2, 37.9],
  zoom = 7,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    (async () => {
      const L = (await import("leaflet")).default;

      const map = L.map(containerRef.current!, {
        center,
        zoom,
        zoomControl: true,
        scrollWheelZoom: false,
      });
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      markers.forEach((m) => {
        const color = CATEGORY_COLORS[m.category] ?? "#16a34a";
        const emoji = CATEGORY_EMOJI[m.category] ?? "📍";

        const icon = L.divIcon({
          className: "",
          html: `
            <div style="
              background:${color};
              color:white;
              border-radius:50% 50% 50% 0;
              transform:rotate(-45deg);
              width:36px;height:36px;
              display:flex;align-items:center;justify-content:center;
              box-shadow:0 2px 8px rgba(0,0,0,.3);
              border:2px solid white;
            ">
              <span style="transform:rotate(45deg);font-size:16px">${emoji}</span>
            </div>`,
          iconSize:   [36, 36],
          iconAnchor: [18, 36],
          popupAnchor:[0, -38],
        });

        L.marker([m.lat, m.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <div style="min-width:160px;font-family:system-ui">
              <p style="font-weight:700;margin:0 0 4px">${m.title}</p>
              <p style="color:${color};font-weight:700;font-size:15px;margin:0">${formatPrice(m.price)}</p>
              <a href="/item/${m.id}" style="display:inline-block;margin-top:8px;background:${color};color:white;padding:4px 12px;border-radius:8px;text-decoration:none;font-size:13px">View →</a>
            </div>
          `);
      });
    })();

    return () => { mapRef.current?.remove(); mapRef.current = null; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} style={{ height, width: "100%" }} />;
}
