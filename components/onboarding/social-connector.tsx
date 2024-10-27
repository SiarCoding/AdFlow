"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Instagram, Facebook, Linkedin, BrandTiktok, Loader2 } from "lucide-react";

interface SocialConnectorProps {
  onConnect: (platform: string) => void;
  connectedPlatforms: string[];
  loading: boolean;
}

export function SocialConnector({
  onConnect,
  connectedPlatforms,
  loading
}: SocialConnectorProps) {
  const platforms = [
    {
      name: "Instagram",
      icon: Instagram,
      description: "Connect your Instagram Business account"
    },
    {
      name: "Facebook",
      icon: Facebook,
      description: "Connect your Facebook Page"
    },
    {
      name: "TikTok",
      icon: BrandTiktok,
      description: "Connect your TikTok Business account"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      description: "Connect your LinkedIn Company Page"
    }
  ];

  return (
    <div className="space-y-6 mt-6">
      <div className="grid gap-4 md:grid-cols-2">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          const isConnected = connectedPlatforms.includes(platform.name);

          return (
            <Card
              key={platform.name}
              className="p-6 flex flex-col items-center text-center space-y-4"
            >
              <Icon className="h-12 w-12" />
              <div>
                <h3 className="font-semibold">{platform.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {platform.description}
                </p>
              </div>
              <Button
                variant={isConnected ? "secondary" : "default"}
                className="w-full"
                onClick={() => onConnect(platform.name)}
                disabled={loading || isConnected}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icon className="mr-2 h-4 w-4" />
                )}
                {isConnected ? "Connected" : "Connect"}
              </Button>
            </Card>
          );
        })}
      </div>

      {connectedPlatforms.length > 0 && (
        <Button
          className="w-full"
          onClick={() => onConnect("finish")}
          disabled={loading}
        >
          Continue to Dashboard
        </Button>
      )}
    </div>
  );
}