"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import { StatusBadge } from "@/components/common/StatusBadge";
import { PriorityBadge } from "@/components/common/PriorityBadge";
import {
  Plus,
  FilePlus2,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
} from "lucide-react";

export default function MyApplicationsPage() {
  const { t, isArabic } = useLanguage();
  const { user } = useAuth();
  const { applications } = usePortalData();

  // Filter applications submitted by current user (or show relevant ones in demo)
  const myApps = applications.filter(
    (app) => app.submittedBy.id === user?.id || applications.slice(0, 3).includes(app)
  );

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
            <span className="text-black">{t.nav.myApplications}</span>
          </div>
          <h1 className="text-2xl font-black text-[#171717] mt-1">
            {isArabic ? "معاملاتي الإدارية المقدمة" : "My Submitted Applications"}
          </h1>
          <p className="text-xs text-neutral-500">
            {isArabic
              ? "متابعة مسار وتاريخ الموافقات للطلبات والمعاملات المقدمة من طرفك."
              : "Track live status and approval chain milestones for your applications."}
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

      {/* Applications List */}
      <div className="bg-white rounded-2xl border border-[#E8E8E3] shadow-sm overflow-hidden">
        {myApps.length === 0 ? (
          <div className="text-center py-16 p-6 space-y-3">
            <FilePlus2 className="w-12 h-12 text-neutral-300 mx-auto" />
            <h3 className="text-sm font-bold text-neutral-700">
              {isArabic ? "لم تقم بتقديم معاملات حتى الآن" : "No applications submitted yet"}
            </h3>
            <Link
              href="/portal/applications/new"
              className="inline-flex items-center gap-2 bg-[#0A0A0A] text-qsc-yellow font-bold px-4 py-2 rounded-lg text-xs"
            >
              <Plus className="w-4 h-4" />
              <span>{t.dashboard.newApplication}</span>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {myApps.map((app) => (
              <div
                key={app.id}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FAF9F5] transition-colors"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-neutral-400">
                      {app.referenceNumber}
                    </span>
                    <PriorityBadge priority={app.priority} size="sm" />
                    <span className="text-[11px] text-neutral-400">
                      {new Date(app.submittedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#171717]">
                    {isArabic ? app.titleAr : app.titleEn}
                  </h3>

                  <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                    {isArabic ? app.descriptionAr : app.descriptionEn}
                  </p>

                  <div className="pt-2 flex items-center gap-4 text-xs text-neutral-600">
                    <span>
                      {isArabic ? "القيمة المالية: " : "Amount: "}
                      <strong className="text-black">
                        {app.amount ? `${app.amount.toLocaleString()} QAR` : "N/A"}
                      </strong>
                    </span>
                    <span>•</span>
                    <span>
                      {isArabic ? "مراحل الاعتماد: " : "Workflow Steps: "}
                      <strong>{app.workflow.length}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex sm:flex-col md:flex-row items-center gap-3 flex-shrink-0">
                  <StatusBadge status={app.status} />

                  <Link
                    href={`/portal/applications/${app.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0A0A0A] hover:bg-neutral-800 text-qsc-yellow font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t.common.view}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
