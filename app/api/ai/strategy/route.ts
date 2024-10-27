import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { generateMarketingStrategy } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const businessInfo = await req.json();
    const strategy = await generateMarketingStrategy(businessInfo);

    return NextResponse.json(strategy);
  } catch (error) {
    return NextResponse.json({ error: "Fehler bei der Strategieentwicklung" }, { status: 500 });
  }
}