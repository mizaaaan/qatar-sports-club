"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { INITIAL_USERS } from "@/lib/data";
import {
  Building2,
  Users,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

export default function ExecutiveManagementPage() {
  const { t, isArabic } = useLanguage();
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const gm = INITIAL_USERS.find((u) => u.role === "general_manager")!;
  const executives = INITIAL_USERS.filter((u) =>
    ["general_manager", "hr_manager", "admin_officer", "department_manager"].includes(u.role)
  );

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
            <span>{t.nav.executive}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            {isArabic ? "الإدارة التنفيذية والتشغيلية" : "Executive Operations Management"}
          </h1>
          <p className="text-neutral-300 text-sm max-w-2xl leading-relaxed">
            {isArabic
              ? "فريق الإدارة التنفيذية المسؤول عن تسيير العمل اليومي، إدارة منشآت استاد سحيم بن حمد، متابعة الشؤون الإدارية والمالية، وتطوير الموارد البشرية لنادي قطر الرياضي."
              : "The executive team entrusted with operational excellence, stadium facility management, administrative protocols, and day-to-day governance at Qatar Sports Club."}
          </p>
        </div>
      </section>

      {/* General Manager Spotlight */}
      <section className="py-12 bg-white border-b border-[#E8E8E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF9F5] border border-[#E8E8E3] rounded-2xl p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-56 h-72 rounded-xl overflow-hidden border-2 border-[#0A0A0A] shadow-md bg-neutral-900">
                <Image
                  src={gm.avatar}
                  alt={gm.nameEn}
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-qsc-yellow bg-[#0A0A0A] px-3 py-1 rounded-full">
                {isArabic ? "الإدارة العامة والتشغيل" : "General Directorate"}
              </span>

              <h2 className="text-2xl font-black text-[#171717]">
                {isArabic ? gm.nameAr : gm.nameEn}
              </h2>

              <p className="text-xs font-bold text-neutral-600">
                {isArabic ? gm.titleAr : gm.titleEn}
              </p>

              <p className="text-xs text-neutral-600 leading-relaxed pt-1">
                {isArabic
                  ? "يتولى الإشراف المباشر على كافة القطاعات التشغيلية والإدارية والمالية لنادي قطر الرياضي، ومتابعة تنفيذ الموازنات السنوية المعتمدة وتجهيزات استاد سحيم بن حمد وملاعب التدريب بالتنسيق مع الجهات الرياضية والحكومية."
                  : "Commands day-to-day institutional administration, executing board policies, directing budget execution, and leading operational readiness across all sports sectors and Suheim bin Hamad Stadium."}
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-4 text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="font-mono">{gm.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-neutral-400" />
                  <span dir="ltr">{gm.phone}</span>
                </div>
                <Link
                  href={`/management/leadership/${gm.id}`}
                  className="inline-flex items-center gap-1 font-bold text-[#0A0A0A] hover:underline"
                >
                  <span>{isArabic ? "السيرة الذاتية" : "Profile Details"}</span>
                  <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Directors Grid */}
      <section className="py-14 bg-[#F7F7F4] flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="border-b border-neutral-200 pb-4">
            <h2 className="text-2xl font-black text-[#171717]">
              {isArabic ? "مديرو الإدارات والقطاعات التشغيلية" : "Operational Sector Directors"}
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              {isArabic
                ? "الكفاءات الإدارية المشرفة على تنفيذ خطط النادي المؤسسية."
                : "Department heads driving institutional execution across all club facilities."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {executives.map((exec) => (
              <div
                key={exec.id}
                className="bg-white rounded-xl border border-[#E8E8E3] overflow-hidden shadow-sm hover:border-black transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 bg-neutral-900">
                    <Image
                      src={exec.avatar}
                      alt={exec.nameEn}
                      fill
                      sizes="250px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-[10px] text-qsc-yellow uppercase tracking-wider font-semibold">
                        {isArabic ? exec.departmentAr : exec.departmentEn}
                      </p>
                      <h3 className="text-sm font-bold truncate">
                        {isArabic ? exec.nameAr : exec.nameEn}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <p className="text-xs font-semibold text-neutral-800 line-clamp-1">
                      {isArabic ? exec.titleAr : exec.titleEn}
                    </p>
                    <p className="text-[11px] text-neutral-500 font-mono truncate">{exec.email}</p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <Link
                    href={`/management/leadership/${exec.id}`}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#FAF9F5] text-xs font-bold text-neutral-700 hover:text-black hover:bg-neutral-100 transition-colors border border-[#E8E8E3]"
                  >
                    <span>{isArabic ? "عرض الملف" : "View Details"}</span>
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
