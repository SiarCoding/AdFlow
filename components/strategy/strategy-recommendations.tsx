"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, TrendingUp, Target, Users } from "lucide-react";

const recommendations = [
  {
    title: "Content-Mix optimieren",
    description: "Basierend auf der Analyse Ihrer Zielgruppe und Wettbewerber empfehlen wir:",
    actions: [
      "Mehr Video-Content (mind. 3x pro Woche)",
      "User-generated Content einbinden",
      "Behind-the-Scenes Material teilen"
    ],
    priority: "Hoch",
    impact: 85,
    effort: 60
  },
  {
    title: "Posting-Zeiten anpassen",
    description: "Ihre Zielgruppe ist am aktivsten zu folgenden Zeiten:",
    actions: [
      "Instagram: 18-20 Uhr werktags",
      "LinkedIn: 9-11 Uhr werktags",
      "Facebook: 12-14 Uhr täglich"
    ],
    priority: "Mittel",
    impact: 70,
    effort: 30
  },
  // Weitere Empfehlungen...
];

export function StrategyRecommendations() {
  return (
    <div className="space-y-6">
      {recommendations.map((rec, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                {rec.title}
              </CardTitle>
              <Badge variant={rec.priority === "Hoch" ? "destructive" : "secondary"}>
                {rec.priority}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">{rec.description}</p>
            
            <div className="space-y-2">
              {rec.actions.map((action, i) => (
                <div key={i} className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <span>{action}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Impact</span>
                  <span className="text-sm text-muted-foreground">{rec.impact}%</span>
                </div>
                <Progress value={rec.impact} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Aufwand</span>
                  <span className="text-sm text-muted-foreground">{rec.effort}%</span>
                </div>
                <Progress value={rec.effort} />
              </div>
            </div>

            <Button className="w-full">
              Empfehlung umsetzen
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}