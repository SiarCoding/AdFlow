"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { OnboardingProgress } from "@/components/onboarding/progress";
import { SocialConnector } from "@/components/onboarding/social-connector";
import { BusinessProfile } from "@/components/onboarding/business-profile";
import { useToast } from "@/components/ui/use-toast";

const businessTypes = [
  { value: "ecommerce", label: "E-Commerce Store" },
  { value: "saas", label: "SaaS Business" },
  { value: "agency", label: "Marketing Agency" },
  { value: "content", label: "Content Creator" },
  { value: "local", label: "Local Business" }
];

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [businessType, setBusinessType] = useState("");
  const [loading, setLoading] = useState(false);
  const [businessData, setBusinessData] = useState({
    name: "",
    description: "",
    industry: "",
    website: "",
    goals: [] as string[]
  });
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);

  const handleBusinessSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch("/api/onboarding/business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          ...data,
          businessType
        })
      });

      if (!response.ok) throw new Error("Failed to save business data");
      
      setBusinessData(data);
      setStep(2);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save business information",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialConnect = async (platform: string) => {
    setLoading(true);
    try {
      // Here we'll implement the OAuth flow for each platform
      const response = await fetch(`/api/social/connect/${platform.toLowerCase()}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id })
      });

      if (!response.ok) throw new Error(`Failed to connect ${platform}`);

      setConnectedPlatforms([...connectedPlatforms, platform]);
      
      toast({
        title: "Success",
        description: `Connected to ${platform} successfully`
      });

      if (connectedPlatforms.length === 0) {
        setStep(3);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to connect to ${platform}`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          businessData,
          connectedPlatforms
        })
      });

      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete onboarding",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <OnboardingProgress currentStep={step} />

          {step === 1 && (
            <BusinessProfile
              businessTypes={businessTypes}
              onSubmit={handleBusinessSubmit}
              loading={loading}
            />
          )}

          {step === 2 && (
            <SocialConnector
              onConnect={handleSocialConnect}
              connectedPlatforms={connectedPlatforms}
              loading={loading}
            />
          )}

          {step === 3 && (
            <div className="space-y-6 mt-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Setup Complete!</h3>
                <p className="text-muted-foreground mb-6">
                  Your profile is ready. Let's start optimizing your social media presence.
                </p>
                <Button 
                  className="w-full" 
                  onClick={handleComplete}
                  disabled={loading}
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}