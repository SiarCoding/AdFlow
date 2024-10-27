"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import { ContentIdeas } from "@/components/content/content-ideas";
import { ContentCalendar } from "@/components/content/content-calendar";
import { ContentStrategy } from "@/components/content/content-strategy";
import { NewContentDialog } from "@/components/content/new-content-dialog";
import { useState } from "react";

export default function ContentPage() {
  const [showNewContentDialog, setShowNewContentDialog] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Content-Erstellung</h1>
        <Button onClick={() => setShowNewContentDialog(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Neuer Content
        </Button>
      </div>

      <Tabs defaultValue="ideas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ideas">Content-Ideen</TabsTrigger>
          <TabsTrigger value="calendar">Kalender</TabsTrigger>
          <TabsTrigger value="strategy">Strategie</TabsTrigger>
        </TabsList>

        <TabsContent value="ideas">
          <ContentIdeas />
        </TabsContent>

        <TabsContent value="calendar">
          <ContentCalendar />
        </TabsContent>

        <TabsContent value="strategy">
          <ContentStrategy />
        </TabsContent>
      </Tabs>

      <NewContentDialog 
        open={showNewContentDialog} 
        onOpenChange={setShowNewContentDialog}
      />
    </div>
  );
}