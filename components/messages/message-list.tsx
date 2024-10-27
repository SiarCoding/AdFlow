"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface MessageListProps {
  onSelect: (id: string) => void;
  selected: string | null;
}

const conversations = [
  {
    id: "1",
    name: "Max Mustermann",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Max",
    lastMessage: "Danke für die schnelle Antwort!",
    time: "Vor 5 Min.",
    unread: true,
    platform: "Instagram"
  },
  {
    id: "2",
    name: "Laura Schmidt",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laura",
    lastMessage: "Wann ist der neue Artikel verfügbar?",
    time: "Vor 2 Std.",
    unread: false,
    platform: "Facebook"
  },
  // Weitere Konversationen...
];

export function MessageList({ onSelect, selected }: MessageListProps) {
  return (
    <div className="space-y-2">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className={cn(
            "p-3 rounded-lg cursor-pointer hover:bg-accent",
            selected === conversation.id && "bg-accent",
            conversation.unread && "font-medium"
          )}
          onClick={() => onSelect(conversation.id)}
        >
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage src={conversation.avatar} />
              <AvatarFallback>{conversation.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium leading-none">
                  {conversation.name}
                </p>
                <span className="text-xs text-muted-foreground">
                  {conversation.time}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {conversation.lastMessage}
                </p>
                <Badge variant="outline" className="ml-2">
                  {conversation.platform}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}