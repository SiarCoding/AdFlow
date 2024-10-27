import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { generateContentCalendar } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const { businessType, goals } = await req.json();
    const calendar = await generateContentCalendar(businessType, goals);

    return NextResponse.json(calendar);
  } catch (error) {
    return NextResponse.json({ error: "Fehler bei der Kalender-Generierung" }, { status: 500 });
  }
}