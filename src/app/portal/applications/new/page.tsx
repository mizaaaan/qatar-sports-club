"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import { ApplicationCategory, ApplicationPriority } from "@/lib/types";
import {
  Send,
  Upload,
  CheckCircle2,
  FileText,
  DollarSign,
  Building2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  X,
} from "lucide-react";

export default function NewApplicationPage() {
  const { t, isArabic } = useLanguage();
  const { user } = useAuth();
  const { createApplication } = usePortalData();
  const router = useRouter();

  const [formData, setFormData] = useState({
    titleEn: "",
    titleAr: "",
    category: "purchase" as ApplicationCategory,
    priority: "medium" as ApplicationPriority,
    departmentEn: user?.departmentEn || "Facilities & Stadium Operations",
    departmentAr: user?.departmentAr || "المنشآت وعمليات الاستاد",
    descriptionEn: "",
    descriptionAr: "",
    amount: 120000,
  });

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    "Technical_Specifications_Proposal.pdf",
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const created = createApplication({
      titleEn: formData.titleEn || "New Executive Administrative Request",
      titleAr: formData.titleAr || "طلب إداري وتنفيذي جديد",
      category: formData.category,
      priority: formData.priority,
      departmentEn: formData.departmentEn,
      departmentAr: formData.departmentAr,
      descriptionEn: formData.descriptionEn || "Administrative request submitted for ratification.",
      descriptionAr: formData.descriptionAr || "معاملة إدارية مرفوعة للاعتماد والمصادقة المؤسسية.",
      amount: formData.amount,
    });

    router.push(`/portal/applications/${created.id}`);
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFiles([...uploadedFiles, e.target.files[0].name]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb & Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider font-semibold">
          <Link href="/portal" className="hover:text-black">
            {t.nav.dashboard}
          </Link>
          <span>/</span>
          <Link href="/portal/applications" className="hover:text-black">
            {t.nav.allApplications}
          </Link>
          <span>/</span>
          <span className="text-black">{t.dashboard.newApplication}</span>
        </div>
        <h1 className="text-2xl font-black text-[#171717] mt-1">
          {isArabic ? "تقديم معاملة إدارية جديدة" : "Submit Institutional Application"}
        </h1>
        <p className="text-xs text-neutral-500">
          {isArabic
            ? "تعبئة بيانات المعاملة ورفع المرفقات لتفعيل مسار الاعتماد متعدد المستويات."
            : "Complete the form and attach documentation to initiate the multi-level approval chain."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E8E8E3] p-8 shadow-sm space-y-6 text-xs">
        {/* Category & Priority Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-bold text-neutral-800 mb-1.5">
              {isArabic ? "تصنيف المعاملة" : "Application Category"} *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as ApplicationCategory })}
              className="w-full px-3 py-2.5 bg-[#FAF9F5] border border-[#E8E8E3] rounded-xl focus:outline-none focus:border-black text-xs font-semibold"
            >
              <option value="purchase">{t.categories.purchase}</option>
              <option value="financial">{t.categories.financial}</option>
              <option value="maintenance">{t.categories.maintenance}</option>
              <option value="administrative">{t.categories.administrative}</option>
              <option value="leave">{t.categories.leave}</option>
              <option value="permission">{t.categories.permission}</option>
              <option value="general">{t.categories.general}</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-neutral-800 mb-1.5">
              {isArabic ? "مستوى الأولوية" : "Urgency / Priority"} *
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as ApplicationPriority })}
              className="w-full px-3 py-2.5 bg-[#FAF9F5] border border-[#E8E8E3] rounded-xl focus:outline-none focus:border-black text-xs font-semibold"
            >
              <option value="low">{t.priority.low}</option>
              <option value="medium">{t.priority.medium}</option>
              <option value="high">{t.priority.high}</option>
              <option value="urgent">{t.priority.urgent}</option>
            </select>
          </div>
        </div>

        {/* Title Dual Languages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-bold text-neutral-800 mb-1.5">
              Application Subject (English) *
            </label>
            <input
              type="text"
              required
              value={formData.titleEn}
              onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
              placeholder="e.g. Suheim bin Hamad Stadium Floodlight Lux Maintenance"
              className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#E8E8E3] rounded-xl focus:outline-none focus:border-black text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-neutral-800 mb-1.5">
              موضوع المعاملة (بالعربية) *
            </label>
            <input
              type="text"
              required
              value={formData.titleAr}
              onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
              placeholder="مثال: توريد وصيانة أجهزة إنارة استاد سحيم بن حمد"
              className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#E8E8E3] rounded-xl focus:outline-none focus:border-black text-xs"
            />
          </div>
        </div>

        {/* Department & Amount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-bold text-neutral-800 mb-1.5">
              {t.common.department} *
            </label>
            <input
              type="text"
              value={isArabic ? formData.departmentAr : formData.departmentEn}
              readOnly
              className="w-full px-3.5 py-2.5 bg-neutral-100 border border-[#E8E8E3] rounded-xl text-neutral-600 text-xs font-semibold cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block font-bold text-neutral-800 mb-1.5">
              {isArabic ? "المبلغ المقدر (بالريال القطري QAR)" : "Estimated Budget (QAR)"}
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#E8E8E3] rounded-xl focus:outline-none focus:border-black text-xs font-mono font-bold"
            />
          </div>
        </div>

        {/* Detailed Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-bold text-neutral-800 mb-1.5">
              Technical Justification & Details (English) *
            </label>
            <textarea
              rows={4}
              required
              value={formData.descriptionEn}
              onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
              placeholder="Comprehensive details, vendor rationale, and expected timeline..."
              className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#E8E8E3] rounded-xl focus:outline-none focus:border-black text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-neutral-800 mb-1.5">
              المبررات والشرح التفصيلي (بالعربية) *
            </label>
            <textarea
              rows={4}
              required
              value={formData.descriptionAr}
              onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
              placeholder="تفاصيل الطلب الفنية، عروض الأسعار، والمبررات الإدارية..."
              className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-[#E8E8E3] rounded-xl focus:outline-none focus:border-black text-xs"
            />
          </div>
        </div>

        {/* File Attachments */}
        <div className="space-y-3 pt-2">
          <label className="block font-bold text-neutral-800">
            {isArabic ? "المرفقات والوثائق الرسمية الداعمة" : "Supporting Documents & Quotations"}
          </label>

          <div className="border-2 border-dashed border-[#E8E8E3] rounded-2xl p-6 text-center bg-[#FAF9F5] hover:border-black transition-colors">
            <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-neutral-700">
              {isArabic ? "اسحب الملفات هنا أو اضغط للاختيار" : "Drag files or click to upload"}
            </p>
            <p className="text-[11px] text-neutral-400 mt-1">
              PDF, DOCX, XLSX (Max 25 MB per file)
            </p>
            <input
              type="file"
              onChange={handleSimulateUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="mt-3 inline-block px-4 py-1.5 rounded-lg bg-white border border-[#E8E8E3] text-xs font-bold text-neutral-700 hover:bg-neutral-50 cursor-pointer"
            >
              {isArabic ? "تصفح الملفات" : "Browse Files"}
            </label>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="space-y-2 pt-2">
              {uploadedFiles.map((fname, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E8E8E3] text-xs"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-neutral-500" />
                    <span className="font-semibold text-neutral-800">{fname}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== idx))}
                    className="p-1 hover:bg-neutral-100 rounded text-neutral-400 hover:text-rose-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sequential Workflow Preview Card */}
        <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E8E3] space-y-2">
          <p className="font-bold text-neutral-900 text-xs">
            {isArabic ? "مسار الاعتماد التلقائي المخصص لهذه الفئة:" : "Configured Workflow Chain for this category:"}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-600">
            <span className="px-2 py-1 rounded bg-white border border-[#E8E8E3] font-semibold">
              1. {t.roles.department_manager}
            </span>
            <span>→</span>
            <span className="px-2 py-1 rounded bg-white border border-[#E8E8E3] font-semibold">
              2. {t.roles.admin_officer}
            </span>
            <span>→</span>
            <span className="px-2 py-1 rounded bg-white border border-[#E8E8E3] font-semibold">
              3. {t.roles.general_manager}
            </span>
            <span>→</span>
            <span className="px-2 py-1 rounded bg-[#0A0A0A] text-qsc-yellow font-bold">
              4. {t.roles.president} (Final Seal)
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E8E8E3]">
          <Link
            href="/portal/applications"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            {t.common.cancel}
          </Link>

          <button
            type="submit"
            className="flex items-center gap-2 bg-[#0A0A0A] hover:bg-neutral-800 text-qsc-yellow font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t.common.submit}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
