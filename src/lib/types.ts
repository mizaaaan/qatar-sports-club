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
  actionType: "auth" | "approval" | "signature" | "document" | "task" | "security" | "academy";
  targetEntity: string;
  ipAddress: string;
  status: "success" | "warning" | "failure";
  details: string;
}

// ==========================================
// YOUTH SPORTS ACADEMY TYPES
// ==========================================

export type AcademySportId =
  | "football"
  | "swimming"
  | "basketball"
  | "table_tennis"
  | "martial_arts";

export type AcademyAgeGroup = "u7" | "u10" | "u14" | "u18";

export type AcademyRegistrationStatus =
  | "pending"
  | "under_review"
  | "approved"
  | "rejected"
  | "medical_pending"
  | "payment_pending"
  | "payment_verified"
  | "waitlisted";

export interface AcademyProgram {
  id: string;
  sportId: AcademySportId;
  ageGroup: AcademyAgeGroup;
  titleEn: string;
  titleAr: string;
  ageRange: string;
  scheduleEn: string;
  scheduleAr: string;
  timingEn: string;
  timingAr: string;
  locationEn: string;
  locationAr: string;
  monthlyFeeQar: number;
  seasonFeeQar: number;
  capacity: number;
  enrolledCount: number;
  leadCoachEn: string;
  leadCoachAr: string;
  coachLicenseEn: string;
  coachLicenseAr: string;
  prerequisitesEn: string;
  prerequisitesAr: string;
  uniformIncluded: boolean;
}

export interface AcademySport {
  id: AcademySportId;
  nameEn: string;
  nameAr: string;
  taglineEn: string;
  taglineAr: string;
  descriptionEn: string;
  descriptionAr: string;
  iconName: string;
  venueEn: string;
  venueAr: string;
  badgeColor: string;
  programs: AcademyProgram[];
}

export interface AcademyPlayerInfo {
  fullNameEn: string;
  fullNameAr: string;
  dateOfBirth: string;
  gender: "male" | "female";
  nationalityEn: string;
  nationalityAr: string;
  qidOrPassport: string;
  schoolNameEn?: string;
  schoolNameAr?: string;
  previousExperienceEn?: string;
  previousExperienceAr?: string;
  jerseySize: "XS" | "S" | "M" | "L" | "XL";
}

export interface AcademyGuardianInfo {
  guardianNameEn: string;
  guardianNameAr: string;
  relationship: "father" | "mother" | "legal_guardian" | "other";
  qidOrPassport: string;
  phone: string;
  whatsapp: string;
  email: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyRelationship: string;
}

export interface AcademyMedicalDeclaration {
  hasMedicalConditions: boolean;
  conditionsDescription?: string;
  hasAllergies: boolean;
  allergiesDescription?: string;
  takingRegularMedication: boolean;
  medicationDetails?: string;
  previousInjuriesOrSurgeries?: string;
  physicalLimitations?: string;
  bloodType?: string;
  consentToEmergencyMedicalCare: boolean;
}

export interface AcademyUploadedDocuments {
  playerPhotoUrl?: string;
  playerPhotoName?: string;
  qidOrPassportFrontUrl?: string;
  qidOrPassportFrontName?: string;
  qidOrPassportBackUrl?: string;
  qidOrPassportBackName?: string;
  birthCertificateUrl?: string;
  birthCertificateName?: string;
  medicalFitnessCertUrl?: string;
  medicalFitnessCertName?: string;
}

export interface AcademyRegistration {
  id: string; // e.g. "QSC-ACAD-2026-0001"
  sportId: AcademySportId;
  programId: string;
  ageGroup: AcademyAgeGroup;
  player: AcademyPlayerInfo;
  guardian: AcademyGuardianInfo;
  medical: AcademyMedicalDeclaration;
  documents: AcademyUploadedDocuments;
  status: AcademyRegistrationStatus;
  paymentStatus: "unpaid" | "partial" | "verified";
  paidAmountQar: number;
  totalFeeQar: number;
  paymentMethod?: "card" | "bank_transfer" | "cash_counter";
  paymentReference?: string;
  assignedCoach?: string;
  assignedGroup?: string;
  rejectionReason?: string;
  medicalClearanceNotes?: string;
  isMedicalCleared: boolean;
  internalNotes?: string;
  submittedAt: string;
  updatedAt: string;
  verifiedBy?: string;
  verificationHash: string;
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
