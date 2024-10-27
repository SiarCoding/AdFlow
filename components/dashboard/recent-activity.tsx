import { ScrollArea } from "@/components/ui/scroll-area";
import { Instagram, Facebook, Linkedin } from "lucide-react";

const activities = [
  {
    platform: "Instagram",
    icon: Instagram,
    action: "Neuer Kommentar",
    time: "Vor 5 Minuten",
    content: "Tolles Produkt! Wo kann ich es kaufen?"
  },
  {
    platform: "Facebook",
    icon: Facebook,
    action: "Neue Nachricht",
    time: "Vor 15 Minuten",
    content: "Anfrage nach Preisen"
  },
  {
    platform: "LinkedIn",
    icon: Linkedin,
    action: "Neuer Post",
    time: "Vor 1 Stunde",
    content: "Ihr Beitrag wurde 50 mal geteilt"
  },
  // More activities...
];

export function RecentActivity() {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {activities.map((activity, i) => {
          const Icon = activity.icon;
          return (
            <div key={i} className="flex items-start space-x-4">
              <Icon className="h-5 w-5 mt-1 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.content}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}