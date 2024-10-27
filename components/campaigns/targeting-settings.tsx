"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { useState } from "react";

interface Interest {
  id: string;
  name: string;
}

export function TargetingSettings() {
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);
  const [ageRange, setAgeRange] = useState([18, 65]);

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
          <CardTitle>Demografische Daten</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Altersbereich</Label>
              <div className="pt-6">
                <Slider
                  value={ageRange}
                  min={13}
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
              <Label>Geschlecht</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Geschlecht auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle</SelectItem>
                  <SelectItem value="male">Männlich</SelectItem>
                  <SelectItem value="female">Weiblich</SelectItem>
                  <SelectItem value="diverse">Divers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Sprache</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sprache auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="en">Englisch</SelectItem>
                  <SelectItem value="fr">Französisch</SelectItem>
                  <SelectItem value="es">Spanisch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interessen & Verhalten</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Ausgewählte Interessen</Label>
              <div className="flex flex-wrap gap-2 mt-2">
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
            </div>

            <div>
              <Label>Vorgeschlagene Interessen</Label>
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
              <Label>Verhaltensmuster</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Verhalten auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engaged">Stark engagierte Nutzer</SelectItem>
                  <SelectItem value="shoppers">Online-Käufer</SelectItem>
                  <SelectItem value="tech">Technik-Enthusiasten</SelectItem>
                  <SelectItem value="travelers">Vielreisende</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Standort</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Land</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Land auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="de">Deutschland</SelectItem>
                  <SelectItem value="at">Österreich</SelectItem>
                  <SelectItem value="ch">Schweiz</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Stadt oder Region</Label>
              <Input placeholder="z.B. Berlin, Hamburg, München" />
            </div>

            <div className="space-y-2">
              <Label>Umkreis (km)</Label>
              <Slider
                defaultValue={[50]}
                max={100}
                step={10}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Zurücksetzen</Button>
        <Button>Änderungen speichern</Button>
      </div>
    </div>
  );
}