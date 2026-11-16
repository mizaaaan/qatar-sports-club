"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { QscLogo } from "@/components/common/QscLogo";
import {
  Lock,
  Mail,
  ShieldCheck,
  Globe,
  ArrowRight,
  ArrowLeft,
  UserCheck,
  CheckCircle2,
} from "lucide-react";

export default function PortalLoginPage() {
  const { t, isArabic, toggleLanguage, language } = useLanguage();
  const { login, switchRole, allUsers } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("president@qatarsc.qa");
  const [password, setPassword] = useState("••••••••••••");
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email);
    if (success) {
      router.push("/portal");
    } else {
      setErrorMsg(isArabic ? "بيانات الدخول غير صحيحة" : "Invalid institutional credentials");
    }
  };

  const handleQuickLoginAs = (userEmail: string, role: any) => {
    login(userEmail);
    switchRole(role);
    router.push("/portal");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      {/* Top Bar */}
      <header className="h-16 border-b border-[#262626] px-6 flex items-center justify-between">
        <Link href="/management" className="flex items-center gap-2">
          <QscLogo size="sm" showText={true} isArabic={isArabic} />
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-qsc-yellow transition-colors font-semibold cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-qsc-yellow" />
            <span>{language === "en" ? "العربية (AR)" : "English (EN)"}</span>
          </button>

          <Link
            href="/management"
            className="text-xs text-neutral-400 hover:text-white"
          >
            {t.publicWebsite}
          </Link>
        </div>
      </header>

      {/* Main Login Card */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 relative">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-qsc-yellow/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full bg-[#141414] border border-[#262626] rounded-2xl p-8 shadow-2xl space-y-6 relative z-10">
          <div className="text-center space-y-3">
            <div className="inline-block p-3 bg-black/60 rounded-xl border border-neutral-800">
              <Image
                src="/QSC-Emblem-RGB.svg"
                alt="Qatar Sports Club Emblem"
                width={48}
                height={66}
                className="object-contain"
              />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-qsc-yellow">
                {isArabic ? "بوابة الإدارة والحوكمة الخاصة" : "Executive Enterprise Portal"}
              </span>
              <h2 className="text-xl font-black text-white mt-1">
                {isArabic ? "تسجيل الدخول للمسؤولين" : "Institutional Officer Login"}
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                {isArabic
                  ? "أدخل بيانات الاعتماد المؤسسية للوصول للمعاملات والتوقيع الرقمي."
                  : "Enter your official club credentials to access dispatches & ratifications."}
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-neutral-300 mb-1">
                {isArabic ? "البريد المؤسسي (@qatarsc.qa)" : "Official Email Address"}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 rtl:pr-9 rtl:pl-3 py-2.5 bg-[#1E1E1E] border border-neutral-700 rounded-xl focus:outline-none focus:border-qsc-yellow text-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-neutral-300 mb-1">
                {isArabic ? "كلمة المرور المشفرة" : "Encrypted Password"}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 rtl:pr-9 rtl:pl-3 py-2.5 bg-[#1E1E1E] border border-neutral-700 rounded-xl focus:outline-none focus:border-qsc-yellow text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-black focus:ring-0"
                />
                <span>{isArabic ? "تذكر الجلسة" : "Remember session"}</span>
              </label>

              <button
                type="button"
                onClick={() =>
                  alert(
                    isArabic
                      ? "يرجى مراجعة إدارة تكنولوجيا المعلومات والحوكمة الرقمية لإعادة تعيين كلمة المرور."
                      : "Please contact IT Administration to reset your security credentials."
                  )
                }
                className="hover:underline hover:text-qsc-yellow"
              >
                {isArabic ? "نسيت كلمة المرور؟" : "Forgot Password?"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-qsc-yellow text-[#0A0A0A] font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-white transition-all shadow-lg cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t.nav.login}</span>
            </button>
          </form>

          {/* Demonstration Quick Access Roles */}
          <div className="pt-4 border-t border-neutral-800 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 text-center">
              {isArabic ? "الدخول السريع بحسابات تجريبية:" : "Quick Demo Access Accounts:"}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickLoginAs("president@qatarsc.qa", "president")}
                className="p-2 rounded-lg bg-[#1E1E1E] hover:bg-neutral-800 border border-neutral-700 text-left rtl:text-right transition-colors cursor-pointer"
              >
                <p className="font-bold text-white text-[11px]">H.E. President</p>
                <p className="text-[10px] text-qsc-yellow">Sheikh Abdullah</p>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLoginAs("gm@qatarsc.qa", "general_manager")}
                className="p-2 rounded-lg bg-[#1E1E1E] hover:bg-neutral-800 border border-neutral-700 text-left rtl:text-right transition-colors cursor-pointer"
              >
                <p className="font-bold text-white text-[11px]">General Manager</p>
                <p className="text-[10px] text-qsc-yellow">Abdulrahman Al-Malki</p>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLoginAs("hr.director@qatarsc.qa", "hr_manager")}
                className="p-2 rounded-lg bg-[#1E1E1E] hover:bg-neutral-800 border border-neutral-700 text-left rtl:text-right transition-colors cursor-pointer"
              >
                <p className="font-bold text-white text-[11px]">HR Director</p>
                <p className="text-[10px] text-qsc-yellow">Dr. Maryam Al-Kuwari</p>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLoginAs("facilities@qatarsc.qa", "department_manager")}
                className="p-2 rounded-lg bg-[#1E1E1E] hover:bg-neutral-800 border border-neutral-700 text-left rtl:text-right transition-colors cursor-pointer"
              >
                <p className="font-bold text-white text-[11px]">Facilities Director</p>
                <p className="text-[10px] text-qsc-yellow">Eng. Tariq Al-Subaey</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
