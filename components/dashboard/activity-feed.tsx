"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Instagram, Facebook, Linkedin, MessageSquare, Heart, Share2 } from "lucide-react";

const activities = [
  {
    platform: "Instagram",
    icon: Instagram,
    type: "comment",
    content: "New comment on your post",
    user: "Sarah Miller",
    time: "5 minutes ago",
    status: "new"
  },
  {
    platform: "Facebook",
    icon: Facebook,
    type: "like",
    content: "Your post received 50 likes",
    time: "15 minutes ago",
    status: "read"
  },
  {
    platform: "LinkedIn",
    icon: Linkedin,
    type: "share",
    content: "Your article was shared 12 times",
    time: "1 hour ago",
    status: "read"
  }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case "comment":
      return MessageSquare;
    case "like":
      return Heart;
    case "share":
      return Share2;
    default:
      return MessageSquare;
  }
};

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const PlatformIcon = activity.icon;
              const ActivityIcon = getActivityIcon(activity.type);

              return (
                <div
                  key={index}
                  className={`flex items-start space-x-4 p-4 rounded-lg transition-colors ${
                    activity.status === "new" ? "bg-muted/50" : ""
                  }`}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <PlatformIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{activity.content}</p>
                      {activity.status === "new" && (
                        <Badge variant="default">New</Badge>
                      )}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <ActivityIcon className="mr-1 h-3 w-3" />
                      <span>{activity.time}</span>
                      {activity.user && (
                        <>
                          <span className="mx-1">•</span>
                          <span>{activity.user}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}