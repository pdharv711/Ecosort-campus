// app/api/classify/route.ts
// Server-side API route — AI classification endpoint

import { NextRequest, NextResponse } from "next/server";
import { classifyWaste } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const item: string = typeof body?.item === "string" ? body.item.trim() : "";

    if (!item) {
      return NextResponse.json(
        { error: "Please enter a waste item to classify." },
        { status: 400 }
      );
    }

    if (item.length > 500) {
      return NextResponse.json(
        { error: "Input is too long. Please describe the waste item in fewer than 500 characters." },
        { status: 400 }
      );
    }

    const result = await classifyWaste(item);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/classify] Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
