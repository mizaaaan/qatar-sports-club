"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import { QscLogo } from "../common/QscLogo";
import {
  LayoutDashboard,
  FileText,
  FilePlus2,
  CheckSquare,
  FolderLock,
  PenTool,
  CheckCircle2,
  CalendarDays,
  Bell,
  Users2,
  BarChart3,
  ShieldCheck,
  Settings,
  History,
  X,
  ExternalLink,
} from "lucide-react";

interface PortalSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PortalSidebar({ isOpen, onClose }: PortalSidebarProps) {
  const pathname = usePathname();
  const { t, isArabic } = useLanguage();
  const { canManageUsers, canAccessReports, canAccessAuditLogs, user } = useAuth();
  const { applications, signatures, unreadNotificationsCount } = usePortalData();

  const pendingApprovalsCount = applications.filter((a) => a.status === "under_review").length;
  const pendingSignaturesCount = signatures.filter((s) => s.status === "pending").length;

  const navSections = [
    {
      titleEn: "Main Workspace",
      titleAr: "مساحة العمل الرئيسية",
      items: [
        {
          href: "/portal",
          label: t.nav.dashboard,
          icon: LayoutDashboard,
          badge: null,
        },
        {
          href: "/portal/applications/my",
          label: t.nav.myApplications,
          icon: FilePlus2,
          badge: null,
        },
        {
          href: "/portal/applications",
          label: t.nav.allApplications,
          icon: FileText,
          badge: applications.length,
        },
        {
          href: "/portal/approvals",
          label: t.nav.pendingApprovals,
          icon: CheckSquare,
          badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : null,
          badgeColor: "bg-qsc-yellow text-black font-extrabold",
        },
      ],
    },
    {
      titleEn: "Governance & Content",
      titleAr: "الحوكمة والوثائق",
      items: [
        {
          href: "/portal/signatures",
          label: t.nav.eSignatures,
          icon: PenTool,
          badge: pendingSignaturesCount > 0 ? pendingSignaturesCount : null,
          badgeColor: "bg-purple-500 text-white font-bold",
        },
        {
          href: "/portal/documents",
          label: t.nav.documents,
          icon: FolderLock,
          badge: null,
        },
        {
          href: "/portal/tasks",
          label: t.nav.tasks,
          icon: CheckCircle2,
          badge: null,
        },
        {
          href: "/portal/meetings",
          label: t.nav.meetings,
          icon: CalendarDays,
          badge: null,
        },
        {
          href: "/portal/notifications",
          label: t.common.notifications,
          icon: Bell,
          badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : null,
          badgeColor: "bg-amber-400 text-black font-bold",
        },
      ],
    },
    {
      titleEn: "Administration & Oversight",
      titleAr: "الإدارة والرقابة المؤسسية",
      items: [
        {
          href: "/portal/directory",
          label: t.nav.directory,
          icon: Users2,
          badge: null,
        },
        ...(canAccessReports
          ? [
              {
                href: "/portal/reports",
                label: t.nav.reports,
                icon: BarChart3,
                badge: null,
              },
            ]
          : []),
        ...(canManageUsers
          ? [
              {
                href: "/portal/users",
                label: t.nav.users,
                icon: ShieldCheck,
                badge: null,
              },
            ]
          : []),
        ...(canAccessAuditLogs
          ? [
              {
                href: "/portal/audit-logs",
                label: t.nav.auditLogs,
                icon: History,
                badge: null,
              },
            ]
          : []),
        {
          href: "/portal/settings",
          label: t.nav.settings,
          icon: Settings,
          badge: null,
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 z-50 w-72 bg-[#0A0A0A] border-r rtl:border-r-0 rtl:border-l border-[#262626] text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full rtl:translate-x-full"
        }`}
      >
        {/* Header / Brand */}
        <div className="h-20 px-5 border-b border-[#262626] flex items-center justify-between">
          <Link href="/portal" className="flex items-center gap-2.5">
            <QscLogo size="sm" showText={true} isArabic={isArabic} />
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-neutral-800">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2 font-sans">
                {isArabic ? section.titleAr : section.titleEn}
              </p>
              {section.items.map((item, idx) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/portal"
                    ? pathname === "/portal"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={onClose}
                    className={`group flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-qsc-yellow text-[#0A0A0A] shadow-md font-bold"
                        : "text-neutral-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={`w-4 h-4 flex-shrink-0 transition-colors ${
                          isActive
                            ? "text-[#0A0A0A]"
                            : "text-neutral-400 group-hover:text-qsc-yellow"
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge !== null && item.badge !== undefined && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          item.badgeColor ||
                          (isActive
                            ? "bg-black text-qsc-yellow"
                            : "bg-neutral-800 text-neutral-300")
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer info & public portal link */}
        <div className="p-4 border-t border-[#262626] bg-[#0E0E0E]">
          <Link
            href="/management"
            className="flex items-center justify-between p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-qsc-yellow hover:border-neutral-700 transition-colors text-xs"
          >
            <span className="font-medium">{t.managementShowcase}</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
          </Link>

          <div className="mt-3 flex items-center justify-between text-[10px] text-neutral-400">
            <span>{isArabic ? "الإصدار المؤسسي ٢.٤" : "Release v2.4 Enterprise"}</span>
            <span className="text-qsc-yellow font-mono">QSC-SECURE</span>
          </div>
        </div>
      </aside>
    </>
  );
}
