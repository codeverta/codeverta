import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Globe, Award, TrendingUp } from "lucide-react";
import CountUp from "@/components/CountUp";
import { companyStats } from "@/lib/data";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ModernStatsSection() {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <section className="w-full max-w-7xl py-20 md:py-32">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Statistik Perusahaan Kami
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Kami bangga dengan pencapaian kami yang mencerminkan komitmen
            terhadap keunggulan dan kepuasan klien.
          </p>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {companyStats.map((stat, i) => (
              <motion.div
                key={i}
                variants={item}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-transparent rounded-2xl transform transition-transform group-hover:scale-105" />
                <div className="relative p-8 rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-lg shadow-slate-200/50 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-slate-300/50">
                  <div className="flex justify-center mb-6 transform transition-transform group-hover:scale-110 duration-300">
                    {stat.icon}
                  </div>
                  <div className="space-y-2">
                    <div className="text-5xl mx-9 font-bold tracking-tight text-slate-900">
                      <CountUp
                        from={stat.from || 0}
                        to={stat.value}
                        duration={stat.duration}
                        decimal={stat.decimal || 0}
                        separator=","
                        className="count-up-text"
                      />
                      <span className="text-4xl ml-1 bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent">
                        {stat.unit}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-600 tracking-wide uppercase">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
