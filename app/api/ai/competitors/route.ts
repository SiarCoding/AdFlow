import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { analyzeCompetitors } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const competitorData = await req.json();
    const analysis = await analyzeCompetitors(competitorData);

    return NextResponse.json(analysis);
  } catch (error) {
    return NextResponse.json({ error: "Fehler bei der Wettbewerbsanalyse" }, { status: 500 });
  }
}