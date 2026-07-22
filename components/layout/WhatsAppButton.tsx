"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "919876543210";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi Arvaya! I have a question about your Ayurvedic products."
);

export default function WhatsAppButton() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-3">
      {expanded && (
        <div className="bg-white rounded-2xl shadow-[0_16px_48px_rgba(107,93,79,0.18)] p-4 w-64 border border-[#A8C09A]/30 animate-[fade-up_0.2s_ease-out]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center">
              <MessageCircle size={16} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-[#2C2C2C]">Arvaya Team</p>
              <p className="text-[10px] text-[#4A7C59]">Typically replies in 1 hour</p>
            </div>
          </div>
          <p className="text-xs text-[#6B5D4F] mb-3 leading-relaxed">
            Have a question about your Prakriti or our products? Chat with us on WhatsApp!
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white text-sm font-medium py-2.5 rounded-xl hover:bg-[#1ea855] transition-colors"
          >
            <MessageCircle size={14} />
            Start Chat
          </a>
        </div>
      )}

      <button
        onClick={() => setExpanded(v => !v)}
        aria-label={expanded ? "Close WhatsApp chat" : "Chat on WhatsApp"}
        className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-[0_8px_32px_rgba(37,211,102,0.35)] hover:scale-105 transition-transform duration-200"
      >
        {expanded ? <X size={18} /> : <MessageCircle size={18} />}
        <span className="text-sm font-medium hidden sm:inline">
          {expanded ? "Close" : "Chat with us"}
        </span>
      </button>
    </div>
  );
}
