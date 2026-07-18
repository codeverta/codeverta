import { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { WhatsappWrapper } from "@/components/WhatsappButton";

/**
 * Subtle "kawung" batik motif — four dots orbiting a centre point,
 * repeated as a low-opacity background pattern. A quiet nod to Jogja
 * rather than a decorative flourish.
 */
function KawungPattern({ className = "" }) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="kawung"
          x="0"
          y="0"
          width="56"
          height="56"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="14"
            cy="14"
            r="5"
            fill="none"
            stroke="#C88A3D"
            strokeWidth="1"
          />
          <circle
            cx="42"
            cy="42"
            r="5"
            fill="none"
            stroke="#C88A3D"
            strokeWidth="1"
          />
          <circle cx="42" cy="14" r="1.5" fill="#C88A3D" />
          <circle cx="14" cy="42" r="1.5" fill="#C88A3D" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#kawung)" />
    </svg>
  );
}

export default function ContactPage() {
  const { t } = useTranslation("contact");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, service, message }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setService("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EC] text-[#171A2B]">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap");
        .font-display {
          font-family: "Fraunces", serif;
          font-optical-sizing: auto;
        }
        .font-mono-label {
          font-family: "IBM Plex Mono", monospace;
        }
        .font-body {
          font-family: "Inter", sans-serif;
        }
      `}</style>

      <div className="font-body max-w-6xl mx-auto px-4 py-16 md:py-24">
        {/* Eyebrow + Header */}
        <div className="mb-14 md:mb-20 max-w-3xl">
          <div className="font-mono-label text-xs tracking-[0.2em] uppercase text-[#93443A] mb-5 flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-[#93443A]" />
            {t("eyebrow", "Mulai proyek")}
          </div>
          <h1 className="font-display text-[2.75rem] leading-[1.05] md:text-6xl font-semibold tracking-tight text-[#171A2B]">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg text-[#4B5163] leading-relaxed max-w-xl">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Info Side — dossier card */}
          <div className="lg:col-span-4 relative overflow-hidden rounded-2xl bg-[#1E2444] text-[#F1EEE4]">
            <div className="absolute inset-0 opacity-[0.12] pointer-events-none">
              <KawungPattern className="w-full h-full" />
            </div>

            <div className="relative p-8 md:p-9 flex flex-col h-full">
              <div className="font-mono-label text-[11px] tracking-[0.18em] uppercase text-[#C88A3D] mb-8">
                {t("info.reach_label", "Cara menghubungi")}
              </div>

              <div className="space-y-7 flex-1">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 shrink-0 p-2 rounded-md border border-white/15 bg-white/5">
                    <MapPin
                      className="w-4 h-4 text-[#C88A3D]"
                      strokeWidth={1.75}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-[15px] text-white">
                      {t("info.office_title")}
                    </h3>
                    <p className="text-[#B9BDD1] text-sm mt-1 leading-relaxed">
                      {t("info.address")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-0.5 shrink-0 p-2 rounded-md border border-white/15 bg-white/5">
                    <Phone
                      className="w-4 h-4 text-[#C88A3D]"
                      strokeWidth={1.75}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-[15px] text-white">
                      {t("info.whatsapp_title")}
                    </h3>
                    <WhatsappWrapper>
                      <p className="font-mono-label text-sm text-[#B9BDD1] mt-1 select-all hover:text-[#C88A3D] transition-colors">
                        +62 881-0116-92615
                      </p>
                    </WhatsappWrapper>
                    <p className="text-xs text-[#7C8299] mt-0.5">
                      {t("info.whatsapp_note", "Sales & Support")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-0.5 shrink-0 p-2 rounded-md border border-white/15 bg-white/5">
                    <Mail
                      className="w-4 h-4 text-[#C88A3D]"
                      strokeWidth={1.75}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-[15px] text-white">
                      {t("info.email_title")}
                    </h3>
                    <p className="font-mono-label text-sm text-[#B9BDD1] mt-1">
                      hello@codeverta.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-white/10">
                <p className="font-display italic text-[#D8CDB4] text-[15px] leading-relaxed">
                  &ldquo;Codeverta membantu transformasi digital bisnis lokal ke
                  skala nasional.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-8 rounded-2xl bg-white border border-[#E8E3D6] p-8 md:p-10">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7"
            >
              <div className="space-y-2.5">
                <Label
                  htmlFor="name"
                  className="font-mono-label text-[11px] tracking-[0.14em] uppercase text-[#8790A3]"
                >
                  {t("form.name")}
                </Label>
                <Input
                  id="name"
                  placeholder="Samantha Meliora Samosir"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-0 border-b-2 rounded-none px-0 h-11 bg-transparent border-[#E8E3D6] focus-visible:ring-0 focus-visible:border-[#C88A3D] transition-colors placeholder:text-[#B9BDC9]"
                />
              </div>

              <div className="space-y-2.5">
                <Label
                  htmlFor="email"
                  className="font-mono-label text-[11px] tracking-[0.14em] uppercase text-[#8790A3]"
                >
                  {t("form.email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="samantha@codeverta.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-0 border-b-2 rounded-none px-0 h-11 bg-transparent border-[#E8E3D6] focus-visible:ring-0 focus-visible:border-[#C88A3D] transition-colors placeholder:text-[#B9BDC9]"
                />
              </div>

              <div className="md:col-span-2 space-y-2.5">
                <Label className="font-mono-label text-[11px] tracking-[0.14em] uppercase text-[#8790A3]">
                  {t("form.service")}
                </Label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger className="border-0 border-b-2 rounded-none px-0 h-11 bg-transparent border-[#E8E3D6] focus:ring-0 data-[state=open]:border-[#C88A3D] transition-colors">
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

              <div className="md:col-span-2 space-y-2.5">
                <Label
                  htmlFor="message"
                  className="font-mono-label text-[11px] tracking-[0.14em] uppercase text-[#8790A3]"
                >
                  {t("form.message")}
                </Label>
                <Textarea
                  id="message"
                  placeholder={t("form.placeholder_message")}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[140px] border-2 rounded-lg bg-[#FBFAF6] border-[#E8E3D6] focus-visible:ring-0 focus-visible:border-[#C88A3D] transition-colors placeholder:text-[#B9BDC9] p-4"
                />
              </div>

              {/* Feedback banners */}
              {status === "success" && (
                <div className="md:col-span-2 rounded-xl bg-green-50 border border-green-200 px-5 py-3.5 text-sm text-green-800 font-medium">
                  ✅{" "}
                  {t(
                    "success",
                    "Pesan berhasil dikirim! Kami akan menghubungi Anda segera."
                  )}
                </div>
              )}
              {status === "error" && (
                <div className="md:col-span-2 rounded-xl bg-red-50 border border-red-200 px-5 py-3.5 text-sm text-red-700 font-medium">
                  ❌ Terjadi kesalahan. Silakan coba lagi atau hubungi kami
                  langsung.
                </div>
              )}

              <div className="md:col-span-2 flex items-center justify-between pt-2">
                <p className="font-mono-label text-xs text-[#8790A3] hidden md:block">
                  {t("form.response_note", "Kami balas dalam 1x24 jam")}
                </p>
                <Button
                  type="submit"
                  disabled={loading}
                  className="group w-full md:w-auto px-7 h-12 text-[15px] font-medium gap-2 rounded-full bg-[#171A2B] hover:bg-[#C88A3D] text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Mengirim..." : t("form.submit")}
                  {!loading && (
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "contact"])),
    },
  };
}
