import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { generateAudienceInsights } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const audienceData = await req.json();
    const insights = await generateAudienceInsights(audienceData);

    return NextResponse.json(insights);
  } catch (error) {
    return NextResponse.json({ error: "Fehler bei der Zielgruppen-Analyse" }, { status: 500 });
  }
}