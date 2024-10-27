import { prisma } from "@/lib/prisma";

export async function createContent(data: {
  type: string;
  text?: string;
  imageUrl?: string;
  videoUrl?: string;
  scheduledTime?: Date;
  status: string;
  performance?: any;
  campaignId: number;
}) {
  return prisma.content.create({
    data,
    include: {
      campaign: true,
      calendarEvents: true
    }
  });
}

export async function getContent(campaignId: number) {
  return prisma.content.findMany({
    where: { campaignId },
    include: {
      campaign: true,
      calendarEvents: true
    },
    orderBy: {
      scheduledTime: 'asc'
    }
  });
}

export async function updateContent(
  id: number,
  data: Partial<{
    type: string;
    text: string;
    imageUrl: string;
    videoUrl: string;
    scheduledTime: Date;
    status: string;
    performance: any;
  }>
) {
  return prisma.content.update({
    where: { id },
    data,
    include: {
      campaign: true,
      calendarEvents: true
    }
  });
}

export async function deleteContent(id: number) {
  return prisma.content.delete({
    where: { id }
  });
}