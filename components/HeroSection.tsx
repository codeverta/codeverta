"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FloatingCards from "./FloatingCards";
import RotatingText from "./RotatingText";
import { WhatsAppIcon, WhatsappWrapper } from "./WhatsappButton";

export default function HeroSection({ t }) {
  return (
    <section className="w-full py-16 md:py-24 overflow-hidden relative">
      {/* Background Grid - preserved your dark mode logic */}
      <div className="absolute inset-0 z-0 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      {/* Floating Cards (Z-index handled to stay behind main text but above bg grid) */}
      <div className="absolute inset-0 z-10 pointer-events-none hidden lg:block">
        <FloatingCards />
      </div>

      <div className="container px-4 md:px-6 relative z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-5xl mx-auto pointer-events-auto"
        >
          <Badge
            className="mb-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-gray-200 dark:border-zinc-800 shadow-sm rounded-full px-5 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-all hover:shadow-md cursor-default"
            variant="secondary"
          >
            Leading Software Company Based in Bekasi & Yogyakarta
          </Badge>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-gray-900 via-gray-800 to-gray-500 dark:from-white dark:via-gray-200 dark:to-gray-500 pb-4 leading-[1.1]">
            {t("home.hero.prefix")} <br />
            <RotatingText
              texts={t("home.hero.rotating", { returnObjects: true })}
              mainClassName="inline mt-2 px-3 sm:px-4 md:px-5 bg-cyan-400 dark:bg-cyan-500 text-gray-900 overflow-hidden py-1 sm:py-2 md:py-2 justify-center rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] border-2 border-gray-900 dark:border-white transition-all"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-1 sm:pb-2 md:pb-2"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2500}
            />{" "}
            {t("home.hero.suffix")}
            {/* {t("home.hero.suffix")
              .split("\n")
              .map((line, index) => (
                <span key={index} className="block mt-2">
                  {line}
                </span>
              ))} */}
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            {t("home.subtitle")}
            <br />
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <WhatsappWrapper className="w-full sm:w-auto">
              <Button
                size="lg"
                className="rounded-full w-full sm:w-auto h-14 px-8 text-base font-bold shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-0.5 bg-green-500 hover:bg-green-600 dark:bg-white text-white dark:text-gray-900"
              >
                <WhatsAppIcon className="mr-2" />
                {t("home.cta.whatsapp")}
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </WhatsappWrapper>
            <Button
              size="lg"
              asChild
              variant="outline"
              className="rounded-full w-full sm:w-auto h-14 px-8 text-base font-bold bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border-2 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all hover:-translate-y-0.5"
            >
              <Link href="/produk">{t("home.cta.products")}</Link>
            </Button>
          </div>

          {/* Trust Badges - Revamped as clean pills */}
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-3 md:gap-6 mt-16 text-sm font-medium text-gray-600 dark:text-gray-400 relative z-30">
            {" "}
            {[
              t("home.badges.consultation"),
              t("home.badges.fast"),
              t("home.badges.guarantee"),
              t("home.badges.trusted"),
            ].map((badge, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 dark:border-zinc-800 shadow-sm"
              >
                <div className="bg-cyan-100 dark:bg-cyan-900/30 p-1 rounded-full">
                  <Check
                    className="size-3.5 text-cyan-600 dark:text-cyan-400"
                    strokeWidth={3}
                  />
                </div>
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
