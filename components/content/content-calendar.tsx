"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { format } from "date-fns";
import { de } from "date-fns/locale";

const scheduledContent = {
  "2024-03-15": [
    {
      time: "10:00",
      type: "Post",
      platform: "Instagram",
      title: "Produktlaunch: Neue Kollektion"
    },
    {
      time: "14:00",
      type: "Story",
      platform: "Facebook",
      title: "Team-Meeting Highlights"
    }
  ],
  // Weitere Termine...
};

export function ContentCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const dateString = format(selectedDate, "yyyy-MM-dd");
  const dayContent = scheduledContent[dateString] || [];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          locale={de}
          className="rounded-md border"
        />
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          Geplante Inhalte für {format(selectedDate, "dd. MMMM yyyy", { locale: de })}
        </h3>
        <div className="space-y-4">
          {dayContent.map((content, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge>{content.platform}</Badge>
                  <Badge variant="outline">{content.type}</Badge>
                </div>
                <span className="text-sm text-muted-foreground">{content.time} Uhr</span>
              </div>
              <p className="text-sm font-medium">{content.title}</p>
            </div>
          ))}
          {dayContent.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Keine Inhalte für diesen Tag geplant.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}