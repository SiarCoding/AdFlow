import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { generateCommunityResponses } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const interaction = await req.json();
    const responses = await generateCommunityResponses(interaction);

    return NextResponse.json(responses);
  } catch (error) {
    return NextResponse.json({ error: "Fehler bei der Antwortgenerierung" }, { status: 500 });
  }
}