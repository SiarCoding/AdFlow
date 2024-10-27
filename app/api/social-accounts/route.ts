import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// GET /api/social-accounts - Liste aller Social Media Accounts
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const accounts = await prisma.socialAccount.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json(accounts);
  } catch (error) {
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}

// POST /api/social-accounts - Neuen Social Media Account verbinden
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const data = await req.json();
    const account = await prisma.socialAccount.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    });

    return NextResponse.json(account);
  } catch (error) {
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}