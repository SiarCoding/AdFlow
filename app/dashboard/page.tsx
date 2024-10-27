"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/dashboard/overview";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { AIRecommendations } from "@/components/dashboard/ai-recommendations";
import { MarketingScore } from "@/components/dashboard/marketing-score";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { AIOptimizationDialog } from "@/components/dashboard/ai-optimization-dialog";

export default function DashboardPage() {
  const [showOptimization, setShowOptimization] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={() => setShowOptimization(true)}>
          <Sparkles className="mr-2 h-4 w-4" />
          KI-Optimierung starten
        </Button>
      </div>

      <MarketingScore />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance-Übersicht</CardTitle>
          </CardHeader>
          <CardContent>
            <Overview />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>KI-Empfehlungen</CardTitle>
          </CardHeader>
          <CardContent>
            <AIRecommendations />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Aktivitäten</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-between" variant="outline">
              Content erstellen
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button className="w-full justify-between" variant="outline">
              Kampagne starten
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button className="w-full justify-between" variant="outline">
              Performance analysieren
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <AIOptimizationDialog 
        open={showOptimization} 
        onOpenChange={setShowOptimization}
      />
    </div>
  );
}
