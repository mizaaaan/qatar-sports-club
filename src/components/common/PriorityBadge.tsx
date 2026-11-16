import React from "react";
import { ApplicationPriority } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { AlertTriangle, AlertCircle, ArrowUp, Minus } from "lucide-react";

interface PriorityBadgeProps {
  priority: ApplicationPriority;
  size?: "sm" | "md";
}

export function PriorityBadge({ priority, size = "md" }: PriorityBadgeProps) {
  const { isArabic } = useLanguage();

  const configs: Record<
    ApplicationPriority,
    { labelEn: string; labelAr: string; bg: string; border: string; text: string; icon: React.ComponentType<{ className?: string }> }
  > = {
    urgent: {
      labelEn: "Urgent",
      labelAr: "عاجل جداً",
      bg: "bg-red-50 text-red-700",
      border: "border-red-300",
      text: "text-red-700",
      icon: AlertTriangle,
    },
    high: {
      labelEn: "High",
      labelAr: "أولوية عالية",
      bg: "bg-amber-50 text-amber-800",
      border: "border-amber-300",
      text: "text-amber-800",
      icon: ArrowUp,
    },
    medium: {
      labelEn: "Standard",
      labelAr: "متوسط",
      bg: "bg-blue-50 text-blue-700",
      border: "border-blue-200",
      text: "text-blue-700",
      icon: Minus,
    },
    low: {
      labelEn: "Normal",
      labelAr: "عادي",
      bg: "bg-neutral-100 text-neutral-600",
      border: "border-neutral-200",
      text: "text-neutral-600",
      icon: Minus,
    },
  };

  const current = configs[priority] || configs.medium;
  const Icon = current.icon;
  const padding = size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-md border ${current.bg} ${current.border} ${padding}`}
    >
      <Icon className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />
      <span>{isArabic ? current.labelAr : current.labelEn}</span>
    </span>
  );
}
