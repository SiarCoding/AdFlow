import { prisma } from "@/lib/prisma";

export async function createSocialAccount(data: {
  platform: string;
  accountId: string;
  accessToken: string;
  refreshToken?: string;
  userId: string;
}) {
  return prisma.socialAccount.create({
    data
  });
}

export async function getSocialAccounts(userId: string) {
  return prisma.socialAccount.findMany({
    where: { userId }
  });
}

export async function updateSocialAccount(
  id: number,
  userId: string,
  data: Partial<{
    accessToken: string;
    refreshToken: string;
  }>
) {
  return prisma.socialAccount.update({
    where: {
      id,
      userId
    },
    data
  });
}

export async function deleteSocialAccount(id: number, userId: string) {
  return prisma.socialAccount.delete({
    where: {
      id,
      userId
    }
  });
}