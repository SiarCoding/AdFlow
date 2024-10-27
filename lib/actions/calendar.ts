import { prisma } from "@/lib/prisma";

export async function createCalendarEvent(data: {
  title: string;
  description?: string;
  startTime: Date;
  endTime?: Date;
  contentId?: number;
  contentCalendarId: number;
}) {
  return prisma.calendarEvent.create({
    data,
    include: {
      content: true,
      contentCalendar: true
    }
  });
}

export async function getCalendarEvents(userId: string, startDate: Date, endDate: Date) {
  return prisma.calendarEvent.findMany({
    where: {
      contentCalendar: {
        userId
      },
      startTime: {
        gte: startDate,
        lte: endDate
      }
    },
    include: {
      content: true,
      contentCalendar: true
    },
    orderBy: {
      startTime: 'asc'
    }
  });
}

export async function updateCalendarEvent(
  id: number,
  data: Partial<{
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    contentId: number;
  }>
) {
  return prisma.calendarEvent.update({
    where: { id },
    data,
    include: {
      content: true,
      contentCalendar: true
    }
  });
}

export async function deleteCalendarEvent(id: number) {
  return prisma.calendarEvent.delete({
    where: { id }
  });
}