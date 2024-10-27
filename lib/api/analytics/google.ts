import { google } from 'googleapis';
import { prisma } from "@/lib/prisma";

const analytics = google.analytics('v3');

export async function connectGoogleAnalytics(userId: string, credentials: any) {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials(credentials);

    const response = await analytics.management.accounts.list({
      auth: oauth2Client
    });

    // Store the connection in our database
    await prisma.analyticsConnection.create({
      data: {
        provider: 'google_analytics',
        accountId: response.data.items?.[0].id || '',
        accessToken: credentials.access_token,
        refreshToken: credentials.refresh_token,
        userId
      }
    });

    return response.data;
  } catch (error) {
    console.error('Google Analytics connection error:', error);
    throw error;
  }
}