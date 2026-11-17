import { NextResponse } from "next/server";
import { INITIAL_ACADEMY_REGISTRATIONS } from "@/lib/academyData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ success: false, error: "Missing application ID reference" }, { status: 400 });
  }

  // Look up record without returning private medical details or full passport
  const record = INITIAL_ACADEMY_REGISTRATIONS.find((r) => r.id === id);

  if (!record) {
    return NextResponse.json(
      {
        success: false,
        verified: false,
        message: "Record not found in official Qatar Sports Club Registry",
      },
      { status: 404 }
    );
  }

  // Safe public verification projection (no sensitive minor medical/QID info)
  return NextResponse.json({
    success: true,
    verified: true,
    applicationId: record.id,
    sportId: record.sportId,
    ageGroup: record.ageGroup,
    status: record.status,
    isMedicalCleared: record.isMedicalCleared,
    submittedAt: record.submittedAt,
    institution: "Qatar Sports Club (The Kings) — Suheim bin Hamad Stadium",
    hashVerification: record.verificationHash,
  });
}
