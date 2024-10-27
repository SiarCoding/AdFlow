"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { DatePickerWithRange } from "@/components/date-picker-with-range";
import { DateRange } from "react-day-picker";

const data = [
  { name: "Jan", followers: 4000, engagement: 2400, reach: 2400 },
  { name: "Feb", followers: 3000, engagement: 1398, reach: 2210 },
  { name: "Mar", followers: 2000, engagement: 9800, reach: 2290 },
  { name: "Apr", followers: 2780, engagement: 3908, reach: 2000 },
  { name: "Mai", followers: 1890, engagement: 4800, reach: 2181 },
  { name: "Jun", followers: 2390, engagement: 3800, reach: 2500 },
];

export default function AnalyticsPage() {
  const [date, setDate] = useState<DateRange>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Übersicht</TabsTrigger>
          <TabsTrigger value="audience">Zielgruppe</TabsTrigger>
          <TabsTrigger value="content">Content Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="p-6">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="followers" 
                    stroke="#8884d8" 
                    name="Follower"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="engagement" 
                    stroke="#82ca9d" 
                    name="Engagement"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="reach" 
                    stroke="#ffc658" 
                    name="Reichweite"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="audience">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Zielgruppenanalyse</h2>
            {/* Audience analysis content */}
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Content Performance</h2>
            {/* Content performance metrics */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
