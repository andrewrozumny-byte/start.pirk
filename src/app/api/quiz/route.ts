import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      procedure,
      location,
      priceTransparency,
      paymentPlans,
      timeSpent,
      consultations,
      consultationSurgeonName,
      priorities,
      confidence,
      budget,
      requirements,
      travelWillingness,
      anythingElse,
    } = body;

    // 1. Create client record with source="quiz"
    const client = await prisma.client.create({
      data: {
        name: name || "Unknown",
        email: email || "",
        phone: phone || "",
        procedure: procedure || "",
        location: location || "",
        state: location || "",
        budget: budget || "",
        priorities: JSON.stringify(priorities || []),
        requirements: JSON.stringify(requirements || []),
        source: "quiz",
        tier: "free",
        priceTransparency: priceTransparency || "",
        paymentPlanImportance: paymentPlans || "",
        timeSpentResearching: timeSpent || "",
        consultationStatus: consultations || "",
        previousConsults: consultationSurgeonName || "",
        confidence: confidence || "",
        travelWillingness: travelWillingness || "",
        additionalNotes: anythingElse || "",
      },
    });

    // 2. Create a pending match record
    const match = await prisma.match.create({
      data: {
        clientId: client.id,
        status: "pending",
        tier: "free",
      },
    });

    return NextResponse.json({ matchId: match.id });
  } catch (error) {
    console.error("Quiz submission error:", error);
    return NextResponse.json(
      { error: "Failed to process quiz submission" },
      { status: 500 }
    );
  }
}
