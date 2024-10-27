"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export function MarketingGoals() {
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [monthlyBudget, setMonthlyBudget] = useState([1000]);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Hauptziele definieren</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Primäres Marketingziel</Label>
              <Select value={primaryGoal} onValueChange={setPrimaryGoal}>
                <SelectTrigger>
                  <SelectValue placeholder="Wählen Sie Ihr Hauptziel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="awareness">Markenbekanntheit steigern</SelectItem>
                  <SelectItem value="engagement">Engagement erhöhen</SelectItem>
                  <SelectItem value="traffic">Website-Traffic steigern</SelectItem>
                  <SelectItem value="leads">Lead-Generierung</SelectItem>
                  <SelectItem value="sales">Verkäufe steigern</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Monatliches Budget (€)</Label>
              <div className="pt-2">
                <Slider
                  value={monthlyBudget}
                  min={500}
                  max={10000}
                  step={100}
                  onValueChange={setMonthlyBudget}
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-muted-foreground">€500</span>
                  <span className="text-sm font-medium">€{monthlyBudget}</span>
                  <span className="text-sm text-muted-foreground">€10.000</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Gewünschte monatliche Reichweite</Label>
              <Input type="number" placeholder="z.B. 100.000" />
            </div>

            <div className="space-y-2">
              <Label>Angestrebte Engagement-Rate</Label>
              <Input type="number" placeholder="z.B. 5" />
              <p className="text-sm text-muted-foreground">Angabe in Prozent</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Zeitplan & Meilensteine</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <Label>Q1 2024: Markenbekanntheit</Label>
                <span className="text-sm text-muted-foreground">75% erreicht</span>
              </div>
              <Progress value={75} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label>Q2 2024: Engagement</Label>
                <span className="text-sm text-muted-foreground">45% erreicht</span>
              </div>
              <Progress value={45} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label>Q3 2024: Lead-Generierung</Label>
                <span className="text-sm text-muted-foreground">20% erreicht</span>
              </div>
              <Progress value={20} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Ziele speichern</Button>
      </div>
    </div>
  );
}