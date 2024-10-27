"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Users, TrendingUp, BarChart } from "lucide-react";

export function ContentStrategy() {
  const goals = [
    {
      title: "Markenbekanntheit steigern",
      progress: 65,
      metrics: [
        { label: "Reichweite", value: "45.2K", trend: "+12.3%" },
        { label: "Impressionen", value: "128.5K", trend: "+8.7%" }
      ]
    },
    {
      title: "Engagement verbessern",
      progress: 42,
      metrics: [
        { label: "Interaktionsrate", value: "4.2%", trend: "+2.1%" },
        { label: "Kommentare", value: "892", trend: "+15.4%" }
      ]
    }
  ];

  const recommendations = [
    {
      title: "Content-Mix optimieren",
      description: "Mehr Video-Content für höheres Engagement",
      priority: "Hoch"
    },
    {
      title: "Posting-Zeiten anpassen",
      description: "Beste Reichweite zwischen 18-20 Uhr",
      priority: "Mittel"
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Ziele und Fortschritt
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {goals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{goal.title}</h4>
                  <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} />
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {goal.metrics.map((metric, i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <p className="text-lg font-semibold">{metric.value}</p>
                      <p className="text-sm text-green-600">{metric.trend}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Empfehlungen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{rec.title}</h4>
                  <Badge variant={rec.priority === "Hoch" ? "destructive" : "secondary"}>
                    {rec.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}