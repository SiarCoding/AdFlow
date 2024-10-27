"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePickerWithRange } from "@/components/date-picker-with-range";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { PlatformStats } from "./platform-stats";
import { EngagementMetrics } from "./engagement-metrics";
import { PerformanceMetrics } from "./performance-metrics";
import { AudienceInsights } from "./audience-insights";

export function AnalyticsOverview() {
  const [date, setDate] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 30),
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Overview</h2>
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6">
            <PlatformStats dateRange={date} />
            <PerformanceMetrics />
          </div>
        </TabsContent>

        <TabsContent value="engagement">
          <EngagementMetrics dateRange={date} />
        </TabsContent>

        <TabsContent value="audience">
          <AudienceInsights />
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Content performance metrics will be implemented here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}