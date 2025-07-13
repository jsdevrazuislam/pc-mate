import { NextResponse } from "next/server";
import { generatePCBuildRecommendation } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API key not configured");
    }

    const requestData: PCBuilderRequest = await req.json();

    if (
      !requestData.budget ||
      !requestData.currency ||
      !requestData.location ||
      !requestData.usages
    ) {
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
    }

    const recommendation = await generatePCBuildRecommendation(
      requestData,
      apiKey
    );
    return NextResponse.json(recommendation);
  } catch (error) {
    console.error("PC Build API error:", error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
}
