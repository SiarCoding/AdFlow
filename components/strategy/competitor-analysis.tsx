"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Instagram, Facebook, Linkedin, TrendingUp, Users, MessageSquare } from "lucide-react";

const competitors = [
  {
    name: "Hauptkonkurrent GmbH",
    platforms: {
      instagram: {
        followers: "25.4K",
        engagement: "4.8%",
        postFrequency: "täglich"
      },
      facebook: {
        followers: "18.2K",
        engagement: "3.2%",
        postFrequency: "3x/Woche"
      },
      linkedin: {
        followers: "12.1K",
        engagement: "2.9%",
        postFrequency: "2x/Woche"
      }
    },
    strengths: ["Starke Bildsprache", "Hohe Engagement-Rate", "Regelmäßige Stories"],
    weaknesses: ["Wenig Video-Content", "Geringe Interaktion in Kommentaren"]
  },
  // Weitere Konkurrenten...
];

export function CompetitorAnalysis() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Konkurrenzanalyse</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {competitors.map((competitor, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-semibold">{competitor.name}</h3>
                
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(competitor.platforms).map(([platform, data]) => {
                    const Icon = {
                      instagram: Instagram,
                      facebook: Facebook,
                      linkedin: Linkedin
                    }[platform];

                    return (
                      <Card key={platform} className="p-4">
                        <div className="flex items-center space-x-2 mb-4">
                          <Icon className="h-5 w-5" />
                          <span className="capitalize">{platform}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Follower</span>
                            <span className="font-medium">{data.followers}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Engagement</span>
                            <span className="font-medium">{data.engagement}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Häufigkeit</span>
                            <span className="font-medium">{data.postFrequency}</span>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2 block">Stärken</Label>
                    <ul className="space-y-1">
                      {competitor.strengths.map((strength, i) => (
                        <li key={i} className="text-sm text-muted-foreground">
                          • {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <Label className="mb-2 block">Schwächen</Label>
                    <ul className="space-y-1">
                      {competitor.weaknesses.map((weakness, i) => (
                        <li key={i} className="text-sm text-muted-foreground">
                          • {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Konkurrent hinzufügen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name des Konkurrenten</Label>
              <Input placeholder="z.B. Konkurrent GmbH" />
            </div>
            <div className="space-y-2">
              <Label>Social Media Profile</Label>
              <div className="grid grid-cols-3 gap-4">
                <Input placeholder="Instagram URL" />
                <Input placeholder="Facebook URL" />
                <Input placeholder="LinkedIn URL" />
              </div>
            </div>
            <Button>Analyse starten</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}