import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { generateCaptions } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const { imageContext, tone } = await req.json();
    const captions = await generateCaptions(imageContext, tone);

    return NextResponse.json(captions);
  } catch (error) {
    return NextResponse.json({ error: "Fehler bei der Caption-Generierung" }, { status: 500 });
  }
}