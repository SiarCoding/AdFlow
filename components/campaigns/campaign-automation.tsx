"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Brain, Settings, Zap } from "lucide-react";

interface AutomationRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  status: "active" | "paused";
  performance: {
    triggered: number;
    successful: number;
    savings: string;
  };
}

const automationRules: AutomationRule[] = [
  {
    id: "rule-1",
    name: "Budget-Optimierung",
    condition: "Wenn CPA > 15€ für 2 Stunden",
    action: "Reduziere Tagesbudget um 20%",
    status: "active",
    performance: {
      triggered: 12,
      successful: 10,
      savings: "450€"
    }
  },
  {
    id: "rule-2",
    name: "Bid-Anpassung",
    condition: "Wenn CTR < 1% für 4 Stunden",
    action: "Reduziere Bid um 15%",
    status: "active",
    performance: {
      triggered: 8,
      successful: 7,
      savings: "280€"
    }
  }
];

export function CampaignAutomation() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Kampagnen-Automatisierung</h2>
        <Button>
          <Zap className="mr-2 h-4 w-4" />
          Neue Regel erstellen
        </Button>
      </div>

      <div className="grid gap-6">
        {automationRules.map((rule) => (
          <Card key={rule.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  {rule.name}
                </CardTitle>
                <Switch checked={rule.status === "active"} />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Bedingung</Label>
                  <div className="text-sm text-muted-foreground">{rule.condition}</div>
                </div>
                <div className="space-y-2">
                  <Label>Aktion</Label>
                  <div className="text-sm text-muted-foreground">{rule.action}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Ausgelöst</Label>
                  <p className="text-2xl font-bold">{rule.performance.triggered}x</p>
                </div>
                <div className="space-y-2">
                  <Label>Erfolgreich</Label>
                  <p className="text-2xl font-bold">{rule.performance.successful}x</p>
                </div>
                <div className="space-y-2">
                  <Label>Einsparungen</Label>
                  <p className="text-2xl font-bold text-green-500">{rule.performance.savings}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Einstellungen
                </Button>
                <Button variant="destructive">Regel löschen</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}