import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Initialize Instagram Graph API client
    const response = await fetch(`https://graph.facebook.com/v18.0/oauth/access_token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    // Store the connection in our database
    await prisma.socialAccount.create({
      data: {
        platform: "instagram",
        accountId: data.id,
        accessToken: data.access_token,
        userId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Instagram connection error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}