"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { QscLogo } from "@/components/common/QscLogo";
import { INITIAL_USERS, ANNOUNCEMENTS } from "@/lib/data";
import {
  ShieldCheck,
  Building2,
  Users,
  Network,
  Award,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Calendar,
  ExternalLink,
  Target,
  Sparkles,
} from "lucide-react";

export default function ManagementHomePage() {
  const { t, isArabic } = useLanguage();
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const president = INITIAL_USERS.find((u) => u.role === "president") || INITIAL_USERS[0];
  const featuredNews = ANNOUNCEMENTS.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F4] text-[#171717]">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-[#0A0A0A] text-white overflow-hidden py-16 lg:py-24 border-b border-neutral-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-qsc-yellow/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-qsc-yellow/40 text-qsc-yellow text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.clubTagline}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                {isArabic ? (
                  <>
                    القيادة والإدارة المؤسسية لنادي قطر الرياضي...{" "}
                    <span className="text-qsc-yellow block mt-1">
                      هيبة التاريخ ورؤية المستقبل
                    </span>
                  </>
                ) : (
                  <>
                    Institutional Leadership & Governance.{" "}
                    <span className="text-qsc-yellow block mt-1">
                      Authority, Excellence, Digital Vision.
                    </span>
                  </>
                )}
              </h1>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                {isArabic
                  ? "مرحباً بكم في البوابة العامة لإدارة نادي قطر الرياضي (الملوك). نستعرض هنا المنظومة القيادية، مجلس الإدارة، الهيكل التنظيمي المعتمد للدورة الانتخابية ٢٠٢٤-٢٠٢٨، ومسارات الحوكمة المؤسسية والقرارات الرسمية الصادرة."
                  : "Welcome to the official leadership showcase of Qatar Sports Club (The Kings). Discover our executive leadership, Board of Directors, approved organizational hierarchy for the 2024–2028 electoral cycle, and institutional decrees."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/management/leadership"
                  className="flex items-center gap-2 bg-qsc-yellow text-[#0A0A0A] font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-wider hover:bg-white transition-all shadow-md"
                >
                  <Users className="w-4 h-4" />
                  <span>{t.nav.leadership}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>

                <Link
                  href="/management/org-chart"
                  className="flex items-center gap-2 bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-700 font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-wider transition-all"
                >
                  <Network className="w-4 h-4 text-qsc-yellow" />
                  <span>{t.nav.orgChart}</span>
                </Link>

                <Link
                  href="/portal"
                  className="flex items-center gap-2 text-xs font-bold text-neutral-300 hover:text-qsc-yellow px-4 py-3 underline transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-qsc-yellow" />
                  <span>{t.enterPortal}</span>
                </Link>
              </div>
            </div>

            {/* Right: Emblem and Quick Facts */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="bg-[#141414] border border-[#2E2E2E] rounded-2xl p-6 text-center space-y-4 shadow-xl max-w-sm w-full">
                <div className="inline-block p-4 bg-black/60 rounded-xl border border-neutral-800">
                  <Image
                    src="/QSC-Emblem-RGB.svg"
                    alt="Qatar Sports Club Official Emblem"
                    width={90}
                    height={125}
                    priority
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    {isArabic ? "نادي قطر الرياضي" : "Qatar Sports Club"}
                  </h3>
                  <p className="text-xs text-qsc-yellow font-bold uppercase tracking-wider">
                    {isArabic ? "الملك — تأسس عام ١٩٥٩" : "The Kings — Est. 1959"}
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-2">
                    {isArabic
                      ? "المقر الرسمي: استاد سحيم بن حمد، الدوحة"
                      : "Official HQ: Suheim bin Hamad Stadium, Doha"}
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-800 flex justify-around text-xs">
                  <div>
                    <span className="block font-bold text-white text-base">8</span>
                    <span className="text-[10px] text-neutral-400">
                      {isArabic ? "قطاعات رياضية" : "Sports Sectors"}
                    </span>
                  </div>
                  <div className="w-px bg-neutral-800" />
                  <div>
                    <span className="block font-bold text-white text-base">2028</span>
                    <span className="text-[10px] text-neutral-400">
                      {isArabic ? "نهاية الدورة" : "Term Mandate"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* President's Executive Address */}
      <section className="py-16 bg-white border-b border-[#E8E8E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* President Portrait */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group">
                <div className="w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden border-4 border-[#0A0A0A] shadow-xl relative">
                  <Image
                    src={president.avatar}
                    alt={president.nameEn}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs uppercase tracking-wider text-qsc-yellow font-bold">
                      {isArabic ? "كلمة رئيس مجلس الإدارة" : "President's Address"}
                    </p>
                    <p className="text-base font-bold">
                      {isArabic ? president.nameAr : president.nameEn}
                    </p>
                  </div>
                </div>
                {/* Yellow Accent Corner */}
                <div className="absolute -bottom-3 -right-3 rtl:-right-auto rtl:-left-3 w-16 h-16 bg-qsc-yellow rounded-xl -z-10" />
              </div>
            </div>

            {/* Address Content */}
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#666666]">
                {isArabic ? "الرؤية الاستراتيجية ٢٠٢٤-٢٠٢٨" : "Strategic Vision 2024–2028"}
              </span>

              <h2 className="text-2xl sm:text-3xl font-black text-[#171717] leading-snug">
                {isArabic
                  ? "«نادي قطر ليس مجرد نادٍ رياضي، بل صرح وطني يحمل إرثاً عريقاً ورسالة مجتمعية رائدة»"
                  : '"Qatar Sports Club is an enduring institutional monument, bridging historic glory with digital governance."'}
              </h2>

              <p className="text-sm text-[#666666] leading-relaxed">
                {isArabic
                  ? "«إن انطلاق الدورة الانتخابية الجديدة لمجلس الإدارة يأتي متزامناً مع ترسيخ أعلى معايير الحوكمة والشفافية المؤسسية في كافة إدارات النادي. نحرص على تطوير البنية التحتية لاستاد سحيم بن حمد، ودعم فرق النادي في كافة الرياضات، مع الاستثمار في رقمنة المعاملات الإدارية وتسهيل منظومة العمل لخدمة مسيرة نادي قطر الرياضي ورفعته محلياً وقارياً.»"
                  : '"Our leadership mandate for the 2024–2028 electoral cycle is centered on establishing sovereign governance, financial prudence, and operational excellence across all club departments. By embracing modern digital administration, upgrading Suheim bin Hamad Stadium, and investing in sporting talent, we ensure \'The Kings\' remain at the pinnacle of Qatari and regional sports."'}
              </p>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  href={`/management/leadership/${president.id}`}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:text-qsc-yellow hover:underline"
                >
                  <span>{isArabic ? "السيرة الذاتية للرئيس" : "Read Full Presidential Profile"}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Pillars */}
      <section className="py-16 bg-[#F7F7F4] border-b border-[#E8E8E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#666666]">
              {isArabic ? "مرتكزات العمل المؤسسي" : "Core Institutional Pillars"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#171717]">
              {isArabic ? "ركائز الإدارة والحوكمة المعتمدة" : "Strategic Governance Framework"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#E8E8E3] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0A0A0A] text-qsc-yellow flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-base font-bold text-[#171717]">
                {isArabic ? "الحوكمة والامتثال القانوني" : "Governance & Legal Compliance"}
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                {isArabic
                  ? "تطبيق اللائحة المعتمدة من الجمعية العمومية، وتفعيل الرقابة المالية وسلاسل الاعتماد متعددة المستويات لضمان النزاهة المؤسسية."
                  : "Adherence to General Assembly bylaws, multi-level financial oversight, and transparent internal audit protocols."}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#E8E8E3] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0A0A0A] text-qsc-yellow flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-base font-bold text-[#171717]">
                {isArabic ? "تطوير منشآت استاد سحيم بن حمد" : "Infrastructure & Stadium Modernisation"}
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                {isArabic
                  ? "تحديث أرضية الاستاد بتقنيات العشب الهجين الليزرية وتطوير الصالات الرياضية ومرافق الاستشفاء الرياضي وفق معايير الاتحاد الآسيوي."
                  : "Continuous enhancements of Suheim bin Hamad Stadium, laser hybrid turf maintenance, and modern athletic recovery suites."}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#E8E8E3] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0A0A0A] text-qsc-yellow flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-base font-bold text-[#171717]">
                {isArabic ? "التحول الرقمي الإداري الشامل" : "End-to-End Digital Transformation"}
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                {isArabic
                  ? "إلغاء المعاملات الورقية واستبدالها بنظام التوقيع الرقمي الموثق والقرارات المشفرة لسرعة الإنجاز ودقة التوثيق التاريخي."
                  : "Eliminating paperwork through verified electronic signatures, digital archiving, and streamlined approval cycles."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Announcements & Circulars */}
      <section className="py-16 bg-white border-b border-[#E8E8E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#666666]">
                {isArabic ? "النشرات الرسمية" : "Official Decrees"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#171717]">
                {t.nav.announcements}
              </h2>
            </div>

            <Link
              href="/management/announcements"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:text-qsc-yellow hover:underline"
            >
              <span>{isArabic ? "كافة القرارات" : "View All"}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredNews.map((ann) => (
              <div
                key={ann.id}
                className="bg-[#F7F7F4] border border-[#E8E8E3] rounded-xl p-6 flex flex-col justify-between hover:border-neutral-400 transition-all shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-[#666666]">
                    <span className="font-bold px-2 py-0.5 rounded bg-white border border-[#E8E8E3] text-[#171717]">
                      {isArabic ? ann.categoryAr : ann.categoryEn}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {ann.date}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#171717] line-clamp-2 leading-snug">
                    {isArabic ? ann.titleAr : ann.titleEn}
                  </h3>

                  <p className="text-xs text-[#666666] line-clamp-3 leading-relaxed">
                    {isArabic ? ann.summaryAr : ann.summaryEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E8E3] mt-4 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#8E8E93] font-mono">
                    {ann.decreeNumber || "OFFICIAL"}
                  </span>
                  <Link
                    href={`/management/announcements#${ann.id}`}
                    className="font-bold text-[#0A0A0A] hover:underline inline-flex items-center gap-1"
                  >
                    <span>{t.common.details}</span>
                    <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
