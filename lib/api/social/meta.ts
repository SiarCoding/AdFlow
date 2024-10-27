import { prisma } from "@/lib/prisma";

interface MetaTokens {
  accessToken: string;
  refreshToken?: string;
}

export async function connectInstagramAccount(userId: string, tokens: MetaTokens) {
  try {
    const response = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${tokens.accessToken}`);
    const data = await response.json();

    return prisma.socialAccount.create({
      data: {
        platform: 'instagram',
        accountId: data.id,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        userId
      }
    });
  } catch (error) {
    console.error('Instagram connection error:', error);
    throw error;
  }
}

export async function connectFacebookAccount(userId: string, tokens: MetaTokens) {
  try {
    const response = await fetch(`https://graph.facebook.com/me?fields=id,name&access_token=${tokens.accessToken}`);
    const data = await response.json();

    return prisma.socialAccount.create({
      data: {
        platform: 'facebook',
        accountId: data.id,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        userId
      }
    });
  } catch (error) {
    console.error('Facebook connection error:', error);
    throw error;
  }
}