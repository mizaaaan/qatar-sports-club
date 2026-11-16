"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

export default function ContactPage() {
  const { t, isArabic } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    department: "General Directorate",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F4] text-[#171717]">
      <Header />

      {/* Hero Banner */}
      <section className="bg-[#0A0A0A] text-white py-14 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs text-qsc-yellow font-bold uppercase tracking-wider">
            <Link href="/management" className="hover:underline">
              {t.managementShowcase}
            </Link>
            <span>/</span>
            <span>{t.nav.contact}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            {isArabic ? "المقر الرئيسي وقنوات الاتصال الرسمي" : "Official Headquarters & Inquiries"}
          </h1>
          <p className="text-neutral-300 text-sm max-w-2xl leading-relaxed">
            {isArabic
              ? "مقر نادي قطر الرياضي — استاد سحيم بن حمد، منطقة الدفنة، الدوحة. قنوات المراسلات الرسمية وأمانة سر مجلس الإدارة."
              : "Qatar Sports Club Official Headquarters — Suheim bin Hamad Stadium, Al Dafna, Doha. Official executive secretariat correspondence."}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: HQ Cards & Location */}
            <div className="lg:col-span-5 space-y-6">
              {/* Stadium HQ Card */}
              <div className="bg-white rounded-2xl border border-[#E8E8E3] p-7 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-qsc-yellow" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                    {isArabic ? "مجمع استاد سحيم بن حمد" : "Suheim Bin Hamad Stadium Complex"}
                  </h3>
                </div>

                <div className="space-y-3 text-xs text-neutral-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-neutral-800 flex-shrink-0 mt-0.5" />
                    <span>
                      {isArabic
                        ? "منطقة الدفنة / الخليج الغربي، ص.ب: ١٨٣٣، الدوحة، دولة قطر"
                        : "Al Dafna / West Bay District, P.O. Box 1833, Doha, State of Qatar"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-neutral-800 flex-shrink-0" />
                    <span dir="ltr" className="font-semibold text-neutral-900">
                      +974 4483 1222 / +974 4483 1224
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-neutral-800 flex-shrink-0" />
                    <span className="font-mono text-neutral-900">info@qatarsc.qa</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-neutral-800 flex-shrink-0" />
                    <span>
                      {isArabic
                        ? "الأحد - الخميس: ٠٧:٣٠ صباحاً - ٠٢:٣٠ ظهراً"
                        : "Sunday - Thursday: 07:30 AM - 02:30 PM (AST)"}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-neutral-500">
                    {isArabic ? "موقع النادي الرسمي:" : "Official Portal:"}
                  </span>
                  <a
                    href="https://qatarsc.qa/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-[#0A0A0A] hover:underline flex items-center gap-1"
                  >
                    <span>qatarsc.qa</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Protocol Note */}
              <div className="bg-[#FAF9F5] rounded-2xl border border-[#E8E8E3] p-6 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-neutral-900">
                  <ShieldCheck className="w-4 h-4 text-neutral-800" />
                  <span>{isArabic ? "المراسلات الرسمية والبروتوكول" : "Official Protocol Inquiries"}</span>
                </div>
                <p className="text-neutral-600 leading-relaxed">
                  {isArabic
                    ? "توجه المراسلات الرسمية الموجهة لسعادة رئيس مجلس الإدارة أو المدير العام إلى أمانة السر العامة مصحوبة بالرقم المرجعي والصفة الاعتبارية."
                    : "Formal institutional delegations, media accreditations, and official correspondence should be directed to the Board of Directors Secretariat."}
                </p>
              </div>
            </div>

            {/* Right Column: Inquiries Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E8E8E3] p-5 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#171717] mb-2">
                {isArabic ? "نموذج التواصل والاستفسارات الإدارية" : "Administrative Inquiry & Contact"}
              </h2>
              <p className="text-xs text-neutral-500 mb-6">
                {isArabic
                  ? "يتم توجيه رسالتك مباشرة للإدارة المختصة بنادي قطر الرياضي للرد الرسمي."
                  : "Your dispatch will be logged and routed to the authorized department for response."}
              </p>

              {submitted ? (
                <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-base font-bold text-emerald-900">
                    {isArabic ? "تم استلام رسالتك الرسمية بنجاح" : "Institutional Dispatch Received"}
                  </h3>
                  <p className="text-xs text-emerald-700 max-w-md mx-auto">
                    {isArabic
                      ? "تم تسجيل استفسارك برقم مرجعي رسمي في أمانة السر الإدارية وسيقوم فريق العمل بالتواصل معك."
                      : "Your inquiry has been assigned an internal reference token and forwarded to the General Directorate."}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 rounded-lg bg-[#0A0A0A] text-qsc-yellow text-xs font-bold uppercase tracking-wider"
                  >
                    {isArabic ? "إرسال استفسار آخر" : "Submit Another Inquiry"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-neutral-700 mb-1">
                        {isArabic ? "الاسم الكامل / الصفة" : "Full Name / Organization"} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-black"
                        placeholder="Hassan Al-Kuwari"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-700 mb-1">
                        {isArabic ? "البريد الإلكتروني" : "Official Email Address"} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-black"
                        placeholder="official@domain.qa"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-neutral-700 mb-1">
                        {isArabic ? "الإدارة المعنية" : "Target Department"}
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-black bg-white"
                      >
                        <option value="General Directorate">General Directorate (الإدارة العامة)</option>
                        <option value="Executive Board">Executive Board Secretariat (أمانة سر المجلس)</option>
                        <option value="Facilities">Facilities & Suheim Stadium (المنشآت والاستاد)</option>
                        <option value="Media & Marketing">Media & Marketing (الإعلام والتسويق)</option>
                        <option value="Human Resources">Human Resources (الموارد البشرية)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-700 mb-1">
                        {isArabic ? "موضوع الاستفسار" : "Subject"} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-black"
                        placeholder={isArabic ? "استفسار إداري / شراكة" : "Institutional Inquiry"}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">
                      {isArabic ? "نص الرسالة" : "Detailed Message"} *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-black"
                      placeholder={isArabic ? "أدخل تفاصيل الاستفسار..." : "Enter details..."}
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-[#0A0A0A] hover:bg-neutral-800 text-qsc-yellow font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isArabic ? "إرسال الاستفسار الرسمي" : "Send Official Inquiry"}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
