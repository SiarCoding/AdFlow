import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// GET /api/analytics - Analyseberichte abrufen
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const reports = await prisma.analyticsReport.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(reports);
  } catch (error) {
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}

// POST /api/analytics - Neuen Analysebericht erstellen
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const data = await req.json();
    const report = await prisma.analyticsReport.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    });

    return NextResponse.json(report);
  } catch (error) {
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}