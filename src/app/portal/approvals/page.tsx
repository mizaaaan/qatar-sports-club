"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import { StatusBadge } from "@/components/common/StatusBadge";
import { PriorityBadge } from "@/components/common/PriorityBadge";
import {
  CheckSquare,
  Clock,
  Eye,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export default function PendingApprovalsPage() {
  const { t, isArabic } = useLanguage();
  const { user, role, canApprove } = useAuth();
  const { applications } = usePortalData();

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  // Filter applications that are under review
  const pendingApps = applications.filter((app) => app.status === "under_review");

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
            <span className="text-black">{t.nav.pendingApprovals}</span>
          </div>
          <h1 className="text-2xl font-black text-[#171717] mt-1">
            {isArabic ? "قائمة المعاملات بانتظار الاعتماد" : "Pending Approvals Queue"}
          </h1>
          <p className="text-xs text-neutral-500">
            {isArabic
              ? `المعاملات التي تتطلب مراجعتك واعتمادك الرسمي بصفتك (${isArabic ? user?.titleAr : user?.titleEn}).`
              : `Applications awaiting your executive review in your capacity as ${user?.titleEn}.`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
            {pendingApps.length} {isArabic ? "معاملات مطلوبة" : "Pending Approvals"}
          </span>
        </div>
      </div>

      {/* Approvals List */}
      <div className="bg-white rounded-2xl border border-[#E8E8E3] shadow-sm overflow-hidden">
        {pendingApps.length === 0 ? (
          <div className="text-center py-16 p-6 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="text-sm font-bold text-neutral-700">
              {isArabic ? "لا توجد معاملات معلقة بانتظار اعتمادك" : "All approvals up to date!"}
            </h3>
            <p className="text-xs text-neutral-400">
              {isArabic
                ? "كافة المعاملات المحالة إليك تم البت فيها والمصادقة عليها."
                : "No applications currently require your action."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {pendingApps.map((app) => {
              const currentStep = app.workflow.find((s) => s.status === "current");
              return (
                <div
                  key={app.id}
                  className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FAF9F5] transition-colors"
                >
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-neutral-400">
                        {app.referenceNumber}
                      </span>
                      <PriorityBadge priority={app.priority} size="sm" />
                      <span className="text-[11px] text-neutral-500 font-semibold">
                        {isArabic ? app.departmentAr : app.departmentEn}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#171717]">
                      {isArabic ? app.titleAr : app.titleEn}
                    </h3>

                    <p className="text-xs text-neutral-500 line-clamp-2">
                      {isArabic ? app.descriptionAr : app.descriptionEn}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-neutral-600">
                      <span>
                        {t.common.submittedBy}:{" "}
                        <strong className="text-black">
                          {isArabic ? app.submittedBy.nameAr : app.submittedBy.nameEn}
                        </strong>
                      </span>
                      <span>•</span>
                      <span>
                        {t.common.amount}:{" "}
                        <strong className="text-black">
                          {app.amount ? `${app.amount.toLocaleString()} QAR` : "N/A"}
                        </strong>
                      </span>
                      <span>•</span>
                      <span className="text-amber-700 font-bold">
                        {isArabic ? "المرحلة الحالية: " : "Current Step: "}
                        {currentStep ? (isArabic ? currentStep.titleAr : currentStep.titleEn) : "—"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <Link
                      href={`/portal/applications/${app.id}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A0A0A] text-qsc-yellow hover:bg-neutral-800 font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                    >
                      <CheckSquare className="w-4 h-4" />
                      <span>{isArabic ? "مراجعة واعتماد" : "Review & Decide"}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
