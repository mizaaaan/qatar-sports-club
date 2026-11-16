"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { usePortalData } from "@/context/PortalDataContext";
import {
  Bell,
  CheckCheck,
  CheckCircle2,
  PenTool,
  Calendar,
  CheckSquare,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

export default function NotificationsCenterPage() {
  const { t, isArabic } = useLanguage();
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationRead,
    markAllNotificationsRead,
  } = usePortalData();

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const getIcon = (type: string) => {
    switch (type) {
      case "signature":
        return <PenTool className="w-4 h-4 text-purple-600" />;
      case "approval":
        return <CheckSquare className="w-4 h-4 text-amber-600" />;
      case "meeting":
        return <Calendar className="w-4 h-4 text-emerald-600" />;
      default:
        return <Bell className="w-4 h-4 text-neutral-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider font-semibold">
            <Link href="/portal" className="hover:text-black">
              {t.nav.dashboard}
            </Link>
            <span>/</span>
            <span className="text-black">{t.common.notifications}</span>
          </div>
          <h1 className="text-2xl font-black text-[#171717] mt-1">
            {isArabic ? "مركز التنبيهات والإشعارات المؤسسية" : "Institutional Notification Hub"}
          </h1>
          <p className="text-xs text-neutral-500">
            {isArabic
              ? "متابعة طلبات الاعتماد، مواعيد التوقيع، الاجتماعات، والقرارات الإدارية."
              : "Live updates on signature alerts, approval dispatches, and executive meetings."}
          </p>
        </div>

        {unreadNotificationsCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E8E8E3] hover:border-black text-xs font-bold text-neutral-800 transition-colors shadow-sm self-start sm:self-auto cursor-pointer"
          >
            <CheckCheck className="w-4 h-4 text-emerald-600" />
            <span>{t.common.markAllRead}</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-[#E8E8E3] shadow-sm divide-y divide-neutral-100 overflow-hidden">
        {notifications.length === 0 ? (
          <div className="text-center py-16 p-6">
            <Bell className="w-12 h-12 text-neutral-300 mx-auto mb-2" />
            <p className="text-xs text-neutral-500">
              {isArabic ? "لا توجد إشعارات جديدة حالياً" : "Your notification inbox is clear!"}
            </p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`p-5 flex items-start justify-between gap-4 transition-colors ${
                n.read ? "bg-white" : "bg-neutral-50/70"
              } hover:bg-[#FAF9F5]`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#E8E8E3] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  {getIcon(n.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-qsc-yellow animate-pulse" />
                    )}
                    <h3 className="text-sm font-bold text-neutral-900">
                      {isArabic ? n.titleAr : n.titleEn}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {isArabic ? n.messageAr : n.messageEn}
                  </p>

                  <span className="text-[10px] text-neutral-400 block pt-0.5">
                    {n.timestamp}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 pt-1">
                <Link
                  href={n.linkUrl}
                  onClick={() => markNotificationRead(n.id)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0A0A0A] text-qsc-yellow font-bold text-xs hover:bg-neutral-800 transition-colors"
                >
                  <span>{isArabic ? "متابعة" : "View"}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
