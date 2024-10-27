"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { TrendingUp, ArrowUp, ArrowDown } from "lucide-react";

interface TrendMetrics {
  name: string;
  value: number;
  change: number;
  target: number;
}

const metrics: TrendMetrics[] = [
  {
    name: "Engagement Rate",
    value: 4.2,
    change: 0.8,
    target: 5.0
  },
  {
    name: "Reichweite",
    value: 12400,
    change: 2300,
    target: 15000
  },
  {
    name: "Conversion Rate",
    value: 2.8,
    change: 0.5,
    target: 3.5
  }
];

const performanceData = [
  { date: "01.03", engagement: 3.2, reach: 10000, conversions: 2.1 },
  { date: "02.03", engagement: 3.8, reach: 11200, conversions: 2.4 },
  { date: "03.03", engagement: 4.2, reach: 12400, conversions: 2.8 },
  // More data...
];

export function TrendPerformance() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.name}
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metric.value.toLocaleString()}
                {metric.name.includes("Rate") && "%"}
              </div>
              <div className="flex items-center space-x-2">
                {metric.change > 0 ? (
                  <ArrowUp className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm ${
                  metric.change > 0 ? "text-green-500" : "text-red-500"
                }`}>
                  {metric.change > 0 ? "+" : ""}
                  {metric.change.toLocaleString()}
                  {metric.name.includes("Rate") && "%"}
                </span>
              </div>
              <Progress
                value={(metric.value / metric.target) * 100}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Ziel: {metric.target.toLocaleString()}
                {metric.name.includes("Rate") && "%"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance-Verlauf</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="engagement"
                  name="Engagement Rate"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="reach"
                  name="Reichweite"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="conversions"
                  name="Conversion Rate"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}