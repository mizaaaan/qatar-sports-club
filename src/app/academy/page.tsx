"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ACADEMY_SPORTS } from "@/lib/academyData";
import { AcademySportId } from "@/lib/types";
import { AcademyRegistrationModal } from "@/components/common/AcademyRegistrationModal";
import {
  Trophy,
  Waves,
  Flame,
  Activity,
  Shield,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Users,
  Award,
  ShieldCheck,
  ChevronRight,
  Zap,
} from "lucide-react";

export default function PublicAcademyPage() {
  const { t, isArabic } = useLanguage();
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const [activeSportTab, setActiveSportTab] = useState<AcademySportId>("football");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState<string>("");

  const activeSport = ACADEMY_SPORTS.find((s) => s.id === activeSportTab) || ACADEMY_SPORTS[0];

  const handleOpenRegistration = (sportId: AcademySportId, programId?: string) => {
    setActiveSportTab(sportId);
    setSelectedProgramId(programId || "");
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-neutral-800">
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-qsc-yellow/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

        <div className="relative max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left rtl:lg:text-right">
              {/* Sovereign Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-qsc-yellow/40 text-qsc-yellow text-xs font-bold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-qsc-yellow animate-pulse" />
                <span>{t.academy.heroBadge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                {isArabic ? (
                  <>
                    أكاديمية نادي قطر للفئات السنية...{" "}
                    <span className="text-qsc-yellow block mt-2">
                      صناعة أبطال المستقبل
                    </span>
                  </>
                ) : (
                  <>
                    Qatar Sports Club Academy.{" "}
                    <span className="text-qsc-yellow block mt-2">
                      Shaping Tomorrow&apos;s Champions.
                    </span>
                  </>
                )}
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed font-normal mx-auto lg:mx-0">
                {t.academy.heroSubtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => handleOpenRegistration("football")}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-qsc-yellow text-[#0A0A0A] font-extrabold px-8 py-4 rounded-xl text-sm uppercase tracking-wider shadow-2xl hover:bg-white transition-all transform hover:-translate-y-0.5 group cursor-pointer"
                >
                  <Trophy className="w-4 h-4 text-[#0A0A0A]" />
                  <span>{t.academy.registerNow}</span>
                  <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </button>

                <a
                  href="#sports-programs"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#1A1A1A] text-white hover:bg-[#262626] border border-neutral-700 hover:border-neutral-500 font-bold px-8 py-4 rounded-xl text-sm transition-all"
                >
                  <Users className="w-4 h-4 text-qsc-yellow" />
                  <span>{t.academy.explorePrograms}</span>
                </a>
              </div>

              {/* Institutional Key Indicators */}
              <div className="pt-8 grid grid-cols-3 gap-2 sm:gap-4 border-t border-neutral-800 max-w-lg mx-auto lg:mx-0">
                <div>
                  <p className="text-lg sm:text-2xl lg:text-3xl font-black text-qsc-yellow">5</p>
                  <p className="text-[10px] sm:text-xs text-neutral-400 font-medium leading-tight mt-0.5">
                    {isArabic ? "أكاديميات رياضية معتمدة" : "Official Sports Academies"}
                  </p>
                </div>
                <div>
                  <p className="text-lg sm:text-2xl lg:text-3xl font-black text-white">AFC / QFA</p>
                  <p className="text-[10px] sm:text-xs text-neutral-400 font-medium leading-tight mt-0.5">
                    {isArabic ? "شهادات تدريب أولمبية" : "Certified Master Coaches"}
                  </p>
                </div>
                <div>
                  <p className="text-lg sm:text-2xl lg:text-3xl font-black text-qsc-yellow">U-7 → U-18</p>
                  <p className="text-[10px] sm:text-xs text-neutral-400 font-medium leading-tight mt-0.5">
                    {isArabic ? "مسار النخبة المكتمل" : "Complete Youth Pathway"}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Academy Crest Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-gradient-to-b from-[#161616] to-[#0E0E0E] p-5 sm:p-8 rounded-3xl border border-neutral-800 shadow-2xl space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-qsc-yellow animate-ping" />
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Season 2026/27 Enrollment
                    </span>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-qsc-yellow/10 border border-qsc-yellow/30 text-qsc-yellow">
                    Open Registration
                  </span>
                </div>

                {/* Academy Emblem Display */}
                <div className="py-6 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-24 h-28 relative flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/QSC-Emblem-RGB.svg"
                      alt="Qatar Sports Club Official Crest"
                      className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(253,253,0,0.15)]"
                    />
                  </div>
                  <h3 className="text-lg font-black tracking-tight text-white">
                    {isArabic ? "نادي قطر الرياضي — الفئات السنية" : "Qatar Sports Club — Youth Academy"}
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-xs">
                    {isArabic
                      ? "استاد سحيم بن حمد • الدفنة، الدوحة"
                      : "Suheim bin Hamad Stadium • Al Dafna, Doha"}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="space-y-2.5 pt-2 border-t border-neutral-800 text-xs">
                  <div className="flex items-center gap-2.5 text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-qsc-yellow flex-shrink-0" />
                    <span>Direct pathway into QSC First Team rosters</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-qsc-yellow flex-shrink-0" />
                    <span>Aspitar-compliant sports health & injury protocols</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-qsc-yellow flex-shrink-0" />
                    <span>Official club training kits & periodic evaluation reports</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenRegistration("football")}
                  className="w-full py-3.5 rounded-xl bg-qsc-yellow hover:bg-white text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t.academy.registerNow}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Pillars */}
      <section className="py-16 bg-[#0E0E0E] border-b border-neutral-800/80">
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold text-qsc-yellow tracking-widest uppercase">
              Institutional Framework
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {isArabic ? "الركائز الأساسية للتكوين الرياضي" : "The Kings Academy Pillars"}
            </h2>
            <p className="text-sm text-neutral-400">
              Cultivating the champions of tomorrow on a foundation of discipline, technical perfection, and Qatari sporting pride.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#141414] border border-neutral-800 hover:border-qsc-yellow/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-qsc-yellow/10 border border-qsc-yellow/30 flex items-center justify-center text-qsc-yellow">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {isArabic ? "التطوير الفني والتكتيكي" : "Elite Technical Curriculum"}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Age-specific training methodologies aligned with international sporting federations and Qatar Stars League developmental guidelines.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141414] border border-neutral-800 hover:border-qsc-yellow/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {isArabic ? "الصحة والسلامة الرياضية" : "Health, Safety & Care"}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Strict injury-prevention protocols, cardiac safety guidelines, and emergency medical authorization integrated directly into registration.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141414] border border-neutral-800 hover:border-qsc-yellow/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {isArabic ? "بناء الشخصية القيادية" : "Values & Leadership"}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Instilling mutual respect, teamwork, sportsmanship, and mental fortitude that shape athletes on and off the field.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Programs Directory Section */}
      <section id="sports-programs" className="py-20 max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-qsc-yellow tracking-widest uppercase">
            {t.academy.programsTitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            {isArabic ? "برامج الأكاديميات الرياضية المعتمدة" : "Select Your Sport Discipline"}
          </h2>
          <p className="text-sm text-neutral-400">
            {t.academy.programsSubtitle}
          </p>
        </div>

        {/* Sports Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          {ACADEMY_SPORTS.map((sport) => {
            const isActive = activeSportTab === sport.id;
            return (
              <button
                key={sport.id}
                type="button"
                onClick={() => setActiveSportTab(sport.id)}
                className={`px-4 sm:px-6 py-3 rounded-xl border text-xs sm:text-sm font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  isActive
                    ? "bg-qsc-yellow text-black border-qsc-yellow shadow-[0_0_20px_rgba(253,253,0,0.25)] font-extrabold"
                    : "bg-[#141414] text-neutral-300 border-neutral-800 hover:border-neutral-600 hover:text-white"
                }`}
              >
                {sport.id === "football" && <Trophy className="w-4 h-4" />}
                {sport.id === "swimming" && <Waves className="w-4 h-4" />}
                {sport.id === "basketball" && <Flame className="w-4 h-4" />}
                {sport.id === "table_tennis" && <Activity className="w-4 h-4" />}
                {sport.id === "martial_arts" && <Shield className="w-4 h-4" />}
                <span>{isArabic ? sport.nameAr : sport.nameEn}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Sport Overview Banner */}
        <div className="p-5 sm:p-8 rounded-2xl bg-gradient-to-r from-[#141414] via-[#161616] to-[#121212] border border-neutral-800 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-qsc-yellow block mb-1">
                {isArabic ? activeSport.taglineAr : activeSport.taglineEn}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {isArabic ? activeSport.nameAr : activeSport.nameEn}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => handleOpenRegistration(activeSport.id)}
              className="px-6 py-3 rounded-xl bg-qsc-yellow hover:bg-white text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg self-start md:self-auto cursor-pointer"
            >
              <span>{t.academy.applyForProgram}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-neutral-300 leading-relaxed max-w-4xl">
            {isArabic ? activeSport.descriptionAr : activeSport.descriptionEn}
          </p>

          <div className="pt-3 border-t border-neutral-800 flex items-center gap-2 text-xs text-neutral-400">
            <MapPin className="w-4 h-4 text-qsc-yellow flex-shrink-0" />
            <span>
              <strong>{t.academy.venue}:</strong> {isArabic ? activeSport.venueAr : activeSport.venueEn}
            </span>
          </div>
        </div>

        {/* Programs Grid for this Sport */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeSport.programs.map((prog) => (
            <div
              key={prog.id}
              className="rounded-2xl bg-[#141414] border border-neutral-800 hover:border-qsc-yellow/50 transition-all p-6 flex flex-col justify-between space-y-5 group shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-qsc-yellow/10 border border-qsc-yellow/30 text-qsc-yellow text-xs font-black">
                    {prog.ageRange}
                  </span>
                  <span className="text-xs text-neutral-400">
                    {prog.capacity - prog.enrolledCount} {t.academy.spotsAvailable}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white group-hover:text-qsc-yellow transition-colors">
                  {isArabic ? prog.titleAr : prog.titleEn}
                </h4>

                <div className="space-y-2 text-xs text-neutral-300 pt-2 border-t border-neutral-800/80">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-qsc-yellow flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-neutral-500 block">{t.academy.trainingSchedule}:</span>
                      <span className="font-medium text-white">
                        {isArabic ? prog.scheduleAr : prog.scheduleEn}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-qsc-yellow flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-neutral-500 block">Timings:</span>
                      <span className="font-medium text-white">
                        {isArabic ? prog.timingAr : prog.timingEn}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-qsc-yellow flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-neutral-500 block">{t.academy.leadCoach}:</span>
                      <span className="font-medium text-white">
                        {isArabic ? prog.leadCoachAr : prog.leadCoachEn}
                      </span>
                      <span className="text-[11px] text-neutral-400 block">
                        ({isArabic ? prog.coachLicenseAr : prog.coachLicenseEn})
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Fee & Action */}
              <div className="pt-4 border-t border-neutral-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-neutral-500 block">{t.academy.seasonFee}:</span>
                    <span className="text-lg font-black text-qsc-yellow">
                      {prog.seasonFeeQar} QAR
                    </span>
                  </div>
                  <div className="text-right rtl:text-left">
                    <span className="text-neutral-500 block">{t.academy.monthlyFee}:</span>
                    <span className="text-sm font-bold text-white">
                      {prog.monthlyFeeQar} QAR
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenRegistration(activeSport.id, prog.id)}
                  className="w-full py-2.5 rounded-xl bg-[#222222] hover:bg-qsc-yellow hover:text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border border-neutral-700 hover:border-qsc-yellow"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.academy.applyForProgram}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities & Venue Preview */}
      <section className="py-16 bg-[#0E0E0E] border-t border-neutral-800">
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-qsc-yellow tracking-widest uppercase">
                Suheim bin Hamad Complex
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                World-Class Training Infrastructure
              </h2>
            </div>
            <Link
              href="/management/contact"
              className="text-xs text-qsc-yellow hover:underline flex items-center gap-1 font-bold"
            >
              <span>{t.nav.contact}</span>
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#141414] border border-neutral-800 space-y-2">
              <span className="text-xs font-bold text-qsc-yellow uppercase">Natural Turf Pitches</span>
              <p className="text-xs text-neutral-400">
                Championship natural grass training grounds with floodlight towers for youth evening sessions.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#141414] border border-neutral-800 space-y-2">
              <span className="text-xs font-bold text-cyan-400 uppercase">Olympic Aquatic Complex</span>
              <p className="text-xs text-neutral-400">
                50m racing lanes and 25m heated learner pools equipped with digital timing touchpads.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#141414] border border-neutral-800 space-y-2">
              <span className="text-xs font-bold text-orange-400 uppercase">Multi-Sport Hardwood Dome</span>
              <p className="text-xs text-neutral-400">
                FIBA-standard shock-absorbing parquet courts for youth basketball and indoor handball clinics.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#141414] border border-neutral-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase">Aspitar Recovery Support</span>
              <p className="text-xs text-neutral-400">
                On-site medical consultation rooms and immediate athletic triage for all registered academy youth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <AcademyRegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedSportId={activeSportTab}
        preselectedProgramId={selectedProgramId}
      />

      <Footer />
    </div>
  );
}
