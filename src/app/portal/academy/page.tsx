"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import { ACADEMY_SPORTS } from "@/lib/academyData";
import {
  AcademyRegistration,
  AcademyRegistrationStatus,
  AcademySportId,
} from "@/lib/types";
import { AcademyQrCode } from "@/components/common/AcademyQrCode";
import {
  Trophy,
  Waves,
  Flame,
  Activity,
  Shield,
  Search,
  Filter,
  Download,
  Printer,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  UserCheck,
  CreditCard,
  X,
  FileText,
  Calendar,
  Phone,
  Mail,
  ShieldCheck,
  ChevronDown,
  Sparkles,
} from "lucide-react";

export default function ExecutiveAcademyManagementPage() {
  const { t, isArabic } = useLanguage();
  const { user } = useAuth();
  const {
    academyRegistrations,
    updateAcademyApplicationStatus,
    updateAcademyMedicalClearance,
    updateAcademyPaymentStatus,
    assignAcademyCoachAndGroup,
    addAcademyInternalNote,
  } = usePortalData();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [sportFilter, setSportFilter] = useState<string>("all");
  const [ageGroupFilter, setAgeGroupFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Selected Registration Drawer State
  const [selectedApp, setSelectedApp] = useState<AcademyRegistration | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Administrative Action Dialog State
  const [actionType, setActionType] = useState<
    "approve" | "reject" | "waitlist" | "coach" | "payment" | "medical" | "note" | null
  >(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [internalNoteText, setInternalNoteText] = useState("");
  const [assignCoachName, setAssignCoachName] = useState("");
  const [assignGroupName, setAssignGroupName] = useState("");
  const [actionSuccessMsg, setActionSuccessMsg] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // KPI Calculations
  const stats = useMemo(() => {
    const total = academyRegistrations.length;
    const pending = academyRegistrations.filter((a) => a.status === "pending").length;
    const underReview = academyRegistrations.filter((a) => a.status === "under_review").length;
    const approved = academyRegistrations.filter((a) => a.status === "approved").length;
    const medicalPending = academyRegistrations.filter((a) => a.status === "medical_pending").length;
    const paymentPending = academyRegistrations.filter((a) => a.status === "payment_pending").length;
    const paymentVerified = academyRegistrations.filter((a) => a.paymentStatus === "verified").length;
    const waitlisted = academyRegistrations.filter((a) => a.status === "waitlisted").length;

    return {
      total,
      pending,
      underReview,
      approved,
      medicalPending,
      paymentPending,
      paymentVerified,
      waitlisted,
    };
  }, [academyRegistrations]);

  // Filtered List
  const filteredRegistrations = useMemo(() => {
    return academyRegistrations.filter((item) => {
      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.id.toLowerCase().includes(q) ||
        item.player.fullNameEn.toLowerCase().includes(q) ||
        item.player.fullNameAr.toLowerCase().includes(q) ||
        item.player.qidOrPassport.toLowerCase().includes(q) ||
        item.guardian.guardianNameEn.toLowerCase().includes(q) ||
        item.guardian.phone.toLowerCase().includes(q);

      // Sport Filter
      const matchesSport = sportFilter === "all" || item.sportId === sportFilter;

      // Age Group Filter
      const matchesAge = ageGroupFilter === "all" || item.ageGroup === ageGroupFilter;

      // Status Filter
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesSport && matchesAge && matchesStatus;
    });
  }, [academyRegistrations, searchQuery, sportFilter, ageGroupFilter, statusFilter]);

  // Pagination Slice
  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage) || 1;
  const paginatedRegistrations = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRegistrations.slice(start, start + itemsPerPage);
  }, [filteredRegistrations, currentPage]);

  const handleOpenDrawer = (app: AcademyRegistration) => {
    setSelectedApp(app);
    setDrawerOpen(true);
    setActionType(null);
    setActionSuccessMsg("");
  };

  // CSV Export
  const handleExportCsv = () => {
    const headers = [
      "Application ID",
      "Player Name",
      "Gender",
      "DOB",
      "QID",
      "Sport",
      "Age Group",
      "Guardian Name",
      "Phone",
      "Email",
      "Status",
      "Payment Status",
      "Total QAR",
      "Assigned Coach",
      "Submitted At",
    ];

    const rows = filteredRegistrations.map((r) => [
      r.id,
      `"${r.player.fullNameEn}"`,
      r.player.gender,
      r.player.dateOfBirth,
      r.player.qidOrPassport,
      r.sportId,
      r.ageGroup.toUpperCase(),
      `"${r.guardian.guardianNameEn}"`,
      r.guardian.phone,
      r.guardian.email,
      r.status,
      r.paymentStatus,
      r.totalFeeQar,
      `"${r.assignedCoach || "Unassigned"}"`,
      r.submittedAt,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `QSC_Academy_Roster_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintTable = () => {
    window.print();
  };

  const handleExecuteAction = () => {
    if (!selectedApp) return;

    if (actionType === "approve") {
      updateAcademyApplicationStatus(selectedApp.id, "approved", "Approved by Executive Registrar");
      setActionSuccessMsg(t.academy.actionSuccess);
      setActionType(null);
    } else if (actionType === "reject") {
      if (!rejectionReason.trim()) return;
      updateAcademyApplicationStatus(selectedApp.id, "rejected", "Rejected with formal reason", rejectionReason);
      setActionSuccessMsg(t.academy.actionSuccess);
      setActionType(null);
      setRejectionReason("");
    } else if (actionType === "waitlist") {
      updateAcademyApplicationStatus(selectedApp.id, "waitlisted", "Placed on waitlist due to squad capacity");
      setActionSuccessMsg(t.academy.actionSuccess);
      setActionType(null);
    } else if (actionType === "medical") {
      updateAcademyMedicalClearance(selectedApp.id, true, "Cleared by Club Sports Physician");
      setActionSuccessMsg(t.academy.actionSuccess);
      setActionType(null);
    } else if (actionType === "payment") {
      updateAcademyPaymentStatus(selectedApp.id, "verified", selectedApp.totalFeeQar, "card", `VERIFIED-${Date.now()}`);
      setActionSuccessMsg(t.academy.actionSuccess);
      setActionType(null);
    } else if (actionType === "coach") {
      if (!assignCoachName.trim()) return;
      assignAcademyCoachAndGroup(selectedApp.id, assignCoachName, assignGroupName || "Squad A");
      setActionSuccessMsg(t.academy.actionSuccess);
      setActionType(null);
    } else if (actionType === "note") {
      if (!internalNoteText.trim()) return;
      addAcademyInternalNote(selectedApp.id, internalNoteText);
      setActionSuccessMsg(t.academy.actionSuccess);
      setActionType(null);
      setInternalNoteText("");
    }

    // Refresh selected record
    const updated = academyRegistrations.find((a) => a.id === selectedApp.id);
    if (updated) setSelectedApp(updated);
  };

  // Status Badge Component Helper
  const renderStatusBadge = (status: AcademyRegistrationStatus) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Approved</span>
          </span>
        );
      case "under_review":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Clock className="w-3.5 h-3.5" />
            <span>Under Review</span>
          </span>
        );
      case "medical_pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Medical Pending</span>
          </span>
        );
      case "payment_pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Payment Pending</span>
          </span>
        );
      case "waitlisted":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5" />
            <span>Waitlisted</span>
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <XCircle className="w-3.5 h-3.5" />
            <span>Rejected</span>
          </span>
        );
      case "pending":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-qsc-yellow border border-amber-500/30">
            <Clock className="w-3.5 h-3.5" />
            <span>Pending</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-qsc-yellow animate-ping" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-qsc-yellow">
              Institutional Operations & Registrars
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {t.academy.mgmtTitle}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            {t.academy.mgmtSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExportCsv}
            className="px-4 py-2 rounded-xl bg-[#1A1A1A] hover:bg-[#262626] border border-neutral-700 text-xs font-bold text-white transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Download className="w-4 h-4 text-qsc-yellow" />
            <span>{t.academy.exportCsv}</span>
          </button>
          <button
            type="button"
            onClick={handlePrintTable}
            className="px-4 py-2 rounded-xl bg-[#1A1A1A] hover:bg-[#262626] border border-neutral-700 text-xs font-bold text-white transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4 text-neutral-300" />
            <span>{t.academy.printRoster}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="p-4 rounded-xl bg-[#141414] border border-neutral-800">
          <span className="text-[10px] text-neutral-400 uppercase font-bold block truncate">
            {t.academy.kpiTotal}
          </span>
          <span className="text-xl sm:text-2xl font-black text-white">{stats.total}</span>
        </div>
        <div className="p-4 rounded-xl bg-[#141414] border border-amber-500/30 bg-amber-500/5">
          <span className="text-[10px] text-amber-400 uppercase font-bold block truncate">
            {t.academy.kpiPending}
          </span>
          <span className="text-xl sm:text-2xl font-black text-qsc-yellow">{stats.pending}</span>
        </div>
        <div className="p-4 rounded-xl bg-[#141414] border border-blue-500/30">
          <span className="text-[10px] text-blue-400 uppercase font-bold block truncate">
            {t.academy.kpiUnderReview}
          </span>
          <span className="text-xl sm:text-2xl font-black text-blue-400">{stats.underReview}</span>
        </div>
        <div className="p-4 rounded-xl bg-[#141414] border border-emerald-500/30">
          <span className="text-[10px] text-emerald-400 uppercase font-bold block truncate">
            {t.academy.kpiApproved}
          </span>
          <span className="text-xl sm:text-2xl font-black text-emerald-400">{stats.approved}</span>
        </div>
        <div className="p-4 rounded-xl bg-[#141414] border border-purple-500/30">
          <span className="text-[10px] text-purple-400 uppercase font-bold block truncate">
            {t.academy.kpiMedicalPending}
          </span>
          <span className="text-xl sm:text-2xl font-black text-purple-400">{stats.medicalPending}</span>
        </div>
        <div className="p-4 rounded-xl bg-[#141414] border border-cyan-500/30">
          <span className="text-[10px] text-cyan-400 uppercase font-bold block truncate">
            {t.academy.kpiPaymentPending}
          </span>
          <span className="text-xl sm:text-2xl font-black text-cyan-400">{stats.paymentPending}</span>
        </div>
        <div className="p-4 rounded-xl bg-[#141414] border border-emerald-500/20">
          <span className="text-[10px] text-emerald-400 uppercase font-bold block truncate">
            {t.academy.kpiPaymentVerified}
          </span>
          <span className="text-xl sm:text-2xl font-black text-white">{stats.paymentVerified}</span>
        </div>
        <div className="p-4 rounded-xl bg-[#141414] border border-neutral-800">
          <span className="text-[10px] text-amber-500 uppercase font-bold block truncate">
            {t.academy.kpiWaitlisted}
          </span>
          <span className="text-xl sm:text-2xl font-black text-neutral-300">{stats.waitlisted}</span>
        </div>
      </div>

      {/* Toolbar & Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#141414] border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={t.academy.searchPlaceholder}
            className="w-full bg-[#1e1e1e] border border-neutral-700 rounded-xl pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-qsc-yellow"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-xs">
          {/* Sport Filter */}
          <select
            value={sportFilter}
            onChange={(e) => {
              setSportFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[#1e1e1e] border border-neutral-700 rounded-xl px-3 py-2.5 text-neutral-300 focus:outline-none focus:border-qsc-yellow"
          >
            <option value="all">{t.academy.allSports}</option>
            <option value="football">Football</option>
            <option value="swimming">Swimming</option>
            <option value="basketball">Basketball</option>
            <option value="table_tennis">Table Tennis</option>
            <option value="martial_arts">Martial Arts</option>
          </select>

          {/* Age Group Filter */}
          <select
            value={ageGroupFilter}
            onChange={(e) => {
              setAgeGroupFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[#1e1e1e] border border-neutral-700 rounded-xl px-3 py-2.5 text-neutral-300 focus:outline-none focus:border-qsc-yellow"
          >
            <option value="all">{t.academy.ageGroups}: All</option>
            <option value="u7">U-7 (Grassroots)</option>
            <option value="u10">U-10 (Junior)</option>
            <option value="u14">U-14 (Youth)</option>
            <option value="u18">U-18 (Elite)</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[#1e1e1e] border border-neutral-700 rounded-xl px-3 py-2.5 text-neutral-300 focus:outline-none focus:border-qsc-yellow"
          >
            <option value="all">{t.academy.filterStatus}: All</option>
            <option value="pending">Pending</option>
            <option value="under_review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="medical_pending">Medical Pending</option>
            <option value="payment_pending">Payment Pending</option>
            <option value="waitlisted">Waitlisted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Main Registrations Table */}
      <div className="rounded-2xl bg-[#141414] border border-neutral-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-xs">
            <thead className="bg-[#1a1a1a] text-neutral-400 font-bold uppercase tracking-wider border-b border-neutral-800">
              <tr>
                <th className="px-5 py-3.5">{t.academy.colAppId}</th>
                <th className="px-5 py-3.5">{t.academy.colPlayer}</th>
                <th className="px-5 py-3.5">{t.academy.colSportProgram}</th>
                <th className="px-5 py-3.5">{t.academy.colGuardian}</th>
                <th className="px-5 py-3.5">{t.academy.colDate}</th>
                <th className="px-5 py-3.5">{t.academy.colStatus}</th>
                <th className="px-5 py-3.5 text-right rtl:text-left">{t.academy.colActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-300">
              {paginatedRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-neutral-500">
                    No academy registration records match the active criteria.
                  </td>
                </tr>
              ) : (
                paginatedRegistrations.map((item) => {
                  const sportObj = ACADEMY_SPORTS.find((s) => s.id === item.sportId);
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-[#1a1a1a] transition-colors group cursor-pointer"
                      onClick={() => handleOpenDrawer(item)}
                    >
                      <td className="px-5 py-4 font-mono font-bold text-white whitespace-nowrap">
                        {item.id}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="font-bold text-white group-hover:text-qsc-yellow transition-colors">
                          {isArabic ? item.player.fullNameAr || item.player.fullNameEn : item.player.fullNameEn}
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          {item.player.nationalityEn} • QID: {item.player.qidOrPassport}
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="font-medium text-white flex items-center gap-1.5">
                          {item.sportId === "football" && <Trophy className="w-3.5 h-3.5 text-amber-400" />}
                          {item.sportId === "swimming" && <Waves className="w-3.5 h-3.5 text-cyan-400" />}
                          {item.sportId === "basketball" && <Flame className="w-3.5 h-3.5 text-orange-400" />}
                          {item.sportId === "table_tennis" && <Activity className="w-3.5 h-3.5 text-emerald-400" />}
                          {item.sportId === "martial_arts" && <Shield className="w-3.5 h-3.5 text-rose-400" />}
                          <span>{isArabic ? sportObj?.nameAr : sportObj?.nameEn}</span>
                        </div>
                        <div className="text-[11px] text-neutral-500 uppercase font-bold">
                          {item.ageGroup} • Fee: {item.totalFeeQar} QAR
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="text-white font-medium">{item.guardian.guardianNameEn}</div>
                        <div className="text-[11px] font-mono text-neutral-400">{item.guardian.phone}</div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-neutral-400">
                        {item.submittedAt}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        {renderStatusBadge(item.status)}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-right rtl:text-left">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenDrawer(item);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-qsc-yellow hover:text-black font-bold text-xs transition-colors cursor-pointer"
                        >
                          {t.academy.viewDetails}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="px-5 py-4 border-t border-neutral-800 bg-[#161616] flex items-center justify-between text-xs text-neutral-400">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredRegistrations.length)} of{" "}
            {filteredRegistrations.length} applications
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1.5 rounded-lg bg-[#222] hover:bg-[#333] disabled:opacity-40 text-white cursor-pointer"
            >
              Previous
            </button>
            <span className="px-3 py-1.5 font-bold text-white">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-3 py-1.5 rounded-lg bg-[#222] hover:bg-[#333] disabled:opacity-40 text-white cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Slide-out Application Inspection Drawer */}
      {drawerOpen && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#111111] border-l rtl:border-l-0 rtl:border-r border-neutral-800 h-full overflow-y-auto flex flex-col justify-between shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-6">
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-black text-qsc-yellow">
                      {selectedApp.id}
                    </span>
                    {renderStatusBadge(selectedApp.status)}
                  </div>
                  <h2 className="text-xl font-black text-white">
                    {selectedApp.player.fullNameEn}
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Submitted: {selectedApp.submittedAt} • Ref Hash: {selectedApp.verificationHash}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-lg bg-[#1a1a1a] hover:bg-[#262626] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {actionSuccessMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{actionSuccessMsg}</span>
                </div>
              )}

              {/* Player Profile Section */}
              <div className="rounded-xl bg-[#161616] border border-neutral-800 p-4 space-y-3">
                <h3 className="text-xs font-bold text-qsc-yellow uppercase tracking-wider flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  <span>Player Identification</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-neutral-500 block">Date of Birth:</span>
                    <span className="font-bold text-white">{selectedApp.player.dateOfBirth}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Gender:</span>
                    <span className="font-bold text-white capitalize">{selectedApp.player.gender}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Nationality:</span>
                    <span className="font-bold text-white">{selectedApp.player.nationalityEn}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">QID / Passport:</span>
                    <span className="font-mono text-white font-bold">{selectedApp.player.qidOrPassport}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Kit Jersey Size:</span>
                    <span className="font-bold text-qsc-yellow">{selectedApp.player.jerseySize}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">School:</span>
                    <span className="text-neutral-300">{selectedApp.player.schoolNameEn || "N/A"}</span>
                  </div>
                </div>
                {selectedApp.player.previousExperienceEn && (
                  <div className="pt-2 border-t border-neutral-800 text-xs">
                    <span className="text-neutral-500 block mb-0.5">Prior Athletic Experience:</span>
                    <p className="text-neutral-300 bg-[#121212] p-2.5 rounded-lg border border-neutral-800">
                      {selectedApp.player.previousExperienceEn}
                    </p>
                  </div>
                )}
              </div>

              {/* Guardian & Emergency Contacts */}
              <div className="rounded-xl bg-[#161616] border border-neutral-800 p-4 space-y-3">
                <h3 className="text-xs font-bold text-qsc-yellow uppercase tracking-wider flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Guardian & Emergency Contacts</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-neutral-500 block">Guardian:</span>
                    <span className="font-bold text-white">{selectedApp.guardian.guardianNameEn}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Relationship:</span>
                    <span className="font-bold text-white capitalize">{selectedApp.guardian.relationship}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Phone:</span>
                    <span className="font-mono text-white">{selectedApp.guardian.phone}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Email:</span>
                    <span className="text-neutral-300">{selectedApp.guardian.email}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Emergency Contact:</span>
                    <span className="text-neutral-300">{selectedApp.guardian.emergencyContactName}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Emergency Phone:</span>
                    <span className="font-mono text-neutral-300">{selectedApp.guardian.emergencyContactPhone}</span>
                  </div>
                </div>
              </div>

              {/* Medical Declaration & Aspitar Clearance */}
              <div className="rounded-xl bg-[#161616] border border-neutral-800 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Sports Medicine & Health Status</span>
                  </h3>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      selectedApp.isMedicalCleared
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-purple-500/10 text-purple-400 border border-purple-500/30"
                    }`}
                  >
                    {selectedApp.isMedicalCleared ? "✓ Medically Cleared" : "Clearance Pending"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-neutral-500 block">Chronic Conditions:</span>
                    <span className="font-bold text-white">
                      {selectedApp.medical.hasMedicalConditions
                        ? selectedApp.medical.conditionsDescription || "Reported"
                        : "None Reported"}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Allergies:</span>
                    <span className="font-bold text-white">
                      {selectedApp.medical.hasAllergies
                        ? selectedApp.medical.allergiesDescription || "Reported"
                        : "None Reported"}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Blood Group:</span>
                    <span className="font-bold text-qsc-yellow">{selectedApp.medical.bloodType || "O+"}</span>
                  </div>
                </div>

                {selectedApp.medicalClearanceNotes && (
                  <p className="text-xs text-neutral-400 pt-2 border-t border-neutral-800">
                    <strong>Medical Officer Notes:</strong> {selectedApp.medicalClearanceNotes}
                  </p>
                )}
              </div>

              {/* Documents & QR Reference */}
              <div className="rounded-xl bg-[#161616] border border-neutral-800 p-4 flex items-center justify-between">
                <div className="space-y-1.5 text-xs">
                  <span className="text-xs font-bold text-neutral-300 uppercase block">
                    Attached Verification Documents
                  </span>
                  <div className="flex items-center gap-2 text-neutral-400">
                    <FileText className="w-3.5 h-3.5 text-qsc-yellow" />
                    <span>Photo: {selectedApp.documents.playerPhotoName || "player_photo.jpg"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-400">
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    <span>QID Copy: {selectedApp.documents.qidOrPassportFrontName || "qid_scan.pdf"}</span>
                  </div>
                </div>

                <AcademyQrCode applicationId={selectedApp.id} size={70} />
              </div>

              {/* Active Coach / Group Assignment */}
              <div className="rounded-xl bg-[#161616] border border-neutral-800 p-4 flex items-center justify-between text-xs">
                <div>
                  <span className="text-neutral-500 block">Assigned Lead Coach:</span>
                  <span className="text-sm font-bold text-white">
                    {selectedApp.assignedCoach || "Awaiting Coach Assignment"}
                  </span>
                </div>
                <div className="text-right rtl:text-left">
                  <span className="text-neutral-500 block">Assigned Squad / Pitch:</span>
                  <span className="text-sm font-bold text-qsc-yellow">
                    {selectedApp.assignedGroup || "Main Training Pitch"}
                  </span>
                </div>
              </div>

              {/* Internal Notes Log */}
              {selectedApp.internalNotes && (
                <div className="rounded-xl bg-[#141414] border border-neutral-800 p-4 text-xs space-y-1">
                  <span className="text-neutral-400 font-bold block uppercase tracking-wider">
                    Internal Registrar Audit Notes
                  </span>
                  <p className="text-neutral-300 whitespace-pre-wrap">{selectedApp.internalNotes}</p>
                </div>
              )}
            </div>

            {/* Administrative Action Control Panel */}
            <div className="pt-6 border-t border-neutral-800 space-y-3 flex-shrink-0">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                Administrative Directives & Triage
              </span>

              {/* Action Form Inputs if triggered */}
              {actionType === "reject" && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 space-y-3">
                  <label className="text-xs font-bold text-red-300 block">
                    {t.academy.rejectionReasonPrompt}
                  </label>
                  <input
                    type="text"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="e.g. Ineligible age bracket for this program tier..."
                    className="w-full bg-[#1e1e1e] border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setActionType(null)}
                      className="px-3 py-1.5 rounded-lg bg-neutral-800 text-xs font-bold text-neutral-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleExecuteAction}
                      className="px-4 py-1.5 rounded-lg bg-red-600 text-xs font-bold text-white hover:bg-red-500"
                    >
                      Confirm Rejection
                    </button>
                  </div>
                </div>
              )}

              {actionType === "coach" && (
                <div className="p-4 rounded-xl bg-[#1a1a1a] border border-neutral-700 space-y-3">
                  <label className="text-xs font-bold text-qsc-yellow block">
                    Assign Academy Coach & Squad Group
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={assignCoachName}
                      onChange={(e) => setAssignCoachName(e.target.value)}
                      placeholder="Coach Name e.g. Coach Tariq"
                      className="bg-[#141414] border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
                    />
                    <input
                      type="text"
                      value={assignGroupName}
                      onChange={(e) => setAssignGroupName(e.target.value)}
                      placeholder="Squad Group e.g. Group A / Pitch 2"
                      className="bg-[#141414] border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setActionType(null)}
                      className="px-3 py-1.5 rounded-lg bg-neutral-800 text-xs font-bold text-neutral-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleExecuteAction}
                      className="px-4 py-1.5 rounded-lg bg-qsc-yellow text-xs font-bold text-black"
                    >
                      Save Assignment
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActionType("approve")}
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.academy.approveApp}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActionType("medical")}
                  className="py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t.academy.clearMedical}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActionType("payment")}
                  className="py-2.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{t.academy.verifyPayment}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActionType("coach")}
                  className="py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md font-extrabold"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>{t.academy.assignCoach}</span>
                </button>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1 text-xs">
                <button
                  type="button"
                  onClick={() => setActionType("waitlist")}
                  className="px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold"
                >
                  {t.academy.waitlistApp}
                </button>
                <button
                  type="button"
                  onClick={() => setActionType("reject")}
                  className="px-3 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold"
                >
                  {t.academy.rejectApp}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
