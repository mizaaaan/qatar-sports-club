"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePortalData } from "@/context/PortalDataContext";
import { ACADEMY_SPORTS } from "@/lib/academyData";
import {
  AcademySportId,
  AcademyAgeGroup,
  AcademyRegistration,
} from "@/lib/types";
import { AcademyQrCode } from "@/components/common/AcademyQrCode";
import {
  Trophy,
  Waves,
  Flame,
  Activity,
  Shield,
  CheckCircle2,
  X,
  ArrowRight,
  ArrowLeft,
  Upload,
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  FileText,
  Printer,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

interface AcademyRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedSportId?: AcademySportId;
  preselectedProgramId?: string;
}

export function AcademyRegistrationModal({
  isOpen,
  onClose,
  preselectedSportId = "football",
  preselectedProgramId,
}: AcademyRegistrationModalProps) {
  const { t, isArabic } = useLanguage();
  const { registerAcademyApplicant } = usePortalData();
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const [step, setStep] = useState<number>(1);
  const [selectedSport, setSelectedSport] = useState<AcademySportId>(preselectedSportId);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AcademyAgeGroup>("u10");
  const [selectedProgramId, setSelectedProgramId] = useState<string>(preselectedProgramId || "");

  // Form State
  const [playerInfo, setPlayerInfo] = useState({
    fullNameEn: "",
    fullNameAr: "",
    dateOfBirth: "",
    gender: "male" as "male" | "female",
    nationalityEn: "Qatari",
    nationalityAr: "قطري",
    qidOrPassport: "",
    schoolNameEn: "",
    schoolNameAr: "",
    previousExperienceEn: "",
    previousExperienceAr: "",
    jerseySize: "M" as "XS" | "S" | "M" | "L" | "XL",
  });

  const [guardianInfo, setGuardianInfo] = useState({
    guardianNameEn: "",
    guardianNameAr: "",
    relationship: "father" as "father" | "mother" | "legal_guardian" | "other",
    qidOrPassport: "",
    phone: "",
    whatsapp: "",
    email: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyRelationship: "Mother",
  });

  const [medicalInfo, setMedicalInfo] = useState({
    hasMedicalConditions: false,
    conditionsDescription: "",
    hasAllergies: false,
    allergiesDescription: "",
    takingRegularMedication: false,
    medicationDetails: "",
    previousInjuriesOrSurgeries: "",
    physicalLimitations: "",
    bloodType: "O+",
    consentToEmergencyMedicalCare: true,
  });

  const [documents, setDocuments] = useState({
    playerPhotoName: "",
    qidOrPassportFrontName: "",
    qidOrPassportBackName: "",
    birthCertificateName: "",
    medicalFitnessCertName: "",
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<AcademyRegistration | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const currentSport = ACADEMY_SPORTS.find((s) => s.id === selectedSport) || ACADEMY_SPORTS[0];
  const activeProgram =
    currentSport.programs.find((p) => p.id === selectedProgramId) ||
    currentSport.programs.find((p) => p.ageGroup === selectedAgeGroup) ||
    currentSport.programs[0];

  const handleNextStep = () => {
    setErrorMessage("");

    if (step === 1) {
      if (!activeProgram) {
        setErrorMessage(isArabic ? "يرجى تحديد البرنامج الرياضي" : "Please select a training program");
        return;
      }
    } else if (step === 2) {
      if (!playerInfo.fullNameEn || !playerInfo.dateOfBirth || !playerInfo.qidOrPassport) {
        setErrorMessage(
          isArabic
            ? "يرجى ملء الاسم الكامل، تاريخ الميلاد، ورقم البطاقة الشخصية"
            : "Please provide the player's full name, date of birth, and QID/Passport"
        );
        return;
      }
    } else if (step === 3) {
      if (!guardianInfo.guardianNameEn || !guardianInfo.phone || !guardianInfo.email) {
        setErrorMessage(
          isArabic
            ? "يرجى توفير اسم ولي الأمر، رقم الهاتف، والبريد الإلكتروني"
            : "Please fill guardian name, telephone, and email address"
        );
        return;
      }
    } else if (step === 4) {
      if (!medicalInfo.consentToEmergencyMedicalCare) {
        setErrorMessage(
          isArabic
            ? "يجب الموافقة على تفويض الرعاية الطبية الطارئة للمتابعة"
            : "Emergency medical authorization consent is required"
        );
        return;
      }
    }

    setStep((prev) => Math.min(prev + 1, 6));
  };

  const handlePrevStep = () => {
    setErrorMessage("");
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFinalSubmit = async () => {
    if (!termsAccepted) {
      setErrorMessage(
        isArabic
          ? "يرجى الموافقة على لوائح وشروط أكاديمية نادي قطر الرياضي"
          : "Please agree to the official Qatar Sports Club Academy terms and code of conduct"
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const record = await registerAcademyApplicant({
        sportId: selectedSport,
        programId: activeProgram.id,
        ageGroup: activeProgram.ageGroup,
        player: playerInfo,
        guardian: guardianInfo,
        medical: medicalInfo,
        documents: documents,
        totalFeeQar: activeProgram.seasonFeeQar,
        paymentStatus: "unpaid",
      });

      setSubmittedRecord(record);
      setStep(7); // Receipt view
    } catch {
      setErrorMessage(
        isArabic ? "حدث خطأ أثناء حفظ الطلب. يرجى المحاولة ثانية." : "Error submitting application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMockUpload = (field: keyof typeof documents, mockFileName: string) => {
    setDocuments((prev) => ({
      ...prev,
      [field]: mockFileName,
    }));
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#111111] border border-neutral-800 rounded-2xl shadow-2xl text-white overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Modal Top Strip */}
        <div className="bg-[#161616] border-b border-neutral-800 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-qsc-yellow/10 border border-qsc-yellow/30 flex items-center justify-center text-qsc-yellow">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white font-sans">
                {t.academy.wizardTitle}
              </h2>
              <p className="text-xs text-neutral-400">
                {step <= 6 ? t.academy.wizardSubtitle : t.academy.applicationReceived}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar (Hidden on step 7) */}
        {step <= 6 && (
          <div className="bg-[#141414] border-b border-neutral-800/80 px-4 sm:px-8 py-3 flex-shrink-0">
            <div className="grid grid-cols-6 gap-2 items-center">
              {[1, 2, 3, 4, 5, 6].map((s) => (
                <div key={s} className="flex flex-col gap-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      s < step
                        ? "bg-qsc-yellow"
                        : s === step
                        ? "bg-qsc-yellow shadow-[0_0_8px_rgba(253,253,0,0.5)]"
                        : "bg-neutral-800"
                    }`}
                  />
                  <span
                    className={`text-[10px] truncate hidden md:block ${
                      s === step ? "text-qsc-yellow font-bold" : "text-neutral-500"
                    }`}
                  >
                    {s === 1 && t.academy.step1Title}
                    {s === 2 && t.academy.step2Title}
                    {s === 3 && t.academy.step3Title}
                    {s === 4 && t.academy.step4Title}
                    {s === 5 && t.academy.step5Title}
                    {s === 6 && t.academy.step6Title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs sm:text-sm flex items-center gap-3">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* ================= STEP 1: SPORT & PROGRAM ================= */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-3">
                  1. {t.academy.allSports}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {ACADEMY_SPORTS.map((sport) => {
                    const isSelected = selectedSport === sport.id;
                    return (
                      <button
                        key={sport.id}
                        type="button"
                        onClick={() => {
                          setSelectedSport(sport.id);
                          setSelectedProgramId(sport.programs[0]?.id || "");
                        }}
                        className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                          isSelected
                            ? "bg-qsc-yellow/15 border-qsc-yellow text-white shadow-lg"
                            : "bg-[#181818] border-neutral-800 text-neutral-300 hover:border-neutral-600"
                        }`}
                      >
                        {sport.id === "football" && <Trophy className="w-5 h-5 text-amber-400" />}
                        {sport.id === "swimming" && <Waves className="w-5 h-5 text-cyan-400" />}
                        {sport.id === "basketball" && <Flame className="w-5 h-5 text-orange-400" />}
                        {sport.id === "table_tennis" && <Activity className="w-5 h-5 text-emerald-400" />}
                        {sport.id === "martial_arts" && <Shield className="w-5 h-5 text-rose-400" />}
                        <span className="text-xs font-bold leading-tight">
                          {isArabic ? sport.nameAr : sport.nameEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Programs under current sport */}
              <div>
                <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-3">
                  2. {t.academy.ageGroups} & {t.academy.trainingSchedule}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentSport.programs.map((prog) => {
                    const isSelected = activeProgram?.id === prog.id;
                    return (
                      <div
                        key={prog.id}
                        onClick={() => {
                          setSelectedProgramId(prog.id);
                          setSelectedAgeGroup(prog.ageGroup);
                        }}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? "bg-qsc-yellow/10 border-qsc-yellow shadow-md"
                            : "bg-[#181818] border-neutral-800 hover:border-neutral-700"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-qsc-yellow/20 text-qsc-yellow">
                            {prog.ageRange}
                          </span>
                          <span className="text-xs text-neutral-400">
                            {prog.capacity - prog.enrolledCount} {t.academy.spotsAvailable}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mb-2">
                          {isArabic ? prog.titleAr : prog.titleEn}
                        </h4>
                        <div className="space-y-1.5 text-xs text-neutral-300 mb-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{isArabic ? prog.scheduleAr : prog.scheduleEn}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{isArabic ? prog.timingAr : prog.timingEn}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                            <span className="truncate">{isArabic ? prog.locationAr : prog.locationEn}</span>
                          </div>
                        </div>

                        <div className="pt-2.5 border-t border-neutral-800 flex items-center justify-between text-xs font-bold">
                          <span className="text-neutral-400">{t.academy.seasonFee}</span>
                          <span className="text-qsc-yellow text-sm font-black">
                            {prog.seasonFeeQar} QAR
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 2: PLAYER PROFILE ================= */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    {t.academy.fullNameEn} *
                  </label>
                  <input
                    type="text"
                    required
                    value={playerInfo.fullNameEn}
                    onChange={(e) => setPlayerInfo({ ...playerInfo, fullNameEn: e.target.value })}
                    placeholder="e.g. Nasser Saud Al-Kuwari"
                    className="w-full bg-[#181818] border border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-qsc-yellow"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    {t.academy.fullNameAr}
                  </label>
                  <input
                    type="text"
                    value={playerInfo.fullNameAr}
                    onChange={(e) => setPlayerInfo({ ...playerInfo, fullNameAr: e.target.value })}
                    placeholder="مثال: ناصر سعود الكواري"
                    dir="rtl"
                    className="w-full bg-[#181818] border border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-qsc-yellow"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    {t.academy.dateOfBirth} *
                  </label>
                  <input
                    type="date"
                    required
                    value={playerInfo.dateOfBirth}
                    onChange={(e) => setPlayerInfo({ ...playerInfo, dateOfBirth: e.target.value })}
                    className="w-full bg-[#181818] border border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-qsc-yellow"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    {t.academy.gender} *
                  </label>
                  <select
                    value={playerInfo.gender}
                    onChange={(e) =>
                      setPlayerInfo({ ...playerInfo, gender: e.target.value as "male" | "female" })
                    }
                    className="w-full bg-[#181818] border border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-qsc-yellow"
                  >
                    <option value="male">{t.academy.male}</option>
                    <option value="female">{t.academy.female}</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    {t.academy.nationality} *
                  </label>
                  <input
                    type="text"
                    required
                    value={playerInfo.nationalityEn}
                    onChange={(e) => setPlayerInfo({ ...playerInfo, nationalityEn: e.target.value })}
                    className="w-full bg-[#181818] border border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-qsc-yellow"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    {t.academy.qidOrPassport} *
                  </label>
                  <input
                    type="text"
                    required
                    value={playerInfo.qidOrPassport}
                    onChange={(e) => setPlayerInfo({ ...playerInfo, qidOrPassport: e.target.value })}
                    placeholder="11-digit QID e.g. 31663400192"
                    className="w-full bg-[#181818] border border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-qsc-yellow font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    {t.academy.jerseySize} *
                  </label>
                  <select
                    value={playerInfo.jerseySize}
                    onChange={(e) =>
                      setPlayerInfo({ ...playerInfo, jerseySize: e.target.value as "XS" | "S" | "M" | "L" | "XL" })
                    }
                    className="w-full bg-[#181818] border border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-qsc-yellow"
                  >
                    <option value="XS">XS (Age 4-6)</option>
                    <option value="S">S (Age 7-9)</option>
                    <option value="M">M (Age 10-13)</option>
                    <option value="L">L (Age 14-16)</option>
                    <option value="XL">XL (Age 17-18)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">
                  {t.academy.schoolName}
                </label>
                <input
                  type="text"
                  value={playerInfo.schoolNameEn}
                  onChange={(e) => setPlayerInfo({ ...playerInfo, schoolNameEn: e.target.value })}
                  placeholder="e.g. Qatar Academy Doha / Doha College"
                  className="w-full bg-[#181818] border border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-qsc-yellow"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">
                  {t.academy.previousExperience}
                </label>
                <textarea
                  rows={2}
                  value={playerInfo.previousExperienceEn}
                  onChange={(e) => setPlayerInfo({ ...playerInfo, previousExperienceEn: e.target.value })}
                  placeholder="Detail previous clubs, school tournament awards, or preferred positions..."
                  className="w-full bg-[#181818] border border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-qsc-yellow"
                />
              </div>
            </div>
          )}

          {/* ================= STEP 3: GUARDIAN DETAILS ================= */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    {t.academy.guardianNameEn} *
                  </label>
                  <input
                    type="text"
                    required
                    value={guardianInfo.guardianNameEn}
                    onChange={(e) => setGuardianInfo({ ...guardianInfo, guardianNameEn: e.target.value })}
                    placeholder="e.g. Saud Nasser Al-Kuwari"
                    className="w-full bg-[#181818] border border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-qsc-yellow"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    {t.academy.relationship} *
                  </label>
                  <select
                    value={guardianInfo.relationship}
                    onChange={(e) =>
                      setGuardianInfo({
                        ...guardianInfo,
                        relationship: e.target.value as "father" | "mother" | "legal_guardian" | "other",
                      })
                    }
                    className="w-full bg-[#181818] border border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-qsc-yellow"
                  >
                    <option value="father">{t.academy.father}</option>
                    <option value="mother">{t.academy.mother}</option>
                    <option value="legal_guardian">{t.academy.legalGuardian}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    {t.academy.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={guardianInfo.phone}
                    onChange={(e) => setGuardianInfo({ ...guardianInfo, phone: e.target.value })}
                    placeholder="+974 5512 8844"
                    className="w-full bg-[#181818] border border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-qsc-yellow font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    {t.academy.whatsapp} *
                  </label>
                  <input
                    type="tel"
                    value={guardianInfo.whatsapp}
                    onChange={(e) => setGuardianInfo({ ...guardianInfo, whatsapp: e.target.value })}
                    placeholder="+974 5512 8844"
                    className="w-full bg-[#181818] border border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-qsc-yellow font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    {t.academy.email} *
                  </label>
                  <input
                    type="email"
                    required
                    value={guardianInfo.email}
                    onChange={(e) => setGuardianInfo({ ...guardianInfo, email: e.target.value })}
                    placeholder="guardian@example.qa"
                    className="w-full bg-[#181818] border border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-qsc-yellow"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#161616] border border-neutral-800 space-y-3">
                <h4 className="text-xs font-bold text-qsc-yellow uppercase tracking-wider">
                  {t.academy.emergencyContactName} & Contacts
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">
                      {t.academy.emergencyContactName}
                    </label>
                    <input
                      type="text"
                      value={guardianInfo.emergencyContactName}
                      onChange={(e) =>
                        setGuardianInfo({ ...guardianInfo, emergencyContactName: e.target.value })
                      }
                      placeholder="e.g. Aisha Al-Kuwari"
                      className="w-full bg-[#1a1a1a] border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">
                      {t.academy.emergencyContactPhone}
                    </label>
                    <input
                      type="tel"
                      value={guardianInfo.emergencyContactPhone}
                      onChange={(e) =>
                        setGuardianInfo({ ...guardianInfo, emergencyContactPhone: e.target.value })
                      }
                      placeholder="+974 5599 3322"
                      className="w-full bg-[#1a1a1a] border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">
                      {t.academy.emergencyRelationship}
                    </label>
                    <input
                      type="text"
                      value={guardianInfo.emergencyRelationship}
                      onChange={(e) =>
                        setGuardianInfo({ ...guardianInfo, emergencyRelationship: e.target.value })
                      }
                      placeholder="e.g. Mother / Uncle"
                      className="w-full bg-[#1a1a1a] border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 4: MEDICAL DECLARATION ================= */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-[#161616] border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {t.academy.hasConditions}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      Asthma, congenital cardiac notes, diabetes, etc.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={medicalInfo.hasMedicalConditions}
                    onChange={(e) =>
                      setMedicalInfo({ ...medicalInfo, hasMedicalConditions: e.target.checked })
                    }
                    className="w-5 h-5 accent-qsc-yellow cursor-pointer"
                  />
                </div>
                {medicalInfo.hasMedicalConditions && (
                  <input
                    type="text"
                    value={medicalInfo.conditionsDescription}
                    onChange={(e) =>
                      setMedicalInfo({ ...medicalInfo, conditionsDescription: e.target.value })
                    }
                    placeholder="Describe condition and physician precautions..."
                    className="w-full bg-[#1a1a1a] border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                )}

                <div className="border-t border-neutral-800 pt-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {t.academy.hasAllergies}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      Peanut, bee venom, penicillin, pollen, etc.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={medicalInfo.hasAllergies}
                    onChange={(e) =>
                      setMedicalInfo({ ...medicalInfo, hasAllergies: e.target.checked })
                    }
                    className="w-5 h-5 accent-qsc-yellow cursor-pointer"
                  />
                </div>
                {medicalInfo.hasAllergies && (
                  <input
                    type="text"
                    value={medicalInfo.allergiesDescription}
                    onChange={(e) =>
                      setMedicalInfo({ ...medicalInfo, allergiesDescription: e.target.value })
                    }
                    placeholder="List specific allergies and treatment guidelines..."
                    className="w-full bg-[#1a1a1a] border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    {t.academy.prevInjuries}
                  </label>
                  <textarea
                    rows={2}
                    value={medicalInfo.previousInjuriesOrSurgeries}
                    onChange={(e) =>
                      setMedicalInfo({ ...medicalInfo, previousInjuriesOrSurgeries: e.target.value })
                    }
                    placeholder="Fractures, ligament tears, surgeries within the last 24 months..."
                    className="w-full bg-[#181818] border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    {t.academy.bloodType}
                  </label>
                  <select
                    value={medicalInfo.bloodType}
                    onChange={(e) => setMedicalInfo({ ...medicalInfo, bloodType: e.target.value })}
                    className="w-full bg-[#181818] border border-neutral-700 rounded-lg px-3 py-2.5 text-xs text-white"
                  >
                    <option value="O+">O Positive (O+)</option>
                    <option value="O-">O Negative (O-)</option>
                    <option value="A+">A Positive (A+)</option>
                    <option value="A-">A Negative (A-)</option>
                    <option value="B+">B Positive (B+)</option>
                    <option value="B-">B Negative (B-)</option>
                    <option value="AB+">AB Positive (AB+)</option>
                    <option value="AB-">AB Negative (AB-)</option>
                  </select>
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                <input
                  type="checkbox"
                  required
                  checked={medicalInfo.consentToEmergencyMedicalCare}
                  onChange={(e) =>
                    setMedicalInfo({
                      ...medicalInfo,
                      consentToEmergencyMedicalCare: e.target.checked,
                    })
                  }
                  className="w-5 h-5 accent-qsc-yellow mt-0.5 cursor-pointer"
                />
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  {t.academy.medicalConsent}
                </p>
              </div>
            </div>
          )}

          {/* ================= STEP 5: DOCUMENT UPLOAD ================= */}
          {step === 5 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Photo */}
                <div className="p-4 rounded-xl bg-[#161616] border border-neutral-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block mb-1">
                      {t.academy.photoLabel} *
                    </span>
                    <span className="text-[11px] text-neutral-400 block mb-3">
                      {t.academy.photoSub}
                    </span>
                  </div>
                  {documents.playerPhotoName ? (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-between text-xs text-emerald-300">
                      <span className="truncate">{documents.playerPhotoName}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleMockUpload("playerPhotoName", "passport_photo_child.jpg")}
                      className="w-full py-3 px-4 border border-dashed border-neutral-700 hover:border-qsc-yellow rounded-lg text-xs text-neutral-300 flex items-center justify-center gap-2 hover:bg-white/5 transition-all cursor-pointer"
                    >
                      <Upload className="w-4 h-4 text-qsc-yellow" />
                      <span>{t.academy.clickToUpload}</span>
                    </button>
                  )}
                </div>

                {/* QID Front */}
                <div className="p-4 rounded-xl bg-[#161616] border border-neutral-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block mb-1">
                      {t.academy.qidFrontLabel} *
                    </span>
                    <span className="text-[11px] text-neutral-400 block mb-3">
                      Official Qatar ID or valid Passport identity page
                    </span>
                  </div>
                  {documents.qidOrPassportFrontName ? (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-between text-xs text-emerald-300">
                      <span className="truncate">{documents.qidOrPassportFrontName}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        handleMockUpload("qidOrPassportFrontName", "player_qid_front.pdf")
                      }
                      className="w-full py-3 px-4 border border-dashed border-neutral-700 hover:border-qsc-yellow rounded-lg text-xs text-neutral-300 flex items-center justify-center gap-2 hover:bg-white/5 transition-all cursor-pointer"
                    >
                      <Upload className="w-4 h-4 text-qsc-yellow" />
                      <span>{t.academy.clickToUpload}</span>
                    </button>
                  )}
                </div>

                {/* QID Back */}
                <div className="p-4 rounded-xl bg-[#161616] border border-neutral-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block mb-1">
                      {t.academy.qidBackLabel}
                    </span>
                    <span className="text-[11px] text-neutral-400 block mb-3">
                      Qatar ID back page with blood group & expiry
                    </span>
                  </div>
                  {documents.qidOrPassportBackName ? (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-between text-xs text-emerald-300">
                      <span className="truncate">{documents.qidOrPassportBackName}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        handleMockUpload("qidOrPassportBackName", "player_qid_back.pdf")
                      }
                      className="w-full py-3 px-4 border border-dashed border-neutral-700 hover:border-qsc-yellow rounded-lg text-xs text-neutral-300 flex items-center justify-center gap-2 hover:bg-white/5 transition-all cursor-pointer"
                    >
                      <Upload className="w-4 h-4 text-qsc-yellow" />
                      <span>{t.academy.clickToUpload}</span>
                    </button>
                  )}
                </div>

                {/* Medical Cert */}
                <div className="p-4 rounded-xl bg-[#161616] border border-neutral-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block mb-1">
                      {t.academy.medicalCertLabel}
                    </span>
                    <span className="text-[11px] text-neutral-400 block mb-3">
                      {t.academy.optionalDoc}
                    </span>
                  </div>
                  {documents.medicalFitnessCertName ? (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-between text-xs text-emerald-300">
                      <span className="truncate">{documents.medicalFitnessCertName}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        handleMockUpload("medicalFitnessCertName", "sports_medical_clearance.pdf")
                      }
                      className="w-full py-3 px-4 border border-dashed border-neutral-700 hover:border-qsc-yellow rounded-lg text-xs text-neutral-300 flex items-center justify-center gap-2 hover:bg-white/5 transition-all cursor-pointer"
                    >
                      <Upload className="w-4 h-4 text-qsc-yellow" />
                      <span>{t.academy.clickToUpload}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 6: REVIEW & SUBMIT ================= */}
          {step === 6 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Summary Card */}
              <div className="rounded-xl bg-[#161616] border border-neutral-800 p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div>
                    <span className="text-[10px] text-qsc-yellow font-bold uppercase tracking-wider block">
                      Selected Sport Program
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {isArabic ? activeProgram.titleAr : activeProgram.titleEn} (
                      {isArabic ? currentSport.nameAr : currentSport.nameEn})
                    </h3>
                  </div>
                  <div className="text-right rtl:text-left">
                    <span className="text-xs text-neutral-400 block">{t.academy.seasonFee}</span>
                    <span className="text-base font-black text-qsc-yellow">
                      {activeProgram.seasonFeeQar} QAR
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-neutral-500 block">Player:</span>
                    <span className="font-bold text-white">{playerInfo.fullNameEn || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">QID / Passport:</span>
                    <span className="font-mono text-neutral-300">
                      {playerInfo.qidOrPassport || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Guardian:</span>
                    <span className="font-bold text-white">
                      {guardianInfo.guardianNameEn || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Contact Phone:</span>
                    <span className="font-mono text-neutral-300">{guardianInfo.phone || "N/A"}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-2 border-t border-neutral-800/80">
                  <div>
                    <span className="text-neutral-500 block">Schedule:</span>
                    <span className="text-neutral-300">
                      {isArabic ? activeProgram.scheduleAr : activeProgram.scheduleEn}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Timings:</span>
                    <span className="text-neutral-300">
                      {isArabic ? activeProgram.timingAr : activeProgram.timingEn}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Head Coach:</span>
                    <span className="text-neutral-300">
                      {isArabic ? activeProgram.leadCoachAr : activeProgram.leadCoachEn}
                    </span>
                  </div>
                </div>
              </div>

              {/* Terms and conditions */}
              <div className="p-4 rounded-xl bg-[#161616] border border-neutral-800 space-y-3">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms-checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-5 h-5 accent-qsc-yellow mt-0.5 cursor-pointer"
                  />
                  <label htmlFor="terms-checkbox" className="text-xs text-neutral-300 leading-relaxed cursor-pointer">
                    {isArabic
                      ? "أقر بصفتي ولي أمر اللاعب بصحة كافة البيانات المقدمة، وأوافق على الالتزام باللوائح الداخلية، ومواعيد التمارين، ومدونة السلوك الرياضي المعتمدة بنادي قطر الرياضي."
                      : "As the legal guardian, I certify that all supplied player information is accurate and agree to adhere to Qatar Sports Club Academy statutes, training discipline, and player code of conduct."}
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 7: PRINTABLE RECEIPT ================= */}
          {step === 7 && submittedRecord && (
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              <div
                id="printable-academy-receipt"
                className="bg-white text-black p-6 sm:p-8 rounded-2xl shadow-xl border border-neutral-300 print:border-none print:shadow-none print:p-0"
              >
                {/* Header Strip */}
                <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-14 relative flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/QSC-Emblem-RGB.svg"
                        alt="Qatar Sports Club Emblem"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-black tracking-tight uppercase">
                        Qatar Sports Club — Youth Academy
                      </h2>
                      <p className="text-xs text-neutral-600 font-semibold">
                        نادي قطر الرياضي — أكاديمية الفئات السنية الرسمية
                      </p>
                      <p className="text-[10px] text-neutral-500">
                        Suheim bin Hamad Stadium, Al Dafna, Doha, State of Qatar
                      </p>
                    </div>
                  </div>

                  <div className="text-right rtl:text-left">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase block">
                      Application ID
                    </span>
                    <span className="text-sm sm:text-base font-black font-mono tracking-wider text-black block">
                      {submittedRecord.id}
                    </span>
                    <span className="text-[10px] text-neutral-500 block mt-0.5">
                      {submittedRecord.submittedAt}
                    </span>
                  </div>
                </div>

                {/* Status Notice */}
                <div className="mb-6 p-3 rounded-lg bg-amber-50 border border-amber-300 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-amber-900 block">
                      Application Status: PENDING REGISTRAR REVIEW
                    </span>
                    <span className="text-amber-800 text-[11px]">
                      Your application has been registered into the central QSC registry.
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-amber-500 text-black font-black text-xs uppercase tracking-wider">
                    Pending
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 text-xs mb-6 pb-6 border-b border-neutral-300">
                  <div>
                    <span className="text-neutral-500 block uppercase font-bold text-[10px]">
                      Player Profile
                    </span>
                    <span className="text-sm font-bold block">{submittedRecord.player.fullNameEn}</span>
                    <span className="text-neutral-600 block">
                      DOB: {submittedRecord.player.dateOfBirth} ({submittedRecord.player.gender})
                    </span>
                    <span className="text-neutral-600 block">
                      QID/Passport: {submittedRecord.player.qidOrPassport}
                    </span>
                    <span className="text-neutral-600 block">
                      Kit Size: {submittedRecord.player.jerseySize}
                    </span>
                  </div>

                  <div>
                    <span className="text-neutral-500 block uppercase font-bold text-[10px]">
                      Enrolled Program
                    </span>
                    <span className="text-sm font-bold block">
                      {currentSport.nameEn} ({submittedRecord.ageGroup.toUpperCase()})
                    </span>
                    <span className="text-neutral-600 block">
                      Venue: {currentSport.venueEn}
                    </span>
                    <span className="text-neutral-600 block">
                      Season Fee: {submittedRecord.totalFeeQar} QAR (Payment at Counter or Verified Online)
                    </span>
                  </div>

                  <div>
                    <span className="text-neutral-500 block uppercase font-bold text-[10px]">
                      Guardian Contact
                    </span>
                    <span className="font-bold block">{submittedRecord.guardian.guardianNameEn}</span>
                    <span className="text-neutral-600 block">Phone: {submittedRecord.guardian.phone}</span>
                    <span className="text-neutral-600 block">Email: {submittedRecord.guardian.email}</span>
                  </div>

                  <div>
                    <span className="text-neutral-500 block uppercase font-bold text-[10px]">
                      Emergency Medical Care Authorization
                    </span>
                    <span className="font-bold text-emerald-800 block">
                      ✓ Guardian Authorized & Ratified
                    </span>
                    <span className="text-neutral-600 block">
                      Blood Group: {submittedRecord.medical.bloodType || "On Record"}
                    </span>
                  </div>
                </div>

                {/* Footer with QR Code */}
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-1 max-w-sm">
                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold">
                      Digital Authentication
                    </p>
                    <p className="text-[11px] text-neutral-700 leading-snug">
                      This official digital receipt confirms application submission. Show this QR reference at the Qatar Sports Club Academy Registrar desk at Suheim bin Hamad Stadium.
                    </p>
                    <p className="text-[9px] font-mono text-neutral-400">
                      REF: {submittedRecord.verificationHash}
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <AcademyQrCode applicationId={submittedRecord.id} size={90} />
                    <span className="text-[9px] font-mono font-bold text-neutral-600 mt-1">
                      {submittedRecord.id}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2 print:hidden">
                <button
                  type="button"
                  onClick={handlePrintReceipt}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>{t.academy.printReceipt}</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-qsc-yellow text-black font-extrabold text-xs uppercase tracking-wider hover:bg-white transition-all cursor-pointer"
                >
                  {t.common.close}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls (Hidden on step 7) */}
        {step <= 6 && (
          <div className="bg-[#161616] border-t border-neutral-800 px-6 py-4 flex items-center justify-between flex-shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-neutral-300 transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowIcon className="w-4 h-4 rotate-180" />
                <span>{t.common.back}</span>
              </button>
            ) : (
              <div />
            )}

            {step < 6 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-lg bg-qsc-yellow text-black font-extrabold text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <span>{t.common.next}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting || !termsAccepted}
                onClick={handleFinalSubmit}
                className="px-8 py-2.5 rounded-lg bg-qsc-yellow text-black font-black text-xs uppercase tracking-wider hover:bg-white disabled:opacity-50 transition-all flex items-center gap-2 shadow-xl cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isSubmitting ? t.common.loading : t.academy.applyForProgram}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
