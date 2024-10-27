import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import {
  analyzeGoogleTrends,
  analyzeTikTokTrends,
  analyzeFacebookTrends,
  analyzeBusinessTrends,
  analyzeContentTrends,
  generateTrendBasedContent
} from "@/lib/trends";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const { industry } = await req.json();

    // Parallele Ausführung aller Trend-Analysen
    const [
      googleTrends,
      tiktokTrends,
      facebookTrends,
      businessTrends,
      contentTrends
    ] = await Promise.all([
      analyzeGoogleTrends(industry),
      analyzeTikTokTrends(industry),
      analyzeFacebookTrends(industry),
      analyzeBusinessTrends(industry),
      analyzeContentTrends(industry)
    ]);

    // Generiere Content-Vorschläge basierend auf den Trends
    const contentSuggestions = await generateTrendBasedContent(
      {
        googleTrends,
        tiktokTrends,
        facebookTrends,
        contentTrends
      },
      industry,
      "all"
    );

    return NextResponse.json({
      trends: {
        google: googleTrends,
        tiktok: tiktokTrends,
        facebook: facebookTrends,
        business: businessTrends,
        content: contentTrends
      },
      contentSuggestions
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Fehler bei der Trend-Analyse" },
      { status: 500 }
    );
  }
}