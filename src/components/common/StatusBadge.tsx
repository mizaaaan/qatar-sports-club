import React from "react";
import { ApplicationStatus } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import {
  CheckCircle2,
  Clock,
  FileSignature,
  XCircle,
  AlertCircle,
  FileText,
} from "lucide-react";

export type AllStatus =
  | ApplicationStatus
  | "signed"
  | "pending"
  | "todo"
  | "in_progress"
  | "completed"
  | "upcoming"
  | "declined"
  | "expired";

interface StatusBadgeProps {
  status: AllStatus | string;
  size?: "sm" | "md";
}

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const { isArabic } = useLanguage();

  const configs: Record<
    string,
    { labelEn: string; labelAr: string; bg: string; text: string; border: string; icon: React.ComponentType<{ className?: string }> }
  > = {
    approved: {
      labelEn: "Approved & Ratified",
      labelAr: "معتمد ومصدق",
      bg: "bg-emerald-50 text-emerald-800",
      text: "text-emerald-800",
      border: "border-emerald-200",
      icon: CheckCircle2,
    },
    completed: {
      labelEn: "Completed",
      labelAr: "مكتمل",
      bg: "bg-emerald-50 text-emerald-800",
      text: "text-emerald-800",
      border: "border-emerald-200",
      icon: CheckCircle2,
    },
    signed: {
      labelEn: "Officially Signed",
      labelAr: "موقع وموثق",
      bg: "bg-emerald-50 text-emerald-800",
      text: "text-emerald-800",
      border: "border-emerald-200",
      icon: CheckCircle2,
    },
    under_review: {
      labelEn: "Under Review",
      labelAr: "قيد التدقيق",
      bg: "bg-amber-50 text-amber-900",
      text: "text-amber-900",
      border: "border-amber-200",
      icon: Clock,
    },
    pending: {
      labelEn: "Pending Action",
      labelAr: "قيد الإجراء",
      bg: "bg-amber-50 text-amber-900",
      text: "text-amber-900",
      border: "border-amber-200",
      icon: Clock,
    },
    in_progress: {
      labelEn: "In Progress",
      labelAr: "جاري التنفيذ",
      bg: "bg-blue-50 text-blue-900",
      text: "text-blue-900",
      border: "border-blue-200",
      icon: Clock,
    },
    pending_signature: {
      labelEn: "Pending Signature",
      labelAr: "بانتظار التوقيع",
      bg: "bg-purple-50 text-purple-900",
      text: "text-purple-900",
      border: "border-purple-200",
      icon: FileSignature,
    },
    changes_requested: {
      labelEn: "Changes Requested",
      labelAr: "مطلوب تعديلات",
      bg: "bg-orange-50 text-orange-900",
      text: "text-orange-900",
      border: "border-orange-200",
      icon: AlertCircle,
    },
    rejected: {
      labelEn: "Declined",
      labelAr: "مرفوض",
      bg: "bg-rose-50 text-rose-800",
      text: "text-rose-800",
      border: "border-rose-200",
      icon: XCircle,
    },
    declined: {
      labelEn: "Declined",
      labelAr: "مرفوض",
      bg: "bg-rose-50 text-rose-800",
      text: "text-rose-800",
      border: "border-rose-200",
      icon: XCircle,
    },
    expired: {
      labelEn: "Expired",
      labelAr: "منتهي الصلاحية",
      bg: "bg-neutral-100 text-neutral-600",
      text: "text-neutral-600",
      border: "border-neutral-200",
      icon: AlertCircle,
    },
    draft: {
      labelEn: "Draft",
      labelAr: "مسودة",
      bg: "bg-neutral-100 text-neutral-700",
      text: "text-neutral-700",
      border: "border-neutral-200",
      icon: FileText,
    },
    submitted: {
      labelEn: "Submitted",
      labelAr: "تم التقديم",
      bg: "bg-sky-50 text-sky-800",
      text: "text-sky-800",
      border: "border-sky-200",
      icon: Clock,
    },
    upcoming: {
      labelEn: "Upcoming",
      labelAr: "قادم",
      bg: "bg-indigo-50 text-indigo-800",
      text: "text-indigo-800",
      border: "border-indigo-200",
      icon: Clock,
    },
    todo: {
      labelEn: "To Do",
      labelAr: "قيد البدء",
      bg: "bg-neutral-100 text-neutral-700",
      text: "text-neutral-700",
      border: "border-neutral-200",
      icon: Clock,
    },
  };

  const current = configs[status] || configs.under_review;
  const Icon = current.icon;
  const padding = size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${current.bg} ${current.border} ${padding} transition-all`}
    >
      <Icon className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />
      <span>{isArabic ? current.labelAr : current.labelEn}</span>
    </span>
  );
}
