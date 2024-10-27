import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export async function analyzeCampaignPerformance(
  campaignId: number,
  userId: string
) {
  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      include: {
        contents: true
      }
    });

    if (!campaign) throw new Error('Campaign not found');

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Analyze this marketing campaign performance:
    
    Campaign: ${JSON.stringify(campaign)}
    
    Provide:
    1. Performance metrics analysis
    2. ROI calculation
    3. Content effectiveness
    4. Audience response
    5. Improvement recommendations
    
    Format as JSON with:
    - metrics: key performance indicators
    - roi: return on investment analysis
    - content: content performance analysis
    - audience: audience response analysis
    - recommendations: improvement suggestions`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = JSON.parse(response.text());

    // Store analysis results
    await prisma.campaignAnalysis.create({
      data: {
        campaignId,
        userId,
        analysis,
        timestamp: new Date()
      }
    });

    return analysis;
  } catch (error) {
    console.error('Campaign analysis error:', error);
    throw error;
  }
}

export async function generateCampaignReport(
  campaignId: number,
  userId: string
) {
  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      include: {
        contents: true,
        analysis: {
          orderBy: {
            timestamp: 'desc'
          },
          take: 1
        }
      }
    });

    if (!campaign) throw new Error('Campaign not found');

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Generate a comprehensive campaign report:
    
    Campaign: ${JSON.stringify(campaign)}
    
    Include:
    1. Executive summary
    2. Key achievements
    3. Performance metrics
    4. Content analysis
    5. Recommendations
    
    Format as JSON with:
    - summary: executive summary
    - achievements: key milestones
    - metrics: detailed metrics
    - analysis: content performance
    - recommendations: next steps`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Report generation error:', error);
    throw error;
  }
}

export async function predictCampaignPerformance(
  campaignData: any,
  userId: string
) {
  try {
    // Get historical campaign data
    const historicalCampaigns = await prisma.campaign.findMany({
      where: { userId },
      include: {
        contents: true,
        analysis: true
      }
    });

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Predict campaign performance based on:
    
    New Campaign: ${JSON.stringify(campaignData)}
    Historical Data: ${JSON.stringify(historicalCampaigns)}
    
    Provide:
    1. Expected performance metrics
    2. ROI prediction
    3. Risk assessment
    4. Success factors
    
    Format as JSON with:
    - metrics: predicted performance metrics
    - roi: expected return on investment
    - risks: potential risks and mitigations
    - success: key success factors`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Performance prediction error:', error);
    throw error;
  }
}