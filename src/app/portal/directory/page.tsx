"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Search, Mail, Phone, ShieldCheck, UserCheck } from "lucide-react";

export default function InternalDirectoryPage() {
  const { t, isArabic } = useLanguage();
  const { allUsers } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");

  const filteredUsers = allUsers.filter((u) => {
    const matchesSearch =
      u.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      u.nameAr.includes(search) ||
      u.titleEn.toLowerCase().includes(search.toLowerCase()) ||
      u.titleAr.includes(search) ||
      u.badgeNumber.toLowerCase().includes(search.toLowerCase());

    const matchesDept = selectedDept === "all" || u.departmentEn === selectedDept;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider font-semibold">
          <Link href="/portal" className="hover:text-black">
            {t.nav.dashboard}
          </Link>
          <span>/</span>
          <span className="text-black">{t.nav.directory}</span>
        </div>
        <h1 className="text-2xl font-black text-[#171717] mt-1">
          {isArabic ? "دليل مسؤولي وكوادر نادي قطر الرياضي" : "Internal Management Directory"}
        </h1>
        <p className="text-xs text-neutral-500">
          {isArabic
            ? "دليل الاتصال الداخلي المعتمد لقيادات وأعضاء الكادر الإداري والتنفيذي."
            : "Authorized directory of verified executive officers, directors, and administrators."}
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl border border-[#E8E8E3] p-4 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isArabic ? "بحث بالاسم، المنصب، أو الرقم الوظيفي..." : "Search by name, role, or badge..."}
            className="w-full pl-9 pr-3 rtl:pr-9 rtl:pl-3 py-2 text-xs bg-[#FAF9F5] border border-[#E8E8E3] rounded-lg focus:outline-none focus:border-black"
          />
        </div>

        <span className="text-xs text-neutral-400 font-semibold hidden sm:block">
          {filteredUsers.length} {isArabic ? "مسؤولين معتمدين" : "Officers Listed"}
        </span>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((officer) => (
          <div
            key={officer.id}
            className="bg-white rounded-2xl border border-[#E8E8E3] p-6 shadow-sm hover:border-black transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-[#0A0A0A] text-qsc-yellow text-[10px] font-mono font-bold tracking-wider">
                  {officer.badgeNumber}
                </span>
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                  {isArabic ? officer.departmentAr : officer.departmentEn}
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                <Image
                  src={officer.avatar}
                  alt=""
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover border border-neutral-300 flex-shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-black text-neutral-900 truncate">
                    {isArabic ? officer.nameAr : officer.nameEn}
                  </h3>
                  <p className="text-xs text-neutral-500 truncate mt-0.5">
                    {isArabic ? officer.titleAr : officer.titleEn}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 space-y-2 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <a href={`mailto:${officer.email}`} className="font-mono hover:underline truncate">
                  {officer.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <a href={`tel:${officer.phone}`} dir="ltr" className="hover:underline font-mono">
                  {officer.phone}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
