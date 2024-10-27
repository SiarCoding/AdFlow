import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export async function optimizeCampaign(campaignId: number, userId: string) {
  try {
    // Get campaign data
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId, userId },
      include: {
        contents: true
      }
    });

    if (!campaign) throw new Error('Campaign not found');

    // Analyze performance
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Analyze and optimize this marketing campaign:
    
    Campaign Data: ${JSON.stringify(campaign)}
    
    Provide:
    - Performance analysis
    - Optimization recommendations
    - Budget allocation suggestions
    - Targeting improvements`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    const optimization = JSON.parse(response.text());

    // Store optimization results
    await prisma.campaignOptimization.create({
      data: {
        campaignId,
        recommendations: optimization,
        status: 'pending',
        userId
      }
    });

    return optimization;
  } catch (error) {
    console.error('Campaign optimization error:', error);
    throw error;
  }
}