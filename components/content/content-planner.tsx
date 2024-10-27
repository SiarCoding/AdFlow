"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Instagram, Facebook, Linkedin } from "lucide-react";

const platformIcons = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
};

const scheduledContent = [
  {
    id: 1,
    title: "Produktlaunch Post",
    platform: "instagram",
    type: "Post",
    date: new Date(2024, 2, 15, 10, 0),
    status: "geplant"
  },
  {
    id: 2,
    title: "Team-Update",
    platform: "linkedin",
    type: "Article",
    date: new Date(2024, 2, 15, 14, 0),
    status: "entwurf"
  },
  // Weitere geplante Inhalte...
];

export function ContentPlanner() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const dayContent = scheduledContent.filter(
    (content) => format(content.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Kalender</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            locale={de}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Geplante Inhalte für {format(selectedDate, "dd. MMMM yyyy", { locale: de })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {dayContent.map((content) => {
                const Icon = platformIcons[content.platform];
                return (
                  <div key={content.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <Icon className="h-5 w-5 mt-1 text-muted-foreground" />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{content.title}</p>
                        <Badge variant={content.status === "geplant" ? "default" : "secondary"}>
                          {content.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {format(content.date, "HH:mm")} Uhr - {content.type}
                      </p>
                    </div>
                  </div>
                );
              })}
              {dayContent.length === 0 && (
                <p className="text-center text-muted-foreground">
                  Keine Inhalte für diesen Tag geplant
                </p>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}