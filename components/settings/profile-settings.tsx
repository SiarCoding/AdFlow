"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profilinformationen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Company" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <Button variant="outline">Bild ändern</Button>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="company">Unternehmensname</Label>
              <Input id="company" placeholder="Ihr Unternehmen GmbH" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" type="url" placeholder="https://ihre-website.de" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bio">Unternehmensbeschreibung</Label>
              <Textarea
                id="bio"
                placeholder="Beschreiben Sie Ihr Unternehmen..."
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Änderungen speichern</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}