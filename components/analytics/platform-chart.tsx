"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

interface PlatformChartProps {
  platform: string;
  dateRange: { from: Date; to: Date };
}

export function PlatformChart({ platform, dateRange }: PlatformChartProps) {
  // Beispieldaten - In der Produktion würden diese aus einer API kommen
  const data = [
    { date: "01.03", followers: 1200 },
    { date: "08.03", followers: 1350 },
    { date: "15.03", followers: 1500 },
    { date: "22.03", followers: 1750 },
    { date: "29.03", followers: 2000 },
  ];

  return (
    <div className="h-[100px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Follower
                        </span>
                        <span className="font-bold text-muted-foreground">
                          {payload[0].value}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="followers"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}