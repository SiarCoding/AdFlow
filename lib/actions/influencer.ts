import { prisma } from "@/lib/prisma";

export async function createInfluencer(data: {
  name: string;
  platform: string;
  followers: number;
  engagementRate: number;
  contactInfo?: string;
  userId: string;
}) {
  return prisma.influencer.create({
    data
  });
}

export async function getInfluencers(userId: string) {
  return prisma.influencer.findMany({
    where: { userId },
    orderBy: {
      followers: 'desc'
    }
  });
}

export async function updateInfluencer(
  id: number,
  userId: string,
  data: Partial<{
    name: string;
    platform: string;
    followers: number;
    engagementRate: number;
    contactInfo: string;
  }>
) {
  return prisma.influencer.update({
    where: {
      id,
      userId
    },
    data
  });
}

export async function deleteInfluencer(id: number, userId: string) {
  return prisma.influencer.delete({
    where: {
      id,
      userId
    }
  });
}