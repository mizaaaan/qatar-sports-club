"use client";

import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { INITIAL_USERS } from "@/lib/data";
import {
  ShieldCheck,
  Mail,
  Phone,
  Building2,
  Calendar,
  Award,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function LeadershipProfilePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const { t, isArabic } = useLanguage();

  const officer = INITIAL_USERS.find((u) => u.id === id) || INITIAL_USERS[0];
  const ArrowIcon = isArabic ? ArrowRight : ArrowLeft;

  const mockResponsibilities = isArabic
    ? [
        "الإشراف الاستراتيجي على تنفيذ قرارات وتوصيات مجلس الإدارة والجمعية العمومية.",
        "تمثيل نادي قطر الرياضي في المحافل الرياضية والمؤسسية المحلية والإقليمية والدولية.",
        "متابعة الأداء المالي والخطط التشغيلية السنوية وتحديث المنشآت الرياضية بالنادي.",
        "اعتماد وتوقيع القرارات والمعاملات المؤسسية عبر منظومة الحوكمة الرقمية.",
      ]
    : [
        "Strategic oversight and execution of Board resolutions and General Assembly mandates.",
        "Representing Qatar Sports Club in national, continental, and international sports governance bodies.",
        "Supervision of annual operating envelopes, revenue diversification, and stadium modernisations.",
        "Ratifying institutional decrees, approvals, and procurement workflows via the Digital Portal.",
      ];

  const mockMilestones = [
    {
      year: "2024",
      titleEn: "Election to QSC Executive Leadership (2024–2028 Cycle)",
      titleAr: "التزكية والانتخاب لقيادة نادي قطر الرياضي للدورة الانتخابية ٢٠٢٤-٢٠٢٨",
    },
    {
      year: "2025",
      titleEn: "Launch of Suheim bin Hamad Stadium Hybrid Laser Modernisation",
      titleAr: "إطلاق مشروع تحديث وصيانة أرضيات استاد سحيم بن حمد بتقنية الليزر",
    },
    {
      year: "2026",
      titleEn: "Inauguration of Institutional Digital Administration & Sovereign Portal",
      titleAr: "تدشين منظومة الإدارة الرقمية والحوكمة المؤسسية المعتمدة لنادي قطر",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F4] text-[#171717]">
      <Header />

      {/* Breadcrumb & Hero */}
      <section className="bg-[#0A0A0A] text-white py-12 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Link href="/management" className="hover:text-qsc-yellow">
              {t.managementShowcase}
            </Link>
            <span>/</span>
            <Link href="/management/leadership" className="hover:text-qsc-yellow">
              {t.nav.leadership}
            </Link>
            <span>/</span>
            <span className="text-qsc-yellow font-semibold truncate max-w-xs">
              {isArabic ? officer.nameAr : officer.nameEn}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-black">
              {isArabic ? officer.nameAr : officer.nameEn}
            </h1>
            <Link
              href="/management/leadership"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white border border-neutral-700 px-3 py-1.5 rounded-lg transition-colors"
            >
              <ArrowIcon className="w-3.5 h-3.5" />
              <span>{t.common.back}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Profile Content */}
      <section className="py-12 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Card: Portrait and Contact */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E8E8E3] p-6 shadow-sm space-y-6">
              <div className="relative h-80 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-900">
                <Image
                  src={officer.avatar}
                  alt={officer.nameEn}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3">
                  <span className="px-2.5 py-1 rounded bg-black/80 text-qsc-yellow text-[10px] font-bold tracking-wider uppercase border border-qsc-yellow/40 backdrop-blur-sm">
                    {officer.badgeNumber}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
                  {isArabic ? officer.departmentAr : officer.departmentEn}
                </span>
                <h2 className="text-xl font-black text-[#171717] mt-1">
                  {isArabic ? officer.nameAr : officer.nameEn}
                </h2>
                <p className="text-xs font-semibold text-neutral-600 mt-0.5">
                  {isArabic ? officer.titleAr : officer.titleEn}
                </p>
              </div>

              {/* Verified Contact Details */}
              <div className="pt-4 border-t border-neutral-100 space-y-3 text-xs">
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  {isArabic ? "قنوات الاتصال المؤسسي المعتمدة" : "Authorized Contact"}
                </p>
                <div className="flex items-center gap-2.5 text-neutral-700">
                  <Mail className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                  <span className="font-mono">{officer.email}</span>
                </div>
                <div className="flex items-center gap-2.5 text-neutral-700">
                  <Phone className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                  <span dir="ltr">{officer.phone}</span>
                </div>
                <div className="flex items-center gap-2.5 text-neutral-700">
                  <Building2 className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                  <span>
                    {isArabic
                      ? "المقر الرئيسي، استاد سحيم بن حمد، الدوحة"
                      : "HQ, Suheim bin Hamad Stadium, Doha"}
                  </span>
                </div>
              </div>

              {/* Portal Access Badge */}
              <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E8E8E3] text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-neutral-800">
                  <ShieldCheck className="w-4 h-4 text-qsc-yellow fill-black" />
                  <span>{isArabic ? "صلاحيات الاعتماد والتوقيع" : "Authorized Signatory"}</span>
                </div>
                <p className="text-[11px] text-neutral-500">
                  {isArabic
                    ? "يمتلك الصلاحيات الإدارية المعتمدة للمصادقة وتوقيع المعاملات في البوابة."
                    : "Holds verified signing and approval credentials under Qatar SC statute."}
                </p>
                <Link
                  href="/portal"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-black hover:underline pt-1"
                >
                  <Lock className="w-3.5 h-3.5 text-neutral-700" />
                  <span>{t.enterPortal}</span>
                </Link>
              </div>
            </div>

            {/* Right Card: Biography, Mandate & Timeline */}
            <div className="lg:col-span-8 space-y-8">
              {/* Executive Biography */}
              <div className="bg-white rounded-2xl border border-[#E8E8E3] p-8 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-[#171717] border-b border-neutral-100 pb-3">
                  {isArabic ? "السيرة الذاتية والرؤية القيادية" : "Executive Biography"}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {isArabic
                    ? `يتولى ${officer.nameAr} منصب ${officer.titleAr} بنادي قطر الرياضي للدورة الانتخابية الحالية (٢٠٢٤-٢٠٢٨). يتمتع بخبرة قيادية رائدة في إدارة المنشآت والرياضة القطرية، حاملاً رؤية ترتكز على تعزيز مكانة "الملك" كصرح رياضي ومجتمعي رائد، وتطبيق أحدث المعايير في الحوكمة والتحول الرقمي.`
                    : `${officer.nameEn} serves as the ${officer.titleEn} of Qatar Sports Club for the 2024–2028 mandate. With proven executive leadership across institutional management, sports development, and national institutions, he oversees strategic priorities aimed at cementing Qatar SC's institutional prominence and sporting triumphs.`}
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {isArabic
                    ? "يقود فرق العمل الإدارية لتطوير استاد سحيم بن حمد، استقطاب ورعاية الكفاءات الرياضية والوطنية، وضمان التوافق مع توجيهات وزارة الرياضة والشباب والاتحادات القارية والدولية."
                    : "Directing operational strategies to upgrade stadium infrastructure, champion athletic talent, and ensure adherence to national sports ministry frameworks and AFC compliance benchmarks."}
                </p>
              </div>

              {/* Core Responsibilities */}
              <div className="bg-white rounded-2xl border border-[#E8E8E3] p-8 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-[#171717] border-b border-neutral-100 pb-3">
                  {isArabic ? "المسؤوليات والصلاحيات الإدارية" : "Institutional Responsibilities"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockResponsibilities.map((resp, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E8E8E3]">
                      <CheckCircle2 className="w-4 h-4 text-neutral-800 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-neutral-700 leading-relaxed">{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestones Timeline */}
              <div className="bg-white rounded-2xl border border-[#E8E8E3] p-8 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-[#171717] border-b border-neutral-100 pb-3">
                  {isArabic ? "المحطات والإنجازات القيادية" : "Key Milestones & Mandates"}
                </h3>
                <div className="space-y-4">
                  {mockMilestones.map((m, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <span className="px-3 py-1 rounded bg-[#0A0A0A] text-qsc-yellow text-xs font-bold font-mono">
                        {m.year}
                      </span>
                      <div className="flex-1 text-xs pt-0.5">
                        <p className="font-bold text-neutral-900">
                          {isArabic ? m.titleAr : m.titleEn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
