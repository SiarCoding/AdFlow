import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Initialize TikTok API client
    const response = await fetch(`https://open-api.tiktok.com/oauth/access_token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    // Store the connection in our database
    await prisma.socialAccount.create({
      data: {
        platform: "tiktok",
        accountId: data.open_id,
        accessToken: data.access_token,
        userId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("TikTok connection error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}