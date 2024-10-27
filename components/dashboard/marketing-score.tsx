"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, MessageSquare, Target } from "lucide-react";

export function MarketingScore() {
  const scores = [
    {
      title: "Content-Qualität",
      score: 85,
      change: "+5%",
      icon: TrendingUp,
    },
    {
      title: "Zielgruppen-Engagement",
      score: 78,
      change: "+12%",
      icon: Users,
    },
    {
      title: "Community-Management",
      score: 92,
      change: "+8%",
      icon: MessageSquare,
    },
    {
      title: "Kampagnen-Performance",
      score: 88,
      change: "+15%",
      icon: Target,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {scores.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.title} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Icon className="h-5 w-5 text-muted-foreground" />
              <Badge variant="secondary" className="bg-green-50">
                {item.change}
              </Badge>
            </div>
            <h3 className="font-medium text-sm mb-2">{item.title}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-2xl font-bold">{item.score}</span>
                <span className="text-sm text-muted-foreground">/100</span>
              </div>
              <Progress value={item.score} />
            </div>
          </Card>
        );
      })}
    </div>
  );
}