"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  faqItems,
  features,
  monthlyPricing,
  steps,
  testimonials,
} from "@/lib/data";
import { Check, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import { WhatsAppIcon, WhatsappWrapper } from "@/components/WhatsappButton";
import { ProjectsSection } from "@/components/landing/ProjectsSection";
import RotatingText from "@/components/RotatingText";
import { logos } from "@/lib/data";
import { companyStats } from "@/lib/data"; // Ubah ini sesuai lokasi data stats Anda
import { AnimatedCounter } from "@/components/AnimatedCounter";
import ModernStatsSection from "@/components/ModernStats";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import {
  Factory,
  Truck,
  Store,
  HardHat,
  ShoppingCart,
  GraduationCap,
  Briefcase,
  Landmark,
  HeartPulse,
  HeartHandshake,
} from "lucide-react";
import { ShoppingBag, Globe, Wallet, Stethoscope } from "lucide-react";
import clsx from "clsx";
import HeroSection from "@/components/HeroSection";
import SeoHead from "@/components/SeoHead";
import { getProjects } from "@/lib/projects";

export async function getStaticProps({ locale }) {
  const projects = getProjects(locale);

  // Only pass fields the ProjectsSection actually needs — saves ~50 kB
  const trimmed = projects.slice(0, 9).map((p) => ({
    product: {
      id: p.product.id,
      image: p.product.image,
      name: p.product.name,
      description: p.product.description,
      technologies: p.product.technologies,
    },
  }));

  return {
    props: {
      projects: trimmed,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default function LandingPage({ projects }: any) {
  const { t } = useTranslation("common");
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  const getList = <T,>(key: string, fallback: T[]): T[] => {
    const translated = t(key, { returnObjects: true });
    return Array.isArray(translated) ? (translated as T[]) : fallback;
  };
  const featureItems = getList("homePage.features.items", features).map(
    (feature, index) => ({
      ...feature,
      icon: features[index]?.icon,
    })
  );
  const stepItems = getList("homePage.process.items", steps);
  const testimonialItems = getList("homePage.testimonials.items", testimonials);
  const pricingItems = getList("homePage.pricing.monthly", monthlyPricing);
  const enterprisePricingItems = getList("homePage.pricing.enterprise", [
    {
      name: "Enterprise",
      price: "Rp >20Jt",
      description: "Untuk Perusahaan dengan Sistem yang Kompleks",
      features: [
        "Fitur Custom Sesuai Permintaan",
        "Integrasi dengan Sistem/Apilikasi Lain",
        "Backup Data Berkala di Cloud",
        "Monitoring Keamanan, Performa 24/7",
        "Pengerjaan Prioritas",
        "Maintenance Lebih dari 1 Tahun",
      ],
      cta: "Contact Sales",
    },
  ]);
  const faqList = getList("homePage.faq.items", faqItems);
  const industryItems = getList("homePage.industries.items", industries).map(
    (industry, index) => ({
      ...industry,
      icon: industries[index]?.icon,
    })
  );

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <SeoHead
        title={t("home.seo.title")}
        description={t("home.seo.description")}
        keywords={t("home.seo.keywords")}
      />
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection t={t} />
        {/* Trusted By Section */}
        <section className="w-full bg-background py-12 border-y border-border/50">
          <div className="container mx-auto">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/70 mb-10">
              {t("trustedBy")}
            </p>

            <div className="group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex animate-scroll gap-10 md:gap-16 items-center min-w-full group-hover:[animation-play-state:paused]">
                {[...logos, ...logos].map((logo, index) => (
                  <Link
                    key={index}
                    href={logo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-none"
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      title={logo.alt}
                      className={clsx(
                        "h-12 md:h-20 w-auto opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 dark:invert",
                        logo.classes
                      )}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes scroll {
              from {
                transform: translateX(0);
              }
              to {
                transform: translateX(-50%);
              }
            }

            .animate-scroll {
              display: flex;
              width: max-content;
              animation: scroll 10s linear infinite;
            }

            @media (min-width: 768px) {
              .animate-scroll {
                animation: scroll 30s linear infinite;
              }
            }
          `}</style>
        </section>
        <IndustrySection t={t} industries={industryItems} />
        {/* <ModernStatsSection /> */}
        {/* Tambahkan konten tersebut disini */}
        <ProjectsSection projects={projects} />
        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium"
                variant="secondary"
              >
                {t("features.badge")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                {t("features.title")}
              </h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                {t("features.subtitle")}
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {featureItems.map((feature, i) => (
                <motion.div key={i} variants={item}>
                  <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="size-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="development"
          className="w-full py-20 md:py-32 bg-muted/30 relative overflow-hidden"
        >
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium"
                variant="secondary"
              >
                {t("process.badge")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                {t("process.title")}
              </h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                {t("process.subtitle")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
              {stepItems.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative z-10 flex flex-col items-center text-center space-y-4"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-xl font-bold shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium"
                variant="secondary"
              >
                {t("testimonials.badge")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                {t("testimonials.title")}
              </h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                {t("testimonials.subtitle")}
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonialItems.map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex mb-4">
                        {Array(testimonial.rating)
                          .fill(0)
                          .map((_, j) => (
                            <Star
                              key={j}
                              className="size-4 text-yellow-500 fill-yellow-500"
                            />
                          ))}
                      </div>
                      <p className="text-lg mb-6 flex-grow">
                        {testimonial.quote}
                      </p>
                      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/40">
                        <div className="size-10 rounded-full bg-muted flex items-center justify-center text-foreground font-medium">
                          {testimonial.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="w-full py-20 md:py-32 bg-muted/30 relative overflow-hidden"
        >
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium"
                variant="secondary"
              >
                {t("pricing.badge")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                {t("pricing.title")}
              </h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                {t("pricing.subtitle")}
              </p>
            </motion.div>

            <div className="mx-auto max-w-5xl">
              <Tabs defaultValue="monthly" className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList className="rounded-full p-1">
                    <TabsTrigger value="monthly" className="rounded-full px-6">
                      {t("pricing.tabs.smme")}
                    </TabsTrigger>
                    <TabsTrigger value="annually" className="rounded-full px-6">
                      {t("pricing.tabs.enterprise")}
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="monthly">
                  <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                    {pricingItems.map((plan, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <Card
                          className={`relative overflow-hidden h-full ${
                            plan.popular
                              ? "border-primary shadow-lg"
                              : "border-border/40 shadow-md"
                          } bg-gradient-to-b from-background to-muted/10 backdrop-blur`}
                        >
                          {plan.popular && (
                            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                              {t("pricing.card.popular")}
                            </div>
                          )}
                          <CardContent className="p-6 flex flex-col h-full">
                            <h3 className="text-2xl font-bold">{plan.name}</h3>
                            <div className="flex items-baseline mt-4">
                              <span className="text-2xl font-bold">
                                {plan.price}
                              </span>
                              <span className="text-muted-foreground ml-1">
                                {t("pricing.card.perProject")}
                              </span>
                            </div>
                            <p className="text-muted-foreground mt-2">
                              {plan.description}
                            </p>
                            <ul className="space-y-3 my-6 flex-grow">
                              {plan.features.map((feature, j) => (
                                <li key={j} className="flex items-center">
                                  <Check className="mr-2 size-4 text-primary" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <WhatsappWrapper>
                              <Button
                                className={`w-full mt-auto rounded-full ${
                                  plan.popular
                                    ? "bg-primary hover:bg-primary/90"
                                    : "bg-muted hover:bg-muted/80"
                                }`}
                                variant={plan.popular ? "default" : "outline"}
                              >
                                {plan.cta}
                              </Button>
                            </WhatsappWrapper>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="annually">
                  <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                    <div></div>
                    {enterprisePricingItems.map((plan, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <Card
                          className={`relative overflow-hidden h-full ${
                            plan.popular
                              ? "border-primary shadow-lg"
                              : "border-border/40 shadow-md"
                          } bg-gradient-to-b from-background to-muted/10 backdrop-blur`}
                        >
                          {plan.popular && (
                            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                              {t("pricing.card.popular")}
                            </div>
                          )}
                          <CardContent className="p-6 flex flex-col h-full">
                            <h3 className="text-2xl font-bold">{plan.name}</h3>
                            <div className="flex items-baseline mt-4">
                              <span className="text-4xl font-bold">
                                {plan.price}
                              </span>
                            </div>
                            <p className="text-muted-foreground mt-2">
                              {plan.description}
                            </p>
                            <ul className="space-y-3 my-6 flex-grow">
                              {plan.features.map((feature, j) => (
                                <li key={j} className="flex items-center">
                                  <Check className="mr-2 size-4 text-primary" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <WhatsappWrapper>
                              <Button
                                className={`w-full mt-auto rounded-full ${
                                  plan.popular
                                    ? "bg-primary hover:bg-primary/90"
                                    : "bg-muted hover:bg-muted/80"
                                }`}
                                variant={plan.popular ? "default" : "outline"}
                              >
                                {plan.cta}
                              </Button>
                            </WhatsappWrapper>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium"
                variant="secondary"
              >
                FAQ
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                {t("faq.title")}
              </h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                {t("faq.subtitle")}
              </p>
            </motion.div>

            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {faqList.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <AccordionItem
                      value={`item-${i}`}
                      className="border-b border-border/40 py-2"
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-32 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-6 text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                {t("cta.title")}
              </h2>
              <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
                {t("cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full h-12 px-8 text-base"
                >
                  {t("cta.buttons.free")}
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 text-base bg-transparent border-white text-white hover:bg-white/10"
                >
                  {t("cta.buttons.contact")}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

const industries = [
  {
    title: "Manufacturing",
    desc: "Streamline production, manage inventory, and ensure on-time delivery.",
    icon: Factory,
  },
  {
    title: "Trading & Distribution",
    desc: "Manage procurement, orders, and supply chains efficiently.",
    icon: Truck,
  },
  {
    title: "Retail",
    desc: "Boost sales, manage inventory, and enhance customer experience.",
    icon: ShoppingBag,
  },
  {
    title: "Engineering & Construction",
    desc: "Manage large-scale projects, resources, and budgets with ease.",
    icon: HardHat,
  },
  {
    title: "E-commerce",
    desc: "Manage orders, track customers, and grow online sales.",
    icon: Globe,
  },
  {
    title: "Education",
    desc: "Simplify student admissions, courses, and fees with one platform.",
    icon: GraduationCap,
  },
  {
    title: "Professional Services",
    desc: "Streamline project management, billing, and client collaboration.",
    icon: Briefcase,
  },
  {
    title: "Financial Services",
    desc: "Track finances, manage portfolios, and ensure compliance effortlessly.",
    icon: Wallet,
  },
  {
    title: "Healthcare",
    desc: "Manage patient records, appointments, and hospital operations seamlessly.",
    icon: Stethoscope,
  },
  {
    title: "Non-profit",
    desc: "Streamline fundraising, donor management, and project execution.",
    icon: HeartHandshake,
  },
];

function IndustrySection({ t, industries }) {
  return (
    <section className="py-12 bg-background">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">
            {t("homePage.industries.badge")}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {t("homePage.industries.title")}
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t("homePage.industries.subtitle")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {industries.map((item, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border bg-card transition-all hover:shadow-md hover:border-primary/50"
            >
              <item.icon className="w-8 h-8 mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <h4 className="font-semibold text-base mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
