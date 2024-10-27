"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getCampaigns(userId: string) {
  try {
    const campaigns = await db.campaign.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return campaigns;
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    throw new Error("Failed to fetch campaigns");
  }
}

export async function createCampaign(
  userId: string,
  data: {
    name: string;
    startDate: Date;
    endDate?: Date;
    status: string;
    budget?: number;
    targetAudience?: string;
    platforms: string[];
  }
) {
  try {
    const campaign = await db.campaign.create({
      data: {
        ...data,
        userId,
      },
    });

    revalidatePath('/dashboard/campaigns');
    return campaign;
  } catch (error) {
    console.error("Error creating campaign:", error);
    throw new Error("Failed to create campaign");
  }
}

export async function updateCampaign(
  campaignId: number,
  userId: string,
  data: {
    name?: string;
    startDate?: Date;
    endDate?: Date;
    status?: string;
    budget?: number;
    targetAudience?: string;
    platforms?: string[];
  }
) {
  try {
    const campaign = await db.campaign.update({
      where: {
        id: campaignId,
        userId: userId,
      },
      data,
    });

    revalidatePath('/dashboard/campaigns');
    return campaign;
  } catch (error) {
    console.error("Error updating campaign:", error);
    throw new Error("Failed to update campaign");
  }
}

export async function deleteCampaign(campaignId: number, userId: string) {
  try {
    await db.campaign.delete({
      where: {
        id: campaignId,
        userId: userId,
      },
    });

    revalidatePath('/dashboard/campaigns');
  } catch (error) {
    console.error("Error deleting campaign:", error);
    throw new Error("Failed to delete campaign");
  }
}