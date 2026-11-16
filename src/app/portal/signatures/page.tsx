"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import { StatusBadge } from "@/components/common/StatusBadge";
import {
  PenTool,
  FileCheck2,
  Clock,
  ShieldCheck,
  Download,
  Eye,
  Hash,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

export default function SignaturesHubPage() {
  const { t, isArabic } = useLanguage();
  const { user } = useAuth();
  const { signatures } = usePortalData();

  const [activeTab, setActiveTab] = useState<"pending" | "signed">("pending");
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const pendingSigs = signatures.filter((s) => s.status === "pending");
  const signedSigs = signatures.filter((s) => s.status === "signed");

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
            <span className="text-black">{t.nav.eSignatures}</span>
          </div>
          <h1 className="text-2xl font-black text-[#171717] mt-1">
            {isArabic ? "مركز التوقيع والاعتماد الإلكتروني" : "Electronic Signature Center"}
          </h1>
          <p className="text-xs text-neutral-500">
            {isArabic
              ? "نظام التوقيع والمصادقة الرقمية المشفرة المعتمد لقرارات وعقود نادي قطر الرياضي."
              : "Legally compliant digital signature and ratification hub with SHA-256 tamper verification."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-purple-900 border border-purple-200 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-purple-700" />
            <span>{isArabic ? "تشفير رقمي معتمد" : "SHA-256 Verified"}</span>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E8E8E3] overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab("pending")}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "pending"
              ? "border-[#0A0A0A] text-black"
              : "border-transparent text-neutral-400 hover:text-black"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>{isArabic ? "بانتظار التوقيع" : "Awaiting Signature"}</span>
          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px]">
            {pendingSigs.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("signed")}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "signed"
              ? "border-[#0A0A0A] text-black"
              : "border-transparent text-neutral-400 hover:text-black"
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>{isArabic ? "المستندات الموقعة والمصدقة" : "Ratified & Signed Documents"}</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">
            {signedSigs.length}
          </span>
        </button>
      </div>

      {/* Signature Items List */}
      <div className="bg-white rounded-2xl border border-[#E8E8E3] shadow-sm overflow-hidden">
        {activeTab === "pending" && (
          <div>
            {pendingSigs.length === 0 ? (
              <div className="text-center py-16 p-6">
                <FileCheck2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                <p className="text-xs text-neutral-500">
                  {isArabic ? "لا توجد مستندات بانتظار التوقيع حالياً" : "All signature requests completed!"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-neutral-100">
                {pendingSigs.map((sig) => (
                  <div
                    key={sig.id}
                    className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FAF9F5] transition-colors"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold text-neutral-400">
                          {sig.referenceNumber}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-800 text-[10px] font-bold">
                          {sig.documentCategory}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#171717]">
                        {isArabic ? sig.documentTitleAr : sig.documentTitleEn}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 pt-1">
                        <span>
                          {isArabic ? "طالب التوقيع: " : "Requested By: "}
                          <strong className="text-neutral-800">
                            {isArabic ? sig.requestedByAr : sig.requestedByEn}
                          </strong>
                        </span>
                        <span>•</span>
                        <span>
                          {isArabic ? "الموعد النهائي: " : "Deadline: "}
                          {new Date(sig.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <Link
                        href={`/portal/signatures/${sig.id}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A0A0A] text-qsc-yellow hover:bg-neutral-800 font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                      >
                        <PenTool className="w-3.5 h-3.5" />
                        <span>{t.common.signDocument}</span>
                        <ArrowIcon className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "signed" && (
          <div>
            {signedSigs.length === 0 ? (
              <div className="text-center py-16 p-6">
                <p className="text-xs text-neutral-500">{t.common.noData}</p>
              </div>
            ) : (
              <div className="divide-y divide-neutral-100">
                {signedSigs.map((sig) => (
                  <div
                    key={sig.id}
                    className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FAF9F5] transition-colors"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold text-neutral-400">
                          {sig.referenceNumber}
                        </span>
                        <StatusBadge status="signed" size="sm" />
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                          <Hash className="w-3 h-3" />
                          {sig.certificateHash?.substring(0, 16)}...
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#171717]">
                        {isArabic ? sig.documentTitleAr : sig.documentTitleEn}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 pt-1">
                        <span>
                          {isArabic ? "الموقع المعتمد: " : "Ratified By: "}
                          <strong className="text-neutral-800">
                            {isArabic ? sig.signerNameAr : sig.signerNameEn}
                          </strong>
                        </span>
                        <span>•</span>
                        <span>
                          {isArabic ? "التاريخ والوقت: " : "Signed Timestamp: "}
                          {sig.signedAt && new Date(sig.signedAt).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <Link
                        href={`/portal/signatures/${sig.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E8E8E3] hover:border-black text-neutral-800 font-bold text-xs transition-all shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{isArabic ? "معاينة الوثيقة الموقعة" : "View Signed PDF"}</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
