"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Benachrichtigungseinstellungen</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Neue Kommentare</Label>
              <p className="text-sm text-muted-foreground">
                Benachrichtigungen über neue Kommentare auf Ihre Posts
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Neue Nachrichten</Label>
              <p className="text-sm text-muted-foreground">
                Benachrichtigungen über neue Direktnachrichten
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Erwähnungen</Label>
              <p className="text-sm text-muted-foreground">
                Benachrichtigungen wenn Sie erwähnt werden
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>E-Mail-Zusammenfassung</Label>
              <p className="text-sm text-muted-foreground">
                Tägliche Zusammenfassung Ihrer Social Media Aktivitäten
              </p>
            </div>
            <Switch />
          </div>
        </div>

        <div className="flex justify-end">
          <Button>Einstellungen speichern</Button>
        </div>
      </CardContent>
    </Card>
  );
}