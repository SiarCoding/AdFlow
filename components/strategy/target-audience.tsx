"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { PlusCircle, X } from "lucide-react";
import { useState } from "react";

interface Interest {
  id: string;
  name: string;
}

export function TargetAudience() {
  const [ageRange, setAgeRange] = useState([25, 45]);
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);

  const suggestedInterests = [
    { id: "1", name: "Mode & Fashion" },
    { id: "2", name: "Lifestyle" },
    { id: "3", name: "Technologie" },
    { id: "4", name: "Fitness" },
    { id: "5", name: "Reisen" },
    { id: "6", name: "Nachhaltigkeit" },
  ];

  const addInterest = (interest: Interest) => {
    if (!selectedInterests.find(i => i.id === interest.id)) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const removeInterest = (interestId: string) => {
    setSelectedInterests(selectedInterests.filter(i => i.id !== interestId));
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Zielgruppen-Definition</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Altersbereich</Label>
              <div className="pt-6">
                <Slider
                  value={ageRange}
                  min={18}
                  max={65}
                  step={1}
                  onValueChange={setAgeRange}
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-muted-foreground">{ageRange[0]} Jahre</span>
                  <span className="text-sm text-muted-foreground">{ageRange[1]} Jahre</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Interessen</Label>
              <div className="flex flex-wrap gap-2">
                {selectedInterests.map((interest) => (
                  <Badge key={interest.id} variant="secondary">
                    {interest.name}
                    <button
                      onClick={() => removeInterest(interest.id)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <ScrollArea className="h-[200px] border rounded-md mt-2 p-4">
                <div className="grid grid-cols-2 gap-2">
                  {suggestedInterests.map((interest) => (
                    <Button
                      key={interest.id}
                      variant="outline"
                      className="justify-start"
                      onClick={() => addInterest(interest)}
                    >
                      {interest.name}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="space-y-2">
              <Label>Beschreibung der Zielgruppe</Label>
              <Textarea
                placeholder="Beschreiben Sie Ihre ideale Zielgruppe..."
                rows={4}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Persona erstellen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input placeholder="z.B. Marketing-Maria" />
            </div>
            <div className="space-y-2">
              <Label>Alter</Label>
              <Input type="number" placeholder="35" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Beruf</Label>
            <Input placeholder="z.B. Marketing Manager" />
          </div>
          <div className="space-y-2">
            <Label>Herausforderungen</Label>
            <Textarea
              placeholder="Welche Probleme hat diese Person?"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label>Ziele</Label>
            <Textarea
              placeholder="Was möchte diese Person erreichen?"
              rows={3}
            />
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Persona hinzufügen
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}