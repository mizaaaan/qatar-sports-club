export type Role =
  | "super_admin"
  | "president"
  | "vice_president"
  | "board_member"
  | "general_manager"
  | "hr_manager"
  | "admin_officer"
  | "department_manager"
  | "management_member";

export interface User {
  id: string;
  nameEn: string;
  nameAr: string;
  titleEn: string;
  titleAr: string;
  role: Role;
  departmentEn: string;
  departmentAr: string;
  email: string;
  phone: string;
  avatar: string;
  badgeNumber: string;
  mfaEnabled: boolean;
}

export type ApplicationCategory =
  | "administrative"
  | "leave"
  | "purchase"
  | "financial"
  | "permission"
  | "maintenance"
  | "general";

export type ApplicationPriority = "low" | "medium" | "high" | "urgent";

export type ApplicationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "pending_signature"
  | "approved"
  | "rejected"
  | "changes_requested";

export interface WorkflowStep {
  id: string;
  stepNumber: number;
  role: Role;
  titleEn: string;
  titleAr: string;
  assigneeNameEn: string;
  assigneeNameAr: string;
  status: "pending" | "current" | "approved" | "rejected" | "changes_requested" | "skipped";
  decisionDate?: string;
  comments?: string;
  signatureRequired?: boolean;
  signatureUrl?: string;
  signedAt?: string;
}

export interface ApplicationAttachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface Application {
  id: string;
  referenceNumber: string;
  titleEn: string;
  titleAr: string;
  category: ApplicationCategory;
  priority: ApplicationPriority;
  status: ApplicationStatus;
  departmentEn: string;
  departmentAr: string;
  submittedBy: {
    id: string;
    nameEn: string;
    nameAr: string;
    titleEn: string;
    titleAr: string;
    avatar: string;
  };
  submittedAt: string;
  updatedAt: string;
  descriptionEn: string;
  descriptionAr: string;
  amount?: number;
  currency?: string;
  workflow: WorkflowStep[];
  attachments: ApplicationAttachment[];
  auditTrail: {
    id: string;
    action: string;
    actorEn: string;
    actorAr: string;
    timestamp: string;
    notes?: string;
  }[];
}

export interface DocumentItem {
  id: string;
  titleEn: string;
  titleAr: string;
  referenceNumber: string;
  category: "governance" | "finance" | "contracts" | "administrative" | "circulars" | "sports";
  departmentEn: string;
  departmentAr: string;
  classification: "public" | "internal" | "confidential" | "strictly_confidential";
  fileType: "pdf" | "docx" | "xlsx";
  fileSize: string;
  version: string;
  uploadedBy: string;
  uploadedAt: string;
  lastModified: string;
  status: "draft" | "active" | "archived" | "superseded";
  downloadUrl: string;
  descriptionEn: string;
  descriptionAr: string;
}

export interface SignatureRecord {
  id: string;
  documentTitleEn: string;
  documentTitleAr: string;
  referenceNumber: string;
  documentCategory: string;
  status: "pending" | "signed" | "declined" | "expired";
  requestedByEn: string;
  requestedByAr: string;
  requestedAt: string;
  deadline: string;
  documentUrl: string;
  signedAt?: string;
  signerNameEn?: string;
  signerNameAr?: string;
  signerTitleEn?: string;
  signerTitleAr?: string;
  signatureDataUrl?: string;
  signatureType?: "drawn" | "typed" | "certificate";
  certificateHash?: string;
  ipAddress?: string;
  tamperVerified?: boolean;
}

export interface TaskItem {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "todo" | "in_progress" | "under_review" | "completed";
  assignedTo: {
    id: string;
    nameEn: string;
    nameAr: string;
    avatar: string;
    role: Role;
  };
  createdBy: string;
  dueDate: string;
  createdAt: string;
  departmentEn: string;
  departmentAr: string;
  progressPercentage: number;
}

export interface MeetingItem {
  id: string;
  titleEn: string;
  titleAr: string;
  date: string;
  time: string;
  duration: string;
  locationEn: string;
  locationAr: string;
  type: "board" | "executive" | "departmental" | "emergency";
  status: "upcoming" | "completed" | "rescheduled" | "cancelled";
  chairpersonEn: string;
  chairpersonAr: string;
  attendees: {
    id: string;
    nameEn: string;
    nameAr: string;
    titleEn: string;
    titleAr: string;
    avatar: string;
    status: "accepted" | "declined" | "pending";
  }[];
  agendaEn: string[];
  agendaAr: string[];
  minutesEn?: string;
  minutesAr?: string;
  decisionsEn?: string[];
  decisionsAr?: string[];
}

export interface NotificationItem {
  id: string;
  titleEn: string;
  titleAr: string;
  messageEn: string;
  messageAr: string;
  timestamp: string;
  read: boolean;
  type: "approval" | "signature" | "meeting" | "task" | "system";
  linkUrl: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actorNameEn: string;
  actorNameAr: string;
  actorRole: Role;
  action: string;
  actionType: "auth" | "approval" | "signature" | "document" | "task" | "security";
  targetEntity: string;
  ipAddress: string;
  status: "success" | "warning" | "failure";
  details: string;
}

export interface OrgNode {
  id: string;
  nameEn: string;
  nameAr: string;
  titleEn: string;
  titleAr: string;
  departmentEn: string;
  departmentAr: string;
  role: Role;
  avatar: string;
  email: string;
  phone: string;
  term?: string;
  bioEn?: string;
  bioAr?: string;
  children?: OrgNode[];
}

export interface AnnouncementItem {
  id: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  date: string;
  summaryEn: string;
  summaryAr: string;
  contentEn: string;
  contentAr: string;
  featured: boolean;
  decreeNumber?: string;
  authorEn: string;
  authorAr: string;
}
