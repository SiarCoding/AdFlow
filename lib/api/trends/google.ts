import { google } from 'googleapis';

const trends = google.trends('v1beta');

export async function analyzeGoogleTrends(keyword: string, timeframe: string = 'today 12-m') {
  try {
    const response = await trends.interestOverTime({
      keyword,
      startTime: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
      endTime: new Date().toISOString()
    });

    return response.data;
  } catch (error) {
    console.error('Google Trends analysis error:', error);
    throw error;
  }
}