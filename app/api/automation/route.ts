import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// GET /api/automation - Liste aller Automatisierungsregeln
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const rules = await prisma.automationRule.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json(rules);
  } catch (error) {
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}

// POST /api/automation - Neue Automatisierungsregel erstellen
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const data = await req.json();
    const rule = await prisma.automationRule.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    });

    return NextResponse.json(rule);
  } catch (error) {
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}