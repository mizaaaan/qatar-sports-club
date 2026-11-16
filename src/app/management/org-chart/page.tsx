"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ORG_CHART_DATA } from "@/lib/data";
import { OrgNode } from "@/lib/types";
import {
  Network,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Edit3,
  Plus,
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  X,
  Check,
} from "lucide-react";

export default function OrgChartPage() {
  const { t, isArabic } = useLanguage();
  const { role } = useAuth();
  const [chartData, setChartData] = useState<OrgNode>(ORG_CHART_DATA);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedNode, setSelectedNode] = useState<OrgNode | null>(null);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState<{
    id: string;
    nameEn: string;
    nameAr: string;
    titleEn: string;
    titleAr: string;
    email: string;
    phone: string;
  }>({
    id: "",
    nameEn: "",
    nameAr: "",
    titleEn: "",
    titleAr: "",
    email: "",
    phone: "",
  });

  const canEdit = ["super_admin", "president", "general_manager"].includes(role);

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(Math.max(0.6, prev + delta), 1.4));
  };

  const handleOpenEdit = (node: OrgNode) => {
    setEditFormData({
      id: node.id,
      nameEn: node.nameEn,
      nameAr: node.nameAr,
      titleEn: node.titleEn,
      titleAr: node.titleAr,
      email: node.email,
      phone: node.phone,
    });
    setEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    const updateRecursive = (node: OrgNode): OrgNode => {
      if (node.id === editFormData.id) {
        return {
          ...node,
          nameEn: editFormData.nameEn,
          nameAr: editFormData.nameAr,
          titleEn: editFormData.titleEn,
          titleAr: editFormData.titleAr,
          email: editFormData.email,
          phone: editFormData.phone,
        };
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(updateRecursive),
        };
      }
      return node;
    };

    setChartData(updateRecursive(chartData));
    setEditModalOpen(false);
  };

  // Node Component
  const TreeNode = ({ node, level = 0 }: { node: OrgNode; level?: number }) => {
    const hasChildren = node.children && node.children.length > 0;
    const isTopTier = level === 0;

    return (
      <div className="flex flex-col items-center">
        {/* Node Card */}
        <div
          onClick={() => setSelectedNode(node)}
          className={`relative z-10 w-64 rounded-xl p-4 shadow-sm cursor-pointer transition-all hover:scale-105 border ${
            isTopTier
              ? "bg-[#0A0A0A] text-white border-qsc-yellow/60 shadow-lg"
              : "bg-white text-neutral-800 border-[#E8E8E3] hover:border-black"
          }`}
        >
          {canEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenEdit(node);
              }}
              className="absolute top-2 right-2 rtl:right-auto rtl:left-2 p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-qsc-yellow"
              title="Edit Node (Admin)"
            >
              <Edit3 className="w-3 h-3" />
            </button>
          )}

          <div className="flex items-center gap-3">
            <Image
              src={node.avatar}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover border border-neutral-300 flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <span
                className={`text-[10px] font-bold uppercase tracking-wider block truncate ${
                  isTopTier ? "text-qsc-yellow" : "text-neutral-500"
                }`}
              >
                {isArabic ? node.departmentAr : node.departmentEn}
              </span>
              <h4 className="text-xs font-black truncate leading-snug">
                {isArabic ? node.nameAr : node.nameEn}
              </h4>
              <p
                className={`text-[11px] truncate mt-0.5 ${
                  isTopTier ? "text-neutral-300" : "text-neutral-600"
                }`}
              >
                {isArabic ? node.titleAr : node.titleEn}
              </p>
            </div>
          </div>
        </div>

        {/* Tree Line Connectors */}
        {hasChildren && (
          <div className="flex flex-col items-center w-full">
            {/* Vertical connector down from parent */}
            <div className="w-0.5 h-8 bg-neutral-400" />

            {/* Horizontal line across children */}
            <div className="relative flex justify-center w-full">
              {node.children!.length > 1 && (
                <div
                  className="absolute top-0 h-0.5 bg-neutral-400"
                  style={{
                    left: "25%",
                    right: "25%",
                  }}
                />
              )}

              <div className="flex flex-wrap justify-center gap-6 pt-4">
                {node.children!.map((child) => (
                  <div key={child.id} className="relative flex flex-col items-center">
                    {/* Vertical connector to child */}
                    <div className="w-0.5 h-4 bg-neutral-400 -mt-4 mb-0" />
                    <TreeNode node={child} level={level + 1} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F4] text-[#171717]">
      <Header />

      {/* Hero Banner */}
      <section className="bg-[#0A0A0A] text-white py-12 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-qsc-yellow font-bold uppercase tracking-wider">
              <Link href="/management" className="hover:underline">
                {t.managementShowcase}
              </Link>
              <span>/</span>
              <span>{t.nav.orgChart}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {isArabic ? "الهيكل التنظيمي المعتمد" : "Organizational Governance Hierarchy"}
            </h1>
            <p className="text-xs text-neutral-400 max-w-xl">
              {isArabic
                ? "مخطط التسلسل الإداري والقيادي لنادي قطر الرياضي للدورة ٢٠٢٤-٢٠٢٨."
                : "Approved hierarchical leadership and management chain of Qatar Sports Club."}
            </p>
          </div>

          {/* Interactive Zoom Controls */}
          <div className="flex items-center gap-2 bg-[#1A1A1A] border border-neutral-700 p-1.5 rounded-xl self-start md:self-auto">
            <button
              onClick={() => handleZoom(0.1)}
              className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <span className="text-xs text-neutral-400 font-mono px-2">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => handleZoom(-0.1)}
              className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
              title="Reset Zoom"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Interactive Canvas */}
      <section className="flex-1 py-8 sm:py-12 overflow-x-auto overflow-y-hidden">
        <div className="md:hidden flex items-center justify-center gap-1.5 text-xs text-neutral-500 mb-2 px-4">
          <span>{isArabic ? "↔ اسحب أفقياً لاستعراض الهيكل الشجري" : "↔ Swipe horizontally to explore org tree"}</span>
        </div>
        <div className="max-w-[1600px] mx-auto px-4">
          <div
            className="flex justify-center transition-transform duration-200 origin-top min-w-[900px] py-4 sm:py-8"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <TreeNode node={chartData} />
          </div>
        </div>
      </section>

      {/* Node Details Drawer Modal */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-md w-full p-4 sm:p-6 text-neutral-800 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-3">
                <Image
                  src={selectedNode.avatar}
                  alt=""
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-full object-cover border-2 border-neutral-900"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    {isArabic ? selectedNode.departmentAr : selectedNode.departmentEn}
                  </span>
                  <h3 className="text-base font-black text-neutral-900">
                    {isArabic ? selectedNode.nameAr : selectedNode.nameEn}
                  </h3>
                  <p className="text-xs font-semibold text-neutral-600">
                    {isArabic ? selectedNode.titleAr : selectedNode.titleEn}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-neutral-400" />
                <span className="font-mono">{selectedNode.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-neutral-400" />
                <span dir="ltr">{selectedNode.phone}</span>
              </div>
              {selectedNode.term && (
                <div className="p-2.5 rounded-lg bg-[#FAF9F5] border border-neutral-200">
                  <span className="font-bold text-neutral-800">
                    {isArabic ? "الدورة الانتخابية: " : "Mandate: "}
                  </span>
                  <span>{selectedNode.term}</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-neutral-100">
              <button
                onClick={() => setSelectedNode(null)}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-[#0A0A0A] text-qsc-yellow hover:bg-neutral-800 transition-colors"
              >
                {t.common.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-lg w-full p-6 text-neutral-800 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="text-base font-bold text-neutral-900">
                {isArabic ? "تعديل بيانات العقدة التنظيمية" : "Edit Hierarchy Node"}
              </h3>
              <button
                onClick={() => setEditModalOpen(false)}
                className="p-1 text-neutral-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-neutral-700 block mb-1">Name (English)</label>
                <input
                  type="text"
                  value={editFormData.nameEn}
                  onChange={(e) => setEditFormData({ ...editFormData, nameEn: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                />
              </div>
              <div>
                <label className="font-bold text-neutral-700 block mb-1">الاسم (بالعربية)</label>
                <input
                  type="text"
                  value={editFormData.nameAr}
                  onChange={(e) => setEditFormData({ ...editFormData, nameAr: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                />
              </div>
              <div>
                <label className="font-bold text-neutral-700 block mb-1">Title (English)</label>
                <input
                  type="text"
                  value={editFormData.titleEn}
                  onChange={(e) => setEditFormData({ ...editFormData, titleEn: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                />
              </div>
              <div>
                <label className="font-bold text-neutral-700 block mb-1">المسمى (بالعربية)</label>
                <input
                  type="text"
                  value={editFormData.titleAr}
                  onChange={(e) => setEditFormData({ ...editFormData, titleAr: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-neutral-600 hover:bg-neutral-100"
              >
                {t.common.cancel}
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#0A0A0A] text-qsc-yellow"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{t.common.save}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
