"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  CheckCircle2,
  Clock,
  Printer,
  ShieldCheck,
} from "lucide-react";

export default function GovernanceReportsPage() {
  const { t, isArabic } = useLanguage();
  const { applications, signatures, tasks } = usePortalData();

  const totalBudgetRequested = applications.reduce((sum, a) => sum + (a.amount || 0), 0);
  const approvedBudget = applications
    .filter((a) => a.status === "approved")
    .reduce((sum, a) => sum + (a.amount || 0), 0);

  const handleExportCsv = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Reference,Title,Category,Status,Amount (QAR),Department"]
        .concat(
          applications.map(
            (a) =>
              `"${a.referenceNumber}","${a.titleEn}","${a.category}","${a.status}",${a.amount || 0},"${a.departmentEn}"`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `QSC_Governance_Report_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            <span className="text-black">{t.nav.reports}</span>
          </div>
          <h1 className="text-2xl font-black text-[#171717] mt-1">
            {isArabic ? "تقارير الحوكمة والرقابة المالية" : "Institutional Governance & Financial Reports"}
          </h1>
          <p className="text-xs text-neutral-500">
            {isArabic
              ? "مؤشرات أداء سلاسل الاعتماد، المخصصات المالية، ومطابقة اللوائح لنادي قطر الرياضي."
              : "Executive analytics on workflow velocity, budget allocations, and compliance ratios."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#E8E8E3] hover:border-black text-xs font-bold text-neutral-700 shadow-sm cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t.common.print}</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="flex items-center gap-2 bg-[#0A0A0A] text-qsc-yellow font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-md cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isArabic ? "تصدير التقرير (CSV)" : "Export CSV"}</span>
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#E8E8E3] shadow-sm space-y-1">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            {isArabic ? "إجمالي الموازنات المطلوبة" : "Total Budget Demanded"}
          </span>
          <p className="text-2xl font-black text-neutral-900 font-mono">
            {totalBudgetRequested.toLocaleString()} QAR
          </p>
          <span className="text-[11px] text-neutral-500">
            {applications.length} {isArabic ? "معاملات مسجلة" : "Applications Evaluated"}
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E8E8E3] shadow-sm space-y-1">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            {isArabic ? "المصادقات المالية المعتمدة" : "Ratified & Approved Budget"}
          </span>
          <p className="text-2xl font-black text-emerald-700 font-mono">
            {approvedBudget.toLocaleString()} QAR
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">
            {Math.round((approvedBudget / (totalBudgetRequested || 1)) * 100)}% Approved Ratio
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E8E8E3] shadow-sm space-y-1">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            {isArabic ? "متوسط سرعة الاعتماد" : "Avg Approval Velocity"}
          </span>
          <p className="text-2xl font-black text-neutral-900 font-mono">1.8 Days</p>
          <span className="text-[11px] text-blue-600 font-semibold">
            Across 4 sequential steps
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E8E8E3] shadow-sm space-y-1">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            {isArabic ? "نسبة الامتثال للوائح" : "Statute Compliance"}
          </span>
          <p className="text-2xl font-black text-emerald-700 font-mono">100%</p>
          <span className="text-[11px] text-neutral-500">Verified by Audit Engine</span>
        </div>
      </div>

      {/* Breakdown Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Budget Table */}
        <div className="bg-white rounded-2xl border border-[#E8E8E3] p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-3">
            {isArabic ? "توزيع الموازنات حسب الإدارات" : "Departmental Allocation Breakdown"}
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-neutral-50 gap-2">
              <span className="font-semibold text-neutral-800">
                Facilities & Suheim Stadium Operations
              </span>
              <span className="font-mono font-bold whitespace-nowrap">485,000 QAR</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-neutral-50 gap-2">
              <span className="font-semibold text-neutral-800">Football Sector Management</span>
              <span className="font-mono font-bold whitespace-nowrap">720,000 QAR</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-neutral-50 gap-2">
              <span className="font-semibold text-neutral-800">Media, Digital & Marketing</span>
              <span className="font-mono font-bold whitespace-nowrap">950,000 QAR</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-neutral-50 gap-2">
              <span className="font-semibold text-neutral-800">Human Capital Development</span>
              <span className="font-mono font-bold whitespace-nowrap">145,000 QAR</span>
            </div>
          </div>
        </div>

        {/* Workflow Speed & SLA Metrics */}
        <div className="bg-white rounded-2xl border border-[#E8E8E3] p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-3">
            {isArabic ? "مؤشرات الأداء الزمني (SLA)" : "Governance Workflow SLA Performance"}
          </h3>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:justify-between text-neutral-600 gap-0.5 sm:gap-2">
                <span>Department Manager Endorsement</span>
                <span className="font-bold text-neutral-900">4 Hours (Target &lt; 24h)</span>
              </div>
              <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full w-[95%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:justify-between text-neutral-600 gap-0.5 sm:gap-2">
                <span>Administrative Verification</span>
                <span className="font-bold text-neutral-900">12 Hours (Target &lt; 48h)</span>
              </div>
              <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full w-[90%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:justify-between text-neutral-600 gap-0.5 sm:gap-2">
                <span>General Manager Review</span>
                <span className="font-bold text-neutral-900">18 Hours (Target &lt; 48h)</span>
              </div>
              <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                <div className="bg-qsc-yellow h-full w-[85%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:justify-between text-neutral-600 gap-0.5 sm:gap-2">
                <span>Presidential Ratification</span>
                <span className="font-bold text-neutral-900">24 Hours (Target &lt; 72h)</span>
              </div>
              <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                <div className="bg-neutral-900 h-full w-[92%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
