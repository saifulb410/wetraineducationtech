"use client";

import Script from "next/script";
import { useEffect } from "react";

const TAWK_PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID ?? "";
const TAWK_WIDGET_ID   = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID   ?? "default";

declare global {
  interface Window {
    Tawk_API?: {
      customStyle?: {
        visibility?: {
          desktop?: { position?: string; xOffset?: number; yOffset?: number };
          mobile?:  { position?: string; xOffset?: number; yOffset?: number };
        };
      };
      onLoad?: () => void;
      setAttributes?: (attrs: Record<string, string>, cb?: (err: unknown) => void) => void;
    };
    Tawk_LoadStart?: Date;
  }
}

export default function LiveChat() {
  useEffect(() => {
    if (!TAWK_PROPERTY_ID) return;

    window.Tawk_API = window.Tawk_API ?? {};
    window.Tawk_LoadStart = new Date();

    // Style the widget to sit above the WhatsApp button
    window.Tawk_API.customStyle = {
      visibility: {
        desktop: { position: "br", xOffset: 20, yOffset: 80 },
        mobile:  { position: "br", xOffset: 10, yOffset: 80 },
      },
    };
  }, []);

  if (!TAWK_PROPERTY_ID) return null;

  return (
    <Script
      id="tawk-to"
      strategy="afterInteractive"
      src={`https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`}
      crossOrigin="anonymous"
    />
  );
}
