"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ANNOUNCEMENTS } from "@/lib/data";
import {
  Calendar,
  FileText,
  Tag,
  ShieldCheck,
  Search,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Award,
} from "lucide-react";

export default function AnnouncementsPage() {
  const { t, isArabic } = useLanguage();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", nameEn: "All Announcements", nameAr: "كافة القرارات والتعاميم" },
    { id: "elections", nameEn: "Elections & Governance", nameAr: "انتخابات وحوكمة" },
    { id: "digital", nameEn: "Digital Innovation", nameAr: "الابتكار الرقمي" },
    { id: "infrastructure", nameEn: "Infrastructure & Stadium", nameAr: "المنشآت والاستاد" },
  ];

  const filtered = ANNOUNCEMENTS.filter((ann) => {
    const matchesSearch =
      ann.titleEn.toLowerCase().includes(search.toLowerCase()) ||
      ann.titleAr.includes(search) ||
      ann.contentEn.toLowerCase().includes(search.toLowerCase()) ||
      ann.contentAr.includes(search);
    return matchesSearch;
  });

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
            <span>{t.nav.announcements}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            {isArabic ? "القرارات والتعاميم الرسمية" : "Official Decrees & Announcements"}
          </h1>
          <p className="text-neutral-300 text-sm max-w-2xl leading-relaxed">
            {isArabic
              ? "السجل الرسمي للقرارات الإدارية، نتائج الجمعية العمومية، وتعاميم مجلس الإدارة لنادي قطر الرياضي."
              : "Official archive of presidential decrees, board circulars, and institutional announcements ratified by Qatar Sports Club leadership."}
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="bg-white border-b border-[#E8E8E3] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isArabic ? "البحث في القرارات والتعاميم..." : "Search official decrees..."}
              className="w-full pl-9 pr-3 rtl:pr-9 rtl:pl-3 py-2 text-xs bg-[#F7F7F4] border border-[#E8E8E3] rounded-lg focus:outline-none focus:border-black"
            />
          </div>

          <span className="text-xs text-neutral-500 hidden sm:block">
            {filtered.length} {isArabic ? "قرارات منشورة" : "Decrees Published"}
          </span>
        </div>
      </section>

      {/* Announcements List */}
      <section className="py-12 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {filtered.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="bg-white rounded-2xl border border-[#E8E8E3] p-8 shadow-sm hover:border-black transition-all space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold px-2.5 py-1 rounded bg-[#0A0A0A] text-qsc-yellow text-[10px] tracking-wider uppercase">
                    {item.decreeNumber || "DECREE"}
                  </span>
                  <span className="text-neutral-500 font-medium">
                    {isArabic ? item.categoryAr : item.categoryEn}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-neutral-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.date}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-black text-[#171717]">
                  {isArabic ? item.titleAr : item.titleEn}
                </h2>
                <p className="text-sm text-neutral-700 leading-relaxed font-semibold">
                  {isArabic ? item.summaryAr : item.summaryEn}
                </p>
                <p className="text-xs text-neutral-500 leading-relaxed pt-1">
                  {isArabic ? item.contentAr : item.contentEn}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span className="font-medium">
                  {isArabic ? "جهة الإصدار: " : "Issued by: "}
                  <strong className="text-neutral-800">
                    {isArabic ? item.authorAr : item.authorEn}
                  </strong>
                </span>

                <div className="flex items-center gap-1 text-[11px] font-bold text-neutral-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{isArabic ? "معتمد ومصدق رسمياً" : "Official Decree Ratified"}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
