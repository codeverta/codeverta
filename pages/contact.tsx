import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, MessageSquare, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  const { t } = useTranslation("contact");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic integrasi ke API atau WhatsApp API
    alert(t("success"));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Area */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Side (1 Column) */}
          <div className="space-y-6">
            <Card className="border-none shadow-md bg-primary text-primary-foreground">
              <CardContent className="p-8 space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">
                      {t("info.office_title")}
                    </h3>
                    <p className="text-primary-foreground/80">
                      {t("info.address")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">
                      {t("info.whatsapp_title")}
                    </h3>
                    <p className="text-primary-foreground/80">
                      +62 812-xxxx-xxxx
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">
                      {t("info.email_title")}
                    </h3>
                    <p className="text-primary-foreground/80">
                      hello@codeverta.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Proof/Quick Link */}
            <div className="p-6 border rounded-xl bg-white shadow-sm italic text-slate-500">
              "BikinWebsiteJogja membantu transformasi digital bisnis lokal ke
              skala nasional."
            </div>
          </div>

          {/* Form Side (2 Columns) */}
          <Card className="lg:col-span-2 border-none shadow-xl">
            <CardContent className="p-8">
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">{t("form.name")}</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    required
                    className="bg-slate-50 border-slate-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("form.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    required
                    className="bg-slate-50 border-slate-200"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label>{t("form.service")}</Label>
                  <Select>
                    <SelectTrigger className="bg-slate-50 border-slate-200">
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

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="message">{t("form.message")}</Label>
                  <Textarea
                    id="message"
                    placeholder={t("form.placeholder_message")}
                    className="min-h-[150px] bg-slate-50 border-slate-200"
                  />
                </div>

                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    className="w-full md:w-auto px-8 h-12 text-lg font-bold gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {t("form.submit")}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["contact"])),
    },
  };
}
