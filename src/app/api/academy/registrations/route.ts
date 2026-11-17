import { NextResponse } from "next/server";
import { INITIAL_ACADEMY_REGISTRATIONS } from "@/lib/academyData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sport = searchParams.get("sport");
  const status = searchParams.get("status");
  const ageGroup = searchParams.get("ageGroup");

  let results = [...INITIAL_ACADEMY_REGISTRATIONS];

  if (sport && sport !== "all") {
    results = results.filter((r) => r.sportId === sport);
  }
  if (status && status !== "all") {
    results = results.filter((r) => r.status === status);
  }
  if (ageGroup && ageGroup !== "all") {
    results = results.filter((r) => r.ageGroup === ageGroup);
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    data: results,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic server-side validation
    if (!body.player?.fullNameEn || !body.player?.qidOrPassport || !body.guardian?.phone) {
      return NextResponse.json(
        { success: false, error: "Missing required player or guardian parameters" },
        { status: 400 }
      );
    }

    // Duplicate check on QID
    const duplicate = INITIAL_ACADEMY_REGISTRATIONS.find(
      (r) =>
        r.player.qidOrPassport.trim().toLowerCase() === body.player.qidOrPassport.trim().toLowerCase() &&
        r.sportId === body.sportId
    );

    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          error: "A registration record already exists with this Qatar ID for the selected sport discipline.",
          existingApplicationId: duplicate.id,
        },
        { status: 409 }
      );
    }

    const year = new Date().getFullYear();
    const newId = `QSC-ACAD-${year}-${Math.floor(1000 + Math.random() * 9000)}`;

    return NextResponse.json(
      {
        success: true,
        message: "Enrollment application validated and registered",
        applicationId: newId,
        status: "pending",
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Malformed payload or internal processing error" },
      { status: 500 }
    );
  }
}
