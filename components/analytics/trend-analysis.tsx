"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp, ArrowUp, ArrowDown } from "lucide-react";

interface TrendData {
  category: string;
  metric: string;
  value: number;
  change: number;
  impact: "high" | "medium" | "low";
  recommendation: string;
}

const trendData: TrendData[] = [
  {
    category: "Engagement",
    metric: "Video Content",
    value: 45,
    change: 15,
    impact: "high",
    recommendation: "Increase video content production"
  },
  // Add more trend data...
];

export function TrendAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Trend Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {trendData.map((trend, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{trend.category}</h3>
                      <Badge variant={
                        trend.impact === "high" ? "destructive" :
                        trend.impact === "medium" ? "default" :
                        "secondary"
                      }>
                        {trend.impact}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {trend.metric}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      {trend.change > 0 ? (
                        <ArrowUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={trend.change > 0 ? "text-green-500" : "text-red-500"}>
                        {Math.abs(trend.change)}%
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Current: {trend.value}%
                    </p>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-sm font-medium">Recommendation:</p>
                  <p className="text-sm text-muted-foreground">
                    {trend.recommendation}
                  </p>
                </div>
                <Button className="w-full" size="sm">
                  Apply Optimization
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}