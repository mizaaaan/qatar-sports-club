"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import { StatusBadge } from "@/components/common/StatusBadge";
import { PriorityBadge } from "@/components/common/PriorityBadge";
import {
  FileText,
  CheckSquare,
  PenTool,
  CalendarDays,
  Plus,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Clock,
  ShieldCheck,
  AlertCircle,
  TrendingUp,
  Award,
} from "lucide-react";

export default function PortalDashboardPage() {
  const { t, isArabic } = useLanguage();
  const { user, role } = useAuth();
  const { applications, signatures, tasks, meetings, auditLogs } = usePortalData();

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const pendingApprovals = applications.filter((a) => a.status === "under_review");
  const pendingSignatures = signatures.filter((s) => s.status === "pending");
  const activeTasks = tasks.filter((t) => t.status !== "completed");
  const upcomingMeetings = meetings.filter((m) => m.status === "upcoming");

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative rounded-2xl bg-[#0A0A0A] text-white p-6 sm:p-8 overflow-hidden shadow-xl border border-neutral-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-qsc-yellow/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-qsc-yellow animate-ping" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-qsc-yellow">
                {isArabic ? "منظومة الإدارة والحوكمة الرقمية" : "Digital Sovereign Administration"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {t.common.welcomeBack},{" "}
              <span className="text-qsc-yellow">
                {isArabic ? user?.nameAr : user?.nameEn}
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
              {isArabic ? user?.titleAr : user?.titleEn} •{" "}
              {isArabic ? user?.departmentAr : user?.departmentEn}
            </p>
          </div>

          {/* Quick CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/portal/applications/new"
              className="flex items-center gap-2 bg-qsc-yellow text-[#0A0A0A] font-extrabold px-5 py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-white transition-all shadow-md transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              <span>{t.dashboard.newApplication}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1 */}
        <Link
          href="/portal/approvals"
          className="group bg-white p-5 rounded-2xl border border-[#E8E8E3] hover:border-black transition-all shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              {t.dashboard.statPendingApprovals}
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black text-[#171717]">
              {pendingApprovals.length}
            </span>
            <span className="text-xs font-bold text-amber-600 flex items-center gap-1 group-hover:underline">
              <span>{isArabic ? "معاملات مطلوبة" : "Action Needed"}</span>
              <ArrowIcon className="w-3 h-3" />
            </span>
          </div>
        </Link>

        {/* Metric 2 */}
        <Link
          href="/portal/signatures"
          className="group bg-white p-5 rounded-2xl border border-[#E8E8E3] hover:border-black transition-all shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              {t.dashboard.statAwaitingSignature}
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <PenTool className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black text-[#171717]">
              {pendingSignatures.length}
            </span>
            <span className="text-xs font-bold text-purple-600 flex items-center gap-1 group-hover:underline">
              <span>{isArabic ? "بانتظار التوقيع" : "Sign Now"}</span>
              <ArrowIcon className="w-3 h-3" />
            </span>
          </div>
        </Link>

        {/* Metric 3 */}
        <Link
          href="/portal/applications"
          className="group bg-white p-5 rounded-2xl border border-[#E8E8E3] hover:border-black transition-all shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              {t.dashboard.statActiveApps}
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black text-[#171717]">
              {applications.length}
            </span>
            <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:underline">
              <span>{isArabic ? "كافة السجلات" : "All Records"}</span>
              <ArrowIcon className="w-3 h-3" />
            </span>
          </div>
        </Link>

        {/* Metric 4 */}
        <Link
          href="/portal/meetings"
          className="group bg-white p-5 rounded-2xl border border-[#E8E8E3] hover:border-black transition-all shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              {t.dashboard.statUpcomingMeetings}
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CalendarDays className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black text-[#171717]">
              {upcomingMeetings.length}
            </span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 group-hover:underline">
              <span>{isArabic ? "جلسات مجدولة" : "Calendar"}</span>
              <ArrowIcon className="w-3 h-3" />
            </span>
          </div>
        </Link>
      </div>

      {/* Main Two-Column Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left/Main Column: Applications Awaiting Action & Recent Apps */}
        <div className="lg:col-span-8 space-y-8">
          {/* Applications Awaiting Action Table */}
          <div className="bg-white rounded-2xl border border-[#E8E8E3] shadow-sm overflow-hidden">
            <div className="p-5 border-b border-[#E8E8E3] flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  {t.dashboard.recentApplications}
                </h2>
                <p className="text-xs text-neutral-500">
                  {isArabic
                    ? "المعاملات الإدارية والمشتريات الجارية في مسارات الاعتماد"
                    : "Active procurement, facility, and administrative workflows"}
                </p>
              </div>

              <Link
                href="/portal/applications"
                className="text-xs font-bold text-black hover:underline flex items-center gap-1"
              >
                <span>{t.common.all}</span>
                <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
            </div>

            <div className="divide-y divide-neutral-100 overflow-x-auto">
              {applications.slice(0, 5).map((app) => (
                <Link
                  key={app.id}
                  href={`/portal/applications/${app.id}`}
                  className="p-4 flex items-center justify-between hover:bg-[#FAF9F5] transition-colors gap-4 block"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-neutral-400">
                        {app.referenceNumber}
                      </span>
                      <PriorityBadge priority={app.priority} size="sm" />
                    </div>
                    <h4 className="text-sm font-bold text-[#171717] truncate">
                      {isArabic ? app.titleAr : app.titleEn}
                    </h4>
                    <p className="text-xs text-neutral-500">
                      {isArabic ? app.departmentAr : app.departmentEn} •{" "}
                      {new Date(app.submittedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <StatusBadge status={app.status} size="sm" />
                    <ChevronRight className="w-4 h-4 text-neutral-400 rtl:rotate-180" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Pending Signatures Quick Drawer */}
          <div className="bg-white rounded-2xl border border-[#E8E8E3] shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  {t.nav.eSignatures} — {isArabic ? "مطلوب مصادقتك" : "Awaiting Your Ratification"}
                </h3>
              </div>
              <Link
                href="/portal/signatures"
                className="text-xs font-bold text-purple-700 hover:underline"
              >
                {isArabic ? "فتح المركز" : "Signature Studio"}
              </Link>
            </div>

            <div className="space-y-3">
              {pendingSignatures.length === 0 ? (
                <p className="text-xs text-neutral-500 py-3 text-center">
                  {isArabic ? "لا توجد مستندات بانتظار التوقيع حالياً" : "No pending signatures"}
                </p>
              ) : (
                pendingSignatures.map((sig) => (
                  <div
                    key={sig.id}
                    className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E8E8E3] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-neutral-400">
                        {sig.referenceNumber}
                      </span>
                      <p className="text-xs font-bold text-[#171717]">
                        {isArabic ? sig.documentTitleAr : sig.documentTitleEn}
                      </p>
                      <p className="text-[11px] text-neutral-500">
                        {isArabic ? "طالب التوقيع: " : "Requested by: "}
                        {isArabic ? sig.requestedByAr : sig.requestedByEn}
                      </p>
                    </div>

                    <Link
                      href={`/portal/signatures/${sig.id}`}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#0A0A0A] text-qsc-yellow hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider transition-all flex-shrink-0"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      <span>{t.common.signDocument}</span>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Directives & Upcoming Meetings */}
        <div className="lg:col-span-4 space-y-8">
          {/* Upcoming Meetings Card */}
          <div className="bg-white rounded-2xl border border-[#E8E8E3] shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  {t.nav.meetings}
                </h3>
              </div>
              <Link
                href="/portal/meetings"
                className="text-xs font-bold text-black hover:underline"
              >
                {t.common.all}
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingMeetings.map((mtg) => (
                <div
                  key={mtg.id}
                  className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E8E8E3] space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[11px] text-neutral-500">
                    <span className="font-bold text-[#0A0A0A]">{mtg.date}</span>
                    <span dir="ltr">{mtg.time}</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#171717] line-clamp-2">
                    {isArabic ? mtg.titleAr : mtg.titleEn}
                  </h4>
                  <p className="text-[11px] text-neutral-500 truncate">
                    {isArabic ? mtg.locationAr : mtg.locationEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Institutional Activity Stream (Real-Time Audit Log) */}
          <div className="bg-white rounded-2xl border border-[#E8E8E3] shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-neutral-800" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  {t.dashboard.activityStream}
                </h3>
              </div>
              <Link
                href="/portal/audit-logs"
                className="text-xs font-bold text-neutral-500 hover:text-black"
              >
                {t.nav.auditLogs}
              </Link>
            </div>

            <div className="space-y-3">
              {auditLogs.slice(0, 4).map((log) => (
                <div key={log.id} className="text-xs space-y-1 border-b border-neutral-50 pb-2.5">
                  <div className="flex items-center justify-between text-[10px] text-neutral-400">
                    <span className="font-semibold text-neutral-700">
                      {isArabic ? log.actorNameAr : log.actorNameEn}
                    </span>
                    <span>{log.timestamp.substring(11, 16)}</span>
                  </div>
                  <p className="text-neutral-800 font-medium leading-snug">{log.action}</p>
                  <p className="text-[11px] text-neutral-500 truncate">{log.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
