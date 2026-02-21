// File: src/pages/Tentang.jsx
// Anda bisa menggunakan komponen dari Shadcn seperti <Card>, <Button>, <Accordion>, dll.

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, Code, ShieldCheck } from "lucide-react"; // Contoh ikon dari lucide-react
import { WhatsappWrapper } from "@/components/WhatsappButton";
import SeoHead from "@/components/SeoHead";
import { withI18n } from "@/lib/withi18n";
import { HeartHandshake, Heart, Activity } from "lucide-react";
import { CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";

export const getStaticProps = withI18n(["common"]);

import React from "react";
import Image from "next/image";
import { CheckCircle2, Code2, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-white text-slate-900 font-sans">
      {/* --- OUR STORY / MISSION --- */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {/* Placeholder Image: Office / Team working */}
                <img
                  src="/images/meeting.jpeg"
                  alt="Tim Codeverta Diskusi"
                  className="object-cover w-full h-[25rem]"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-600 rounded-lg -z-10 hidden lg:block"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-slate-200 rounded-full -z-10 hidden lg:block"></div>
            </div>

            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-slate-900 text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Our <span className="text-blue-600">Core Values</span>
              </h2>
              <div className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  <strong>Codeverta</strong> was born from a simple conviction:{" "}
                  <br /> every business, regardless of size, deserves a
                  technology partner they can truly trust. Too often, we have
                  seen digital projects falter due to poor communication, hidden
                  costs, or results that fail to meet expectations.
                </p>
                <p>
                  We are here to change that. As a team of professional
                  developers, designers, and IT consultants, we are committed to
                  three core pillars: code quality, transparent communication,
                  and client success. Our mission is to transform your digital
                  vision into tangible solutions that perform flawlessly and
                  deliver real value to your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SocialImpact />
    </div>
  );
}

const SocialImpact = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-sm font-medium text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
              <Heart className="mr-2 h-4 w-4 fill-rose-500" />
              <span>Our Mission for Humanity</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Our Commitment to{" "}
              <span className="text-rose-600">Cancer Care</span>
            </h2>

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              At PT Zenit Technology Solution, we believe that innovation should
              serve a higher purpose. We are proud to pledge{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                more than 3% of our annual net profit
              </span>{" "}
              directly to support underprivileged cancer patients via{" "}
              <a
                href="http://kitabisa.com/"
                target="_blank"
                className="underline text-blue-600"
              >
                kitabisa.com
              </a>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <Activity className="h-6 w-6 text-rose-500 shrink-0" />
                <div>
                  <h4 className="font-semibold">Direct Support</h4>
                  <p className="text-sm text-slate-500">
                    Helping families cover critical treatment costs.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <ShieldCheck className="h-6 w-6 text-blue-500 shrink-0" />
                <div>
                  <h4 className="font-semibold">Ethical Tech</h4>
                  <p className="text-sm text-slate-500">
                    Your projects directly fund social impact.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Visual Card */}
          <div className="relative group bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-hidden">
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-tr from-rose-500/20 via-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-1000 blur-2xl" />

            <img
              src="/assets/kitabisa.jpg"
              alt="Dukungan Kanker"
              className="relative rounded-2xl object-contain w-full h-[25rem] shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
