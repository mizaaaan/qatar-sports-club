"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Application,
  DocumentItem,
  SignatureRecord,
  TaskItem,
  MeetingItem,
  NotificationItem,
  AuditLogItem,
  ApplicationCategory,
  ApplicationPriority,
  AcademyRegistration,
  AcademyRegistrationStatus,
} from "@/lib/types";
import {
  INITIAL_APPLICATIONS,
  INITIAL_DOCUMENTS,
  INITIAL_SIGNATURES,
  INITIAL_TASKS,
  INITIAL_MEETINGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS,
} from "@/lib/data";
import { INITIAL_ACADEMY_REGISTRATIONS, generateAcademyApplicationId } from "@/lib/academyData";
import { useAuth } from "./AuthContext";

interface PortalDataContextType {
  applications: Application[];
  documents: DocumentItem[];
  signatures: SignatureRecord[];
  tasks: TaskItem[];
  meetings: MeetingItem[];
  notifications: NotificationItem[];
  auditLogs: AuditLogItem[];
  unreadNotificationsCount: number;

  // Youth Sports Academy
  academyRegistrations: AcademyRegistration[];
  pendingAcademyCount: number;
  registerAcademyApplicant: (data: Omit<AcademyRegistration, "id" | "status" | "submittedAt" | "updatedAt" | "verificationHash" | "isMedicalCleared" | "paidAmountQar">) => Promise<AcademyRegistration>;
  updateAcademyApplicationStatus: (id: string, status: AcademyRegistrationStatus, internalNotes?: string, rejectionReason?: string) => void;
  updateAcademyMedicalClearance: (id: string, isCleared: boolean, notes?: string) => void;
  updateAcademyPaymentStatus: (id: string, paymentStatus: "unpaid" | "partial" | "verified", paidAmountQar?: number, method?: "card" | "bank_transfer" | "cash_counter", ref?: string) => void;
  assignAcademyCoachAndGroup: (id: string, coachName: string, groupName: string) => void;
  addAcademyInternalNote: (id: string, note: string) => void;
  
  // Applications Actions
  createApplication: (appData: {
    titleEn: string;
    titleAr: string;
    category: ApplicationCategory;
    priority: ApplicationPriority;
    departmentEn: string;
    departmentAr: string;
    descriptionEn: string;
    descriptionAr: string;
    amount?: number;
    customWorkflowRoles?: string[];
  }) => Application;
  
  approveWorkflowStep: (applicationId: string, stepId: string, comments?: string) => void;
  rejectWorkflowStep: (applicationId: string, stepId: string, comments: string) => void;
  requestChangesWorkflowStep: (applicationId: string, stepId: string, comments: string) => void;
  reassignWorkflowStep: (applicationId: string, stepId: string, newAssigneeName: string) => void;
  
  // Signatures Actions
  signDocument: (
    signatureId: string,
    signatureDataUrl: string,
    signatureType: "drawn" | "typed" | "certificate"
  ) => void;
  
  // Document Actions
  uploadDocument: (doc: Omit<DocumentItem, "id" | "uploadedAt" | "lastModified" | "referenceNumber">) => void;
  
  // Task Actions
  createTask: (task: Omit<TaskItem, "id" | "createdAt" | "progressPercentage">) => void;
  updateTaskStatus: (taskId: string, status: TaskItem["status"]) => void;
  
  // Meeting Actions
  createMeeting: (meeting: Omit<MeetingItem, "id">) => void;
  
  // Notification Actions
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  // Reset Data for demo
  resetToInitialData: () => void;
}

const PortalDataContext = createContext<PortalDataContextType | undefined>(undefined);

export function PortalDataProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [signatures, setSignatures] = useState<SignatureRecord[]>(INITIAL_SIGNATURES);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [meetings, setMeetings] = useState<MeetingItem[]>(INITIAL_MEETINGS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [academyRegistrations, setAcademyRegistrations] = useState<AcademyRegistration[]>(INITIAL_ACADEMY_REGISTRATIONS);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedApps = localStorage.getItem("qsc_apps");
      if (savedApps) setApplications(JSON.parse(savedApps));

      const savedDocs = localStorage.getItem("qsc_docs");
      if (savedDocs) setDocuments(JSON.parse(savedDocs));

      const savedSigs = localStorage.getItem("qsc_sigs");
      if (savedSigs) setSignatures(JSON.parse(savedSigs));

      const savedTasks = localStorage.getItem("qsc_tasks");
      if (savedTasks) setTasks(JSON.parse(savedTasks));

      const savedMeetings = localStorage.getItem("qsc_meetings");
      if (savedMeetings) setMeetings(JSON.parse(savedMeetings));

      const savedNotifs = localStorage.getItem("qsc_notifs");
      if (savedNotifs) setNotifications(JSON.parse(savedNotifs));

      const savedLogs = localStorage.getItem("qsc_audit_logs");
      if (savedLogs) setAuditLogs(JSON.parse(savedLogs));

      const savedAcademy = localStorage.getItem("qsc_academy_regs");
      if (savedAcademy) setAcademyRegistrations(JSON.parse(savedAcademy));
    } catch {
      // Fallback silently to defaults
    }
  }, []);

  const persist = (key: string, data: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn("Storage quota exceeded or disabled", e);
    }
  };

  const addAuditLog = (
    action: string,
    actionType: AuditLogItem["actionType"],
    targetEntity: string,
    details: string
  ) => {
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      actorNameEn: user?.nameEn || "Authorized Officer",
      actorNameAr: user?.nameAr || "مسؤول معتمد",
      actorRole: user?.role || "management_member",
      action,
      actionType,
      targetEntity,
      ipAddress: "178.152.12.88 (Doha, Qatar)",
      status: "success",
      details,
    };
    const updated = [newLog, ...auditLogs];
    setAuditLogs(updated);
    persist("qsc_audit_logs", updated);
  };

  const createApplication = (appData: {
    titleEn: string;
    titleAr: string;
    category: ApplicationCategory;
    priority: ApplicationPriority;
    departmentEn: string;
    departmentAr: string;
    descriptionEn: string;
    descriptionAr: string;
    amount?: number;
  }) => {
    const refNum = `QSC-${appData.category.substring(0, 3).toUpperCase()}-2026-${Math.floor(
      100 + Math.random() * 900
    )}`;

    const newApp: Application = {
      id: `app-${Date.now()}`,
      referenceNumber: refNum,
      titleEn: appData.titleEn,
      titleAr: appData.titleAr,
      category: appData.category,
      priority: appData.priority,
      status: "under_review",
      departmentEn: appData.departmentEn,
      departmentAr: appData.departmentAr,
      submittedBy: {
        id: user?.id || "usr-member",
        nameEn: user?.nameEn || "Officer",
        nameAr: user?.nameAr || "مسؤول إداري",
        titleEn: user?.titleEn || "Officer",
        titleAr: user?.titleAr || "مسؤول إداري",
        avatar: user?.avatar || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300",
      },
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      descriptionEn: appData.descriptionEn,
      descriptionAr: appData.descriptionAr,
      amount: appData.amount || 0,
      currency: "QAR",
      workflow: [
        {
          id: `wf-${Date.now()}-1`,
          stepNumber: 1,
          role: "department_manager",
          titleEn: "Department Manager Endorsement",
          titleAr: "اعتماد مدير الإدارة",
          assigneeNameEn: "Eng. Tariq Mansoor Al-Subaey",
          assigneeNameAr: "م. طارق منصور السبيعي",
          status: "current",
        },
        {
          id: `wf-${Date.now()}-2`,
          stepNumber: 2,
          role: "admin_officer",
          titleEn: "Administrative Affairs Verification",
          titleAr: "مراجعة وتدقيق الشؤون الإدارية",
          assigneeNameEn: "Fahad Nasser Al-Hajri",
          assigneeNameAr: "فهد ناصر الهاجري",
          status: "pending",
        },
        {
          id: `wf-${Date.now()}-3`,
          stepNumber: 3,
          role: "general_manager",
          titleEn: "General Manager Endorsement",
          titleAr: "اعتماد المدير العام",
          assigneeNameEn: "Abdulrahman Salem Al-Malki",
          assigneeNameAr: "عبد الرحمن سالم المالكي",
          status: "pending",
          signatureRequired: true,
        },
        {
          id: `wf-${Date.now()}-4`,
          stepNumber: 4,
          role: "president",
          titleEn: "Presidential High Ratification",
          titleAr: "المصادقة الرئاسية العليا والختم الرسمي",
          assigneeNameEn: "H.E. Sheikh Abdullah bin Abdulaziz Al Thani",
          assigneeNameAr: "سعادة الشيخ عبد الله بن عبد العزيز آل ثاني",
          status: "pending",
          signatureRequired: true,
        },
      ],
      attachments: [
        {
          id: `att-${Date.now()}`,
          name: `${refNum}_Proposal_Document.pdf`,
          size: "2.8 MB",
          type: "pdf",
          url: "#",
          uploadedAt: new Date().toISOString(),
        },
      ],
      auditTrail: [
        {
          id: `aud-${Date.now()}`,
          action: "Application Submitted",
          actorEn: user?.nameEn || "Officer",
          actorAr: user?.nameAr || "مسؤول إداري",
          timestamp: new Date().toISOString(),
          notes: "Initial institutional filing through Digital Portal.",
        },
      ],
    };

    const updated = [newApp, ...applications];
    setApplications(updated);
    persist("qsc_apps", updated);

    addAuditLog(
      "Application Created",
      "approval",
      newApp.referenceNumber,
      `Submitted application: ${newApp.titleEn}`
    );

    return newApp;
  };

  const approveWorkflowStep = (applicationId: string, stepId: string, comments?: string) => {
    const updated = applications.map((app) => {
      if (app.id !== applicationId) return app;

      const currentStepIdx = app.workflow.findIndex((s) => s.id === stepId);
      if (currentStepIdx === -1) return app;

      const updatedWorkflow = app.workflow.map((s, idx) => {
        if (s.id === stepId) {
          return {
            ...s,
            status: "approved" as const,
            decisionDate: new Date().toISOString(),
            comments: comments || s.comments || "Approved and endorsed without objections.",
          };
        }
        if (idx === currentStepIdx + 1) {
          return {
            ...s,
            status: "current" as const,
          };
        }
        return s;
      });

      const isLastStep = currentStepIdx === app.workflow.length - 1;
      const nextStatus = isLastStep ? ("approved" as const) : ("under_review" as const);

      const newAudit = {
        id: `aud-${Date.now()}`,
        action: `Step ${currentStepIdx + 1} Approved (${app.workflow[currentStepIdx].titleEn})`,
        actorEn: user?.nameEn || "Approver",
        actorAr: user?.nameAr || "المسؤول المعتمد",
        timestamp: new Date().toISOString(),
        notes: comments || "Approved in workflow.",
      };

      return {
        ...app,
        status: nextStatus,
        updatedAt: new Date().toISOString(),
        workflow: updatedWorkflow,
        auditTrail: [newAudit, ...app.auditTrail],
      };
    });

    setApplications(updated);
    persist("qsc_apps", updated);

    addAuditLog(
      "Workflow Step Approved",
      "approval",
      applicationId,
      `Endorsed step by ${user?.nameEn} with notes: ${comments || "None"}`
    );
  };

  const rejectWorkflowStep = (applicationId: string, stepId: string, comments: string) => {
    const updated = applications.map((app) => {
      if (app.id !== applicationId) return app;

      const updatedWorkflow = app.workflow.map((s) => {
        if (s.id === stepId) {
          return {
            ...s,
            status: "rejected" as const,
            decisionDate: new Date().toISOString(),
            comments,
          };
        }
        return s;
      });

      return {
        ...app,
        status: "rejected" as const,
        updatedAt: new Date().toISOString(),
        workflow: updatedWorkflow,
        auditTrail: [
          {
            id: `aud-${Date.now()}`,
            action: "Application Declined",
            actorEn: user?.nameEn || "Officer",
            actorAr: user?.nameAr || "المسؤول المعتمد",
            timestamp: new Date().toISOString(),
            notes: comments,
          },
          ...app.auditTrail,
        ],
      };
    });

    setApplications(updated);
    persist("qsc_apps", updated);

    addAuditLog("Application Rejected", "approval", applicationId, `Declined with reason: ${comments}`);
  };

  const requestChangesWorkflowStep = (applicationId: string, stepId: string, comments: string) => {
    const updated = applications.map((app) => {
      if (app.id !== applicationId) return app;

      const updatedWorkflow = app.workflow.map((s) => {
        if (s.id === stepId) {
          return {
            ...s,
            status: "changes_requested" as const,
            decisionDate: new Date().toISOString(),
            comments,
          };
        }
        return s;
      });

      return {
        ...app,
        status: "changes_requested" as const,
        updatedAt: new Date().toISOString(),
        workflow: updatedWorkflow,
        auditTrail: [
          {
            id: `aud-${Date.now()}`,
            action: "Changes Requested",
            actorEn: user?.nameEn || "Officer",
            actorAr: user?.nameAr || "المسؤول المعتمد",
            timestamp: new Date().toISOString(),
            notes: comments,
          },
          ...app.auditTrail,
        ],
      };
    });

    setApplications(updated);
    persist("qsc_apps", updated);

    addAuditLog(
      "Changes Requested",
      "approval",
      applicationId,
      `Requested modifications: ${comments}`
    );
  };

  const reassignWorkflowStep = (applicationId: string, stepId: string, newAssigneeName: string) => {
    const updated = applications.map((app) => {
      if (app.id !== applicationId) return app;

      const updatedWorkflow = app.workflow.map((s) => {
        if (s.id === stepId) {
          return {
            ...s,
            assigneeNameEn: newAssigneeName,
            assigneeNameAr: newAssigneeName,
          };
        }
        return s;
      });

      return {
        ...app,
        updatedAt: new Date().toISOString(),
        workflow: updatedWorkflow,
        auditTrail: [
          {
            id: `aud-${Date.now()}`,
            action: `Step Reassigned to ${newAssigneeName}`,
            actorEn: user?.nameEn || "Officer",
            actorAr: user?.nameAr || "المسؤول المعتمد",
            timestamp: new Date().toISOString(),
          },
          ...app.auditTrail,
        ],
      };
    });

    setApplications(updated);
    persist("qsc_apps", updated);

    addAuditLog(
      "Step Reassigned",
      "approval",
      applicationId,
      `Delegated to ${newAssigneeName}`
    );
  };

  const signDocument = (
    signatureId: string,
    signatureDataUrl: string,
    signatureType: "drawn" | "typed" | "certificate"
  ) => {
    const hash =
      "sha256-" +
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15) +
      "9f2e71b";

    const updated = signatures.map((sig) => {
      if (sig.id !== signatureId) return sig;
      return {
        ...sig,
        status: "signed" as const,
        signedAt: new Date().toISOString(),
        signerNameEn: user?.nameEn || "Executive Officer",
        signerNameAr: user?.nameAr || "المسؤول التنفيذي",
        signerTitleEn: user?.titleEn || "Director",
        signerTitleAr: user?.titleAr || "المدير",
        signatureDataUrl,
        signatureType,
        certificateHash: hash,
        ipAddress: "178.152.12.88 (Doha, Qatar)",
        tamperVerified: true,
      };
    });

    setSignatures(updated);
    persist("qsc_sigs", updated);

    addAuditLog(
      "Electronic Signature Executed",
      "signature",
      signatureId,
      `Cryptographic signature (${signatureType}) executed by ${user?.nameEn}. Fingerprint: ${hash}`
    );
  };

  const uploadDocument = (
    doc: Omit<DocumentItem, "id" | "uploadedAt" | "lastModified" | "referenceNumber">
  ) => {
    const newDoc: DocumentItem = {
      ...doc,
      id: `doc-${Date.now()}`,
      referenceNumber: `QSC-DOC-2026-${Math.floor(100 + Math.random() * 900)}`,
      uploadedAt: new Date().toISOString().substring(0, 10),
      lastModified: new Date().toISOString().substring(0, 10),
    };

    const updated = [newDoc, ...documents];
    setDocuments(updated);
    persist("qsc_docs", updated);

    addAuditLog(
      "Document Archived",
      "document",
      newDoc.referenceNumber,
      `Uploaded: ${newDoc.titleEn} (${newDoc.classification})`
    );
  };

  const createTask = (task: Omit<TaskItem, "id" | "createdAt" | "progressPercentage">) => {
    const newTask: TaskItem = {
      ...task,
      id: `tsk-${Date.now()}`,
      createdAt: new Date().toISOString().substring(0, 10),
      progressPercentage: 0,
    };

    const updated = [newTask, ...tasks];
    setTasks(updated);
    persist("qsc_tasks", updated);

    addAuditLog("Task Assigned", "task", newTask.id, `Created task: ${newTask.titleEn}`);
  };

  const updateTaskStatus = (taskId: string, status: TaskItem["status"]) => {
    const updated = tasks.map((t) => {
      if (t.id !== taskId) return t;
      const progress = status === "completed" ? 100 : status === "under_review" ? 85 : 50;
      return { ...t, status, progressPercentage: progress };
    });
    setTasks(updated);
    persist("qsc_tasks", updated);
  };

  const createMeeting = (meeting: Omit<MeetingItem, "id">) => {
    const newMeeting: MeetingItem = {
      ...meeting,
      id: `mtg-${Date.now()}`,
    };
    const updated = [newMeeting, ...meetings];
    setMeetings(updated);
    persist("qsc_meetings", updated);

    addAuditLog("Meeting Convened", "auth", newMeeting.id, `Scheduled: ${newMeeting.titleEn}`);
  };

  const markNotificationRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    setNotifications(updated);
    persist("qsc_notifs", updated);
  };

  const markAllNotificationsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    persist("qsc_notifs", updated);
  };

  const resetToInitialData = () => {
    setApplications(INITIAL_APPLICATIONS);
    setDocuments(INITIAL_DOCUMENTS);
    setSignatures(INITIAL_SIGNATURES);
    setTasks(INITIAL_TASKS);
    setMeetings(INITIAL_MEETINGS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setAcademyRegistrations(INITIAL_ACADEMY_REGISTRATIONS);
    localStorage.clear();
  };

  // ==========================================
  // ACADEMY ACTIONS
  // ==========================================

  const registerAcademyApplicant = async (
    data: Omit<
      AcademyRegistration,
      | "id"
      | "status"
      | "submittedAt"
      | "updatedAt"
      | "verificationHash"
      | "isMedicalCleared"
      | "paidAmountQar"
    >
  ): Promise<AcademyRegistration> => {
    const newId = generateAcademyApplicationId();
    const timestamp = new Date().toISOString().replace("T", " ").substring(0, 16);
    const hash = `sha256-${Math.random().toString(36).substring(2, 10)}${Date.now().toString(36)}`;

    const newRecord: AcademyRegistration = {
      ...data,
      id: newId,
      status: "pending",
      paymentStatus: "unpaid",
      paidAmountQar: 0,
      isMedicalCleared: false,
      submittedAt: timestamp,
      updatedAt: timestamp,
      verificationHash: hash,
    };

    setAcademyRegistrations((prev) => {
      const updated = [newRecord, ...prev];
      persist("qsc_academy_regs", updated);
      return updated;
    });

    addAuditLog(
      `Academy Registration Submitted: ${newId} (${data.player.fullNameEn})`,
      "academy",
      newId,
      `Program: ${data.sportId.toUpperCase()} (${data.ageGroup.toUpperCase()}) - Guardian: ${data.guardian.guardianNameEn}`
    );

    return newRecord;
  };

  const updateAcademyApplicationStatus = (
    id: string,
    status: AcademyRegistrationStatus,
    internalNotes?: string,
    rejectionReason?: string
  ) => {
    const timestamp = new Date().toISOString().replace("T", " ").substring(0, 16);

    setAcademyRegistrations((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status,
            rejectionReason: rejectionReason ?? item.rejectionReason,
            internalNotes: internalNotes
              ? `${item.internalNotes ? item.internalNotes + " | " : ""}${internalNotes}`
              : item.internalNotes,
            updatedAt: timestamp,
            verifiedBy: user ? `${user.nameEn} (${user.role})` : item.verifiedBy,
          };
        }
        return item;
      });
      persist("qsc_academy_regs", updated);
      return updated;
    });

    addAuditLog(
      `Academy Application Status Updated: ${id} -> ${status.toUpperCase()}`,
      "academy",
      id,
      `Updated by ${user?.nameEn || "Authorized Officer"}${rejectionReason ? ` - Reason: ${rejectionReason}` : ""}`
    );
  };

  const updateAcademyMedicalClearance = (id: string, isCleared: boolean, notes?: string) => {
    const timestamp = new Date().toISOString().replace("T", " ").substring(0, 16);

    setAcademyRegistrations((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isMedicalCleared: isCleared,
            medicalClearanceNotes: notes ?? item.medicalClearanceNotes,
            status: isCleared && item.status === "medical_pending" ? "under_review" : item.status,
            updatedAt: timestamp,
          };
        }
        return item;
      });
      persist("qsc_academy_regs", updated);
      return updated;
    });

    addAuditLog(
      `Academy Medical Clearance: ${id} -> ${isCleared ? "CLEARED" : "FLAGGED"}`,
      "academy",
      id,
      notes || "Sports Medicine Medical Assessment Updated"
    );
  };

  const updateAcademyPaymentStatus = (
    id: string,
    paymentStatus: "unpaid" | "partial" | "verified",
    paidAmountQar?: number,
    method?: "card" | "bank_transfer" | "cash_counter",
    ref?: string
  ) => {
    const timestamp = new Date().toISOString().replace("T", " ").substring(0, 16);

    setAcademyRegistrations((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id) {
          const finalPaid = paidAmountQar !== undefined ? paidAmountQar : item.totalFeeQar;
          return {
            ...item,
            paymentStatus,
            paidAmountQar: finalPaid,
            paymentMethod: method ?? item.paymentMethod,
            paymentReference: ref ?? item.paymentReference,
            status:
              paymentStatus === "verified" && (item.status === "payment_pending" || item.status === "approved")
                ? "approved"
                : item.status,
            updatedAt: timestamp,
          };
        }
        return item;
      });
      persist("qsc_academy_regs", updated);
      return updated;
    });

    addAuditLog(
      `Academy Payment Updated: ${id} -> ${paymentStatus.toUpperCase()}`,
      "academy",
      id,
      `Amount: QAR ${paidAmountQar ?? "Full"} - Method: ${method || "Standard"} - Ref: ${ref || "N/A"}`
    );
  };

  const assignAcademyCoachAndGroup = (id: string, coachName: string, groupName: string) => {
    const timestamp = new Date().toISOString().replace("T", " ").substring(0, 16);

    setAcademyRegistrations((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            assignedCoach: coachName,
            assignedGroup: groupName,
            updatedAt: timestamp,
          };
        }
        return item;
      });
      persist("qsc_academy_regs", updated);
      return updated;
    });

    addAuditLog(
      `Academy Coach & Group Assigned: ${id}`,
      "academy",
      id,
      `Coach: ${coachName} - Group: ${groupName}`
    );
  };

  const addAcademyInternalNote = (id: string, note: string) => {
    const timestamp = new Date().toISOString().replace("T", " ").substring(0, 16);

    setAcademyRegistrations((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            internalNotes: item.internalNotes ? `${item.internalNotes}\n[${timestamp}] ${note}` : `[${timestamp}] ${note}`,
            updatedAt: timestamp,
          };
        }
        return item;
      });
      persist("qsc_academy_regs", updated);
      return updated;
    });
  };

  const pendingAcademyCount = academyRegistrations.filter(
    (a) => a.status === "pending" || a.status === "under_review" || a.status === "medical_pending"
  ).length;

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <PortalDataContext.Provider
      value={{
        applications,
        documents,
        signatures,
        tasks,
        meetings,
        notifications,
        auditLogs,
        unreadNotificationsCount,
        academyRegistrations,
        pendingAcademyCount,
        registerAcademyApplicant,
        updateAcademyApplicationStatus,
        updateAcademyMedicalClearance,
        updateAcademyPaymentStatus,
        assignAcademyCoachAndGroup,
        addAcademyInternalNote,
        createApplication,
        approveWorkflowStep,
        rejectWorkflowStep,
        requestChangesWorkflowStep,
        reassignWorkflowStep,
        signDocument,
        uploadDocument,
        createTask,
        updateTaskStatus,
        createMeeting,
        markNotificationRead,
        markAllNotificationsRead,
        resetToInitialData,
      }}
    >
      {children}
    </PortalDataContext.Provider>
  );
}

export function usePortalData() {
  const context = useContext(PortalDataContext);
  if (!context) {
    throw new Error("usePortalData must be used within a PortalDataProvider");
  }
  return context;
}
