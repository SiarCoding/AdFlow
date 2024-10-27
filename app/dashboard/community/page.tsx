import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, ThumbsUp, Share2 } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Community Management</h1>

      <Tabs defaultValue="comments">
        <TabsList>
          <TabsTrigger value="comments">Kommentare</TabsTrigger>
          <TabsTrigger value="messages">Nachrichten</TabsTrigger>
          <TabsTrigger value="mentions">Erwähnungen</TabsTrigger>
        </TabsList>
        
        <TabsContent value="comments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Neueste Kommentare</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Comment items would go here */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Max Mustermann</span>
                  <span className="text-sm text-muted-foreground">Vor 2 Stunden</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Super Produkt! Ich bin begeistert von der Qualität.
                </p>
                <div className="flex gap-4">
                  <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" /> Like
                  </button>
                  <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" /> Antworten
                  </button>
                  <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                    <Share2 className="h-4 w-4" /> Teilen
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Other tab contents would be similar */}
      </Tabs>
    </div>
  );
}