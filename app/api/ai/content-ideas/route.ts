import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { generateContentIdeas } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const { prompt } = await req.json();
    const ideas = await generateContentIdeas(prompt);

    return NextResponse.json(ideas);
  } catch (error) {
    return NextResponse.json({ error: "Fehler bei der Content-Generierung" }, { status: 500 });
  }
}