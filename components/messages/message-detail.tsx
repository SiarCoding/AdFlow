"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { useState } from "react";

interface MessageDetailProps {
  conversationId: string;
}

const messages = [
  {
    id: "1",
    sender: "customer",
    name: "Max Mustermann",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Max",
    content: "Hallo, ich habe eine Frage zu Ihrem Produkt.",
    time: "14:23"
  },
  {
    id: "2",
    sender: "business",
    name: "Mein Unternehmen",
    avatar: "/company-logo.png",
    content: "Gerne! Wie kann ich Ihnen helfen?",
    time: "14:25"
  },
  // Weitere Nachrichten...
];

export function MessageDetail({ conversationId }: MessageDetailProps) {
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Max" />
            <AvatarFallback>MM</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Max Mustermann</p>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "business" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[70%] ${
                  message.sender === "business" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.avatar} />
                  <AvatarFallback>{message.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "business"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Handle message sending
            setNewMessage("");
          }}
          className="flex space-x-2"
        >
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Nachricht schreiben..."
            className="flex-1"
          />
          <Button type="submit">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}