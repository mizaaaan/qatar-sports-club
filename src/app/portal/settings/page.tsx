"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import {
  Settings,
  ShieldCheck,
  Globe,
  Bell,
  Key,
  RotateCcw,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function PortalSettingsPage() {
  const { t, isArabic, language, setLanguage } = useLanguage();
  const { user } = useAuth();
  const { resetToInitialData } = usePortalData();

  const [mfa, setMfa] = useState(user?.mfaEnabled ?? true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider font-semibold">
          <Link href="/portal" className="hover:text-black">
            {t.nav.dashboard}
          </Link>
          <span>/</span>
          <span className="text-black">{t.nav.settings}</span>
        </div>
        <h1 className="text-2xl font-black text-[#171717] mt-1">
          {isArabic ? "إعدادات البوابة والحساب المؤسسي" : "Portal & Security Settings"}
        </h1>
        <p className="text-xs text-neutral-500">
          {isArabic
            ? "تخصيص معايير الأمان، إعدادات اللغة، وتفضيلات الإشعارات لنادي قطر الرياضي."
            : "Configure enterprise security, multi-factor authentication, and notifications."}
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{isArabic ? "تم حفظ التعديلات بنجاح" : "Settings updated successfully"}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Security & Authentication */}
        <div className="bg-white rounded-2xl border border-[#E8E8E3] p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-neutral-800" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
              {isArabic ? "الأمان والمصادقة المزدوجة" : "Enterprise Security & MFA"}
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF9F5] border border-[#E8E8E3]">
              <div>
                <p className="font-bold text-neutral-900">
                  {isArabic ? "المصادقة الثنائية (MFA / 2FA)" : "Two-Factor Authentication (MFA)"}
                </p>
                <p className="text-[11px] text-neutral-500">
                  {isArabic
                    ? "طلب رمز تحقق إضافي عبر الرسائل أو تطبيق المصادقة عند التوقيع والاعتماد."
                    : "Require authentication token on high-value document ratifications."}
                </p>
              </div>
              <input
                type="checkbox"
                checked={mfa}
                onChange={(e) => setMfa(e.target.checked)}
                className="w-5 h-5 rounded text-black focus:ring-black cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF9F5] border border-[#E8E8E3]">
              <div>
                <p className="font-bold text-neutral-900">
                  {isArabic ? "جلسة تسجيل الدخول الآمنة" : "Session Auto-Termination"}
                </p>
                <p className="text-[11px] text-neutral-500">
                  {isArabic ? "إغلاق الجلسة تلقائياً بعد ٣٠ دقيقة من عدم النشاط" : "30-minute idle inactivity timeout"}
                </p>
              </div>
              <span className="font-mono font-bold text-neutral-700">30 MIN</span>
            </div>
          </div>
        </div>

        {/* Language & Regional */}
        <div className="bg-white rounded-2xl border border-[#E8E8E3] p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
            <Globe className="w-4 h-4 text-neutral-800" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
              {isArabic ? "اللغة واتجاه العرض" : "Language & Layout Direction"}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                language === "en"
                  ? "bg-[#0A0A0A] text-white border-black shadow-md"
                  : "bg-[#FAF9F5] text-neutral-800 border-[#E8E8E3]"
              }`}
            >
              <span className="font-bold block text-sm">English</span>
              <span className="text-[11px] text-neutral-400">Left-to-Right (LTR)</span>
            </button>

            <button
              type="button"
              onClick={() => setLanguage("ar")}
              className={`p-4 rounded-xl border text-right transition-all cursor-pointer ${
                language === "ar"
                  ? "bg-[#0A0A0A] text-white border-black shadow-md"
                  : "bg-[#FAF9F5] text-neutral-800 border-[#E8E8E3]"
              }`}
            >
              <span className="font-bold block text-sm">العربية</span>
              <span className="text-[11px] text-neutral-400">من اليمين إلى اليسار (RTL)</span>
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-[#E8E8E3] p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
            <Bell className="w-4 h-4 text-neutral-800" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
              {isArabic ? "تفضيلات الإشعارات والتنبيهات" : "Notification Dispatch Channels"}
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#FAF9F5] border border-[#E8E8E3] cursor-pointer">
              <span>{isArabic ? "إشعارات البريد الإلكتروني الفورية" : "Immediate Email Alerts"}</span>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-black focus:ring-black"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#FAF9F5] border border-[#E8E8E3] cursor-pointer">
              <span>{isArabic ? "رسائل SMS للقرارات الرئاسية العاجلة" : "SMS Alerts for Urgent Presidential Directives"}</span>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-black focus:ring-black"
              />
            </label>
          </div>
        </div>

        {/* Save & Reset Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => {
              if (confirm(isArabic ? "إعادة تعيين كافة البيانات التجريبية للوضع الافتراضي؟" : "Reset demo state to initial mock data?")) {
                resetToInitialData();
                alert(isArabic ? "تمت إعادة ضبط البيانات بنجاح" : "Data reset complete");
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-600 text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isArabic ? "استعادة البيانات الافتراضية" : "Reset Demo Data"}</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#0A0A0A] hover:bg-neutral-800 text-qsc-yellow font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
          >
            {t.common.save}
          </button>
        </div>
      </form>
    </div>
  );
}
