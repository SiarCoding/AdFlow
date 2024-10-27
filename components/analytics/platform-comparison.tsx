"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  {
    platform: "Instagram",
    followers: 12400,
    engagement: 420,
    reach: 45200,
  },
  {
    platform: "Facebook",
    followers: 8200,
    engagement: 310,
    reach: 32100,
  },
  {
    platform: "LinkedIn",
    followers: 5600,
    engagement: 280,
    reach: 18900,
  },
  {
    platform: "TikTok",
    followers: 15600,
    engagement: 580,
    reach: 89200,
  },
];

export function PlatformComparison() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Performance Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="platform" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="followers" 
                name="Followers" 
                fill="hsl(var(--primary))" 
              />
              <Bar 
                dataKey="engagement" 
                name="Engagement" 
                fill="hsl(var(--secondary))" 
              />
              <Bar 
                dataKey="reach" 
                name="Reach" 
                fill="hsl(var(--destructive))" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}