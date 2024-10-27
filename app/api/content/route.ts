import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// GET /api/content - Liste aller Inhalte
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const contents = await prisma.content.findMany({
      where: {
        campaign: {
          userId: session.user.id,
        },
      },
      include: {
        campaign: true,
        calendarEvents: true,
      },
    });

    return NextResponse.json(contents);
  } catch (error) {
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}

// POST /api/content - Neuen Inhalt erstellen
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const data = await req.json();
    const content = await prisma.content.create({
      data,
      include: {
        campaign: true,
        calendarEvents: true,
      },
    });

    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}