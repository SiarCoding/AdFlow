import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { analyzeTrendAlerts } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const { industry, currentTrends } = await req.json();
    const alerts = await analyzeTrendAlerts(industry, currentTrends);

    return NextResponse.json(alerts);
  } catch (error) {
    return NextResponse.json(
      { error: "Fehler bei der Trend-Analyse" },
      { status: 500 }
    );
  }
}