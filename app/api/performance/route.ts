import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// GET /api/performance - Performance-Metriken abrufen
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const performance = {
      overview: {
        engagement: "4.2%",
        reach: "45.2K",
        impressions: "128.5K",
        growth: "+12.3%"
      },
      platforms: {
        instagram: {
          followers: "12.4K",
          engagement: "4.2%",
          posts: 245
        },
        facebook: {
          followers: "8.2K",
          engagement: "3.1%",
          posts: 180
        }
      },
      trends: [
        {
          metric: "Engagement",
          change: "+15%",
          recommendation: "Mehr Video-Content"
        }
      ]
    };

    return NextResponse.json(performance);
  } catch (error) {
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}