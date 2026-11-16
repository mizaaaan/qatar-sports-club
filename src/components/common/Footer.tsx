"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { QscLogo } from "./QscLogo";
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  ExternalLink,
  Award,
} from "lucide-react";

export function Footer() {
  const { t, isArabic } = useLanguage();

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#262626] text-neutral-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <QscLogo size="lg" showText={true} isArabic={isArabic} />
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed mt-4">
              {isArabic
                ? "نادي قطر الرياضي — الصرح الرياضي التاريخي العريق بدولة قطر (تأسس عام ١٩٥٩). الملقب بـ 'الملك'، ريادة في التميز الرياضي، الحوكمة المؤسسية والتحول الرقمي الإداري."
                : "Qatar Sports Club — One of the historic pillars of sports excellence in the State of Qatar (Founded 1959). Known as 'The Kings', championing athletic prominence, institutional governance, and digital administrative innovation."}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-qsc-yellow/10 text-qsc-yellow border border-qsc-yellow/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                {isArabic ? "منظومة إدارية معتمدة وموثقة" : "Official Governance Portal"}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-900 text-neutral-400 border border-neutral-800">
                <Award className="w-3.5 h-3.5 text-qsc-yellow" />
                {isArabic ? "استاد سحيم بن حمد" : "Suheim Bin Hamad Stadium"}
              </span>
            </div>
          </div>

          {/* Public Showcase Links */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-4 border-l-2 border-qsc-yellow pl-2 rtl:border-l-0 rtl:border-r-2 rtl:pr-2">
              {t.managementShowcase}
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/management" className="hover:text-qsc-yellow transition-colors">
                  {t.home}
                </Link>
              </li>
              <li>
                <Link href="/management/leadership" className="hover:text-qsc-yellow transition-colors">
                  {t.nav.leadership}
                </Link>
              </li>
              <li>
                <Link href="/management/board" className="hover:text-qsc-yellow transition-colors">
                  {t.nav.board}
                </Link>
              </li>
              <li>
                <Link href="/management/executive" className="hover:text-qsc-yellow transition-colors">
                  {t.nav.executive}
                </Link>
              </li>
              <li>
                <Link href="/management/departments" className="hover:text-qsc-yellow transition-colors">
                  {t.nav.departments}
                </Link>
              </li>
              <li>
                <Link href="/management/org-chart" className="hover:text-qsc-yellow transition-colors">
                  {t.nav.orgChart}
                </Link>
              </li>
            </ul>
          </div>

          {/* Internal Portal Quick Links */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-4 border-l-2 border-qsc-yellow pl-2 rtl:border-l-0 rtl:border-r-2 rtl:pr-2">
              {t.managementPortal}
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/portal" className="hover:text-qsc-yellow transition-colors">
                  {t.nav.dashboard}
                </Link>
              </li>
              <li>
                <Link href="/portal/applications" className="hover:text-qsc-yellow transition-colors">
                  {t.nav.allApplications}
                </Link>
              </li>
              <li>
                <Link href="/portal/approvals" className="hover:text-qsc-yellow transition-colors">
                  {t.nav.pendingApprovals}
                </Link>
              </li>
              <li>
                <Link href="/portal/signatures" className="hover:text-qsc-yellow transition-colors">
                  {t.nav.eSignatures}
                </Link>
              </li>
              <li>
                <Link href="/portal/documents" className="hover:text-qsc-yellow transition-colors">
                  {t.nav.documents}
                </Link>
              </li>
              <li>
                <Link href="/portal/reports" className="hover:text-qsc-yellow transition-colors">
                  {t.nav.reports}
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Contact & HQ */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-4 border-l-2 border-qsc-yellow pl-2 rtl:border-l-0 rtl:border-r-2 rtl:pr-2">
              {t.nav.contact}
            </h4>
            <div className="space-y-3 text-xs text-neutral-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-qsc-yellow flex-shrink-0 mt-0.5" />
                <span>
                  {isArabic
                    ? "استاد سحيم بن حمد، منطقة الدفنة / الخليج الغربي، الدوحة، دولة قطر"
                    : "Suheim bin Hamad Stadium, Al Dafna / West Bay, Doha, Qatar"}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-qsc-yellow flex-shrink-0" />
                <span dir="ltr">+974 4483 1222</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-qsc-yellow flex-shrink-0" />
                <span>info@qatarsc.qa</span>
              </div>
              <div className="pt-2">
                <a
                  href="https://qatarsc.qa/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-qsc-yellow hover:underline font-semibold"
                >
                  <span>{t.officialWebsite}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & institutional disclosure */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>
            © {new Date().getFullYear()}{" "}
            {isArabic
              ? "نادي قطر الرياضي — كافة الحقوق الإدارية والمؤسسية محفوظة."
              : "Qatar Sports Club. All institutional rights reserved."}
          </p>
          <div className="flex items-center gap-4 text-[11px] text-neutral-400">
            <span>{isArabic ? "الألوان الرسمية: أصفر وأسود" : "Official Colors: Yellow & Black"}</span>
            <span>•</span>
            <span>{isArabic ? "نظام التوقيع والاعتماد المشفر" : "Cryptographically Signed & Audited"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
