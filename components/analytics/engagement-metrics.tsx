"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, MessageSquare, Heart, Share2 } from "lucide-react";

const metrics = [
  {
    title: "Likes",
    value: "12.4K",
    change: "+12.3%",
    trend: "up",
    icon: Heart,
  },
  {
    title: "Kommentare",
    value: "892",
    change: "+15.4%",
    trend: "up",
    icon: MessageSquare,
  },
  {
    title: "Shares",
    value: "2.3K",
    change: "-2.1%",
    trend: "down",
    icon: Share2,
  },
];

export function EngagementMetrics() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{metric.value}</p>
                <div className="flex items-center space-x-1">
                  {metric.trend === "up" ? (
                    <ArrowUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-red-500" />
                  )}
                  <p className={`text-xs ${
                    metric.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}>
                    {metric.change}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}