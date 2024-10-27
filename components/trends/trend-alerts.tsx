"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, TrendingUp, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

interface TrendAlert {
  type: "urgent" | "opportunity" | "risk";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  action: string;
}

export function TrendAlerts({ industry }: { industry: string }) {
  const [alerts, setAlerts] = useState<TrendAlert[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/ai/trend-alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry })
      });
      const data = await response.json();
      setAlerts(data.alerts);
    } catch (error) {
      console.error("Fehler beim Laden der Alerts:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAlerts();
    // Aktualisiere Alerts alle 30 Minuten
    const interval = setInterval(fetchAlerts, 1800000);
    return () => clearInterval(interval);
  }, [industry]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Trend Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg space-y-2 ${
                  alert.type === "urgent" ? "border-red-500 bg-red-50" :
                  alert.type === "opportunity" ? "border-green-500 bg-green-50" :
                  "border-yellow-500 bg-yellow-50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{alert.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {alert.description}
                    </p>
                  </div>
                  <Badge
                    variant={
                      alert.impact === "high" ? "destructive" :
                      alert.impact === "medium" ? "default" :
                      "secondary"
                    }
                  >
                    {alert.impact}
                  </Badge>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <p className="text-sm text-muted-foreground">
                    Empfohlene Aktion: {alert.action}
                  </p>
                  <Button size="sm" variant="outline">
                    Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}