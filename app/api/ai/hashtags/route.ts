import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { optimizeHashtags } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const { content, industry } = await req.json();
    const hashtags = await optimizeHashtags(content, industry);

    return NextResponse.json(hashtags);
  } catch (error) {
    return NextResponse.json({ error: "Fehler bei der Hashtag-Optimierung" }, { status: 500 });
  }
}