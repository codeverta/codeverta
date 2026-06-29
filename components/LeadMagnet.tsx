// components/LeadMagnet.tsx
// Lead capture component: email signup + WhatsApp CTA, embedded inside blog articles
// Shows a subtle, contextual CTA that converts problem→solution readers into leads

import React, { useState } from "react";
import {
  Mail,
  Send,
  CheckCircle,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface LeadMagnetProps {
  /** Display variant */
  variant?: "inline" | "footer" | "popup";
  /** Contextual offer text (e.g. "Butuh sistem serupa?") */
  headline?: string;
  /** Subtitle */
  subtitle?: string;
  /** The product/service this article relates to */
  relatedProduct?: string;
  /** Product page link */
  productLink?: string;
}

export default function LeadMagnet({
  variant = "inline",
  headline = "Butuh Sistem Serupa untuk Bisnis Anda?",
  subtitle = "Dapatkan konsultasi GRATIS 30 menit — tanpa syarat. Kami bantu analisis kebutuhan Anda dan kasih rekomendasi sistem yang tepat.",
  relatedProduct,
  productLink,
}: LeadMagnetProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // In production: POST to API endpoint or email service
    console.log("Lead captured:", email, "for:", relatedProduct);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card
        className={`border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 ${
          variant === "inline" ? "my-8" : "my-4"
        }`}
      >
        <CardContent className="flex items-center gap-3 p-6">
          <CheckCircle className="w-8 h-8 text-green-500 shrink-0" />
          <div>
            <p className="font-semibold text-green-800 dark:text-green-300">
              Terima Kasih! ✅
            </p>
            <p className="text-sm text-green-700 dark:text-green-400">
              Tim Codeverta akan menghubungi Anda dalam 1×24 jam via email.
              Sementara itu, hubungi kami langsung via WhatsApp untuk respon
              lebih cepat!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const baseClass =
    variant === "inline"
      ? "my-8 border-2 border-blue-100 dark:border-blue-900"
      : "my-4 border border-gray-200 dark:border-gray-700";

  return (
    <Card className={`${baseClass} overflow-hidden`}>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Mail className="w-5 h-5" />
          {headline}
        </h3>
        {relatedProduct && (
          <p className="text-sm text-blue-100 mt-1">
            Artikel ini membahas <strong>{relatedProduct}</strong>
          </p>
        )}
      </div>
      <CardContent className="p-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {subtitle}
        </p>

        {/* WhatsApp CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Respon lebih cepat via WhatsApp ⚡
          </p>
          <a
            href="https://wa.me/62881011692615?text=Halo%20Codeverta%2C%20saya%20tertarik%20dengan%20solusi%20yang%20dibahas%20di%20artikel."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Chat via WhatsApp
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
