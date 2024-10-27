"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { date: "01.03", engagement: 2400, reach: 4000, impressions: 8000 },
  { date: "02.03", engagement: 1398, reach: 3000, impressions: 7000 },
  { date: "03.03", engagement: 9800, reach: 2000, impressions: 9000 },
  { date: "04.03", engagement: 3908, reach: 2780, impressions: 6000 },
  { date: "05.03", engagement: 4800, reach: 1890, impressions: 8500 },
  { date: "06.03", engagement: 3800, reach: 2390, impressions: 7800 },
  { date: "07.03", engagement: 4300, reach: 3490, impressions: 8900 },
];

export function PerformanceMetrics() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Performance-Übersicht</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Datum
                            </span>
                            <span className="font-bold">{label}</span>
                          </div>
                          {payload.map((entry) => (
                            <div key={entry.name} className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                {entry.name}
                              </span>
                              <span className="font-bold">{entry.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="engagement" 
                name="Engagement"
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="reach" 
                name="Reichweite"
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="impressions" 
                name="Impressionen"
                stroke="hsl(var(--secondary))" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}