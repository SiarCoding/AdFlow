import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await req.json();

    // Update user profile with business information
    const user = await prisma.user.update({
      where: { userId },
      data: {
        company: data.name,
        // Add other business fields as needed
      }
    });

    // Generate initial AI recommendations based on business type and goals
    const aiRecommendations = await generateInitialRecommendations(data);

    return NextResponse.json({
      success: true,
      recommendations: aiRecommendations
    });
  } catch (error) {
    console.error("Business onboarding error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

async function generateInitialRecommendations(businessData: any) {
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

  const prompt = `As a social media marketing expert, provide recommendations for:
    Business Type: ${businessData.businessType}
    Industry: ${businessData.industry}
    Goals: ${businessData.goals.join(", ")}
    
    Include:
    - Content strategy
    - Posting schedule
    - Platform focus
    - Key metrics to track`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error("AI recommendation error:", error);
    return null;
  }
}