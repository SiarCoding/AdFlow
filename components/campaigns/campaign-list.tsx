"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Pause, Play, Trash2 } from "lucide-react";
import { getCampaigns, updateCampaign, deleteCampaign } from "@/lib/actions/campaign";
import { useToast } from "@/components/ui/use-toast";

interface Campaign {
  id: number;
  name: string;
  platforms: string[];
  status: string;
  budget: number | null;
  startDate: Date;
  endDate: Date | null;
}

export function CampaignList({ userId }: { userId: string }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const data = await getCampaigns(userId);
        setCampaigns(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load campaigns",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, [userId, toast]);

  const handleStatusToggle = async (campaignId: number, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "active" ? "paused" : "active";
      await updateCampaign(campaignId, userId, { status: newStatus });
      
      setCampaigns(campaigns.map(campaign => 
        campaign.id === campaignId 
          ? { ...campaign, status: newStatus }
          : campaign
      ));

      toast({
        title: "Success",
        description: `Campaign ${newStatus === "active" ? "activated" : "paused"}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update campaign status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (campaignId: number) => {
    try {
      await deleteCampaign(campaignId, userId);
      setCampaigns(campaigns.filter(campaign => campaign.id !== campaignId));
      
      toast({
        title: "Success",
        description: "Campaign deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete campaign",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading campaigns...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell className="font-medium">{campaign.name}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {campaign.platforms.map((platform) => (
                    <Badge key={platform} variant="outline">
                      {platform}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                  {campaign.status}
                </Badge>
              </TableCell>
              <TableCell>
                {campaign.budget ? `€${campaign.budget.toLocaleString()}` : "-"}
              </TableCell>
              <TableCell>
                {new Date(campaign.startDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {campaign.endDate 
                  ? new Date(campaign.endDate).toLocaleDateString()
                  : "-"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleStatusToggle(campaign.id, campaign.status)}
                  >
                    {campaign.status === "active" ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(campaign.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {campaigns.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground">
                No campaigns found. Create your first campaign to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}