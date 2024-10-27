"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, MessageSquare, Share2 } from "lucide-react";

const contentIdeas = [
  {
    title: "Behind-the-Scenes Einblicke",
    description: "Zeigen Sie Ihren Followern, wie Ihre Produkte hergestellt werden.",
    type: "Video",
    engagement: "Hoch",
    platform: "Instagram",
    tips: [
      "Authentische Momente einfangen",
      "Mitarbeiter einbeziehen",
      "Produktionsprozess zeigen"
    ]
  },
  {
    title: "Kundenerfolgsgeschichten",
    description: "Teilen Sie positive Erfahrungen Ihrer Kunden.",
    type: "Carousel",
    engagement: "Mittel",
    platform: "LinkedIn",
    tips: [
      "Echte Testimonials verwenden",
      "Vorher-Nachher Bilder",
      "Ergebnisse hervorheben"
    ]
  },
  // Weitere Ideen...
];

export function ContentIdeas() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {contentIdeas.map((idea, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{idea.title}</CardTitle>
              <Badge>{idea.platform}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{idea.description}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{idea.type}</Badge>
                <Badge variant="outline">Engagement: {idea.engagement}</Badge>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">Tipps:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {idea.tips.map((tip, i) => (
                    <li key={i}>• {tip}</li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-4 mt-4">
                <Button variant="outline" size="sm">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Speichern
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Teilen
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}