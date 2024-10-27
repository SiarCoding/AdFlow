import { prisma } from "@/lib/prisma";

export async function createCompetitor(data: {
  name: string;
  website?: string;
  socialAccounts: any;
  userId: string;
}) {
  return prisma.competitor.create({
    data
  });
}

export async function getCompetitors(userId: string) {
  return prisma.competitor.findMany({
    where: { userId },
    orderBy: {
      name: 'asc'
    }
  });
}

export async function updateCompetitor(
  id: number,
  userId: string,
  data: Partial<{
    name: string;
    website: string;
    socialAccounts: any;
  }>
) {
  return prisma.competitor.update({
    where: {
      id,
      userId
    },
    data
  });
}

export async function deleteCompetitor(id: number, userId: string) {
  return prisma.competitor.delete({
    where: {
      id,
      userId
    }
  });
}