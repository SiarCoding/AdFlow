import { prisma } from "@/lib/prisma";

interface LinkedInTokens {
  accessToken: string;
  refreshToken?: string;
}

export async function connectLinkedInAccount(userId: string, tokens: LinkedInTokens) {
  try {
    const response = await fetch('https://api.linkedin.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${tokens.accessToken}`
      }
    });
    const data = await response.json();

    return prisma.socialAccount.create({
      data: {
        platform: 'linkedin',
        accountId: data.id,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        userId
      }
    });
  } catch (error) {
    console.error('LinkedIn connection error:', error);
    throw error;
  }
}