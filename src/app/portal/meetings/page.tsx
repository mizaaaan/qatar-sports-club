"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import { MeetingItem } from "@/lib/types";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Plus,
  CheckCircle2,
  FileText,
  Calendar,
  X,
  ChevronRight,
} from "lucide-react";

export default function MeetingsPage() {
  const { t, isArabic } = useLanguage();
  const { user, allUsers } = useAuth();
  const { meetings, createMeeting } = usePortalData();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingItem | null>(null);

  const [newMeeting, setNewMeeting] = useState({
    titleEn: "",
    titleAr: "",
    date: "2026-12-02",
    time: "10:00 - 11:30",
    duration: "1.5 Hours",
    locationEn: "Executive Boardroom, Suheim bin Hamad Stadium",
    locationAr: "القاعة الرئاسية، استاد سحيم بن حمد",
    type: "executive" as MeetingItem["type"],
    status: "upcoming" as const,
    chairpersonEn: user?.nameEn || "Sheikh Abdullah Al Thani",
    chairpersonAr: user?.nameAr || "الشيخ عبد الله آل ثاني",
    agendaEnStr: "1. Review of Q4 Operations\n2. Pitch Maintenance Schedule\n3. Budget Ratification",
    agendaArStr: "١. مراجعة العمليات التشغيلية\n٢. خطة صيانة أرضية الاستاد\n٣. اعتماد الموازنات",
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createMeeting({
      titleEn: newMeeting.titleEn || "Executive Committee Session",
      titleAr: newMeeting.titleAr || "اجتماع اللجنة التنفيذية",
      date: newMeeting.date,
      time: newMeeting.time,
      duration: newMeeting.duration,
      locationEn: newMeeting.locationEn,
      locationAr: newMeeting.locationAr,
      type: newMeeting.type,
      status: "upcoming",
      chairpersonEn: newMeeting.chairpersonEn,
      chairpersonAr: newMeeting.chairpersonAr,
      attendees: allUsers.slice(0, 4).map((u) => ({
        id: u.id,
        nameEn: u.nameEn,
        nameAr: u.nameAr,
        titleEn: u.titleEn,
        titleAr: u.titleAr,
        avatar: u.avatar,
        status: "accepted",
      })),
      agendaEn: newMeeting.agendaEnStr.split("\n").filter(Boolean),
      agendaAr: newMeeting.agendaArStr.split("\n").filter(Boolean),
    });

    setCreateModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider font-semibold">
            <Link href="/portal" className="hover:text-black">
              {t.nav.dashboard}
            </Link>
            <span>/</span>
            <span className="text-black">{t.nav.meetings}</span>
          </div>
          <h1 className="text-2xl font-black text-[#171717] mt-1">
            {isArabic ? "إدارة الاجتماعات والمحاضر الرسمية" : "Executive Meetings & Board Sessions"}
          </h1>
          <p className="text-xs text-neutral-500">
            {isArabic
              ? "جدولة جلسات مجلس الإدارة، توثيق المحاضر والقرارات، ومتابعة بنود الأعمال."
              : "Convene board sessions, record minutes, ratify decisions, and track action items."}
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#0A0A0A] text-qsc-yellow font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-md self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{isArabic ? "جدولة اجتماع جديد" : "Schedule Meeting"}</span>
        </button>
      </div>

      {/* Meetings List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meetings.map((mtg) => (
          <div
            key={mtg.id}
            className="bg-white rounded-2xl border border-[#E8E8E3] p-6 shadow-sm hover:border-black transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold px-2.5 py-1 rounded bg-[#FAF9F5] border border-[#E8E8E3] text-neutral-800 uppercase tracking-wider text-[10px]">
                  {mtg.type.toUpperCase()} SESSION
                </span>
                <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full text-[11px]">
                  {mtg.status.toUpperCase()}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#171717] leading-snug">
                {isArabic ? mtg.titleAr : mtg.titleEn}
              </h3>

              <div className="space-y-1.5 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-neutral-400" />
                  <span>
                    {mtg.date} • <strong dir="ltr">{mtg.time}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-neutral-400" />
                  <span className="truncate">{isArabic ? mtg.locationAr : mtg.locationEn}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-neutral-400" />
                  <span>
                    {isArabic ? "رئيس الجلسة: " : "Chair: "}
                    <strong>{isArabic ? mtg.chairpersonAr : mtg.chairpersonEn}</strong>
                  </span>
                </div>
              </div>

              {/* Agenda items preview */}
              <div className="pt-2 border-t border-neutral-100">
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  {isArabic ? "جدول الأعمال المقترح" : "Session Agenda"}
                </p>
                <ul className="space-y-1 text-xs text-neutral-700">
                  {(isArabic ? mtg.agendaAr : mtg.agendaEn).slice(0, 3).map((item, idx) => (
                    <li key={idx} className="truncate">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
              <div className="flex -space-x-2 rtl:space-x-reverse overflow-hidden">
                {mtg.attendees.slice(0, 4).map((att) => (
                  <Image
                    key={att.id}
                    src={att.avatar}
                    alt=""
                    width={28}
                    height={28}
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setSelectedMeeting(mtg)}
                className="px-3.5 py-1.5 rounded-lg bg-[#FAF9F5] hover:bg-[#0A0A0A] text-neutral-800 hover:text-qsc-yellow font-bold text-xs uppercase tracking-wider transition-colors border border-[#E8E8E3]"
              >
                {isArabic ? "تفاصيل المحضر" : "View Details"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Meeting Detail Modal */}
      {selectedMeeting && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-xl w-full p-8 text-neutral-800 space-y-6 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-neutral-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black text-qsc-yellow">
                  {selectedMeeting.type.toUpperCase()}
                </span>
                <h3 className="text-lg font-black text-neutral-900 mt-2">
                  {isArabic ? selectedMeeting.titleAr : selectedMeeting.titleEn}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMeeting(null)}
                className="p-1 text-neutral-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-[#FAF9F5] border border-neutral-200">
                <span className="text-neutral-500 font-bold block">Date & Time</span>
                <span className="font-semibold text-neutral-900 mt-0.5 block">
                  {selectedMeeting.date} ({selectedMeeting.time})
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#FAF9F5] border border-neutral-200">
                <span className="text-neutral-500 font-bold block">Location</span>
                <span className="font-semibold text-neutral-900 mt-0.5 block truncate">
                  {isArabic ? selectedMeeting.locationAr : selectedMeeting.locationEn}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <p className="font-bold text-neutral-800 uppercase tracking-wider">
                {isArabic ? "بنود جدول الأعمال الكاملة" : "Complete Agenda Items"}
              </p>
              <div className="p-3 rounded-xl bg-[#FAF9F5] border border-neutral-200 space-y-1.5 text-neutral-700">
                {(isArabic ? selectedMeeting.agendaAr : selectedMeeting.agendaEn).map((item, idx) => (
                  <p key={idx}>{item}</p>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-neutral-100 text-xs">
              <button
                onClick={() => setSelectedMeeting(null)}
                className="px-4 py-2 rounded-lg font-semibold text-neutral-600 hover:bg-neutral-100"
              >
                {t.common.cancel}
              </button>
              <button
                onClick={() => {
                  alert(
                    isArabic
                      ? "تم تنزيل جدول الأعمال والمحضر الرسمي بصيغة PDF."
                      : "Agenda and meeting dispatch downloaded."
                  );
                  setSelectedMeeting(null);
                }}
                className="px-5 py-2 rounded-lg bg-[#0A0A0A] text-qsc-yellow font-bold uppercase tracking-wider"
              >
                {isArabic ? "تحميل المحضر الرسمي" : "Download Minutes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Meeting Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-lg w-full p-6 text-neutral-800 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="text-base font-bold text-neutral-900">
                {isArabic ? "جدولة اجتماع إداري رسمي" : "Convene Official Meeting"}
              </h3>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-neutral-700 block mb-1">
                  Meeting Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={newMeeting.titleEn}
                  onChange={(e) => setNewMeeting({ ...newMeeting, titleEn: e.target.value })}
                  placeholder="e.g. QSC Executive Committee Extraordinary Session"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">
                  عنوان الاجتماع (بالعربية) *
                </label>
                <input
                  type="text"
                  required
                  value={newMeeting.titleAr}
                  onChange={(e) => setNewMeeting({ ...newMeeting, titleAr: e.target.value })}
                  placeholder="مثال: اجتماع اللجنة التنفيذية الاستثنائي"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Date</label>
                  <input
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Time Range</label>
                  <input
                    type="text"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">
                  Agenda Items (One per line)
                </label>
                <textarea
                  rows={3}
                  value={newMeeting.agendaEnStr}
                  onChange={(e) => setNewMeeting({ ...newMeeting, agendaEnStr: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-lg font-semibold text-neutral-600 hover:bg-neutral-100"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#0A0A0A] text-qsc-yellow font-bold uppercase tracking-wider"
                >
                  {isArabic ? "تأكيد الجدولة" : "Schedule Session"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
