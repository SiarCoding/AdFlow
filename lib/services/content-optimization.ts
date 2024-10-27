import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export async function optimizeContent(
  contentId: number,
  userId: string,
  platform: string
) {
  try {
    const content = await prisma.content.findUnique({
      where: { id: contentId }
    });

    if (!content) throw new Error('Content not found');

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Optimize this social media content for ${platform}:
    
    Content: ${JSON.stringify(content)}
    
    Provide:
    1. Improved copy
    2. Better hashtags
    3. Call-to-action suggestions
    4. Visual recommendations
    5. Best posting time
    
    Format as JSON with:
    - optimizedContent: improved content
    - hashtags: array of relevant hashtags
    - cta: call-to-action suggestions
    - visualTips: visual improvement tips
    - timing: optimal posting time`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const optimization = JSON.parse(response.text());

    // Store optimization results
    await prisma.contentOptimization.create({
      data: {
        contentId,
        userId,
        platform,
        recommendations: optimization,
        status: 'pending'
      }
    });

    return optimization;
  } catch (error) {
    console.error('Content optimization error:', error);
    throw error;
  }
}

export async function generateHashtags(
  content: string,
  platform: string,
  industry: string
) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Generate optimized hashtags for:
    
    Platform: ${platform}
    Industry: ${industry}
    Content: ${content}
    
    Provide:
    1. Trending hashtags
    2. Industry-specific hashtags
    3. Brand-related hashtags
    4. Location-based hashtags
    
    Format as JSON with:
    - trending: array of trending hashtags
    - industry: industry-specific hashtags
    - brand: brand-related hashtags
    - location: location-based hashtags
    - performance: expected reach for each category`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Hashtag generation error:', error);
    throw error;
  }
}

export async function optimizePostingSchedule(
  userId: string,
  platform: string
) {
  try {
    // Get historical performance data
    const performanceData = await prisma.content.findMany({
      where: {
        campaign: {
          userId
        }
      },
      select: {
        scheduledTime: true,
        performance: true
      }
    });

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Analyze posting schedule performance:
    
    Data: ${JSON.stringify(performanceData)}
    Platform: ${platform}
    
    Provide:
    1. Best posting times
    2. Optimal posting frequency
    3. Day-of-week analysis
    4. Audience activity patterns
    
    Format as JSON with:
    - bestTimes: array of optimal posting times
    - frequency: recommended posting frequency
    - dayAnalysis: performance by day of week
    - patterns: audience activity patterns`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Schedule optimization error:', error);
    throw error;
  }
}