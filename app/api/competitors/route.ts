import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// GET /api/competitors - Liste aller Wettbewerber
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const competitors = await prisma.competitor.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json(competitors);
  } catch (error) {
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}

// POST /api/competitors - Neuen Wettbewerber hinzufügen
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const data = await req.json();
    const competitor = await prisma.competitor.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    });

    return NextResponse.json(competitor);
  } catch (error) {
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}