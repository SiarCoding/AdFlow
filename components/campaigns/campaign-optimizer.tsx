"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, TrendingUp, Target, Users } from "lucide-react";

const optimizations = [
  {
    title: "Zielgruppen-Optimierung",
    description: "Neue hochperformante Zielgruppen-Segmente identifiziert",
    impact: "Hoch",
    metrics: {
      currentCPA: "12.50€",
      estimatedCPA: "8.75€",
      improvement: "30%"
    }
  },
  {
    title: "Budget-Verteilung",
    description: "Optimale Verteilung auf Tageszeiten und Plattformen",
    impact: "Mittel",
    metrics: {
      currentROAS: "2.8x",
      estimatedROAS: "3.4x",
      improvement: "21%"
    }
  }
];

export function CampaignOptimizer() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            KI-Optimierungsvorschläge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-6">
              {optimizations.map((opt, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{opt.title}</h3>
                    <Badge variant={opt.impact === "Hoch" ? "destructive" : "secondary"}>
                      {opt.impact}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {opt.description}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Aktuell</p>
                      <p className="text-lg font-semibold">
                        {opt.metrics.currentCPA || opt.metrics.currentROAS}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Prognose</p>
                      <p className="text-lg font-semibold text-green-600">
                        {opt.metrics.estimatedCPA || opt.metrics.estimatedROAS}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Verbesserung</p>
                      <p className="text-lg font-semibold text-green-600">
                        +{opt.metrics.improvement}
                      </p>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    Optimierung anwenden
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}