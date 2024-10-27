"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { createCampaign, updateCampaign } from "@/lib/actions/campaign";
import { useToast } from "@/components/ui/use-toast";

interface CampaignFormProps {
  initialData?: any;
  onSuccess?: () => void;
}

export function CampaignForm({ initialData, onSuccess }: CampaignFormProps) {
  const [loading, setLoading] = useState(false);
  const [platforms, setPlatforms] = useState<string[]>(initialData?.platforms || []);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get("name") as string,
        startDate: new Date(formData.get("startDate") as string),
        endDate: formData.get("endDate") ? new Date(formData.get("endDate") as string) : undefined,
        status: formData.get("status") as string,
        budget: formData.get("budget") ? parseFloat(formData.get("budget") as string) : undefined,
        targetAudience: formData.get("targetAudience") as string,
        platforms,
        userId: "user_id" // Replace with actual user ID from auth
      };

      if (initialData) {
        await updateCampaign(initialData.id, data.userId, data);
      } else {
        await createCampaign(data);
      }

      toast({
        title: "Success",
        description: `Campaign ${initialData ? "updated" : "created"} successfully`,
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Campaign form error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePlatformAdd = (platform: string) => {
    if (!platforms.includes(platform)) {
      setPlatforms([...platforms, platform]);
    }
  };

  const handlePlatformRemove = (platform: string) => {
    setPlatforms(platforms.filter(p => p !== platform));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Campaign Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={initialData?.name}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            defaultValue={initialData?.startDate?.split('T')[0]}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            defaultValue={initialData?.endDate?.split('T')[0]}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select name="status" defaultValue={initialData?.status || "draft"}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="budget">Budget</Label>
        <Input
          id="budget"
          name="budget"
          type="number"
          step="0.01"
          defaultValue={initialData?.budget}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetAudience">Target Audience</Label>
        <Textarea
          id="targetAudience"
          name="targetAudience"
          defaultValue={initialData?.targetAudience}
        />
      </div>

      <div className="space-y-2">
        <Label>Platforms</Label>
        <Select onValueChange={handlePlatformAdd}>
          <SelectTrigger>
            <SelectValue placeholder="Add platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
            <SelectItem value="linkedin">LinkedIn</SelectItem>
            <SelectItem value="tiktok">TikTok</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex flex-wrap gap-2 mt-2">
          {platforms.map(platform => (
            <Badge key={platform} variant="secondary">
              {platform}
              <button
                type="button"
                onClick={() => handlePlatformRemove(platform)}
                className="ml-2 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : initialData ? "Update Campaign" : "Create Campaign"}
      </Button>
    </form>
  );
}