import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

interface TrendData {
  keyword: string;
  growth: string;
  volume: number;
  category: string;
  relatedTopics: string[];
}

interface ContentTrend {
  type: string;
  description: string;
  platform: string;
  engagement: string;
  examples: string[];
  hashtags: string[];
}

// Google Trends Analysis
export async function analyzeGoogleTrends(industry: string): Promise<TrendData[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const systemPrompt = `Als Trend-Analyst, analysiere die aktuellen Google Trends für die ${industry} Branche.
  Berücksichtige: Suchvolumen, Wachstum, verwandte Themen.
  Identifiziere die wichtigsten Trends und Muster.
  Format: JSON Array mit keyword, growth, volume, category, relatedTopics.`;
  
  const result = await model.generateContent(systemPrompt);
  const response = await result.response;
  return JSON.parse(response.text());
}

// TikTok Trend Analysis
export async function analyzeTikTokTrends(industry: string): Promise<ContentTrend[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const systemPrompt = `Als Social Media Experte, analysiere die aktuellen TikTok Trends für die ${industry} Branche.
  Berücksichtige: Virale Challenges, Soundtrends, Content-Formate.
  Identifiziere die erfolgreichsten Trends und deren Merkmale.
  Format: JSON Array mit type, description, engagement, examples, hashtags.`;
  
  const result = await model.generateContent(systemPrompt);
  const response = await result.response;
  return JSON.parse(response.text());
}

// Facebook & Instagram Trend Analysis
export async function analyzeFacebookTrends(industry: string): Promise<ContentTrend[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const systemPrompt = `Als Social Media Stratege, analysiere die aktuellen Facebook & Instagram Trends für die ${industry} Branche.
  Berücksichtige: Reels, Stories, Post-Formate, Engagement-Muster.
  Identifiziere erfolgreiche Content-Strategien und Formate.
  Format: JSON Array mit type, description, engagement, examples, hashtags.`;
  
  const result = await model.generateContent(systemPrompt);
  const response = await result.response;
  return JSON.parse(response.text());
}

// Business Trend Analysis
export async function analyzeBusinessTrends(industry: string): Promise<any> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const systemPrompt = `Als Business Analyst, analysiere die aktuellen Geschäftstrends für die ${industry} Branche.
  Berücksichtige: Marktentwicklungen, Konsumentenverhalten, Innovationen.
  Identifiziere Chancen und Bedrohungen.
  Format: JSON mit marketTrends, consumerBehavior, opportunities, threats.`;
  
  const result = await model.generateContent(systemPrompt);
  const response = await result.response;
  return JSON.parse(response.text());
}

// Content Trend Analysis
export async function analyzeContentTrends(industry: string): Promise<any> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const systemPrompt = `Als Content Stratege, analysiere die aktuellen Content-Trends für die ${industry} Branche.
  Berücksichtige: Formate, Storytelling, Engagement-Taktiken.
  Identifiziere erfolgreiche Content-Arten und deren Merkmale.
  Format: JSON mit contentTypes, storytellingTrends, engagementTactics, bestPractices.`;
  
  const result = await model.generateContent(systemPrompt);
  const response = await result.response;
  return JSON.parse(response.text());
}

// AI Content Generation based on Trends
export async function generateTrendBasedContent(
  trends: any,
  industry: string,
  platform: string
): Promise<any> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const systemPrompt = `Als Content Creator, generiere Content-Ideen basierend auf aktuellen Trends:
  Trends: ${JSON.stringify(trends)}
  Branche: ${industry}
  Plattform: ${platform}
  
  Erstelle kreative, trendbasierte Content-Vorschläge.
  Berücksichtige: Plattform-Spezifika, Trend-Relevanz, Engagement-Potenzial.
  Format: JSON mit contentIdeas, hashtags, captions, estimatedEngagement, implementation.`;
  
  const result = await model.generateContent(systemPrompt);
  const response = await result.response;
  return JSON.parse(response.text());
}

// Trend Impact Analysis
export async function analyzeTrendImpact(trend: any, industry: string): Promise<any> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const systemPrompt = `Als Trend-Analyst, bewerte den potentiellen Impact dieses Trends:
  Trend: ${JSON.stringify(trend)}
  Branche: ${industry}
  
  Analysiere die Relevanz und Nutzbarkeit des Trends.
  Berücksichtige: ROI-Potenzial, Implementierungsaufwand, Risiken.
  Format: JSON mit impact, relevance, implementation, risks, opportunities.`;
  
  const result = await model.generateContent(systemPrompt);
  const response = await result.response;
  return JSON.parse(response.text());
}