"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import { StatusBadge } from "@/components/common/StatusBadge";
import { SignatureCanvas } from "@/components/portal/SignatureCanvas";
import { QscLogo } from "@/components/common/QscLogo";
import {
  PenTool,
  Printer,
  Download,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Lock,
  Hash,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SignatureDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const { t, isArabic } = useLanguage();
  const { user } = useAuth();
  const { signatures, signDocument } = usePortalData();

  const [signingModalOpen, setSigningModalOpen] = useState(false);

  const sigRecord = signatures.find((s) => s.id === id);

  if (!sigRecord) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-xs text-neutral-500">{t.common.noData}</p>
        <Link href="/portal/signatures" className="text-xs font-bold text-black underline">
          {isArabic ? "العودة لمركز التوقيع" : "Back to Signatures"}
        </Link>
      </div>
    );
  }

  const isSigned = sigRecord.status === "signed";

  const handleCompleteSigning = (dataUrl: string, type: "drawn" | "typed" | "certificate") => {
    signDocument(sigRecord.id, dataUrl, type);
    setSigningModalOpen(false);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FDFD00", "#0A0A0A", "#D4AF37", "#16834A"],
      });
    } catch {
      // Confetti fallback
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider font-semibold">
            <Link href="/portal" className="hover:text-black">
              {t.nav.dashboard}
            </Link>
            <span>/</span>
            <Link href="/portal/signatures" className="hover:text-black">
              {t.nav.eSignatures}
            </Link>
            <span>/</span>
            <span className="text-black font-mono">{sigRecord.referenceNumber}</span>
          </div>

          <h1 className="text-2xl font-black text-[#171717] mt-1">
            {isArabic ? sigRecord.documentTitleAr : sigRecord.documentTitleEn}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <StatusBadge status={sigRecord.status} />

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#E8E8E3] hover:border-black text-xs font-bold text-neutral-700 transition-colors shadow-sm cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t.common.print}</span>
          </button>
        </div>
      </div>

      {/* Main Document Preview Container (Official Letterhead Sheet) */}
      <div className="bg-white rounded-2xl border border-[#E8E8E3] shadow-xl p-4 sm:p-8 lg:p-14 space-y-6 sm:space-y-8 relative overflow-hidden">
        {/* Watermark Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <Image
            src="/QSC-Emblem-RGB.svg"
            alt=""
            width={500}
            height={650}
            className="object-contain"
          />
        </div>

        {/* Institutional Document Header */}
        <div className="border-b-2 border-neutral-900 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-3">
            <QscLogo size="md" showText={true} isArabic={isArabic} />
          </div>

          <div className="text-right rtl:text-left text-xs space-y-1">
            <p className="font-bold text-neutral-900 uppercase tracking-wider">
              {isArabic ? "دولة قطر — نادي قطر الرياضي" : "State of Qatar — Qatar Sports Club"}
            </p>
            <p className="text-neutral-500 font-mono">REF: {sigRecord.referenceNumber}</p>
            <p className="text-neutral-500">
              {isArabic ? "تاريخ الإصدار: " : "Date: "}
              {new Date(sigRecord.requestedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Document Title & Reference Metadata */}
        <div className="space-y-3 relative z-10">
          <div className="inline-block px-3 py-1 rounded bg-[#FAF9F5] border border-[#E8E8E3] text-[11px] font-bold text-neutral-700">
            {sigRecord.documentCategory} • Executive Governance Decree
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-[#171717] leading-snug">
            {isArabic ? sigRecord.documentTitleAr : sigRecord.documentTitleEn}
          </h2>

          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-500 pt-1">
            <span>
              {isArabic ? "الجهة الطالبة: " : "Originating Office: "}
              <strong className="text-neutral-800">
                {isArabic ? sigRecord.requestedByAr : sigRecord.requestedByEn}
              </strong>
            </span>
            <span>•</span>
            <span>
              {isArabic ? "المقر: " : "HQ: "}
              <strong>Suheim bin Hamad Stadium, Doha</strong>
            </span>
          </div>
        </div>

        {/* Document Legal Content Simulation */}
        <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed relative z-10 pt-2 border-t border-neutral-100">
          <p className="font-semibold text-neutral-900">
            {isArabic
              ? "استناداً إلى أحكام اللائحة الأساسية لنادي قطر الرياضي الصادرة عن الجمعية العمومية للدورة الانتخابية (٢٠٢٤-٢٠٢٨)، ومحاضر اجتماعات مجلس الإدارة المعتمدة، تقرر ما يلي:"
              : "Pursuant to the institutional statutes and bylaws of Qatar Sports Club ratified by the General Assembly for the (2024–2028) term, and under the regulatory oversight of the Board of Directors, it is hereby resolved:"}
          </p>

          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E8E3] space-y-2">
            <p>
              <strong>Clause 01:</strong>{" "}
              {isArabic
                ? "المصادقة الرسمية على تخصيص الموازنة وتفويض الإدارة العامة بتنفيذ بنود المعاملة طبقاً للمواصفات الفنية المرفقة واللوائح المالية المعتمدة."
                : "Official endorsement of the capital allocation and operational execution as delineated in the ratified tender specifications."}
            </p>
            <p>
              <strong>Clause 02:</strong>{" "}
              {isArabic
                ? "تكليف إدارة المنشآت والشؤون الإدارية بمتابعة الجداول الزمنية ومطابقة معايير الاتحاد الآسيوي ودوري نجوم قطر باستاد سحيم بن حمد."
                : "Mandating the Operations Directorate to oversee implementation milestones in full compliance with QSL and AFC stadium benchmarks."}
            </p>
            <p>
              <strong>Clause 03:</strong>{" "}
              {isArabic
                ? "يُعمل بهذا القرار من تاريخ اعتماده وتوقيعه، ويُحفظ في السجل الرقمي المؤسسي الموثق للنادي."
                : "This decree enters into formal legal force immediately upon cryptographic ratification and digital signature archiving."}
            </p>
          </div>
        </div>

        {/* Official Signatures Section */}
        <div className="pt-6 sm:pt-8 border-t-2 border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 relative z-10">
          {/* Originating Party Box */}
          <div className="p-5 rounded-xl bg-[#FAF9F5] border border-[#E8E8E3] space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
              {isArabic ? "طلب الاعتماد والتنفيذ" : "Requested & Formulated By"}
            </span>
            <p className="text-sm font-bold text-neutral-900">
              {isArabic ? sigRecord.requestedByAr : sigRecord.requestedByEn}
            </p>
            <p className="text-xs text-neutral-500">General Directorate Secretariat</p>
            <div className="pt-3 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>{isArabic ? "مقدم ومعتمد مبدئياً" : "Verified Submission"}</span>
            </div>
          </div>

          {/* Ratification / Signature Box */}
          <div
            className={`p-5 rounded-xl border transition-all ${
              isSigned
                ? "bg-emerald-50/60 border-emerald-300"
                : "bg-purple-50/50 border-purple-200 border-dashed"
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
              {isArabic ? "المصادقة والتوقيع الرئاسي / التنفيذي" : "Executive Ratification & Signature"}
            </span>

            {isSigned ? (
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-white rounded-lg border border-emerald-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-sm font-black text-neutral-900">
                      {isArabic ? sigRecord.signerNameAr : sigRecord.signerNameEn}
                    </p>
                    <p className="text-xs text-neutral-600">
                      {isArabic ? sigRecord.signerTitleAr : sigRecord.signerTitleEn}
                    </p>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>

                {sigRecord.signatureDataUrl && (
                  <div className="h-20 bg-white rounded-lg border border-neutral-200 p-2 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={sigRecord.signatureDataUrl}
                      alt="Signature"
                      className="max-h-full object-contain"
                    />
                  </div>
                )}

                <div className="text-[10px] font-mono text-neutral-500 space-y-0.5">
                  <p>HASH: {sigRecord.certificateHash}</p>
                  <p>TIME: {sigRecord.signedAt}</p>
                  <p>NODE: {sigRecord.ipAddress}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 pt-4 text-center">
                <p className="text-xs text-neutral-600">
                  {isArabic
                    ? "هذه الوثيقة بانتظار توقيعك واعتمادك الرسمي لإكسابها الصفة القانونية."
                    : "This institutional decree requires your cryptographic electronic ratification."}
                </p>

                <button
                  type="button"
                  onClick={() => setSigningModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0A0A0A] text-qsc-yellow hover:bg-neutral-800 font-extrabold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  <PenTool className="w-4 h-4" />
                  <span>{t.common.signDocument}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Cryptographic Verification Badge */}
        {isSigned && (
          <div className="p-4 rounded-xl bg-[#0A0A0A] text-white border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-qsc-yellow animate-pulse" />
              <span className="font-bold text-qsc-yellow">
                {isArabic
                  ? "وثيقة معتمدة ومحمية بتشفير SHA-256 ضد أي تعديل أو تلاعب"
                  : "Tamper-Evident SHA-256 Validated & Archival Ratified"}
              </span>
            </div>
            <span className="font-mono text-[10px] text-neutral-400">
              STATUS: CRYPTO_VERIFIED
            </span>
          </div>
        )}
      </div>

      {/* Signature Studio Modal */}
      {signingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-xl w-full">
            <SignatureCanvas
              documentTitle={isArabic ? sigRecord.documentTitleAr : sigRecord.documentTitleEn}
              onSignComplete={handleCompleteSigning}
              onCancel={() => setSigningModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
