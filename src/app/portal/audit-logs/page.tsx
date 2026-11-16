"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import {
  History,
  ShieldCheck,
  Search,
  Filter,
  Download,
  Calendar,
  Lock,
  Hash,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function AuditLogsPage() {
  const { t, isArabic } = useLanguage();
  const { auditLogs } = usePortalData();
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const types = [
    { id: "all", labelEn: "All Activity", labelAr: "كافة السجلات" },
    { id: "signature", labelEn: "E-Signatures", labelAr: "التوقيع الإلكتروني" },
    { id: "approval", labelEn: "Approvals", labelAr: "قرارات الاعتماد" },
    { id: "document", labelEn: "Documents", labelAr: "حفظ الوثائق" },
    { id: "security", labelEn: "Security & RBAC", labelAr: "الأمان والصلاحيات" },
  ];

  const filtered = auditLogs.filter((log) => {
    const matchesSearch =
      log.actorNameEn.toLowerCase().includes(search.toLowerCase()) ||
      log.actorNameAr.includes(search) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase()) ||
      log.targetEntity.toLowerCase().includes(search.toLowerCase());

    const matchesType = selectedType === "all" || log.actionType === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider font-semibold">
            <Link href="/portal" className="hover:text-black">
              {t.nav.dashboard}
            </Link>
            <span>/</span>
            <span className="text-black">{t.nav.auditLogs}</span>
          </div>
          <h1 className="text-2xl font-black text-[#171717] mt-1">
            {isArabic ? "سجل العمليات والتدقيق المؤسسي" : "Institutional Audit Trail & Event Ledger"}
          </h1>
          <p className="text-xs text-neutral-500">
            {isArabic
              ? "سجل رقمي غير قابل للتعديل يوثق كافة حركات تسجيل الدخول، قرارات الاعتماد، وبصمات التوقيع."
              : "Immutable cryptographic ledger tracking logins, approval decisions, and signature hashes."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{isArabic ? "سجل مؤمّن ومشفّر" : "Tamper-Proof Ledger"}</span>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#E8E8E3] p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isArabic ? "بحث في سجل العمليات..." : "Search audit logs..."}
            className="w-full pl-9 pr-3 rtl:pr-9 rtl:pl-3 py-2 text-xs bg-[#FAF9F5] border border-[#E8E8E3] rounded-lg focus:outline-none focus:border-black"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {types.map((tp) => (
            <button
              key={tp.id}
              onClick={() => setSelectedType(tp.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedType === tp.id
                  ? "bg-[#0A0A0A] text-qsc-yellow"
                  : "bg-[#F7F7F4] text-neutral-600 hover:text-black border border-[#E8E8E3]"
              }`}
            >
              {isArabic ? tp.labelAr : tp.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-[#E8E8E3] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-xs min-w-[700px]">
            <thead className="bg-[#FAF9F5] border-b border-[#E8E8E3] text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="py-3.5 px-4">{t.common.timestamp}</th>
                <th className="py-3.5 px-4">{isArabic ? "المسؤول" : "Actor"}</th>
                <th className="py-3.5 px-4">{isArabic ? "نوع العملية" : "Action"}</th>
                <th className="py-3.5 px-4">{isArabic ? "الكيان المستهدف" : "Target Entity"}</th>
                <th className="py-3.5 px-4">{isArabic ? "التفاصيل والملاحظات" : "Details"}</th>
                <th className="py-3.5 px-4">{isArabic ? "عنوان IP" : "IP Address"}</th>
                <th className="py-3.5 px-4">{isArabic ? "الحالة" : "Status"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-[#FAF9F5] transition-colors font-sans">
                  <td className="py-3.5 px-4 font-mono text-neutral-500 whitespace-nowrap">
                    {log.timestamp}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <p className="font-bold text-neutral-900">
                      {isArabic ? log.actorNameAr : log.actorNameEn}
                    </p>
                    <span className="text-[10px] text-neutral-400 font-mono uppercase">
                      {log.actorRole}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap font-bold text-neutral-800">
                    {log.action}
                  </td>

                  <td className="py-3.5 px-4 font-mono font-semibold text-neutral-700 whitespace-nowrap">
                    {log.targetEntity}
                  </td>

                  <td className="py-3.5 px-4 text-neutral-600 max-w-sm truncate">
                    {log.details}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-400 whitespace-nowrap">
                    {log.ipAddress}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      SUCCESS
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
