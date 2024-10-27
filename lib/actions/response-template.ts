import { prisma } from "@/lib/prisma";

export async function createResponseTemplate(data: {
  name: string;
  content: string;
  category: string;
  userId: string;
}) {
  return prisma.responseTemplate.create({
    data
  });
}

export async function getResponseTemplates(userId: string) {
  return prisma.responseTemplate.findMany({
    where: { userId },
    orderBy: {
      category: 'asc'
    }
  });
}

export async function updateResponseTemplate(
  id: number,
  userId: string,
  data: Partial<{
    name: string;
    content: string;
    category: string;
  }>
) {
  return prisma.responseTemplate.update({
    where: {
      id,
      userId
    },
    data
  });
}

export async function deleteResponseTemplate(id: number, userId: string) {
  return prisma.responseTemplate.delete({
    where: {
      id,
      userId
    }
  });
}