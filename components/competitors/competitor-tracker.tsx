"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  BarChart,
  AlertTriangle,
  ArrowUp,
  ArrowDown
} from "lucide-react";

interface CompetitorMetrics {
  name: string;
  metrics: {
    followers: string;
    engagement: string;
    postFrequency: string;
    contentTypes: string[];
  };
  trends: {
    followerGrowth: string;
    engagementChange: string;
    direction: "up" | "down";
  };
  alerts: {
    type: string;
    message: string;
    severity: "high" | "medium" | "low";
  }[];
}

const competitors: CompetitorMetrics[] = [
  {
    name: "Hauptkonkurrent GmbH",
    metrics: {
      followers: "25.4K",
      engagement: "4.8%",
      postFrequency: "2.3 Posts/Tag",
      contentTypes: ["Video", "Carousel", "Stories"]
    },
    trends: {
      followerGrowth: "+12.3%",
      engagementChange: "+2.1%",
      direction: "up"
    },
    alerts: [
      {
        type: "Kampagne",
        message: "Neue Werbekampagne gestartet",
        severity: "high"
      },
      {
        type: "Content",
        message: "Erhöhte Video-Produktion",
        severity: "medium"
      }
    ]
  },
  // More competitors...
];

export function CompetitorTracker() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Wettbewerber-Tracking</h2>
        <Button>
          <TrendingUp className="mr-2 h-4 w-4" />
          Konkurrent hinzufügen
        </Button>
      </div>

      <div className="grid gap-6">
        {competitors.map((competitor, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{competitor.name}</CardTitle>
                <Badge variant={competitor.trends.direction === "up" ? "destructive" : "secondary"}>
                  {competitor.trends.followerGrowth} Wachstum
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Follower</Label>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-2xl font-bold">{competitor.metrics.followers}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Engagement</Label>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="text-2xl font-bold">{competitor.metrics.engagement}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Posting-Frequenz</Label>
                  <div className="flex items-center gap-2">
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                    <span className="text-2xl font-bold">{competitor.metrics.postFrequency}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Content-Mix</Label>
                  <div className="flex gap-2">
                    {competitor.metrics.contentTypes.map((type, i) => (
                      <Badge key={i} variant="outline">{type}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Warnungen & Insights</Label>
                <ScrollArea className="h-[100px]">
                  <div className="space-y-2">
                    {competitor.alerts.map((alert, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 border rounded-lg">
                        <AlertTriangle className={`h-4 w-4 ${
                          alert.severity === "high" ? "text-destructive" : 
                          alert.severity === "medium" ? "text-yellow-500" : 
                          "text-muted-foreground"
                        }`} />
                        <div>
                          <span className="font-medium">{alert.type}:</span>
                          <span className="ml-2 text-muted-foreground">{alert.message}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="flex justify-end">
                <Button variant="outline">Detailanalyse</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}