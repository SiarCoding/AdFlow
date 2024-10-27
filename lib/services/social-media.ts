import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

interface SocialMediaMetrics {
  followers: number;
  engagement: number;
  reach: number;
  impressions: number;
  posts: number;
}

interface ContentPerformance {
  id: string;
  type: string;
  engagement: number;
  reach: number;
  impressions: number;
  sentiment: number;
}

export async function fetchSocialMediaData(userId: string, platform: string) {
  try {
    const account = await prisma.socialAccount.findFirst({
      where: {
        userId,
        platform: platform.toLowerCase()
      }
    });

    if (!account) throw new Error(`No ${platform} account connected`);

    // Fetch data based on platform
    switch (platform.toLowerCase()) {
      case 'instagram':
        return await fetchInstagramData(account.accessToken);
      case 'facebook':
        return await fetchFacebookData(account.accessToken);
      case 'linkedin':
        return await fetchLinkedInData(account.accessToken);
      case 'tiktok':
        return await fetchTikTokData(account.accessToken);
      default:
        throw new Error('Unsupported platform');
    }
  } catch (error) {
    console.error(`Error fetching ${platform} data:`, error);
    throw error;
  }
}

export async function analyzeContentPerformance(
  content: ContentPerformance[],
  platform: string
) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Analyze this social media content performance data for ${platform}:
    
    Content: ${JSON.stringify(content)}
    
    Provide:
    1. Performance insights
    2. Engagement patterns
    3. Content type effectiveness
    4. Optimization recommendations
    
    Format as JSON with:
    - insights: array of key findings
    - patterns: engagement pattern analysis
    - recommendations: specific improvement suggestions
    - bestPerforming: top content types`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Content analysis error:', error);
    throw error;
  }
}

export async function generateContentSuggestions(
  metrics: SocialMediaMetrics,
  platform: string,
  industry: string
) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Generate social media content suggestions based on:
    
    Platform: ${platform}
    Industry: ${industry}
    Current Metrics:
    - Followers: ${metrics.followers}
    - Engagement Rate: ${metrics.engagement}%
    - Reach: ${metrics.reach}
    
    Provide content ideas that will:
    1. Increase engagement
    2. Expand reach
    3. Drive conversions
    
    Format as JSON with:
    - contentIdeas: array of post concepts
    - hashtags: relevant hashtag suggestions
    - bestTimes: optimal posting times
    - contentTypes: recommended content formats`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Content suggestion error:', error);
    throw error;
  }
}

// Platform-specific fetching functions
async function fetchInstagramData(accessToken: string) {
  const response = await fetch(
    `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count&access_token=${accessToken}`
  );
  return response.json();
}

async function fetchFacebookData(accessToken: string) {
  const response = await fetch(
    `https://graph.facebook.com/me/posts?fields=id,message,created_time,likes.summary(true),comments.summary(true),shares&access_token=${accessToken}`
  );
  return response.json();
}

async function fetchLinkedInData(accessToken: string) {
  const response = await fetch(
    'https://api.linkedin.com/v2/ugcPosts', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    }
  );
  return response.json();
}

async function fetchTikTokData(accessToken: string) {
  const response = await fetch(
    'https://open-api.tiktok.com/video/list/', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
  );
  return response.json();
}