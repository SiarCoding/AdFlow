"use client";

interface SocialMediaData {
  followers: number;
  posts: number;
  engagement: number;
  recentPosts: {
    id: string;
    type: string;
    caption: string;
    engagement: number;
    date: string;
  }[];
}

export async function connectInstagram(accessToken: string): Promise<SocialMediaData> {
  // Simulierte API-Integration
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    followers: Math.floor(Math.random() * 10000),
    posts: Math.floor(Math.random() * 500),
    engagement: Math.random() * 5,
    recentPosts: Array(5).fill(null).map((_, i) => ({
      id: `post-${i}`,
      type: ['image', 'video', 'carousel'][Math.floor(Math.random() * 3)],
      caption: `Instagram Post ${i + 1}`,
      engagement: Math.random() * 1000,
      date: new Date(Date.now() - i * 86400000).toISOString(),
    })),
  };
}

export async function connectFacebook(accessToken: string): Promise<SocialMediaData> {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    followers: Math.floor(Math.random() * 8000),
    posts: Math.floor(Math.random() * 300),
    engagement: Math.random() * 4,
    recentPosts: Array(5).fill(null).map((_, i) => ({
      id: `post-${i}`,
      type: ['status', 'photo', 'video'][Math.floor(Math.random() * 3)],
      caption: `Facebook Post ${i + 1}`,
      engagement: Math.random() * 800,
      date: new Date(Date.now() - i * 86400000).toISOString(),
    })),
  };
}

export async function connectLinkedIn(accessToken: string): Promise<SocialMediaData> {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    followers: Math.floor(Math.random() * 5000),
    posts: Math.floor(Math.random() * 200),
    engagement: Math.random() * 3,
    recentPosts: Array(5).fill(null).map((_, i) => ({
      id: `post-${i}`,
      type: ['article', 'image', 'video'][Math.floor(Math.random() * 3)],
      caption: `LinkedIn Post ${i + 1}`,
      engagement: Math.random() * 500,
      date: new Date(Date.now() - i * 86400000).toISOString(),
    })),
  };
}