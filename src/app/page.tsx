"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { QscLogo } from "@/components/common/QscLogo";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import {
  ShieldCheck,
  Building2,
  Users,
  FileCheck2,
  Lock,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Award,
  Globe,
  Sparkles,
} from "lucide-react";

export default function RootHomePage() {
  const { t, isArabic, toggleLanguage, language } = useLanguage();
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 border-b border-neutral-800">
        {/* Subtle background golden glow & grid */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-qsc-yellow/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left rtl:lg:text-right">
              {/* Sovereign Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-qsc-yellow/40 text-qsc-yellow text-xs font-bold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-qsc-yellow animate-pulse" />
                <span>
                  {isArabic
                    ? "المنظومة الرقمية المعتمدة لحوكمة نادي قطر الرياضي"
                    : "The King — Digital Administration"}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                {isArabic ? (
                  <>
                    ريادة مؤسسية وهيبة عريقة...{" "}
                    <span className="text-qsc-yellow block mt-2">
                      إدارة ذكية تصنع المستقبل
                    </span>
                  </>
                ) : (
                  <>
                    Institutional Prestige.{" "}
                    <span className="text-qsc-yellow block mt-2">
                      Digital Sovereign Administration.
                    </span>
                  </>
                )}
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed font-normal mx-auto lg:mx-0">
                {isArabic
                  ? "المنصة الإدارية والقيادية الرسمية لنادي قطر الرياضي. تجمع بين الاستعراض القيادي العام والبوابة التنفيذية الخاصة لإدارة المعاملات، سلاسل الاعتماد متعددة المستويات، والتوقيع الإلكتروني الموثق."
                  : "The official institutional administration gateway for Qatar Sports Club (The Kings). Unifying the public leadership showcase with the private enterprise portal for multi-tier approvals, electronic signatures, and governance archives."}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/portal"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-qsc-yellow text-[#0A0A0A] font-extrabold px-8 py-4 rounded-xl text-sm uppercase tracking-wider shadow-2xl hover:bg-white transition-all transform hover:-translate-y-1 group"
                >
                  <Lock className="w-4 h-4 text-[#0A0A0A]" />
                  <span>{t.enterPortal}</span>
                  <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </Link>

                <Link
                  href="/management"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#1A1A1A] text-white hover:bg-[#262626] border border-neutral-700 hover:border-neutral-500 font-bold px-8 py-4 rounded-xl text-sm transition-all"
                >
                  <Users className="w-4 h-4 text-qsc-yellow" />
                  <span>{t.managementShowcase}</span>
                </Link>
              </div>

              {/* Institutional Indicators */}
              <div className="pt-8 grid grid-cols-3 gap-4 border-t border-neutral-800 max-w-lg mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-qsc-yellow">1959</p>
                  <p className="text-xs text-neutral-400 font-medium">
                    {isArabic ? "سنة التأسيس العريق" : "Club Foundation"}
                  </p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-white">100%</p>
                  <p className="text-xs text-neutral-400 font-medium">
                    {isArabic ? "أتمتة رقمية كاملة" : "Digital Workflows"}
                  </p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-qsc-yellow">2024–28</p>
                  <p className="text-xs text-neutral-400 font-medium">
                    {isArabic ? "الدورة الانتخابية الحالية" : "Electoral Term"}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Emblem & Sovereign Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Golden Shield Frame */}
                <div className="relative bg-[#141414] border border-[#262626] rounded-2xl p-8 shadow-2xl overflow-hidden group hover:border-qsc-yellow/40 transition-all duration-500">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-qsc-yellow/10 rounded-full blur-2xl" />
                  
                  {/* Official Emblem Display */}
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="relative p-6 bg-black/60 rounded-2xl border border-neutral-800 shadow-inner group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src="/QSC-Emblem-RGB.svg"
                        alt="Qatar Sports Club Official Emblem"
                        width={140}
                        height={190}
                        priority
                        className="object-contain drop-shadow-[0_10px_20px_rgba(253,253,0,0.15)]"
                      />
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs uppercase tracking-widest text-qsc-yellow font-bold">
                        {isArabic ? "شعار النادي الرسمي" : "Official Club Emblem"}
                      </span>
                      <h2 className="text-xl font-black text-white">
                        {isArabic ? "نادي قطر الرياضي — الملوك" : "Qatar Sports Club — The Kings"}
                      </h2>
                      <p className="text-xs text-neutral-400 max-w-xs">
                        {isArabic
                          ? "استاد سحيم بن حمد • منطقة الدفنة • الدوحة، دولة قطر"
                          : "Suheim bin Hamad Stadium • Al Dafna • Doha, Qatar"}
                      </p>
                    </div>

                    {/* Quick Features List */}
                    <div className="w-full space-y-2 text-left rtl:text-right pt-4 border-t border-neutral-800 text-xs">
                      <div className="flex items-center gap-2 text-neutral-300">
                        <ShieldCheck className="w-4 h-4 text-qsc-yellow flex-shrink-0" />
                        <span>
                          {isArabic
                            ? "مسارات اعتماد متعددة المستويات وقرارات موثقة"
                            : "Multi-Tier Governance & Multi-Level Approvals"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-300">
                        <FileCheck2 className="w-4 h-4 text-qsc-yellow flex-shrink-0" />
                        <span>
                          {isArabic
                            ? "توقيع إلكتروني مشفر مع حماية ضد التلاعب"
                            : "Tamper-Evident SHA-256 Electronic Signatures"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-300">
                        <Award className="w-4 h-4 text-qsc-yellow flex-shrink-0" />
                        <span>
                          {isArabic
                            ? "لوائح حوكمة معتمدة من الجمعية العمومية"
                            : "Statute Compliance with General Assembly Mandates"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Environments Showcase Grid */}
      <section className="py-20 bg-[#0E0E0E] border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-qsc-yellow">
              {isArabic ? "الهيكل المتكامل للمنظومة" : "Two Integrated Environments"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {isArabic
                ? "بوابتان رقميتان... هوية مؤسسية موحدة"
                : "Dual Digital Spheres, One Unified Sovereign Identity"}
            </h2>
            <p className="text-neutral-400 text-sm">
              {isArabic
                ? "صُمم النظام لتوفير تجربة استعراض عامة رفيعة المستوى للجمهور والإعلاميين، إلى جانب بيئة عمل تنفيذية آمنة للمسؤولين الإداريين ومجلس الإدارة."
                : "Designed to provide an authoritative public leadership showcase alongside a high-security operational portal for executive management and board decisions."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Box 1: Public Management Showcase */}
            <div className="group relative bg-[#141414] border border-neutral-800 rounded-2xl p-8 hover:border-neutral-600 transition-all flex flex-col justify-between">
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center text-qsc-yellow border border-neutral-700">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                    {isArabic ? "متاح للجميع دون تسجيل دخول" : "Publicly Accessible • /management"}
                  </span>
                  <h3 className="text-2xl font-bold text-white group-hover:text-qsc-yellow transition-colors">
                    {t.managementShowcase}
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                    {isArabic
                      ? "استعراض الهيكل التنظيمي المعتمد، دليل القيادات الإدارية ومجلس الإدارة، أقسام النادي، والقرارات والتعاميم الرسمية الصادرة."
                      : "Explore the verified organizational hierarchy, Board of Directors bios, department responsibilities, official decrees, and stadium headquarters information."}
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-neutral-300 pt-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-qsc-yellow" />
                    <span>{t.nav.leadership}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-qsc-yellow" />
                    <span>{t.nav.orgChart}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-qsc-yellow" />
                    <span>{t.nav.departments}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-qsc-yellow" />
                    <span>{t.nav.announcements}</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href="/management"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-qsc-yellow hover:text-white transition-colors"
                >
                  <span>{isArabic ? "زيارة منصة القيادة العامة" : "Enter Leadership Showcase"}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Box 2: Private Executive Portal */}
            <div className="group relative bg-[#141414] border border-qsc-yellow/40 rounded-2xl p-8 hover:border-qsc-yellow transition-all flex flex-col justify-between shadow-xl">
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-xl bg-qsc-yellow/10 flex items-center justify-center text-qsc-yellow border border-qsc-yellow/30">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-qsc-yellow uppercase tracking-wider">
                    {isArabic ? "تسجيل دخول آمن • /portal" : "Secure Authentication • /portal"}
                  </span>
                  <h3 className="text-2xl font-bold text-white group-hover:text-qsc-yellow transition-colors">
                    {t.managementPortal}
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                    {isArabic
                      ? "مركز العمليات التنفيذي لكوادر النادي: إدارة المعاملات، اعتماد مسارات التوقيع المتسلسلة والمشروطة، وتوثيق المستندات وحفظ السجلات."
                      : "The institutional command center: multi-tier approval engine, electronic signatures with cryptographic audit certificates, task boards, and document vaults."}
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-neutral-300 pt-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-qsc-yellow" />
                    <span>{t.nav.pendingApprovals}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-qsc-yellow" />
                    <span>{t.nav.eSignatures}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-qsc-yellow" />
                    <span>{t.nav.documents}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-qsc-yellow" />
                    <span>{t.nav.auditLogs}</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href="/portal"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-qsc-yellow text-[#0A0A0A] px-5 py-2.5 rounded-lg hover:bg-white transition-all"
                >
                  <span>{t.enterPortal}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
