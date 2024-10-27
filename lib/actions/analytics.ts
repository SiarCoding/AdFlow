import { prisma } from "@/lib/prisma";

export async function createAnalyticsReport(data: {
  reportType: string;
  startDate: Date;
  endDate: Date;
  metrics: any;
  userId: string;
}) {
  return prisma.analyticsReport.create({
    data,
    include: {
      user: true
    }
  });
}

export async function getAnalyticsReports(userId: string) {
  return prisma.analyticsReport.findMany({
    where: { userId },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function getAnalyticsByDateRange(
  userId: string,
  startDate: Date,
  endDate: Date
) {
  return prisma.analyticsReport.findMany({
    where: {
      userId,
      startDate: {
        gte: startDate
      },
      endDate: {
        lte: endDate
      }
    },
    orderBy: {
      startDate: 'asc'
    }
  });
}