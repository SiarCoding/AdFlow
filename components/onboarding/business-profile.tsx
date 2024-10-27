"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface BusinessProfileProps {
  businessTypes: { value: string; label: string; }[];
  onSubmit: (data: any) => void;
  loading: boolean;
}

export function BusinessProfile({ businessTypes, onSubmit, loading }: BusinessProfileProps) {
  const [goals, setGoals] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      name: formData.get("name"),
      description: formData.get("description"),
      industry: formData.get("industry"),
      website: formData.get("website"),
      businessType: selectedType,
      goals
    });
  };

  const handleGoalAdd = (goal: string) => {
    if (!goals.includes(goal)) {
      setGoals([...goals, goal]);
    }
  };

  const handleGoalRemove = (goal: string) => {
    setGoals(goals.filter(g => g !== goal));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      <div className="space-y-2">
        <Label>Business Type</Label>
        <Select
          value={selectedType}
          onValueChange={setSelectedType}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your business type" />
          </SelectTrigger>
          <SelectContent>
            {businessTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Business Name</Label>
        <Input id="name" name="name" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Business Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Tell us about your business..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <Input id="industry" name="industry" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input id="website" name="website" type="url" />
      </div>

      <div className="space-y-2">
        <Label>Business Goals</Label>
        <Select onValueChange={handleGoalAdd}>
          <SelectTrigger>
            <SelectValue placeholder="Add a goal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="brand_awareness">Increase Brand Awareness</SelectItem>
            <SelectItem value="lead_generation">Generate Leads</SelectItem>
            <SelectItem value="sales">Drive Sales</SelectItem>
            <SelectItem value="engagement">Boost Engagement</SelectItem>
            <SelectItem value="community">Build Community</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex flex-wrap gap-2 mt-2">
          {goals.map(goal => (
            <Badge key={goal} variant="secondary">
              {goal.replace("_", " ")}
              <button
                type="button"
                onClick={() => handleGoalRemove(goal)}
                className="ml-2 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Saving..." : "Continue"}
      </Button>
    </form>
  );
}