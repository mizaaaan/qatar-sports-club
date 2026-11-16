"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import { StatusBadge } from "@/components/common/StatusBadge";
import { PriorityBadge } from "@/components/common/PriorityBadge";
import { SignatureCanvas } from "@/components/portal/SignatureCanvas";
import {
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  FileText,
  DollarSign,
  Building2,
  UserCheck,
  Send,
  PenTool,
  History,
  FileCheck2,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Forward,
  MessageSquare,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ApplicationDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const { t, isArabic } = useLanguage();
  const { user, role, canApprove } = useAuth();
  const {
    applications,
    approveWorkflowStep,
    rejectWorkflowStep,
    requestChangesWorkflowStep,
    reassignWorkflowStep,
    signDocument,
  } = usePortalData();

  const [activeComment, setActiveComment] = useState("");
  const [modalAction, setModalAction] = useState<"approve" | "reject" | "changes" | "reassign" | "sign" | null>(null);
  const [reassignName, setReassignName] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);

  const application = applications.find((a) => a.id === id);

  if (!application) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-sm text-neutral-500">{t.common.noData}</p>
        <Link href="/portal/applications" className="text-xs font-bold text-black underline">
          {isArabic ? "العودة لقائمة المعاملات" : "Back to Applications"}
        </Link>
      </div>
    );
  }

  const currentStep = application.workflow.find((s) => s.status === "current");
  const isAuthorizedApprover =
    canApprove &&
    currentStep &&
    (user?.role === currentStep.role ||
      user?.role === "super_admin" ||
      user?.role === "president");

  const handleExecuteApproval = () => {
    if (!currentStep) return;

    approveWorkflowStep(application.id, currentStep.id, activeComment);
    setModalAction(null);
    setActiveComment("");

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#FDFD00", "#0A0A0A", "#D4AF37", "#16834A"],
      });
    } catch {
      // Fallback
    }
  };

  const handleExecuteReject = () => {
    if (!currentStep) return;
    rejectWorkflowStep(application.id, currentStep.id, activeComment || "Declined during executive review.");
    setModalAction(null);
    setActiveComment("");
  };

  const handleExecuteChanges = () => {
    if (!currentStep) return;
    requestChangesWorkflowStep(application.id, currentStep.id, activeComment || "Additional administrative documents requested.");
    setModalAction(null);
    setActiveComment("");
  };

  const handleExecuteReassign = () => {
    if (!currentStep) return;
    reassignWorkflowStep(application.id, currentStep.id, reassignName || "Assigned Officer");
    setModalAction(null);
    setReassignName("");
  };

  const handleSignatureSuccess = (signatureDataUrl: string, type: "drawn" | "typed" | "certificate") => {
    if (currentStep) {
      approveWorkflowStep(
        application.id,
        currentStep.id,
        `Ratified with cryptographically verified digital signature (${type}).`
      );
    }
    setModalAction(null);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Breadcrumb & Overview Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider font-semibold">
            <Link href="/portal" className="hover:text-black">
              {t.nav.dashboard}
            </Link>
            <span>/</span>
            <Link href="/portal/applications" className="hover:text-black">
              {t.nav.allApplications}
            </Link>
            <span>/</span>
            <span className="text-black font-mono">{application.referenceNumber}</span>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-black text-[#171717]">
              {isArabic ? application.titleAr : application.titleEn}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <PriorityBadge priority={application.priority} />
          <StatusBadge status={application.status} />
        </div>
      </div>

      {/* Multi-Level Workflow Engine Visual Hierarchy */}
      <div className="bg-white rounded-2xl border border-[#E8E8E3] p-4 sm:p-6 lg:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#666666]">
              {t.common.approvalChain}
            </span>
            <h2 className="text-lg font-black text-[#171717] mt-0.5">
              {isArabic ? "مسار الاعتماد متعدد المستويات" : "Sequential Multi-Tier Decision Workflow"}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-neutral-400">
              {application.workflow.filter((s) => s.status === "approved").length} /{" "}
              {application.workflow.length} {isArabic ? "مكتمل" : "Completed"}
            </span>
          </div>
        </div>

        {/* Steps Progress Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {application.workflow.map((step, idx) => {
            const isApproved = step.status === "approved";
            const isCurrent = step.status === "current";
            const isPending = step.status === "pending";
            const isRejected = step.status === "rejected";
            const isChanges = step.status === "changes_requested";

            return (
              <div
                key={step.id}
                className={`relative rounded-xl p-4 border transition-all ${
                  isCurrent
                    ? "bg-[#0A0A0A] text-white border-qsc-yellow/80 shadow-md ring-2 ring-qsc-yellow/30"
                    : isApproved
                    ? "bg-emerald-50/50 border-emerald-200 text-neutral-800"
                    : isRejected
                    ? "bg-rose-50 border-rose-200 text-neutral-800"
                    : isChanges
                    ? "bg-amber-50 border-amber-200 text-neutral-800"
                    : "bg-[#FAF9F5] border-[#E8E8E3] text-neutral-400"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCurrent
                        ? "bg-qsc-yellow text-black"
                        : isApproved
                        ? "bg-emerald-600 text-white"
                        : "bg-neutral-200 text-neutral-600"
                    }`}
                  >
                    {idx + 1}
                  </span>

                  {isApproved && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  {isCurrent && <Clock className="w-4 h-4 text-qsc-yellow animate-spin" />}
                  {isRejected && <XCircle className="w-4 h-4 text-rose-600" />}
                  {isChanges && <AlertCircle className="w-4 h-4 text-amber-600" />}
                </div>

                <div className="space-y-1">
                  <p
                    className={`text-xs font-black leading-snug line-clamp-1 ${
                      isCurrent ? "text-white" : "text-neutral-900"
                    }`}
                  >
                    {isArabic ? step.titleAr : step.titleEn}
                  </p>
                  <p
                    className={`text-[11px] truncate ${
                      isCurrent ? "text-neutral-300" : "text-neutral-500"
                    }`}
                  >
                    {isArabic ? step.assigneeNameAr : step.assigneeNameEn}
                  </p>
                </div>

                {step.decisionDate && (
                  <p className="text-[10px] text-neutral-400 mt-2">
                    {new Date(step.decisionDate).toLocaleDateString()}
                  </p>
                )}

                {step.comments && (
                  <p
                    className={`text-[10px] mt-2 pt-2 border-t line-clamp-2 ${
                      isCurrent
                        ? "border-neutral-800 text-neutral-300"
                        : "border-neutral-200 text-neutral-600"
                    }`}
                  >
                    &ldquo;{step.comments}&rdquo;
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Dynamic Action Trigger Panel for Current Approver */}
        {isAuthorizedApprover && application.status === "under_review" && (
          <div className="p-6 rounded-2xl bg-[#0A0A0A] text-white border-2 border-qsc-yellow/50 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-qsc-yellow animate-ping" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-qsc-yellow">
                  {isArabic
                    ? "الإجراء الإداري المطلوب من سعادتكم الآن"
                    : "Executive Decision Required From You"}
                </h3>
              </div>

              <span className="text-[11px] font-mono text-neutral-400">
                Authorized Role: {user?.role.toUpperCase()}
              </span>
            </div>

            <p className="text-xs text-neutral-300">
              {isArabic
                ? `أنت مكلف بالاعتماد الإداري لهذه المرحلة بصفتك (${isArabic ? user?.titleAr : user?.titleEn}). يمكنك المصادقة، رفض المعاملة، طلب تعديلات، أو إحالتها لمسؤول آخر.`
                : `You are authorized to ratify this step in your capacity as ${user?.titleEn}. You may approve, decline, request changes, or forward to another officer.`}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {currentStep?.signatureRequired ? (
                <button
                  type="button"
                  onClick={() => setModalAction("sign")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-qsc-yellow text-[#0A0A0A] font-extrabold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-md cursor-pointer"
                >
                  <PenTool className="w-4 h-4" />
                  <span>{isArabic ? "التوقيع والاعتماد الرسمي" : "Ratify & Sign Document"}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setModalAction("approve")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.common.approve}</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setModalAction("changes")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-neutral-800 border border-amber-600/60 text-amber-400 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{t.common.requestChanges}</span>
              </button>

              <button
                type="button"
                onClick={() => setModalAction("reject")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-neutral-800 border border-rose-600/60 text-rose-400 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <XCircle className="w-4 h-4" />
                <span>{t.common.reject}</span>
              </button>

              <button
                type="button"
                onClick={() => setModalAction("reassign")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-neutral-800 border border-neutral-700 text-neutral-300 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <Forward className="w-4 h-4" />
                <span>{t.common.forward}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Two Column Layout: Application Details & Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Full Application Specs */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-[#E8E8E3] p-5 sm:p-8 shadow-sm space-y-6 text-xs">
            <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              {isArabic ? "بيانات ومبررات المعاملة" : "Application Justification & Scope"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-neutral-400 font-bold uppercase tracking-wider block">
                  {t.common.submittedBy}
                </span>
                <p className="text-sm font-bold text-neutral-900 mt-0.5">
                  {isArabic ? application.submittedBy.nameAr : application.submittedBy.nameEn}
                </p>
                <p className="text-[11px] text-neutral-500">
                  {isArabic ? application.submittedBy.titleAr : application.submittedBy.titleEn}
                </p>
              </div>

              <div>
                <span className="text-neutral-400 font-bold uppercase tracking-wider block">
                  {t.common.department}
                </span>
                <p className="text-sm font-bold text-neutral-900 mt-0.5">
                  {isArabic ? application.departmentAr : application.departmentEn}
                </p>
              </div>

              <div>
                <span className="text-neutral-400 font-bold uppercase tracking-wider block">
                  {t.common.amount}
                </span>
                <p className="text-base font-black text-neutral-900 mt-0.5 font-mono">
                  {application.amount ? `${application.amount.toLocaleString()} QAR` : "N/A"}
                </p>
              </div>

              <div>
                <span className="text-neutral-400 font-bold uppercase tracking-wider block">
                  {t.common.date}
                </span>
                <p className="text-sm font-semibold text-neutral-800 mt-0.5">
                  {new Date(application.submittedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 space-y-2">
              <span className="text-neutral-400 font-bold uppercase tracking-wider block">
                {isArabic ? "الشرح الإداري والفني" : "Technical Description"}
              </span>
              <p className="text-neutral-700 leading-relaxed text-sm">
                {isArabic ? application.descriptionAr : application.descriptionEn}
              </p>
            </div>

            {/* Attachments */}
            <div className="pt-3 border-t border-neutral-100 space-y-3">
              <span className="text-neutral-400 font-bold uppercase tracking-wider block">
                {t.common.attachments} ({application.attachments.length})
              </span>
              <div className="space-y-2">
                {application.attachments.map((att) => (
                  <div
                    key={att.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#FAF9F5] border border-[#E8E8E3]"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-neutral-600" />
                      <div>
                        <p className="font-bold text-neutral-800">{att.name}</p>
                        <p className="text-[10px] text-neutral-400">{att.size}</p>
                      </div>
                    </div>

                    <a
                      href={att.url}
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#E8E8E3] hover:border-black font-bold text-neutral-800 text-[11px]"
                    >
                      {isArabic ? "معاينة الملف" : "Preview PDF"}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Immutable Audit Trail */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-[#E8E8E3] p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
              <History className="w-4 h-4 text-neutral-800" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                {t.common.auditTrail}
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              {application.auditTrail.map((aud, idx) => (
                <div key={aud.id} className="relative pl-6 rtl:pl-0 rtl:pr-6 space-y-1">
                  <span className="absolute left-0 rtl:left-auto rtl:right-0 top-1 w-2.5 h-2.5 rounded-full bg-neutral-800" />
                  <p className="font-bold text-neutral-900">{aud.action}</p>
                  <p className="text-neutral-500 text-[11px]">
                    {isArabic ? aud.actorAr : aud.actorEn}
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    {new Date(aud.timestamp).toLocaleString()}
                  </p>
                  {aud.notes && (
                    <p className="text-[11px] text-neutral-600 bg-[#FAF9F5] p-2 rounded border border-neutral-100 mt-1">
                      {aud.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decision Modal (Approve / Reject / Changes / Reassign / Sign) */}
      {modalAction && modalAction !== "sign" && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-md w-full p-6 text-neutral-800 space-y-4 animate-in fade-in zoom-in-95">
            <div className="border-b border-neutral-100 pb-3">
              <h3 className="text-base font-black text-neutral-900">
                {modalAction === "approve" && t.common.approve}
                {modalAction === "reject" && t.common.reject}
                {modalAction === "changes" && t.common.requestChanges}
                {modalAction === "reassign" && t.common.forward}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                {application.referenceNumber} • Step: {currentStep?.titleEn}
              </p>
            </div>

            {modalAction === "reassign" ? (
              <div className="space-y-2 text-xs">
                <label className="font-bold text-neutral-700 block">
                  {isArabic ? "اسم المسؤول الجديد للإحالة:" : "Forward To Officer Name:"}
                </label>
                <input
                  type="text"
                  value={reassignName}
                  onChange={(e) => setReassignName(e.target.value)}
                  placeholder="e.g. Dr. Maryam Al-Kuwari"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                />
              </div>
            ) : (
              <div className="space-y-2 text-xs">
                <label className="font-bold text-neutral-700 block">
                  {t.common.comments} {modalAction === "reject" && "*"}
                </label>
                <textarea
                  rows={3}
                  value={activeComment}
                  onChange={(e) => setActiveComment(e.target.value)}
                  placeholder={
                    isArabic
                      ? "أدخل الملاحظات والتوجيهات الإدارية..."
                      : "Enter official remarks, directives, or conditions..."
                  }
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-none focus:border-black"
                />
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100 text-xs">
              <button
                type="button"
                onClick={() => setModalAction(null)}
                className="px-4 py-2 rounded-lg font-semibold text-neutral-600 hover:bg-neutral-100"
              >
                {t.common.cancel}
              </button>

              {modalAction === "approve" && (
                <button
                  type="button"
                  onClick={handleExecuteApproval}
                  className="px-5 py-2 rounded-lg font-bold bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  {t.common.approve}
                </button>
              )}

              {modalAction === "reject" && (
                <button
                  type="button"
                  onClick={handleExecuteReject}
                  className="px-5 py-2 rounded-lg font-bold bg-rose-600 hover:bg-rose-500 text-white"
                >
                  {t.common.reject}
                </button>
              )}

              {modalAction === "changes" && (
                <button
                  type="button"
                  onClick={handleExecuteChanges}
                  className="px-5 py-2 rounded-lg font-bold bg-amber-600 hover:bg-amber-500 text-white"
                >
                  {t.common.requestChanges}
                </button>
              )}

              {modalAction === "reassign" && (
                <button
                  type="button"
                  onClick={handleExecuteReassign}
                  className="px-5 py-2 rounded-lg font-bold bg-[#0A0A0A] text-qsc-yellow"
                >
                  {t.common.confirm}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Signature Studio Modal */}
      {modalAction === "sign" && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-xl w-full">
            <SignatureCanvas
              documentTitle={isArabic ? application.titleAr : application.titleEn}
              onSignComplete={handleSignatureSuccess}
              onCancel={() => setModalAction(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
