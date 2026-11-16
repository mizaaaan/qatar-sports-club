"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { INITIAL_USERS } from "@/lib/data";
import {
  ShieldCheck,
  Award,
  Users,
  Calendar,
  Building2,
  FileCheck2,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

export default function BoardOfDirectorsPage() {
  const { t, isArabic } = useLanguage();
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const president = INITIAL_USERS.find((u) => u.role === "president")!;
  const vp = INITIAL_USERS.find((u) => u.role === "vice_president")!;
  const boardMember = INITIAL_USERS.find((u) => u.role === "board_member")!;

  const boardCommittees = [
    {
      titleEn: "Executive Governance & Audit Committee",
      titleAr: "لجنة الحوكمة المؤسسية والتدقيق الداخلي",
      chairEn: "Sheikh Suhaim bin Abdulaziz Al Thani",
      chairAr: "الشيخ سحيم بن عبد العزيز آل ثاني",
      descEn: "Oversees internal financial controls, legal compliance, and regulatory submissions.",
      descAr: "الإشراف على الرقابة المالية الداخلية، الامتثال للوائح، والتقارير الرقابية الدورية.",
    },
    {
      titleEn: "Commercial Investment & Sponsorship Committee",
      titleAr: "لجنة الاستثمار وتنمية الموارد والرعاية التجارية",
      chairEn: "Khalid Mohammed Al-Kaabi",
      chairAr: "خالد محمد الكعبي",
      descEn: "Focuses on commercial partnerships, brand asset monetization, and Suheim stadium revenues.",
      descAr: "تطوير الشراكات الاستثمارية، تعظيم حقوق الرعاية، وتنمية إيرادات استاد سحيم بن حمد.",
    },
    {
      titleEn: "Sports Sector Strategic Advisory Committee",
      titleAr: "اللجنة الاستشارية الفنية للقطاع الرياضي",
      chairEn: "Abdulrahman Salem Al-Malki",
      chairAr: "عبد الرحمن سالم المالكي",
      descEn: "Formulates long-term athletic strategies across football, volleyball, basketball, and athletics.",
      descAr: "رسم الخطط الاستراتيجية الشاملة لفرق كرة القدم والألعاب الجماعية والفردية بالنادي.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F4] text-[#171717]">
      <Header />

      {/* Hero Banner */}
      <section className="bg-[#0A0A0A] text-white py-14 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs text-qsc-yellow font-bold uppercase tracking-wider">
            <Link href="/management" className="hover:underline">
              {t.managementShowcase}
            </Link>
            <span>/</span>
            <span>{t.nav.board}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            {isArabic ? "مجلس إدارة نادي قطر الرياضي" : "Board of Directors"}
          </h1>
          <p className="text-neutral-300 text-sm max-w-2xl leading-relaxed">
            {isArabic
              ? "الهيئة القيادية العليا المنتخبة من الجمعية العمومية للدورة ٢٠٢٤-٢٠٢٨، المعنية برسم السياسات الاستراتيجية، الرقابة المؤسسية، وتوجيه مسيرة النادي نحو الريادة."
              : "The supreme governing council elected by the General Assembly for the 2024–2028 cycle, entrusted with institutional fiduciary oversight and strategic leadership."}
          </p>
        </div>
      </section>

      {/* Honorary President Section */}
      <section className="py-12 bg-white border-b border-[#E8E8E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF9F5] border-2 border-[#D4AF37] rounded-2xl p-8 shadow-sm flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-[#0A0A0A] flex-shrink-0 shadow-lg bg-neutral-900">
              <Image
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80"
                alt="Honorary President"
                fill
                sizes="150px"
                className="object-cover"
              />
            </div>

            <div className="space-y-2 text-center md:text-left rtl:md:text-right flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0A0A0A] text-qsc-yellow">
                <Award className="w-3.5 h-3.5" />
                <span>{isArabic ? "الرئاسة الفخرية" : "Honorary Presidency"}</span>
              </div>
              <h2 className="text-2xl font-black text-[#171717]">
                {isArabic
                  ? "سعادة الشيخ حمد بن سحيم آل ثاني"
                  : "H.E. Sheikh Hamad bin Suhaim Al Thani"}
              </h2>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                {isArabic
                  ? "الرئيس الفخري لنادي قطر الرياضي — رمز القيادة والعطاء التاريخي"
                  : "Honorary President of Qatar Sports Club — Enduring Symbol of Leadership"}
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed max-w-3xl pt-2">
                {isArabic
                  ? "قاد نادي قطر الرياضي لعقود طويلة محققاً خلالها النادي أعظم إنجازاته التاريخية وكؤوسه المحلية والقارية. تمت تزكيته رئيساً فخرياً تقديراً وعرفاناً بمسيرته الملهمة في خدمة الصرح القطراوي."
                  : "Steered Qatar Sports Club across formative decades, presiding over landmark national championships and historical glories. Appointed Honorary President in tribute to his monumental legacy."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Elected Board Members 2024-2028 */}
      <section className="py-14 bg-[#F7F7F4] border-b border-[#E8E8E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#666666]">
              {isArabic ? "الدورة الانتخابية ٢٠٢٤-٢٠٢٨" : "Electoral Cycle 2024–2028"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#171717]">
              {isArabic ? "أعضاء مجلس الإدارة التنفيذي" : "Executive Board Council"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* President */}
            <div className="bg-white rounded-2xl border border-[#E8E8E3] overflow-hidden shadow-sm hover:border-black transition-all group flex flex-col justify-between">
              <div>
                <div className="relative h-64 bg-neutral-900">
                  <Image
                    src={president.avatar}
                    alt={president.nameEn}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3">
                    <span className="px-2.5 py-1 rounded bg-[#0A0A0A] text-qsc-yellow text-[10px] font-bold tracking-wider uppercase border border-qsc-yellow/40">
                      {isArabic ? "رئيس المجلس" : "President"}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-black text-[#171717]">
                    {isArabic ? president.nameAr : president.nameEn}
                  </h3>
                  <p className="text-xs font-semibold text-neutral-500">
                    {isArabic ? president.titleAr : president.titleEn}
                  </p>
                  <p className="text-xs text-neutral-600 leading-relaxed pt-2">
                    {isArabic
                      ? "رئيس مجلس الإدارة، يتولى القيادة العليا ورئاسة اجتماعات الجمعية العمومية والمصادقة على اللوائح والقرارات الكبرى."
                      : "Presides over Board meetings, General Assembly summits, strategic club directions, and statutory decrees."}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/management/leadership/${president.id}`}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#FAF9F5] hover:bg-[#0A0A0A] text-neutral-800 hover:text-qsc-yellow transition-all text-xs font-bold uppercase tracking-wider border border-[#E8E8E3]"
                >
                  <span>{isArabic ? "الملف الكامل" : "View Profile"}</span>
                  <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                </Link>
              </div>
            </div>

            {/* Vice President */}
            <div className="bg-white rounded-2xl border border-[#E8E8E3] overflow-hidden shadow-sm hover:border-black transition-all group flex flex-col justify-between">
              <div>
                <div className="relative h-64 bg-neutral-900">
                  <Image
                    src={vp.avatar}
                    alt={vp.nameEn}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3">
                    <span className="px-2.5 py-1 rounded bg-[#0A0A0A] text-qsc-yellow text-[10px] font-bold tracking-wider uppercase border border-qsc-yellow/40">
                      {isArabic ? "نائب الرئيس" : "Vice President"}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-black text-[#171717]">
                    {isArabic ? vp.nameAr : vp.nameEn}
                  </h3>
                  <p className="text-xs font-semibold text-neutral-500">
                    {isArabic ? vp.titleAr : vp.titleEn}
                  </p>
                  <p className="text-xs text-neutral-600 leading-relaxed pt-2">
                    {isArabic
                      ? "نائب رئيس مجلس الإدارة، يتولى متابعة لجان الاستثمار وتطوير الشراكات المؤسسية والنيابة عن الرئيس في المهام التنفيذية."
                      : "Deputizes executive responsibilities, overseeing commercial investment committees and community initiatives."}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/management/leadership/${vp.id}`}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#FAF9F5] hover:bg-[#0A0A0A] text-neutral-800 hover:text-qsc-yellow transition-all text-xs font-bold uppercase tracking-wider border border-[#E8E8E3]"
                >
                  <span>{isArabic ? "الملف الكامل" : "View Profile"}</span>
                  <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                </Link>
              </div>
            </div>

            {/* Board Member */}
            <div className="bg-white rounded-2xl border border-[#E8E8E3] overflow-hidden shadow-sm hover:border-black transition-all group flex flex-col justify-between">
              <div>
                <div className="relative h-64 bg-neutral-900">
                  <Image
                    src={boardMember.avatar}
                    alt={boardMember.nameEn}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3">
                    <span className="px-2.5 py-1 rounded bg-[#0A0A0A] text-qsc-yellow text-[10px] font-bold tracking-wider uppercase border border-qsc-yellow/40">
                      {isArabic ? "عضو المجلس" : "Board Member"}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-black text-[#171717]">
                    {isArabic ? boardMember.nameAr : boardMember.nameEn}
                  </h3>
                  <p className="text-xs font-semibold text-neutral-500">
                    {isArabic ? boardMember.titleAr : boardMember.titleEn}
                  </p>
                  <p className="text-xs text-neutral-600 leading-relaxed pt-2">
                    {isArabic
                      ? "عضو مجلس الإدارة، رئيس لجنة الحوكمة المؤسسية والرقابة، وممثل المجلس في لجان التدقيق المستقلة."
                      : "Board Member, Head of Governance and Audit Committee, representing board oversight across financial reviews."}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/management/leadership/${boardMember.id}`}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#FAF9F5] hover:bg-[#0A0A0A] text-neutral-800 hover:text-qsc-yellow transition-all text-xs font-bold uppercase tracking-wider border border-[#E8E8E3]"
                >
                  <span>{isArabic ? "الملف الكامل" : "View Profile"}</span>
                  <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Board Committees */}
      <section className="py-14 bg-white border-b border-[#E8E8E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="border-b border-neutral-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#666666]">
              {isArabic ? "اللجان المنبثقة عن المجلس" : "Standing Committees"}
            </span>
            <h2 className="text-2xl font-black text-[#171717] mt-1">
              {isArabic ? "لجان الحوكمة والرقابة والاستثمار" : "Board Governance Committees"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardCommittees.map((com, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-[#FAF9F5] border border-[#E8E8E3] space-y-3">
                <div className="w-9 h-9 rounded-lg bg-[#0A0A0A] text-qsc-yellow flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="text-sm font-bold text-[#171717]">
                  {isArabic ? com.titleAr : com.titleEn}
                </h3>
                <p className="text-xs text-neutral-500">
                  <span className="font-semibold text-neutral-700">
                    {isArabic ? "رئيس اللجنة: " : "Chair: "}
                  </span>
                  {isArabic ? com.chairAr : com.chairEn}
                </p>
                <p className="text-xs text-neutral-600 leading-relaxed pt-1">
                  {isArabic ? com.descAr : com.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
