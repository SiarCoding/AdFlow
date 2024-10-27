import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export async function generateAnalyticsReport(userId: string, dateRange: { start: Date; end: Date }) {
  try {
    // Get all social media data
    const socialAccounts = await prisma.socialAccount.findMany({
      where: { userId }
    });

    // Get campaign performance
    const campaigns = await prisma.campaign.findMany({
      where: {
        userId,
        startDate: { gte: dateRange.start },
        endDate: { lte: dateRange.end }
      },
      include: {
        contents: true
      }
    });

    // Generate insights using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Analyze this marketing data and generate insights:
    
    Social Accounts: ${JSON.stringify(socialAccounts)}
    Campaigns: ${JSON.stringify(campaigns)}
    Date Range: ${dateRange.start} to ${dateRange.end}
    
    Provide:
    - Key performance metrics
    - Trend analysis
    - Improvement recommendations
    - ROI calculations`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    const insights = JSON.parse(response.text());

    // Store the report
    await prisma.analyticsReport.create({
      data: {
        userId,
        reportType: 'comprehensive',
        startDate: dateRange.start,
        endDate: dateRange.end,
        metrics: insights
      }
    });

    return insights;
  } catch (error) {
    console.error('Analytics report generation error:', error);
    throw error;
  }
}