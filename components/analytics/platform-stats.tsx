"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { PlatformChart } from "./platform-chart";

interface PlatformStatsProps {
  dateRange: { from: Date; to: Date };
}

export function PlatformStats({ dateRange }: PlatformStatsProps) {
  const platforms = [
    {
      name: "Instagram",
      icon: Instagram,
      followers: "12.4K",
      engagement: "4.2%",
      reach: "45.2K",
      growth: "+12.3%",
    },
    {
      name: "Facebook",
      icon: Facebook,
      followers: "8.2K",
      engagement: "3.1%",
      reach: "32.1K",
      growth: "+8.7%",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      followers: "5.6K",
      engagement: "2.8%",
      reach: "18.9K",
      growth: "+15.2%",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {platforms.map((platform) => {
        const Icon = platform.icon;
        return (
          <Card key={platform.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {platform.name}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Follower</p>
                    <p className="text-2xl font-bold">{platform.followers}</p>
                    <p className="text-xs text-muted-foreground">{platform.growth}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Engagement</p>
                    <p className="text-2xl font-bold">{platform.engagement}</p>
                  </div>
                </div>
                <PlatformChart platform={platform.name.toLowerCase()} dateRange={dateRange} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}