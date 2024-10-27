"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ArrowRight, Crown, TrendingUp } from "lucide-react";

const testData = {
  id: "test-1",
  status: "Aktiv",
  startDate: "01.03.2024",
  endDate: "15.03.2024",
  variants: [
    {
      name: "A",
      headline: "Entdecken Sie unsere neue Sommerkollektion",
      description: "Frische Styles für heiße Tage",
      cta: "Jetzt shoppen",
      metrics: {
        impressions: 12500,
        clicks: 750,
        conversions: 45,
        ctr: 6.0,
        conversionRate: 6.0
      }
    },
    {
      name: "B",
      headline: "Neu: Sommerkollektion 2024",
      description: "Limitierte Designs für Ihren Sommerlook",
      cta: "Kollektion entdecken",
      metrics: {
        impressions: 12500,
        clicks: 875,
        conversions: 58,
        ctr: 7.0,
        conversionRate: 6.6
      }
    }
  ]
};

const compareData = [
  { metric: "CTR", A: 6.0, B: 7.0 },
  { metric: "Conversion Rate", A: 6.0, B: 6.6 },
  { metric: "Durchschn. Bestellwert", A: 85, B: 92 },
];

export function ABTestResults() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">A/B-Test #1</h2>
          <p className="text-sm text-muted-foreground">
            {testData.startDate} - {testData.endDate}
          </p>
        </div>
        <Badge>{testData.status}</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {testData.variants.map((variant, index) => (
          <Card key={variant.name}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  Variante {variant.name}
                  {index === 1 && <Crown className="h-4 w-4 text-yellow-500" />}
                </CardTitle>
                {index === 1 && (
                  <Badge variant="secondary" className="bg-yellow-50">
                    +10% bessere Performance
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Überschrift</h4>
                  <p className="text-sm text-muted-foreground">{variant.headline}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Beschreibung</h4>
                  <p className="text-sm text-muted-foreground">{variant.description}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Call-to-Action</h4>
                  <Button variant="outline" size="sm">
                    {variant.cta}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Impressions</p>
                    <p className="text-2xl font-bold">{variant.metrics.impressions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Klicks</p>
                    <p className="text-2xl font-bold">{variant.metrics.clicks.toLocaleString()}</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <p className="text-sm font-medium">CTR</p>
                    <p className="text-sm text-muted-foreground">{variant.metrics.ctr}%</p>
                  </div>
                  <Progress value={variant.metrics.ctr * 10} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <p className="text-sm font-medium">Conversion Rate</p>
                    <p className="text-sm text-muted-foreground">{variant.metrics.conversionRate}%</p>
                  </div>
                  <Progress value={variant.metrics.conversionRate * 10} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vergleich der Metriken</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={compareData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="A" name="Variante A" fill="hsl(var(--primary))" />
                <Bar dataKey="B" name="Variante B" fill="hsl(var(--secondary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>
          Gewinner implementieren
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}