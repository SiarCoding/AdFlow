"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Content-Kalender</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Geplante Inhalte</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Instagram Post</span>
                <span className="text-xs text-muted-foreground">14:00 Uhr</span>
              </div>
              <p className="text-sm text-muted-foreground">Produktankündigung: Neue Sommerkollektion</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Facebook Story</span>
                <span className="text-xs text-muted-foreground">16:30 Uhr</span>
              </div>
              <p className="text-sm text-muted-foreground">Behind-the-Scenes vom Fotoshooting</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}