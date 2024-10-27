"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";

interface ContentSuggestion {
  title: string;
  content: string;
  type: string;
  platform: string;
  estimatedEngagement: string;
  hashtags: string[];
}

export function AIContentGenerator() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<ContentSuggestion[]>([]);

  const generateContent = async () => {
    setLoading(true);
    // Simuliere API-Aufruf
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSuggestions([
      {
        title: "Behind-the-Scenes Einblick",
        content: "Entdecken Sie den kreativen Prozess hinter unserer neuesten Kollektion! 🎨✨",
        type: "Reel",
        platform: "Instagram",
        estimatedEngagement: "4.2%",
        hashtags: ["#behindthescenes", "#newcollection", "#creativity"]
      },
      {
        title: "Expertentipp der Woche",
        content: "5 unverzichtbare Tipps für erfolgreiches Social Media Marketing im Jahr 2024",
        type: "Carousel",
        platform: "LinkedIn",
        estimatedEngagement: "3.8%",
        hashtags: ["#marketing", "#socialmedia", "#tips"]
      }
    ]);
    setLoading(false);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>KI-Content Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Thema/Produkt</Label>
            <Input placeholder="z.B. Neue Sommerkollektion" />
          </div>
          
          <div className="space-y-2">
            <Label>Zielgruppe</Label>
            <Input placeholder="z.B. Mode-interessierte Frauen, 25-35 Jahre" />
          </div>
          
          <div className="space-y-2">
            <Label>Tonalität</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Wählen Sie einen Stil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professionell</SelectItem>
                <SelectItem value="casual">Locker & Casual</SelectItem>
                <SelectItem value="luxury">Premium & Luxuriös</SelectItem>
                <SelectItem value="playful">Verspielt & Jung</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="w-full" 
            onClick={generateContent}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generiere Vorschläge...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Content generieren
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>KI-Vorschläge</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{suggestion.title}</h3>
                    <div className="flex gap-2">
                      <Badge>{suggestion.platform}</Badge>
                      <Badge variant="outline">{suggestion.type}</Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {suggestion.content}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {suggestion.hashtags.map((tag, i) => (
                      <Badge key={i} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-muted-foreground">
                      Erwartetes Engagement: {suggestion.estimatedEngagement}
                    </span>
                    <Button variant="outline" size="sm">
                      Verwenden
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}