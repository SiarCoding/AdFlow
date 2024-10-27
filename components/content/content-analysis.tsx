"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Clock,
  BarChart,
  ThumbsUp,
  Share2
} from "lucide-react";

interface ContentMetrics {
  title: string;
  type: string;
  platform: string;
  performance: {
    engagement: number;
    reach: number;
    shares: number;
    sentiment: number;
  };
  recommendations: string[];
  timePosted: string;
  bestTime: string;
}

const contentAnalysis: ContentMetrics[] = [
  {
    title: "Produktvorstellung: Sommerkollektion",
    type: "Carousel",
    platform: "Instagram",
    performance: {
      engagement: 4.2,
      reach: 2500,
      shares: 45,
      sentiment: 85,
    },
    recommendations: [
      "Mehr Produkt-Details in der Caption",
      "Hashtags für Sommer-Mode hinzufügen",
      "Stories mit Behind-the-Scenes verknüpfen"
    ],
    timePosted: "14:30",
    bestTime: "18:00-20:00"
  },
  // Weitere Analysen...
];

export function ContentAnalysis() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Durchschn. Engagement
            </CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2%</div>
            <p className="text-xs text-muted-foreground">
              +0.8% seit letzter Woche
            </p>
            <Progress value={42} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Reichweite
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.4K</div>
            <p className="text-xs text-muted-foreground">
              +2.3K seit letzter Woche
            </p>
            <Progress value={62} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Shares
            </CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">845</div>
            <p className="text-xs text-muted-foreground">
              +125 seit letzter Woche
            </p>
            <Progress value={55} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sentiment
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              +5% seit letzter Woche
            </p>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content-Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-6">
              {contentAnalysis.map((content, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">{content.title}</h3>
                      <div className="flex gap-2">
                        <Badge>{content.platform}</Badge>
                        <Badge variant="outline">{content.type}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        Gepostet: {content.timePosted}
                      </p>
                      <p className="text-sm text-primary">
                        Beste Zeit: {content.bestTime}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Engagement</p>
                      <p className="text-lg font-semibold">{content.performance.engagement}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reichweite</p>
                      <p className="text-lg font-semibold">{content.performance.reach}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Shares</p>
                      <p className="text-lg font-semibold">{content.performance.shares}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Sentiment</p>
                      <p className="text-lg font-semibold">{content.performance.sentiment}%</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium">Optimierungsvorschläge:</p>
                    <ul className="space-y-1">
                      {content.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-end">
                    <Button>
                      Optimierungen anwenden
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}