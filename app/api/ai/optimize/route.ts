import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { optimizeContent } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const content = await req.json();
    const optimization = await optimizeContent(content);

    return NextResponse.json(optimization);
  } catch (error) {
    return NextResponse.json({ error: "Fehler bei der Optimierung" }, { status: 500 });
  }
}