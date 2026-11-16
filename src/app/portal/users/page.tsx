"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Role, User } from "@/lib/types";
import {
  ShieldCheck,
  UserCheck,
  Lock,
  Key,
  CheckCircle2,
  AlertCircle,
  Edit2,
  Search,
  ExternalLink,
} from "lucide-react";

export default function UserManagementPage() {
  const { t, isArabic } = useLanguage();
  const { allUsers, switchRole, user: currentUser } = useAuth();
  const [search, setSearch] = useState("");

  const rolesMatrix: { role: Role; titleEn: string; titleAr: string; perms: string[] }[] = [
    {
      role: "president",
      titleEn: "President & Chairman",
      titleAr: "رئيس مجلس الإدارة",
      perms: ["Final Ratification", "Executive Signatures", "Full Statute Access", "Board Decrees"],
    },
    {
      role: "vice_president",
      titleEn: "Vice President",
      titleAr: "نائب رئيس مجلس الإدارة",
      perms: ["Board Review", "Delegated Approvals", "Investment Oversight", "Signatures"],
    },
    {
      role: "general_manager",
      titleEn: "General Manager",
      titleAr: "المدير العام للنادي",
      perms: ["All Workflows", "Operational Signatures", "Budget Endorsements", "Staff Control"],
    },
    {
      role: "hr_manager",
      titleEn: "HR Director",
      titleAr: "مدير الموارد البشرية",
      perms: ["HR Approvals", "Staff Delegation", "Leave Requests", "Training Budgets"],
    },
    {
      role: "admin_officer",
      titleEn: "Administrative Officer",
      titleAr: "مسؤول الشؤون الإدارية",
      perms: ["Admin Verification", "Secretariat Dispatch", "Document Archiving"],
    },
    {
      role: "department_manager",
      titleEn: "Department Director",
      titleAr: "مدير إدارة / قسم",
      perms: ["Dept Submissions", "Technical Endorsement", "Tender Initiation"],
    },
    {
      role: "super_admin",
      titleEn: "Super Administrator",
      titleAr: "مدير النظام العام",
      perms: ["Full System Control", "RBAC Config", "Audit Logs", "Security Policies"],
    },
  ];

  const filtered = allUsers.filter((u) => {
    return (
      u.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      u.nameAr.includes(search) ||
      u.role.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider font-semibold">
          <Link href="/portal" className="hover:text-black">
            {t.nav.dashboard}
          </Link>
          <span>/</span>
          <span className="text-black">{t.nav.users}</span>
        </div>
        <h1 className="text-2xl font-black text-[#171717] mt-1">
          {isArabic ? "إدارة المستخدمين والصلاحيات (RBAC)" : "User Management & Role-Based Access"}
        </h1>
        <p className="text-xs text-neutral-500">
          {isArabic
            ? "التحكم في صلاحيات الاعتماد، التوقيع الرقمي، ومستويات الوصول للوثائق السرية."
            : "Manage role hierarchy, administrative delegations, and digital signature permissions."}
        </p>
      </div>

      {/* Role Matrix Overview */}
      <div className="bg-white rounded-2xl border border-[#E8E8E3] p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-3">
          {isArabic ? "مصفوفة الصلاحيات والحوكمة المعتمدة" : "Configured Permission & Role Matrix"}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rolesMatrix.slice(0, 4).map((rm) => (
            <div key={rm.role} className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E8E3] space-y-2 text-xs">
              <span className="font-bold text-neutral-900 block truncate">
                {isArabic ? rm.titleAr : rm.titleEn}
              </span>
              <ul className="space-y-1 text-[11px] text-neutral-500">
                {rm.perms.map((p, idx) => (
                  <li key={idx} className="flex items-center gap-1.5 truncate">
                    <span className="w-1 h-1 rounded-full bg-qsc-yellow" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-[#E8E8E3] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E8E8E3] flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isArabic ? "بحث في المستخدمين..." : "Filter officers..."}
              className="w-full pl-9 pr-3 rtl:pr-9 rtl:pl-3 py-1.5 text-xs bg-[#FAF9F5] border border-[#E8E8E3] rounded-lg focus:outline-none focus:border-black"
            />
          </div>

          <span className="text-xs text-neutral-400 font-semibold hidden sm:block">
            {filtered.length} {isArabic ? "مستخدمين" : "Active Users"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-xs min-w-[650px]">
            <thead className="bg-[#FAF9F5] border-b border-[#E8E8E3] text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="py-3.5 px-4">{isArabic ? "المسؤول" : "Officer"}</th>
                <th className="py-3.5 px-4">{isArabic ? "الدور الإداري" : "Role"}</th>
                <th className="py-3.5 px-4">{t.common.department}</th>
                <th className="py-3.5 px-4">{isArabic ? "الرقم الوظيفي" : "Badge"}</th>
                <th className="py-3.5 px-4">{isArabic ? "المصادقة الثنائية" : "MFA"}</th>
                <th className="py-3.5 px-4 text-center">{isArabic ? "المحاكاة" : "Simulate Role"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filtered.map((u) => {
                const isSelected = u.id === currentUser?.id;
                return (
                  <tr key={u.id} className="hover:bg-[#FAF9F5] transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={u.avatar}
                          alt=""
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover border border-neutral-300"
                        />
                        <div>
                          <p className="font-bold text-neutral-900">
                            {isArabic ? u.nameAr : u.nameEn}
                          </p>
                          <p className="text-[10px] text-neutral-400 font-mono">{u.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="font-semibold px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 text-[11px]">
                        {isArabic ? u.titleAr : u.titleEn}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-neutral-600 whitespace-nowrap">
                      {isArabic ? u.departmentAr : u.departmentEn}
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-neutral-700 whitespace-nowrap">
                      {u.badgeNumber}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      {u.mfaEnabled ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Enabled</span>
                        </span>
                      ) : (
                        <span className="text-[10px] text-neutral-400">Disabled</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => switchRole(u.role)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-qsc-yellow text-[#0A0A0A] shadow-sm font-extrabold"
                            : "bg-[#0A0A0A] text-white hover:bg-neutral-800"
                        }`}
                      >
                        {isSelected
                          ? isArabic
                            ? "الحساب النشط"
                            : "Active"
                          : isArabic
                          ? "تبديل الحساب"
                          : "Switch"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
