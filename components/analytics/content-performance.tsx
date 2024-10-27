"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";

interface ContentItem {
  id: string;
  type: string;
  title: string;
  platform: string;
  engagement: number;
  reach: number;
  performance: number;
}

const contentData: ContentItem[] = [
  {
    id: "1",
    type: "Post",
    title: "Product Launch Announcement",
    platform: "Instagram",
    engagement: 4.2,
    reach: 12400,
    performance: 92
  },
  // Add more content items...
];

export function ContentPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {contentData.map((content) => (
              <div
                key={content.id}
                className="p-4 border rounded-lg space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{content.title}</h3>
                      <Badge variant="outline">{content.type}</Badge>
                      <Badge>{content.platform}</Badge>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Engagement</p>
                        <p className="text-lg font-semibold">{content.engagement}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Reach</p>
                        <p className="text-lg font-semibold">{content.reach.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Performance</p>
                        <p className="text-lg font-semibold">{content.performance}%</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Analyze
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