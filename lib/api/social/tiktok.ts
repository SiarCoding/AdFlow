import { prisma } from "@/lib/prisma";

interface TikTokTokens {
  accessToken: string;
  refreshToken?: string;
}

export async function connectTikTokAccount(userId: string, tokens: TikTokTokens) {
  try {
    const response = await fetch('https://open-api.tiktok.com/user/info/', {
      headers: {
        'Authorization': `Bearer ${tokens.accessToken}`
      }
    });
    const data = await response.json();

    return prisma.socialAccount.create({
      data: {
        platform: 'tiktok',
        accountId: data.user.open_id,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        userId
      }
    });
  } catch (error) {
    console.error('TikTok connection error:', error);
    throw error;
  }
}