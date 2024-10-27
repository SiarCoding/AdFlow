import { GoogleGenerativeAI } from "@google/generative-ai";
import { analyzeGoogleTrends } from "../api/trends/google";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export async function generateContentIdeas(
  industry: string,
  platform: string,
  contentType: string
) {
  try {
    // Get trending topics
    const trends = await analyzeGoogleTrends(industry);

    // Generate content ideas using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Create engaging social media content ideas for ${platform} in the ${industry} industry.
    Content type: ${contentType}
    Current trends: ${JSON.stringify(trends)}
    
    Include:
    - Engaging headlines
    - Post descriptions
    - Hashtag suggestions
    - Call-to-action ideas`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Content generation error:', error);
    throw error;
  }
}

export async function optimizeContent(
  content: string,
  platform: string,
  targetAudience: string
) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Optimize this social media content for ${platform}:
    
    Content: ${content}
    Target Audience: ${targetAudience}
    
    Provide:
    - Improved copy
    - Better hashtags
    - Engagement optimization tips
    - Best posting time suggestions`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Content optimization error:', error);
    throw error;
  }
}