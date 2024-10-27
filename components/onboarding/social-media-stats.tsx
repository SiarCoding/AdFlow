"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Instagram, Facebook, Linkedin, Loader2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { connectInstagram, connectFacebook, connectLinkedIn } from "@/lib/social-api";
import { useToast } from "@/components/ui/use-toast";

interface SocialMediaStatsProps {
  connectedAccounts: string[];
  onComplete: () => void;
}

interface PlatformData {
  followers: number;
  posts: number;
  engagement: number;
  recentPosts: any[];
  loaded: boolean;
  error?: string;
}

export function SocialMediaStats({ connectedAccounts, onComplete }: SocialMediaStatsProps) {
  const [progress, setProgress] = useState(0);
  const [platformData, setPlatformData] = useState<Record<string, PlatformData>>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadPlatformData = async () => {
      const totalSteps = connectedAccounts.length;
      let currentStep = 0;

      for (const platform of connectedAccounts) {
        try {
          let data;
          switch (platform) {
            case "Instagram":
              data = await connectInstagram("mock-token");
              break;
            case "Facebook":
              data = await connectFacebook("mock-token");
              break;
            case "LinkedIn":
              data = await connectLinkedIn("mock-token");
              break;
            default:
              throw new Error("Unbekannte Plattform");
          }

          setPlatformData(prev => ({
            ...prev,
            [platform]: {
              ...data,
              loaded: true,
            }
          }));

          toast({
            title: `${platform} Daten geladen`,
            description: "Ihre Social Media Daten wurden erfolgreich analysiert.",
          });
        } catch (error) {
          setPlatformData(prev => ({
            ...prev,
            [platform]: {
              followers: 0,
              posts: 0,
              engagement: 0,
              recentPosts: [],
              loaded: true,
              error: "Fehler beim Laden der Daten",
            }
          }));

          toast({
            title: "Fehler",
            description: `Fehler beim Laden der ${platform}-Daten.`,
            variant: "destructive",
          });
        }

        currentStep++;
        setProgress((currentStep / totalSteps) * 100);
      }

      setLoading(false);
    };

    loadPlatformData();
  }, [connectedAccounts, toast]);

  const platformIcons = {
    Instagram: Instagram,
    Facebook: Facebook,
    LinkedIn: Linkedin,
  };

  return (
    <div className="space-y-6 mt-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Daten werden analysiert...</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} />
      </div>

      <div className="grid gap-4">
        {connectedAccounts.map(platform => {
          const Icon = platformIcons[platform as keyof typeof platformIcons];
          const data = platformData[platform];

          return (
            <Card key={platform} className="p-4">
              <div className="flex items-center space-x-4">
                <Icon className="h-8 w-8 text-muted-foreground" />
                <div className="flex-1">
                  <h3 className="font-semibold">{platform}</h3>
                  {data?.error ? (
                    <div className="flex items-center space-x-2 text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">{data.error}</span>
                    </div>
                  ) : data?.loaded ? (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Follower</p>
                        <p className="text-lg font-semibold">{data.followers.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Posts</p>
                        <p className="text-lg font-semibold">{data.posts.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Engagement</p>
                        <p className="text-lg font-semibold">{data.engagement.toFixed(1)}%</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 mt-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">Daten werden geladen...</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {!loading && (
        <Button className="w-full" onClick={onComplete}>
          Weiter zum Dashboard
        </Button>
      )}
    </div>
  );
}