import type React from "react";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { getAnalyticsProductFromPath, trackEvent } from "@/components/GAScript";
import type { AnalyticsIntent, AnalyticsProduct } from "@/components/GAScript";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ContactFormProps = {
  className?: string;
  title?: string;
  description?: string;
  defaultService?: string;
  product?: AnalyticsProduct;
  defaultIntent?: AnalyticsIntent;
};

export default function ContactForm({
  className = "",
  title,
  description,
  defaultService = "",
  product,
  defaultIntent = "general",
}: ContactFormProps) {
  const { t } = useTranslation("contact");
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(defaultService);
  const [intent, setIntent] = useState<AnalyticsIntent>(defaultIntent);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    const selectedProduct =
      (service === "erp" || service === "wms" ? service : undefined) ||
      product ||
      getAnalyticsProductFromPath(router.asPath);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          ...(service ? { service } : {}),
          product: selectedProduct,
          intent,
          message,
          website,
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) {
        setStatus("error");
        return;
      }
      // Conversion events are sent only after the backend confirms success.
      if (result.recorded === true) {
        const eventParams = {
          method: "contact_form",
          ...(selectedProduct ? { product: selectedProduct } : {}),
          intent,
          service: service || "unspecified",
        };
        trackEvent("generate_lead", eventParams, router.locale);
        trackEvent("contact_form_submit", eventParams, router.locale);
      }
      setStatus("success");
      setName("");
      setEmail("");
      setService(defaultService);
      setIntent(defaultIntent);
      setMessage("");
      setWebsite("");
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={className}>
      <div className="mx-auto max-w-3xl">
        {(title || description) && (
          <div className="mb-8 text-center">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            )}
            {description && (
              <p className="mt-3 text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-5 rounded-2xl border bg-card p-6 shadow-sm md:grid-cols-2 md:p-8"
        >
          <div className="space-y-2">
            <Label htmlFor="contact-name">{t("form.name")}</Label>
            <Input
              id="contact-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              maxLength={120}
              autoComplete="name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">{t("form.email")}</Label>
            <Input
              id="contact-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              maxLength={254}
              autoComplete="email"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="contact-service">{t("form.service")}</Label>
            <Select value={service} onValueChange={setService}>
              <SelectTrigger id="contact-service">
                <SelectValue placeholder={t("form.service")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web">
                  {t("form.service_options.web")}
                </SelectItem>
                <SelectItem value="mobile">
                  {t("form.service_options.mobile")}
                </SelectItem>
                <SelectItem value="system">
                  {t("form.service_options.system")}
                </SelectItem>
                <SelectItem value="erp">
                  {t("form.service_options.erp", "ERP")}
                </SelectItem>
                <SelectItem value="wms">
                  {t(
                    "form.service_options.wms",
                    "Warehouse Management System (WMS)"
                  )}
                </SelectItem>
                <SelectItem value="uiux">
                  {t("form.service_options.uiux")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="contact-intent">
              {t("form.intent", "Request type")}
            </Label>
            <Select
              value={intent}
              onValueChange={(value) => {
                if (value === "demo" || value === "general") setIntent(value);
              }}
            >
              <SelectTrigger id="contact-intent">
                <SelectValue placeholder={t("form.intent", "Request type")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">
                  {t("form.intent_options.general", "General inquiry")}
                </SelectItem>
                <SelectItem value="demo">
                  {t("form.intent_options.demo", "Request a demo")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="contact-message">{t("form.message")}</Label>
            <Textarea
              id="contact-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={t("form.placeholder_message")}
              maxLength={5000}
              rows={5}
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute -left-[9999px] h-px w-px overflow-hidden"
          >
            <Label htmlFor="contact-website">Website</Label>
            <Input
              id="contact-website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </div>
          {status !== "idle" && (
            <div
              role="status"
              aria-live="polite"
              className={`rounded-lg border px-4 py-3 text-sm md:col-span-2 ${
                status === "success"
                  ? "border-green-200 bg-green-50 text-green-800"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {status === "success" ? `✅ ${t("success")}` : t("error")}
            </div>
          )}
          <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
            <span className="text-xs text-muted-foreground">
              {t("form.response_note")}
            </span>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t("form.sending") : t("form.submit")}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
