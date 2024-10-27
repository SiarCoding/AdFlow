import { prisma } from "@/lib/prisma";

export async function createAutomationRule(data: {
  name: string;
  triggerType: string;
  triggerValue: string;
  actionType: string;
  actionValue: string;
  isActive: boolean;
  userId: string;
}) {
  return prisma.automationRule.create({
    data
  });
}

export async function getAutomationRules(userId: string) {
  return prisma.automationRule.findMany({
    where: { userId },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function updateAutomationRule(
  id: number,
  userId: string,
  data: Partial<{
    name: string;
    triggerType: string;
    triggerValue: string;
    actionType: string;
    actionValue: string;
    isActive: boolean;
  }>
) {
  return prisma.automationRule.update({
    where: {
      id,
      userId
    },
    data
  });
}

export async function deleteAutomationRule(id: number, userId: string) {
  return prisma.automationRule.delete({
    where: {
      id,
      userId
    }
  });
}