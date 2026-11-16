"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { usePortalData } from "@/context/PortalDataContext";
import { TaskItem, Role } from "@/lib/types";
import { PriorityBadge } from "@/components/common/PriorityBadge";
import {
  CheckCircle2,
  Clock,
  Plus,
  Calendar,
  User,
  Filter,
  Check,
  ChevronRight,
  ListTodo,
  Layers,
  X,
} from "lucide-react";

export default function TasksPage() {
  const { t, isArabic } = useLanguage();
  const { user, allUsers } = useAuth();
  const { tasks, createTask, updateTaskStatus } = usePortalData();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [filterPriority, setFilterPriority] = useState<string>("all");

  const [newTask, setNewTask] = useState({
    titleEn: "",
    titleAr: "",
    descriptionEn: "",
    descriptionAr: "",
    priority: "medium" as TaskItem["priority"],
    status: "todo" as TaskItem["status"],
    assignedToId: allUsers[0].id,
    dueDate: "2026-11-30",
    departmentEn: "General Directorate",
    departmentAr: "الإدارة العامة",
  });

  const columns: { id: TaskItem["status"]; titleEn: string; titleAr: string; color: string }[] = [
    { id: "todo", titleEn: "To Do", titleAr: "المهام المطلوبة", color: "border-neutral-300" },
    { id: "in_progress", titleEn: "In Progress", titleAr: "قيد التنفيذ", color: "border-blue-400" },
    { id: "under_review", titleEn: "Review & Quality", titleAr: "المراجعة والتدقيق", color: "border-amber-400" },
    { id: "completed", titleEn: "Completed", titleAr: "تم الإنجاز", color: "border-emerald-500" },
  ];

  const filteredTasks = tasks.filter((t) => {
    return filterPriority === "all" || t.priority === filterPriority;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assignedUser = allUsers.find((u) => u.id === newTask.assignedToId) || allUsers[0];

    createTask({
      titleEn: newTask.titleEn || "Administrative Directive",
      titleAr: newTask.titleAr || "تكليف إداري جديد",
      descriptionEn: newTask.descriptionEn,
      descriptionAr: newTask.descriptionAr,
      priority: newTask.priority,
      status: newTask.status,
      assignedTo: {
        id: assignedUser.id,
        nameEn: assignedUser.nameEn,
        nameAr: assignedUser.nameAr,
        avatar: assignedUser.avatar,
        role: assignedUser.role,
      },
      createdBy: user?.nameEn || "Officer",
      dueDate: newTask.dueDate,
      departmentEn: newTask.departmentEn,
      departmentAr: newTask.departmentAr,
    });

    setCreateModalOpen(false);
    setNewTask({
      titleEn: "",
      titleAr: "",
      descriptionEn: "",
      descriptionAr: "",
      priority: "medium",
      status: "todo",
      assignedToId: allUsers[0].id,
      dueDate: "2026-11-30",
      departmentEn: "General Directorate",
      departmentAr: "الإدارة العامة",
    });
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
            <span className="text-black">{t.nav.tasks}</span>
          </div>
          <h1 className="text-2xl font-black text-[#171717] mt-1">
            {isArabic ? "لوحة التكليفات والمهام الإدارية" : "Management Directives & Task Board"}
          </h1>
          <p className="text-xs text-neutral-500">
            {isArabic
              ? "متابعة إنجاز التوجيهات الرئاسية والمهام التشغيلية لأقسام النادي واستاد سحيم بن حمد."
              : "Track execution of presidential directives and stadium facility tasks."}
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#0A0A0A] text-qsc-yellow font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-md self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{isArabic ? "إنشاء تكليف جديد" : "Create Task"}</span>
        </button>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id);
          return (
            <div
              key={col.id}
              className={`bg-[#FAF9F5] rounded-2xl border-t-4 ${col.color} border-x border-b border-[#E8E8E3] p-4 flex flex-col space-y-4 min-h-[500px]`}
            >
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                  {isArabic ? col.titleAr : col.titleEn}
                </span>
                <span className="w-5 h-5 rounded-full bg-white border border-neutral-300 text-[10px] font-bold flex items-center justify-center text-neutral-700">
                  {colTasks.length}
                </span>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto">
                {colTasks.length === 0 ? (
                  <p className="text-[11px] text-neutral-400 text-center py-8">
                    {isArabic ? "لا توجد مهام" : "Empty"}
                  </p>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white rounded-xl border border-[#E8E8E3] p-4 shadow-sm hover:border-black transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <PriorityBadge priority={task.priority} size="sm" />
                        <span className="text-[10px] text-neutral-400 font-mono">
                          {task.dueDate}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-neutral-900 leading-snug">
                        {isArabic ? task.titleAr : task.titleEn}
                      </h4>

                      <p className="text-[11px] text-neutral-500 line-clamp-2">
                        {isArabic ? task.descriptionAr : task.descriptionEn}
                      </p>

                      {/* Assignee & Progress */}
                      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Image
                            src={task.assignedTo.avatar}
                            alt=""
                            width={22}
                            height={22}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span className="text-[10px] font-bold text-neutral-700 truncate max-w-[100px]">
                            {isArabic ? task.assignedTo.nameAr : task.assignedTo.nameEn}
                          </span>
                        </div>

                        {/* Status Change Selector */}
                        <select
                          value={task.status}
                          onChange={(e) => updateTaskStatus(task.id, e.target.value as any)}
                          className="text-[10px] bg-[#FAF9F5] border border-neutral-300 rounded px-1.5 py-0.5 cursor-pointer font-semibold"
                        >
                          <option value="todo">To Do</option>
                          <option value="in_progress">In Progress</option>
                          <option value="under_review">Review</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Task Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-lg w-full p-6 text-neutral-800 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="text-base font-bold text-neutral-900">
                {isArabic ? "تكليف إداري جديد" : "Assign New Management Directive"}
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
                  Task Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={newTask.titleEn}
                  onChange={(e) => setNewTask({ ...newTask, titleEn: e.target.value })}
                  placeholder="e.g. Inspect Suheim Stadium Floodlights"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">
                  عنوان المهمة (بالعربية) *
                </label>
                <input
                  type="text"
                  required
                  value={newTask.titleAr}
                  onChange={(e) => setNewTask({ ...newTask, titleAr: e.target.value })}
                  placeholder="مثال: فحص إنارة استاد سحيم بن حمد"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">
                    {isArabic ? "المسؤول المكلف" : "Assign To Officer"}
                  </label>
                  <select
                    value={newTask.assignedToId}
                    onChange={(e) => setNewTask({ ...newTask, assignedToId: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white"
                  >
                    {allUsers.map((u) => (
                      <option key={u.id} value={u.id}>
                        {isArabic ? u.nameAr : u.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">
                    {isArabic ? "الموعد النهائي" : "Due Date"}
                  </label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white"
                  >
                    <option value="low">Normal</option>
                    <option value="medium">Standard</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Status</label>
                  <select
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white"
                  >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                  </select>
                </div>
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
                  {isArabic ? "حفظ التكليف" : "Create Directive"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
