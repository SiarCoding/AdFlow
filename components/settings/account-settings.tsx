"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function AccountSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account-Einstellungen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">E-Mail-Adresse</Label>
              <Input id="email" type="email" value="max@unternehmen.de" readOnly />
            </div>

            <Button variant="outline">E-Mail-Adresse ändern</Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Passwort ändern</h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="current">Aktuelles Passwort</Label>
                <Input id="current" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new">Neues Passwort</Label>
                <Input id="new" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm">Passwort bestätigen</Label>
                <Input id="confirm" type="password" />
              </div>
            </div>
            <Button>Passwort ändern</Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Account löschen</h3>
            <p className="text-sm text-muted-foreground">
              Wenn Sie Ihren Account löschen, werden alle Ihre Daten unwiderruflich gelöscht.
              Diese Aktion kann nicht rückgängig gemacht werden.
            </p>
            <Button variant="destructive">Account löschen</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}