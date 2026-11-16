"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { INITIAL_USERS } from "@/lib/data";
import {
  Search,
  Filter,
  ShieldCheck,
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Award,
} from "lucide-react";

export default function LeadershipDirectoryPage() {
  const { t, isArabic } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const departments = [
    { id: "all", nameEn: "All Leadership", nameAr: "كافة القيادات" },
    { id: "Executive Board", nameEn: "Executive Board", nameAr: "مجلس الإدارة التنفيذي" },
    { id: "General Directorate", nameEn: "General Directorate", nameAr: "الإدارة العامة" },
    { id: "Facilities & Stadium Operations", nameEn: "Facilities & Stadium", nameAr: "المنشآت والاستاد" },
    { id: "Human Resources", nameEn: "Human Resources", nameAr: "الموارد البشرية" },
    { id: "Administrative Affairs", nameEn: "Administrative Affairs", nameAr: "الشؤون الإدارية" },
  ];

  const filteredUsers = INITIAL_USERS.filter((user) => {
    const matchesSearch =
      user.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.nameAr.includes(searchQuery) ||
      user.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.titleAr.includes(searchQuery);

    const matchesDept = selectedDept === "all" || user.departmentEn === selectedDept;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F4] text-[#171717]">
      <Header />

      {/* Top Banner */}
      <section className="bg-[#0A0A0A] text-white py-14 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs text-qsc-yellow font-bold uppercase tracking-wider">
            <Link href="/management" className="hover:underline">
              {t.managementShowcase}
            </Link>
            <span>/</span>
            <span>{t.nav.leadership}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            {isArabic ? "دليل القيادة والإدارة المؤسسية" : "Executive Leadership Directory"}
          </h1>
          <p className="text-neutral-300 text-sm max-w-2xl leading-relaxed">
            {isArabic
              ? "استعراض قيادات نادي قطر الرياضي، مجلس الإدارة، ومديري الإدارات والقطاعات التنفيذية المكلفة بقيادة مسيرة النادي للدورة الانتخابية ٢٠٢٤-٢٠٢٨."
              : "Discover the esteemed leaders, executive directors, and governance officers steering Qatar Sports Club through the 2024–2028 institutional electoral mandate."}
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="bg-white border-b border-[#E8E8E3] py-4 sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Department Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDept(dept.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedDept === dept.id
                    ? "bg-[#0A0A0A] text-qsc-yellow shadow-sm"
                    : "bg-[#F7F7F4] text-neutral-600 hover:text-black border border-[#E8E8E3]"
                }`}
              >
                {isArabic ? dept.nameAr : dept.nameEn}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isArabic ? "بحث بالاسم أو المنصب..." : "Search by name or title..."}
              className="w-full pl-9 pr-3 rtl:pr-9 rtl:pl-3 py-1.5 text-xs bg-[#F7F7F4] border border-[#E8E8E3] rounded-lg focus:outline-none focus:border-black text-neutral-800"
            />
          </div>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="py-12 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-[#E8E8E3] p-8">
              <p className="text-sm text-neutral-500">{t.common.noData}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((officer) => (
                <div
                  key={officer.id}
                  className="bg-white rounded-2xl border border-[#E8E8E3] hover:border-black transition-all shadow-sm hover:shadow-md overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Portrait & Banner */}
                    <div className="relative h-56 bg-neutral-900 overflow-hidden">
                      <Image
                        src={officer.avatar}
                        alt={officer.nameEn}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/75 text-qsc-yellow border border-qsc-yellow/40 backdrop-blur-sm">
                          {officer.badgeNumber}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <span className="text-[11px] text-qsc-yellow font-semibold uppercase tracking-wider block">
                          {isArabic ? officer.departmentAr : officer.departmentEn}
                        </span>
                        <h3 className="text-lg font-black leading-snug">
                          {isArabic ? officer.nameAr : officer.nameEn}
                        </h3>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-5 space-y-3">
                      <div>
                        <p className="text-xs font-bold text-neutral-800">
                          {isArabic ? officer.titleAr : officer.titleEn}
                        </p>
                        <p className="text-[11px] text-neutral-500 mt-1">
                          {isArabic
                            ? "مكلف بمهام الإشراف والتنفيذ المؤسسي للدورة الانتخابية المعتمدة."
                            : "Authorized executive officer under Qatar SC governance bylaws."}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-neutral-100 space-y-1.5 text-xs text-neutral-600">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                          <span className="truncate">{officer.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                          <span dir="ltr">{officer.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Link */}
                  <div className="px-5 pb-5 pt-0">
                    <Link
                      href={`/management/leadership/${officer.id}`}
                      className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#FAF9F5] hover:bg-[#0A0A0A] text-neutral-800 hover:text-qsc-yellow transition-all text-xs font-bold uppercase tracking-wider border border-[#E8E8E3] hover:border-black"
                    >
                      <span>{isArabic ? "عرض الملف والسيرة الذاتية" : "View Full Profile"}</span>
                      <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
