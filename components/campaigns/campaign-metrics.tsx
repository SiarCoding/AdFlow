"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Target } from "lucide-react";

interface CampaignMetricsProps {
  campaignId: number;
  data: {
    reach: number;
    engagement: number;
    conversions: number;
    performance: any[];
  };
}

export function CampaignMetrics({ campaignId, data }: CampaignMetricsProps) {
  const metrics = [
    {
      title: "Reach",
      value: data.reach.toLocaleString(),
      change: "+12.3%",
      icon: Users
    },
    {
      title: "Engagement",
      value: `${data.engagement.toFixed(2)}%`,
      change: "+5.2%",
      icon: TrendingUp
    },
    {
      title: "Conversions",
      value: data.conversions.toLocaleString(),
      change: "+8.1%",
      icon: Target
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <Badge variant="secondary" className="mt-1">
                  {metric.change}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.performance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="reach"
                  stackId="1"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="engagement"
                  stackId="2"
                  stroke="hsl(var(--secondary))"
                  fill="hsl(var(--secondary))"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="conversions"
                  stackId="3"
                  stroke="hsl(var(--destructive))"
                  fill="hsl(var(--destructive))"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}