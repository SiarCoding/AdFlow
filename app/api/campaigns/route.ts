import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// GET /api/campaigns - Liste aller Kampagnen
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const campaigns = await prisma.campaign.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        contents: true,
      },
    });

    return NextResponse.json(campaigns);
  } catch (error) {
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}

// POST /api/campaigns - Neue Kampagne erstellen
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const data = await req.json();
    const campaign = await prisma.campaign.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    });

    return NextResponse.json(campaign);
  } catch (error) {
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}