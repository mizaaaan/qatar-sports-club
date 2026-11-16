"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { QscLogo } from "./QscLogo";
import {
  Menu,
  X,
  Globe,
  ShieldCheck,
  ChevronDown,
  Building2,
  Users,
  Network,
  FileText,
  Phone,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export function Header() {
  const { language, toggleLanguage, t, isArabic } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leadershipDropdownOpen, setLeadershipDropdownOpen] = useState(false);

  const navLinks = [
    { href: "/management", label: t.home, isHome: true },
    {
      label: t.nav.leadership,
      isDropdown: true,
      items: [
        { href: "/management/leadership", label: t.nav.leadership, icon: Users },
        { href: "/management/board", label: t.nav.board, icon: ShieldCheck },
        { href: "/management/executive", label: t.nav.executive, icon: Building2 },
      ],
    },
    { href: "/management/departments", label: t.nav.departments },
    { href: "/management/org-chart", label: t.nav.orgChart },
    { href: "/management/announcements", label: t.nav.announcements },
    { href: "/management/contact", label: t.nav.contact },
  ];

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0A0A] border-b border-[#262626] backdrop-blur-md bg-opacity-95 text-white transition-all">
      {/* Top institutional strip */}
      <div className="hidden lg:block border-b border-white/10 text-[11px] py-1.5 px-6 bg-black/60 text-neutral-300">
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-qsc-yellow animate-pulse" />
              {isArabic
                ? "البوابة الرسمية المعتمدة لنادي قطر الرياضي — الدوحة، قطر"
                : "Official Institutional Administration Portal — Doha, State of Qatar"}
            </span>
            <span className="text-neutral-500">|</span>
            <span className="text-neutral-400">
              {isArabic ? "استاد سحيم بن حمد — الدفنة" : "Suheim bin Hamad Stadium — Al Dafna"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://qatarsc.qa/"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 hover:text-qsc-yellow transition-colors"
            >
              {t.officialWebsite}
            </a>
            <span className="text-neutral-600">|</span>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-neutral-300 hover:text-qsc-yellow transition-colors font-medium cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-qsc-yellow" />
              <span>{language === "en" ? "العربية (AR)" : "English (EN)"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3 xl:gap-6">
        {/* Brand Logo & Institutional Divider */}
        <div className="flex items-center gap-3 xl:gap-4 flex-shrink-0 min-w-0">
          <Link
            href="/"
            className="group flex items-center gap-2 sm:gap-3 flex-shrink-0"
            title="Qatar Sports Club"
          >
            <QscLogo size="md" showText={true} isArabic={isArabic} />
          </Link>
          <div className="hidden lg:block h-8 w-px bg-white/15 flex-shrink-0" aria-hidden="true" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 flex-shrink min-w-0">
          {navLinks.map((item, idx) => {
            if (item.isDropdown) {
              return (
                <div
                  key={idx}
                  className="relative"
                  onMouseEnter={() => setLeadershipDropdownOpen(true)}
                  onMouseLeave={() => setLeadershipDropdownOpen(false)}
                >
                  <button className="flex items-center gap-1 px-2 xl:px-3 py-1.5 xl:py-2 text-xs xl:text-sm font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer rounded-md hover:bg-white/5 whitespace-nowrap">
                    <span>{item.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-neutral-400" />
                  </button>

                  {leadershipDropdownOpen && (
                    <div className="absolute top-full left-0 rtl:left-auto rtl:right-0 mt-1 w-60 rounded-lg bg-[#141414] border border-[#2E2E2E] shadow-2xl py-2 z-50">
                      {item.items?.map((sub, sIdx) => {
                        const Icon = sub.icon;
                        const isSubActive = pathname === sub.href;
                        return (
                          <Link
                            key={sIdx}
                            href={sub.href}
                            className={`flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium transition-colors ${
                              isSubActive
                                ? "bg-qsc-yellow/10 text-qsc-yellow font-bold"
                                : "text-neutral-300 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            <Icon className="w-4 h-4 text-qsc-yellow" />
                            <span>{sub.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = pathname === item.href;
            const isHome = item.isHome;
            return (
              <Link
                key={idx}
                href={item.href!}
                className={`relative px-2 xl:px-3 py-1.5 xl:py-2 text-xs xl:text-sm font-medium transition-colors rounded-md whitespace-nowrap ${
                  isHome ? "hidden xl:inline-flex" : "inline-flex"
                } ${
                  isActive
                    ? "text-qsc-yellow font-bold bg-white/5"
                    : "text-neutral-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 xl:left-3 xl:right-3 h-0.5 bg-qsc-yellow rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <Link
            href="/portal"
            className="group flex items-center gap-2 bg-qsc-yellow text-[#0A0A0A] font-bold px-3.5 xl:px-5 py-2 xl:py-2.5 rounded-lg text-xs uppercase tracking-wider shadow-lg hover:bg-white transition-all transform hover:-translate-y-0.5 whitespace-nowrap flex-shrink-0"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t.enterPortal}</span>
            <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="p-2 text-neutral-300 hover:text-qsc-yellow text-xs font-bold flex items-center gap-1 border border-neutral-700 rounded-md"
            aria-label="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-qsc-yellow" />
            <span>{language.toUpperCase()}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white border border-neutral-700 rounded-md"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-800 bg-[#0E0E0E] px-4 pt-4 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            <Link
              href="/management"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-md text-sm font-medium text-neutral-200 hover:bg-neutral-800 hover:text-qsc-yellow"
            >
              {t.home}
            </Link>
            <Link
              href="/management/leadership"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-md text-sm font-medium text-neutral-200 hover:bg-neutral-800 hover:text-qsc-yellow"
            >
              {t.nav.leadership}
            </Link>
            <Link
              href="/management/board"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-md text-sm font-medium text-neutral-200 hover:bg-neutral-800 hover:text-qsc-yellow"
            >
              {t.nav.board}
            </Link>
            <Link
              href="/management/executive"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-md text-sm font-medium text-neutral-200 hover:bg-neutral-800 hover:text-qsc-yellow"
            >
              {t.nav.executive}
            </Link>
            <Link
              href="/management/departments"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-md text-sm font-medium text-neutral-200 hover:bg-neutral-800 hover:text-qsc-yellow"
            >
              {t.nav.departments}
            </Link>
            <Link
              href="/management/org-chart"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-md text-sm font-medium text-neutral-200 hover:bg-neutral-800 hover:text-qsc-yellow"
            >
              {t.nav.orgChart}
            </Link>
            <Link
              href="/management/announcements"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-md text-sm font-medium text-neutral-200 hover:bg-neutral-800 hover:text-qsc-yellow"
            >
              {t.nav.announcements}
            </Link>
            <Link
              href="/management/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-md text-sm font-medium text-neutral-200 hover:bg-neutral-800 hover:text-qsc-yellow"
            >
              {t.nav.contact}
            </Link>
          </div>

          <div className="pt-3 border-t border-neutral-800">
            <Link
              href="/portal"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-qsc-yellow text-[#0A0A0A] font-bold px-4 py-3 rounded-lg text-sm uppercase tracking-wider"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>{t.enterPortal}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
