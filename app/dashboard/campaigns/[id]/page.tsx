"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CampaignMetrics } from "@/components/campaigns/campaign-metrics";
import { ABTestDialog } from "@/components/campaigns/ab-test-dialog";
import { ABTestResults } from "@/components/campaigns/ab-test-results";
import { TargetingSettings } from "@/components/campaigns/targeting-settings";
import { BudgetSettings } from "@/components/campaigns/budget-settings";
import { useState } from "react";
import { ArrowLeft, Play, Pause, Settings, TestTubes } from "lucide-react";
import Link from "next/link";

export default function CampaignDetailPage() {
  const [showABTestDialog, setShowABTestDialog] = useState(false);

  // Mock data for the campaign metrics
  const campaignData = {
    reach: 45200,
    engagement: 2.8,
    conversions: 1254,
    performance: [
      { date: '2024-01', reach: 30000, engagement: 2.1, conversions: 900 },
      { date: '2024-02', reach: 35000, engagement: 2.4, conversions: 1050 },
      { date: '2024-03', reach: 45200, engagement: 2.8, conversions: 1254 },
    ]
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/campaigns">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Sommerkollektion 2024</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon">
            <Pause className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Button onClick={() => setShowABTestDialog(true)}>
            <TestTubes className="mr-2 h-4 w-4" />
            A/B-Test erstellen
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-2xl font-bold">€2.450</p>
                <p className="text-xs text-muted-foreground">von €5.000 ausgegeben</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Reichweite</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-2xl font-bold">45.2K</p>
                <p className="text-xs text-green-500">+12.3% zur Vorwoche</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-2xl font-bold">3.8%</p>
                <p className="text-xs text-green-500">+0.5% zur Vorwoche</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="targeting">Zielgruppe</TabsTrigger>
            <TabsTrigger value="budget">Budget & Zeitplan</TabsTrigger>
            <TabsTrigger value="ab-tests">A/B-Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="performance">
            <CampaignMetrics 
              campaignId={1} 
              data={campaignData}
            />
          </TabsContent>

          <TabsContent value="targeting">
            <TargetingSettings />
          </TabsContent>

          <TabsContent value="budget">
            <BudgetSettings />
          </TabsContent>

          <TabsContent value="ab-tests">
            <ABTestResults />
          </TabsContent>
        </Tabs>
      </div>

      <ABTestDialog 
        open={showABTestDialog} 
        onOpenChange={setShowABTestDialog}
      />
    </div>
  );
}
