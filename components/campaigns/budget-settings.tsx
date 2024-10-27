"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/date-picker-with-range";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

export function BudgetSettings() {
  const [date, setDate] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 30),
  });

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Budget-Übersicht</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Gesamtbudget</Label>
              <span className="text-sm text-muted-foreground">€2.450 von €5.000 ausgegeben</span>
            </div>
            <Progress value={49} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Tagesbudget</Label>
              <Input type="number" placeholder="100" />
              <p className="text-xs text-muted-foreground">
                Durchschnittliche Ausgaben pro Tag: €81,67
              </p>
            </div>

            <div className="space-y-2">
              <Label>Budget-Verteilung</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Verteilung wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard (gleichmäßig)</SelectItem>
                  <SelectItem value="accelerated">Beschleunigt</SelectItem>
                  <SelectItem value="custom">Benutzerdefiniert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Zeitplan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Kampagnenzeitraum</Label>
              <DatePickerWithRange date={date} setDate={setDate} />
            </div>

            <div className="space-y-2">
              <Label>Zeitliche Optimierung</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Optimierung wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-day">Ganztägig</SelectItem>
                  <SelectItem value="business">Geschäftszeiten (9-17 Uhr)</SelectItem>
                  <SelectItem value="evening">Abendstunden (18-22 Uhr)</SelectItem>
                  <SelectItem value="custom">Benutzerdefiniert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Wochentage</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tage auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Tage</SelectItem>
                  <SelectItem value="weekdays">Werktags</SelectItem>
                  <SelectItem value="weekend">Wochenende</SelectItem>
                  <SelectItem value="custom">Benutzerdefiniert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Budget-Warnungen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Budget-Warnschwelle</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Schwelle wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="80">80% des Budgets erreicht</SelectItem>
                  <SelectItem value="90">90% des Budgets erreicht</SelectItem>
                  <SelectItem value="custom">Benutzerdefiniert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Benachrichtigungen</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Benachrichtigungsart wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">E-Mail</SelectItem>
                  <SelectItem value="push">Push-Benachrichtigung</SelectItem>
                  <SelectItem value="both">Beides</SelectItem>
                </SelectContent>
              </Select>
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