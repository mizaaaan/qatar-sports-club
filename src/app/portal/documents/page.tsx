"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import { DocumentItem } from "@/lib/types";
import {
  FolderLock,
  Search,
  Filter,
  Upload,
  Download,
  Eye,
  FileText,
  ShieldAlert,
  Tag,
  Clock,
  CheckCircle2,
  Lock,
  X,
  FileCheck2,
} from "lucide-react";

export default function DocumentRepositoryPage() {
  const { t, isArabic } = useLanguage();
  const { user, role } = useAuth();
  const { documents, uploadDocument } = usePortalData();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedClassification, setSelectedClassification] = useState<string>("all");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);

  const [newDocData, setNewDocData] = useState({
    titleEn: "",
    titleAr: "",
    category: "governance" as DocumentItem["category"],
    departmentEn: "Executive Board",
    departmentAr: "مجلس الإدارة التنفيذي",
    classification: "internal" as DocumentItem["classification"],
    fileType: "pdf" as const,
    fileSize: "2.5 MB",
    version: "v1.0",
    status: "active" as const,
    downloadUrl: "#",
    descriptionEn: "",
    descriptionAr: "",
  });

  const categories = [
    { id: "all", nameEn: "All Documents", nameAr: "كافة الوثائق" },
    { id: "governance", nameEn: "Governance & Statutes", nameAr: "اللوائح والحوكمة" },
    { id: "finance", nameEn: "Financial Disclosures", nameAr: "التقارير المالية" },
    { id: "administrative", nameEn: "Facility & Stadium", nameAr: "تشغيل المنشآت" },
    { id: "circulars", nameEn: "Official Circulars", nameAr: "التعاميم والقرارات" },
  ];

  const classifications = [
    { id: "all", nameEn: "All Tiers", nameAr: "كافة المستويات" },
    { id: "public", nameEn: "Public", nameAr: "عام" },
    { id: "internal", nameEn: "Internal", nameAr: "داخلي" },
    { id: "confidential", nameEn: "Confidential", nameAr: "سري" },
    { id: "strictly_confidential", nameEn: "Strictly Confidential", nameAr: "سري للغاية" },
  ];

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.titleEn.toLowerCase().includes(search.toLowerCase()) ||
      doc.titleAr.includes(search) ||
      doc.referenceNumber.toLowerCase().includes(search.toLowerCase());

    const matchesCat = selectedCategory === "all" || doc.category === selectedCategory;
    const matchesClass =
      selectedClassification === "all" || doc.classification === selectedClassification;

    return matchesSearch && matchesCat && matchesClass;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    uploadDocument({
      ...newDocData,
      uploadedBy: user?.nameEn || "Authorized Officer",
    });
    setUploadModalOpen(false);
  };

  const getClassificationBadge = (cls: DocumentItem["classification"]) => {
    const map = {
      public: "bg-emerald-50 text-emerald-800 border-emerald-200",
      internal: "bg-blue-50 text-blue-800 border-blue-200",
      confidential: "bg-amber-50 text-amber-900 border-amber-200",
      strictly_confidential: "bg-red-50 text-red-900 border-red-200",
    };
    const labels = {
      public: isArabic ? "عام" : "Public",
      internal: isArabic ? "داخلي" : "Internal",
      confidential: isArabic ? "سري" : "Confidential",
      strictly_confidential: isArabic ? "سري للغاية" : "Strictly Confidential",
    };
    return (
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${map[cls]}`}>
        {labels[cls]}
      </span>
    );
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
            <span className="text-black">{t.nav.documents}</span>
          </div>
          <h1 className="text-2xl font-black text-[#171717] mt-1">
            {isArabic ? "مستودع الوثائق واللوائح المؤسسية" : "Institutional Document Repository"}
          </h1>
          <p className="text-xs text-neutral-500">
            {isArabic
              ? "الأرشيف المركزي للوائح النادي، العقود، المحاضر، والتقارير المالية المعتمدة."
              : "Central vault for bylaws, audited financial statements, facility manuals, and board decrees."}
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#0A0A0A] text-qsc-yellow font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-md self-start sm:self-auto cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>{isArabic ? "إيداع وثيقة جديدة" : "Upload Document"}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#E8E8E3] p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isArabic ? "بحث في الوثائق واللوائح..." : "Search documents..."}
            className="w-full pl-9 pr-3 rtl:pr-9 rtl:pl-3 py-2 text-xs bg-[#FAF9F5] border border-[#E8E8E3] rounded-lg focus:outline-none focus:border-black text-neutral-800"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === c.id
                  ? "bg-[#0A0A0A] text-qsc-yellow"
                  : "bg-[#F7F7F4] text-neutral-600 hover:text-black border border-[#E8E8E3]"
              }`}
            >
              {isArabic ? c.nameAr : c.nameEn}
            </button>
          ))}
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl border border-[#E8E8E3] p-6 shadow-sm hover:border-black transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-neutral-400">
                  {doc.referenceNumber}
                </span>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 text-[10px] font-bold">
                    {doc.version}
                  </span>
                  {getClassificationBadge(doc.classification)}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF9F5] border border-[#E8E8E3] flex items-center justify-center text-neutral-700 flex-shrink-0">
                  <FileText className="w-5 h-5 text-neutral-800" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#171717] group-hover:underline leading-snug">
                    {isArabic ? doc.titleAr : doc.titleEn}
                  </h3>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    {isArabic ? doc.departmentAr : doc.departmentEn} • {doc.fileSize}
                  </p>
                </div>
              </div>

              <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                {isArabic ? doc.descriptionAr : doc.descriptionEn}
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-100 mt-4 flex items-center justify-between text-xs text-neutral-500">
              <div className="flex items-center gap-1.5 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>{doc.lastModified}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewDoc(doc)}
                  className="p-1.5 rounded-lg bg-[#FAF9F5] hover:bg-neutral-100 text-neutral-700 font-semibold flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t.common.view}</span>
                </button>

                <a
                  href={doc.downloadUrl}
                  onClick={(e) => {
                    e.preventDefault();
                    setPreviewDoc(doc);
                  }}
                  className="p-1.5 rounded-lg bg-[#0A0A0A] hover:bg-neutral-800 text-qsc-yellow font-bold flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-2xl w-full p-4 sm:p-6 lg:p-8 text-neutral-800 space-y-4 sm:space-y-6 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-neutral-100 pb-4">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 font-bold block">
                  {previewDoc.referenceNumber} • {previewDoc.version}
                </span>
                <h3 className="text-lg font-black text-neutral-900 mt-1">
                  {isArabic ? previewDoc.titleAr : previewDoc.titleEn}
                </h3>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1 text-neutral-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF9F5] border border-neutral-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="font-bold text-neutral-700">Classification:</span>
                {getClassificationBadge(previewDoc.classification)}
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-neutral-700">Department:</span>
                <span>{isArabic ? previewDoc.departmentAr : previewDoc.departmentEn}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-neutral-700">Archived By:</span>
                <span>{previewDoc.uploadedBy}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-neutral-700">File Size:</span>
                <span>{previewDoc.fileSize}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              {isArabic ? previewDoc.descriptionAr : previewDoc.descriptionEn}
            </p>

            <div className="pt-2 flex justify-end gap-3 border-t border-neutral-100 text-xs">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 rounded-lg font-semibold text-neutral-600 hover:bg-neutral-100"
              >
                {t.common.cancel}
              </button>
              <button
                onClick={() => {
                  alert(
                    isArabic
                      ? "جاري تحميل النسخة المدققة والمشفرة من الوثيقة..."
                      : "Downloading certified institutional document..."
                  );
                  setPreviewDoc(null);
                }}
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#0A0A0A] text-qsc-yellow font-bold uppercase tracking-wider"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.common.downloadPdf}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-lg w-full p-4 sm:p-6 text-neutral-800 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="text-base font-bold text-neutral-900">
                {isArabic ? "إيداع وثيقة في المستودع المؤسسي" : "Deposit Institutional Document"}
              </h3>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-neutral-700 block mb-1">
                  Document Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={newDocData.titleEn}
                  onChange={(e) => setNewDocData({ ...newDocData, titleEn: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  placeholder="e.g. QSC 2026 Procurement Bylaw"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">
                  عنوان الوثيقة (بالعربية) *
                </label>
                <input
                  type="text"
                  required
                  value={newDocData.titleAr}
                  onChange={(e) => setNewDocData({ ...newDocData, titleAr: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  placeholder="مثال: اللائحة المالية والمشتريات ٢٠٢٦"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Category</label>
                  <select
                    value={newDocData.category}
                    onChange={(e) => setNewDocData({ ...newDocData, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white"
                  >
                    <option value="governance">Governance</option>
                    <option value="finance">Finance</option>
                    <option value="administrative">Administrative</option>
                    <option value="circulars">Circulars</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Classification</label>
                  <select
                    value={newDocData.classification}
                    onChange={(e) => setNewDocData({ ...newDocData, classification: e.target.value as any })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white"
                  >
                    <option value="internal">Internal</option>
                    <option value="public">Public</option>
                    <option value="confidential">Confidential</option>
                    <option value="strictly_confidential">Strictly Confidential</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">
                  Summary / Scope (English)
                </label>
                <textarea
                  rows={2}
                  value={newDocData.descriptionEn}
                  onChange={(e) => setNewDocData({ ...newDocData, descriptionEn: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 rounded-lg font-semibold text-neutral-600 hover:bg-neutral-100"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#0A0A0A] text-qsc-yellow font-bold uppercase tracking-wider"
                >
                  {isArabic ? "إيداع الوثيقة" : "Deposit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
