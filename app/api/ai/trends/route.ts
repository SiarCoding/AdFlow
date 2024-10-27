import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { analyzeTrends } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const { industry } = await req.json();
    const trends = await analyzeTrends(industry);

    return NextResponse.json(trends);
  } catch (error) {
    return NextResponse.json({ error: "Fehler bei der Trend-Analyse" }, { status: 500 });
  }
}