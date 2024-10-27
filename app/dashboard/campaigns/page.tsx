"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { CampaignList } from "@/components/campaigns/campaign-list";
import { NewCampaignDialog } from "@/components/campaigns/new-campaign-dialog";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function CampaignsPage() {
  const [showNewCampaignDialog, setShowNewCampaignDialog] = useState(false);
  const { userId, isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    redirect("/auth/signin");
  }

  if (!userId) {
    return <div>User ID not found</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Kampagnen</h1>
        <Button onClick={() => setShowNewCampaignDialog(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Neue Kampagne
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aktive Kampagnen</CardTitle>
        </CardHeader>
        <CardContent>
          <CampaignList userId={userId} />
        </CardContent>
      </Card>

      <NewCampaignDialog 
        open={showNewCampaignDialog} 
        onOpenChange={setShowNewCampaignDialog}
      />
    </div>
  );
}
