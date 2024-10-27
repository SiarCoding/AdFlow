import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { predictPerformance } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const contentData = await req.json();
    const prediction = await predictPerformance(contentData);

    return NextResponse.json(prediction);
  } catch (error) {
    return NextResponse.json({ error: "Fehler bei der Performance-Vorhersage" }, { status: 500 });
  }
}