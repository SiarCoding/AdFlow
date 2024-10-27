"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, TrendingUp, Users, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";

const recommendations = [
  {
    title: "Content-Performance",
    description: "Video-Content erzielt 45% mehr Engagement - Erstellen Sie mehr Reels",
    impact: "Hoch",
    category: "content",
    metrics: {
      current: "2.8%",
      potential: "4.1%",
      improvement: "+45%"
    },
    automated: true,
  },
  {
    title: "Optimale Posting-Zeit",
    description: "Ihre Zielgruppe ist zwischen 18-20 Uhr am aktivsten",
    impact: "Mittel",
    category: "timing",
    metrics: {
      current: "1.2k",
      potential: "2.3k",
      improvement: "+92%"
    },
    automated: true,
  },
  {
    title: "Hashtag-Strategie",
    description: "Neue Trending Hashtags in Ihrer Branche identifiziert",
    impact: "Mittel",
    category: "hashtags",
    metrics: {
      current: "850",
      potential: "1.4k",
      improvement: "+65%"
    },
    automated: false,
  },
  {
    title: "Zielgruppen-Interaktion",
    description: "Erhöhen Sie die Interaktion durch gezielte Fragen in Ihren Posts",
    impact: "Hoch",
    category: "engagement",
    metrics: {
      current: "3.2%",
      potential: "5.8%",
      improvement: "+81%"
    },
    automated: false,
  }
];

export function AIRecommendations() {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <Card
            key={index}
            className="p-4 hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 rounded-full bg-primary/10">
                {rec.category === "content" && <TrendingUp className="h-5 w-5 text-primary" />}
                {rec.category === "timing" && <Sparkles className="h-5 w-5 text-primary" />}
                {rec.category === "hashtags" && <MessageSquare className="h-5 w-5 text-primary" />}
                {rec.category === "engagement" && <Users className="h-5 w-5 text-primary" />}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium leading-none">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={rec.impact === "Hoch" ? "destructive" : "secondary"}>
                      {rec.impact}
                    </Badge>
                    {rec.automated && (
                      <Badge variant="outline">Automatisierbar</Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Aktuell</p>
                    <p className="text-lg font-semibold">{rec.metrics.current}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Potenzial</p>
                    <p className="text-lg font-semibold text-primary">{rec.metrics.potential}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Verbesserung</p>
                    <p className="text-lg font-semibold text-green-500">{rec.metrics.improvement}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <Button variant="link" className="p-0 h-auto">
                    Details anzeigen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button>
                    {rec.automated ? "Automatisch optimieren" : "Optimierung starten"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}