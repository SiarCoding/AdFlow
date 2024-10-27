"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarketingGoals } from "@/components/strategy/marketing-goals";
import { CompetitorAnalysis } from "@/components/strategy/competitor-analysis";
import { TargetAudience } from "@/components/strategy/target-audience";
import { StrategyRecommendations } from "@/components/strategy/strategy-recommendations";

export default function StrategyPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Strategieentwicklung</h1>
      </div>

      <Tabs defaultValue="goals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="goals">Marketingziele</TabsTrigger>
          <TabsTrigger value="audience">Zielgruppe</TabsTrigger>
          <TabsTrigger value="competitors">Wettbewerber</TabsTrigger>
          <TabsTrigger value="recommendations">Empfehlungen</TabsTrigger>
        </TabsList>

        <TabsContent value="goals">
          <MarketingGoals />
        </TabsContent>

        <TabsContent value="audience">
          <TargetAudience />
        </TabsContent>

        <TabsContent value="competitors">
          <CompetitorAnalysis />
        </TabsContent>

        <TabsContent value="recommendations">
          <StrategyRecommendations />
        </TabsContent>
      </Tabs>
    </div>
  );
}