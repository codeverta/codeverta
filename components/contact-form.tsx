import type React from "react";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { trackEvent } from "@/components/GAScript";
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
};

export default function ContactForm({
  className = "",
  title,
  description,
  defaultService = "",
}: ContactFormProps) {
  const { t } = useTranslation("contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(defaultService);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, service, message, website }),
      });
      if (!response.ok) {
        setStatus("error");
        return;
      }
      // Conversion events are sent only after the backend confirms success.
      trackEvent("generate_lead", { method: "contact_form" });
      trackEvent("contact_form_submit", {
        method: "contact_form",
        service: service || "unspecified",
      });
      setStatus("success");
      setName("");
      setEmail("");
      setService(defaultService);
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
                <SelectItem value="uiux">
                  {t("form.service_options.uiux")}
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
