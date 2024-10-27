"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  Video,
  Facebook,
  Search,
  Briefcase,
  FileText,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useState } from "react";

interface TrendDashboardProps {
  industry: string;
}

export function TrendDashboard({ industry }: TrendDashboardProps) {
  const [loading, setLoading] = useState(false);
  const [trends, setTrends] = useState<any>(null);

  const fetchTrends = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/trends/comprehensive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry })
      });
      const data = await response.json();
      setTrends(data);
    } catch (error) {
      console.error("Fehler beim Laden der Trends:", error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Trend Analysis</h2>
        <Button onClick={fetchTrends} disabled={loading}>
          {loading ? (
            "Analysiere Trends..."
          ) : (
            <>
              <TrendingUp className="mr-2 h-4 w-4" />
              Trends aktualisieren
            </>
          )}
        </Button>
      </div>

      {trends && (
        <Tabs defaultValue="google" className="space-y-4">
          <TabsList>
            <TabsTrigger value="google">
              <Search className="mr-2 h-4 w-4" />
              Google Trends
            </TabsTrigger>
            <TabsTrigger value="tiktok">
              <Video className="mr-2 h-4 w-4" />
              TikTok Trends
            </TabsTrigger>
            <TabsTrigger value="facebook">
              <Facebook className="mr-2 h-4 w-4" />
              Facebook & Instagram
            </TabsTrigger>
            <TabsTrigger value="business">
              <Briefcase className="mr-2 h-4 w-4" />
              Business Trends
            </TabsTrigger>
            <TabsTrigger value="content">
              <FileText className="mr-2 h-4 w-4" />
              Content Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="google">
            <Card>
              <CardHeader>
                <CardTitle>Google Trends & Suchverhalten</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {trends.trends.google.map((trend: any, index: number) => (
                      <div
                        key={index}
                        className="p-4 border rounded-lg space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">{trend.keyword}</h3>
                          <Badge>{trend.growth}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Kategorie: {trend.category}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {trend.relatedTopics.map((topic: string, i: number) => (
                            <Badge key={i} variant="outline">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Similar TabsContent for other platforms... */}

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                KI-generierte Content-Vorschläge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {trends.contentSuggestions.contentIdeas.map((idea: any, index: number) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{idea.title}</h3>
                        <Badge>{idea.platform}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {idea.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {idea.hashtags.map((tag: string, i: number) => (
                          <Badge key={i} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Erwartetes Engagement: {idea.estimatedEngagement}
                        </span>
                        <Button variant="outline" size="sm">
                          Content erstellen
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </Tabs>
      )}
    </div>
  );
}