import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// GET /api/strategy - Marketing-Strategieempfehlungen abrufen
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const strategy = {
      marketingGoals: {
        primary: "Markenbekanntheit",
        secondary: ["Engagement", "Conversions"],
        timeline: "Q1-Q2 2024"
      },
      targetAudience: {
        demographics: {
          age: "25-45",
          interests: ["Mode", "Lifestyle"],
          behavior: "Online-Shopping"
        }
      },
      recommendations: [
        {
          type: "Content",
          description: "Mehr Video-Content produzieren",
          priority: "Hoch"
        }
      ]
    };

    return NextResponse.json(strategy);
  } catch (error) {
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}

// POST /api/strategy - Neue Strategie erstellen/aktualisieren
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const data = await req.json();
    const strategy = await prisma.marketingStrategy.create({
      data: {
        ...data,
        userId: session.user.id
      }
    });

    return NextResponse.json(strategy);
  } catch (error) {
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}