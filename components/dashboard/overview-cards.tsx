"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Target, BarChart } from "lucide-react";

const metrics = [
  {
    title: "Total Reach",
    value: "45.2K",
    change: "+12.3%",
    icon: Users,
    description: "Across all platforms"
  },
  {
    title: "Engagement Rate",
    value: "4.2%",
    change: "+0.8%",
    icon: TrendingUp,
    description: "Average interaction rate"
  },
  {
    title: "Conversions",
    value: "892",
    change: "+15.4%",
    icon: Target,
    description: "Total goal completions"
  },
  {
    title: "ROI",
    value: "285%",
    change: "+21.2%",
    icon: BarChart,
    description: "Return on investment"
  }
];

export function OverviewCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const isPositive = metric.change.startsWith("+");

        return (
          <Card key={metric.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center space-x-2">
                  <Badge variant={isPositive ? "default" : "destructive"}>
                    {metric.change}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {metric.description}
                  </span>
                </div>
              </div>
              {/* Decorative gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10" />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}