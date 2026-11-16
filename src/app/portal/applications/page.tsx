"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { usePortalData } from "@/context/PortalDataContext";
import { StatusBadge } from "@/components/common/StatusBadge";
import { PriorityBadge } from "@/components/common/PriorityBadge";
import { ApplicationCategory, ApplicationStatus } from "@/lib/types";
import {
  Search,
  Filter,
  Plus,
  FileText,
  ChevronRight,
  Eye,
  Download,
  Calendar,
  Building2,
} from "lucide-react";

export default function AllApplicationsPage() {
  const { t, isArabic } = useLanguage();
  const { applications } = usePortalData();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const categories: { id: string; nameEn: string; nameAr: string }[] = [
    { id: "all", nameEn: "All Categories", nameAr: "كافة الفئات" },
    { id: "administrative", nameEn: "Administrative", nameAr: "إداري" },
    { id: "purchase", nameEn: "Purchase", nameAr: "شراء وتوريد" },
    { id: "financial", nameEn: "Financial", nameAr: "اعتماد مالي" },
    { id: "maintenance", nameEn: "Maintenance", nameAr: "صيانة الاستاد" },
    { id: "leave", nameEn: "Leave", nameAr: "إجازة رسمية" },
  ];

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.referenceNumber.toLowerCase().includes(search.toLowerCase()) ||
      app.titleEn.toLowerCase().includes(search.toLowerCase()) ||
      app.titleAr.includes(search) ||
      app.submittedBy.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      app.submittedBy.nameAr.includes(search);

    const matchesCategory = selectedCategory === "all" || app.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || app.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider font-semibold">
            <Link href="/portal" className="hover:text-black">
              {t.nav.dashboard}
            </Link>
            <span>/</span>
            <span className="text-black">{t.nav.allApplications}</span>
          </div>
          <h1 className="text-2xl font-black text-[#171717] mt-1">
            {isArabic ? "سجل كافة المعاملات الإدارية" : "All Institutional Applications"}
          </h1>
          <p className="text-xs text-neutral-500">
            {isArabic
              ? "متابعة وتدقيق كافة المعاملات والمشتريات الصادرة والواردة بنادي قطر الرياضي."
              : "Review and manage all submitted applications across club sectors."}
          </p>
        </div>

        <Link
          href="/portal/applications/new"
          className="inline-flex items-center gap-2 bg-[#0A0A0A] text-qsc-yellow font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-md self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{t.dashboard.newApplication}</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#E8E8E3] p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isArabic ? "بحث بالرقم المرجعي أو العنوان..." : "Search by ref or title..."}
            className="w-full pl-9 pr-3 rtl:pr-9 rtl:pl-3 py-2 text-xs bg-[#FAF9F5] border border-[#E8E8E3] rounded-lg focus:outline-none focus:border-black text-neutral-800"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === c.id
                  ? "bg-[#0A0A0A] text-qsc-yellow"
                  : "bg-[#F7F7F4] text-neutral-600 hover:text-black border border-[#E8E8E3]"
              }`}
            >
              {isArabic ? c.nameAr : c.nameEn}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-[#E8E8E3] shadow-sm overflow-hidden">
        {filteredApps.length === 0 ? (
          <div className="text-center py-16 p-6">
            <p className="text-xs text-neutral-500">{t.common.noData}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-xs min-w-[750px]">
              <thead className="bg-[#FAF9F5] border-b border-[#E8E8E3] text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                <tr>
                  <th className="py-3.5 px-4">{t.common.referenceNo}</th>
                  <th className="py-3.5 px-4">{isArabic ? "موضوع المعاملة" : "Application Subject"}</th>
                  <th className="py-3.5 px-4">{t.common.department}</th>
                  <th className="py-3.5 px-4">{t.common.submittedBy}</th>
                  <th className="py-3.5 px-4">{t.common.amount}</th>
                  <th className="py-3.5 px-4">{isArabic ? "الأولوية" : "Priority"}</th>
                  <th className="py-3.5 px-4">{isArabic ? "الحالة" : "Status"}</th>
                  <th className="py-3.5 px-4 text-center">{t.common.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredApps.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-[#FAF9F5] transition-colors group cursor-pointer"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-neutral-900 whitespace-nowrap">
                      {app.referenceNumber}
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <Link
                        href={`/portal/applications/${app.id}`}
                        className="font-bold text-[#171717] hover:underline line-clamp-1 block"
                      >
                        {isArabic ? app.titleAr : app.titleEn}
                      </Link>
                      <span className="text-[10px] text-neutral-400">
                        {new Date(app.submittedAt).toLocaleDateString()}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-neutral-600 whitespace-nowrap">
                      {isArabic ? app.departmentAr : app.departmentEn}
                    </td>

                    <td className="py-3.5 px-4 text-neutral-700 whitespace-nowrap">
                      {isArabic ? app.submittedBy.nameAr : app.submittedBy.nameEn}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-neutral-900 whitespace-nowrap">
                      {app.amount ? `${app.amount.toLocaleString()} QAR` : "—"}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <PriorityBadge priority={app.priority} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <StatusBadge status={app.status} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <Link
                        href={`/portal/applications/${app.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FAF9F5] group-hover:bg-[#0A0A0A] text-neutral-700 group-hover:text-qsc-yellow font-bold transition-all text-xs border border-[#E8E8E3]"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{t.common.view}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
