import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

// GET /api/campaigns/[id] - Details einer Kampagne
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const campaign = await prisma.campaign.findUnique({
      where: {
        id: parseInt(params.id),
        userId: session.user.id,
      },
      include: {
        contents: true,
      },
    });

    if (!campaign) {
      return NextResponse.json({ error: "Kampagne nicht gefunden" }, { status: 404 });
    }

    return NextResponse.json(campaign);
  } catch (error) {
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}

// PUT /api/campaigns/[id] - Kampagne aktualisieren
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const data = await req.json();
    const campaign = await prisma.campaign.update({
      where: {
        id: parseInt(params.id),
        userId: session.user.id,
      },
      data,
    });

    return NextResponse.json(campaign);
  } catch (error) {
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}

// DELETE /api/campaigns/[id] - Kampagne löschen
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    await prisma.campaign.delete({
      where: {
        id: parseInt(params.id),
        userId: session.user.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}