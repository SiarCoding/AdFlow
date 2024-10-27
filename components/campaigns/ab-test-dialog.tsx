"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ABTestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ABTestDialog({ open, onOpenChange }: ABTestDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>A/B-Test erstellen</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="variant-a" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="variant-a">Variante A</TabsTrigger>
            <TabsTrigger value="variant-b">Variante B</TabsTrigger>
          </TabsList>
          <TabsContent value="variant-a">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Überschrift</Label>
                <Input placeholder="Überschrift für Variante A" />
              </div>
              <div className="space-y-2">
                <Label>Beschreibung</Label>
                <Textarea
                  placeholder="Beschreibung für Variante A"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label>Call-to-Action</Label>
                <Input placeholder="z.B. 'Jetzt kaufen'" />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="variant-b">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Überschrift</Label>
                <Input placeholder="Überschrift für Variante B" />
              </div>
              <div className="space-y-2">
                <Label>Beschreibung</Label>
                <Textarea
                  placeholder="Beschreibung für Variante B"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label>Call-to-Action</Label>
                <Input placeholder="z.B. 'Mehr erfahren'" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Testdauer</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Testdauer wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 Tage</SelectItem>
                <SelectItem value="14">14 Tage</SelectItem>
                <SelectItem value="30">30 Tage</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Traffic-Verteilung</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Verteilung wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50-50">50/50</SelectItem>
                <SelectItem value="60-40">60/40</SelectItem>
                <SelectItem value="70-30">70/30</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Abbrechen
          </Button>
          <Button>Test starten</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}