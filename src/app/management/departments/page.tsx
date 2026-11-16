"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import {
  Building2,
  Trophy,
  Landmark,
  Users2,
  FileCheck2,
  Layers,
  Radio,
  Scale,
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

export default function DepartmentsPage() {
  const { t, isArabic } = useLanguage();
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const departmentsList = [
    {
      id: "football",
      icon: Trophy,
      titleEn: "Football Sector Management",
      titleAr: "إدارة قطاع كرة القدم",
      headEn: "Faisal Rashid Al-Kowari (General Supervisor)",
      headAr: "فيصل راشد الكواري (المشرف العام)",
      email: "football@qatarsc.qa",
      phone: "+974 4483 1250",
      descEn:
        "Responsible for First Team QSL operations, international player recruitment, medical performance monitoring, and the Youth Football Academy.",
      descAr:
        "الإشراف على الفريق الأول بدوري نجوم قطر، صفقات اللاعبين الدوليين والمحليين، والوحدات الطبية وأكاديمية الفئات السنية لكرة القدم.",
    },
    {
      id: "facilities",
      icon: Layers,
      titleEn: "Facilities & Stadium Operations",
      titleAr: "إدارة المنشآت واستاد سحيم بن حمد",
      headEn: "Eng. Tariq Mansoor Al-Subaey (Director)",
      headAr: "م. طارق منصور السبيعي (مدير المنشآت)",
      email: "facilities@qatarsc.qa",
      phone: "+974 4483 1240",
      descEn:
        "Manages Suheim bin Hamad Stadium, hybrid laser pitch maintenance, arena floodlights, hospitality suites, and matchday facility logistics.",
      descAr:
        "إدارة وتشغيل استاد سحيم بن حمد، صيانة العشب الهجين بتقنيات الليزر، الصالات المغلقة، ومرافق الضيافة ومطابقة معايير الاتحاد الآسيوي.",
    },
    {
      id: "finance",
      icon: Landmark,
      titleEn: "Financial Management & Investment",
      titleAr: "الإدارة المالية والاستثمار",
      headEn: "Hassan Ibrahim Al-Sulaiti (Director)",
      headAr: "حسن إبراهيم السليطي (المدير المالي)",
      email: "finance@qatarsc.qa",
      phone: "+974 4483 1228",
      descEn:
        "Directs annual institutional budgets, commercial asset monetization, cash flow compliance, and statutory external audit disclosures.",
      descAr:
        "إعداد الموازنات السنوية المعتمدة، تنمية الإيرادات الاستثمارية، التدقيق المحاسبي والامتثال لمعايير التقارير المالية الدولية.",
    },
    {
      id: "hr",
      icon: Users2,
      titleEn: "Human Capital & Talent Development",
      titleAr: "الموارد البشرية والكفاءات",
      headEn: "Dr. Maryam Sultan Al-Kuwari (Director)",
      headAr: "د. مريم سلطان الكواري (مديرة الموارد البشرية)",
      email: "hr.director@qatarsc.qa",
      phone: "+974 4483 1230",
      descEn:
        "Oversees administrative workforce planning, institutional executive training in sports governance, performance reviews, and Qatarization.",
      descAr:
        "تخطيط القوى العاملة، تدريب الكوادر في الحوكمة الرياضية، تقييم الأداء المؤسسي، وبرامج استقطاب وتطوير الكفاءات الوطنية.",
    },
    {
      id: "admin",
      icon: FileCheck2,
      titleEn: "Administrative Affairs & Public Relations",
      titleAr: "الشؤون الإدارية والعلاقات العامة",
      headEn: "Fahad Nasser Al-Hajri (Chief Officer)",
      headAr: "فهد ناصر الهاجري (مسؤول الشؤون الإدارية)",
      email: "admin.affairs@qatarsc.qa",
      phone: "+974 4483 1235",
      descEn:
        "Coordinates administrative circulars, official government correspondence, VIP protocol, and internal club secretariat services.",
      descAr:
        "إصدار القرارات والتعاميم الإدارية، المراسلات الحكومية الرسمية، بروتوكولات كبار الشخصيات، وأمانة السر المركزية.",
    },
    {
      id: "media",
      icon: Radio,
      titleEn: "Media, Marketing & Communications",
      titleAr: "الإعلام والتسويق والاتصال المؤسسي",
      headEn: "Nasser Al-Hitmi (Communications Head)",
      headAr: "ناصر الهتمي (رئيس الاتصال المؤسسي)",
      email: "media@qatarsc.qa",
      phone: "+974 4483 1260",
      descEn:
        "Handles official broadcasting rights, global social platforms, press conferences, sponsorship activations, and 'The Kings' brand assets.",
      descAr:
        "إدارة المنصات الرقمية، البث الإعلامي، المؤتمرات الصحفية، رعاية وتفعيل العلامة التجارية لنادي قطر 'الملك'.",
    },
    {
      id: "legal",
      icon: Scale,
      titleEn: "Legal Governance & Compliance",
      titleAr: "الشؤون القانونية والحوكمة والامتثال",
      headEn: "Legal Secretariat Office",
      headAr: "مكتب المستشار القانوني للنادي",
      email: "legal@qatarsc.qa",
      phone: "+974 4483 1227",
      descEn:
        "Ensures full statutory compliance with Qatar Olympic Committee regulations, QFA statutes, FIFA transfer protocols, and contractual reviews.",
      descAr:
        "مراجعة العقود والاتفاقيات، صياغة اللوائح الداخلية، والامتثال للأنظمة الصادرة عن اللجنة الأولمبية والاتحادين القطري والدولي.",
    },
    {
      id: "multisports",
      icon: Trophy,
      titleEn: "Multi-Sports & Olympic Disciplines",
      titleAr: "قطاع الألعاب والرياضات المختلفة",
      headEn: "Sports Sector Operations Board",
      headAr: "جهاز الألعاب الجماعية والفردية",
      email: "sports.sector@qatarsc.qa",
      phone: "+974 4483 1255",
      descEn:
        "Supervises competitive teams in Volleyball, Basketball, Table Tennis, Athletics, Swimming, and Martial Arts.",
      descAr:
        "الإشراف على فرق كرة الطائرة، السلة، كرة الطاولة (بطل العرب التاريخي)، ألعاب القوى، والسباحة والرياضات الفردية.",
    },
  ];

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
            <span>{t.nav.departments}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            {isArabic ? "إدارات وأقسام نادي قطر الرياضي" : "Institutional Department Directory"}
          </h1>
          <p className="text-neutral-300 text-sm max-w-2xl leading-relaxed">
            {isArabic
              ? "دليل القطاعات والإدارات التنفيذية والرقابية العاملة بنادي قطر الرياضي، مع توضيح الاختصاصات وقنوات التواصل الرسمية."
              : "Comprehensive overview of the specialized departments, operating sectors, and governance offices powering Qatar Sports Club."}
          </p>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-14 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {departmentsList.map((dept) => {
              const Icon = dept.icon;
              return (
                <div
                  key={dept.id}
                  className="bg-white rounded-2xl border border-[#E8E8E3] p-5 sm:p-7 shadow-sm hover:border-black transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] text-qsc-yellow flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-[#FAF9F5] border border-[#E8E8E3] text-neutral-600">
                        QSC-DIV
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-[#171717]">
                        {isArabic ? dept.titleAr : dept.titleEn}
                      </h3>
                      <p className="text-xs font-semibold text-neutral-500 mt-0.5">
                        {isArabic ? dept.headAr : dept.headEn}
                      </p>
                    </div>

                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {isArabic ? dept.descAr : dept.descEn}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-neutral-100 mt-5 flex flex-wrap items-center justify-between text-xs text-neutral-600 gap-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="font-mono">{dept.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-neutral-400" />
                      <span dir="ltr">{dept.phone}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
