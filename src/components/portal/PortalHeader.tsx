"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import { Role } from "@/lib/types";
import {
  Bell,
  Globe,
  UserCheck,
  ChevronDown,
  LogOut,
  ExternalLink,
  ShieldAlert,
  CheckCircle,
  Menu,
  Clock,
  FileCheck,
} from "lucide-react";

interface PortalHeaderProps {
  onToggleSidebar?: () => void;
}

export function PortalHeader({ onToggleSidebar }: PortalHeaderProps) {
  const { language, toggleLanguage, t, isArabic } = useLanguage();
  const { user, role, switchRole, allUsers, logout } = useAuth();
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationRead,
    markAllNotificationsRead,
    signatures,
    applications,
  } = usePortalData();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const pendingApprovalsCount = applications.filter((a) => a.status === "under_review").length;
  const pendingSignaturesCount = signatures.filter((s) => s.status === "pending").length;

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0A] text-white border-b border-[#262626] h-16 px-4 sm:px-6 flex items-center justify-between shadow-md">
      {/* Left: Mobile hamburger & Institutional Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-qsc-yellow animate-ping" />
          <div>
            <h1 className="text-xs font-bold uppercase tracking-wider text-qsc-yellow font-sans">
              {isArabic ? "بوابة الإدارة والحوكمة المركزية" : "Executive Administration Portal"}
            </h1>
            <p className="text-[11px] text-neutral-400">
              {isArabic ? "نادي قطر الرياضي — الدوحة" : "Qatar Sports Club — Doha, Qatar"}
            </p>
          </div>
        </div>
      </div>

      {/* Right Controls: Role Switcher Demo, Notifications, Language, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role Demo Simulator Switcher */}
        <div className="relative">
          <button
            onClick={() => {
              setRoleDropdownOpen(!roleDropdownOpen);
              setNotifDropdownOpen(false);
              setProfileDropdownOpen(false);
            }}
            className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#262626] border border-[#333] hover:border-qsc-yellow/50 px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer shadow-sm"
            title="Demonstration Role Switcher"
          >
            <UserCheck className="w-3.5 h-3.5 text-qsc-yellow" />
            <div className="text-left rtl:text-right hidden md:block">
              <span className="text-[10px] text-neutral-400 block uppercase tracking-wider">
                {isArabic ? "الصفة الوظيفية" : "Active Role"}
              </span>
              <span className="text-xs font-bold text-white block truncate max-w-[140px]">
                {isArabic ? user?.nameAr : user?.nameEn}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-72 rounded-xl bg-[#141414] border border-[#2E2E2E] shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-neutral-800 mb-1">
                <p className="text-xs font-bold text-qsc-yellow uppercase tracking-wider">
                  {isArabic ? "محاكي الأدوار والصلاحيات" : "Role Simulator"}
                </p>
                <p className="text-[11px] text-neutral-400">
                  {isArabic
                    ? "اختر مسؤولاً لاستعراض صلاحيات الاعتماد والتوقيع الخاصة به:"
                    : "Switch identity to test role-based access & approvals:"}
                </p>
              </div>

              <div className="max-h-64 overflow-y-auto space-y-1 py-1">
                {allUsers.map((u) => {
                  const isSelected = u.id === user?.id;
                  return (
                    <button
                      key={u.id}
                      onClick={() => {
                        switchRole(u.role);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left rtl:text-right px-3 py-2 rounded-lg text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-qsc-yellow text-[#0A0A0A] font-bold"
                          : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                      }`}
                    >
                      <Image
                        src={u.avatar}
                        alt=""
                        width={28}
                        height={28}
                        className="w-7 h-7 rounded-full object-cover border border-neutral-700"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-semibold">{isArabic ? u.nameAr : u.nameEn}</p>
                        <p
                          className={`text-[10px] truncate ${
                            isSelected ? "text-neutral-900 font-medium" : "text-neutral-400"
                          }`}
                        >
                          {isArabic ? u.titleAr : u.titleEn}
                        </p>
                      </div>
                      {isSelected && <CheckCircle className="w-4 h-4 text-neutral-900" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Center */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifDropdownOpen(!notifDropdownOpen);
              setRoleDropdownOpen(false);
              setProfileDropdownOpen(false);
            }}
            className="relative p-2 rounded-lg bg-[#1A1A1A] hover:bg-[#262626] border border-[#333] text-neutral-300 hover:text-white transition-all cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 rtl:-right-auto rtl:-left-1 bg-qsc-yellow text-black font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {notifDropdownOpen && (
            <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-80 sm:w-96 rounded-xl bg-[#141414] border border-[#2E2E2E] shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {t.common.notifications} ({unreadNotificationsCount} {t.common.unread})
                </span>
                {unreadNotificationsCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-qsc-yellow hover:underline font-medium cursor-pointer"
                  >
                    {t.common.markAllRead}
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto space-y-2 py-2">
                {notifications.length === 0 ? (
                  <p className="text-xs text-neutral-500 text-center py-4">{t.common.noData}</p>
                ) : (
                  notifications.map((n) => (
                    <Link
                      key={n.id}
                      href={n.linkUrl}
                      onClick={() => {
                        markNotificationRead(n.id);
                        setNotifDropdownOpen(false);
                      }}
                      className={`block p-2.5 rounded-lg text-xs transition-colors border ${
                        n.read
                          ? "bg-neutral-900/60 border-neutral-800 text-neutral-400"
                          : "bg-[#1E1E1E] border-neutral-700 text-neutral-200"
                      } hover:border-qsc-yellow/40 hover:bg-neutral-800`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5 font-bold text-white">
                          {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-qsc-yellow" />}
                          <span className="truncate">{isArabic ? n.titleAr : n.titleEn}</span>
                        </div>
                        <span className="text-[10px] text-neutral-500 whitespace-nowrap">
                          {n.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">
                        {isArabic ? n.messageAr : n.messageEn}
                      </p>
                    </Link>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 bg-[#1A1A1A] hover:bg-[#262626] border border-[#333] px-2.5 py-1.5 rounded-lg text-xs text-neutral-200 hover:text-qsc-yellow transition-all font-semibold cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5 text-qsc-yellow" />
          <span>{language === "en" ? "عربي" : "EN"}</span>
        </button>

        {/* Public Showcase Quick Link */}
        <Link
          href="/management"
          className="hidden xl:flex items-center gap-1 text-xs text-neutral-400 hover:text-qsc-yellow transition-colors font-medium border border-neutral-800 hover:border-neutral-700 px-2.5 py-1.5 rounded-lg"
        >
          <span>{t.publicWebsite}</span>
          <ExternalLink className="w-3 h-3" />
        </Link>

        {/* User Profile Avatar */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileDropdownOpen(!profileDropdownOpen);
              setRoleDropdownOpen(false);
              setNotifDropdownOpen(false);
            }}
            className="flex items-center gap-2 p-1 rounded-full border border-neutral-700 hover:border-qsc-yellow transition-all cursor-pointer"
          >
            <Image
              src={user?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"}
              alt="User"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-64 rounded-xl bg-[#141414] border border-[#2E2E2E] shadow-2xl p-3 z-50">
              <div className="border-b border-neutral-800 pb-3 mb-2">
                <p className="text-xs font-bold text-white">{isArabic ? user?.nameAr : user?.nameEn}</p>
                <p className="text-[11px] text-qsc-yellow font-medium">
                  {isArabic ? user?.titleAr : user?.titleEn}
                </p>
                <p className="text-[10px] text-neutral-400 mt-1">{user?.email}</p>
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-neutral-800 text-neutral-300">
                  <span>Badge: {user?.badgeNumber}</span>
                </div>
              </div>

              <div className="space-y-1">
                <Link
                  href="/portal/settings"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="block px-3 py-1.5 rounded-lg text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white"
                >
                  {t.nav.settings}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full text-left rtl:text-right px-3 py-1.5 rounded-lg text-xs text-rose-400 hover:bg-rose-950/30 flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t.nav.logout}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
