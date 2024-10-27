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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

interface NewContentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewContentDialog({ open, onOpenChange }: NewContentDialogProps) {
  const [publishDate, setPublishDate] = useState<Date>();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Neuen Content erstellen</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Plattform</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Plattform wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Content-Typ</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Typ wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="post">Post</SelectItem>
                  <SelectItem value="story">Story</SelectItem>
                  <SelectItem value="reel">Reel</SelectItem>
                  <SelectItem value="carousel">Carousel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Titel</Label>
            <Input placeholder="Titel des Contents" />
          </div>

          <div className="space-y-2">
            <Label>Beschreibung</Label>
            <Textarea
              placeholder="Beschreiben Sie Ihren Content..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Veröffentlichungsdatum</Label>
            <Calendar
              mode="single"
              selected={publishDate}
              onSelect={setPublishDate}
              className="rounded-md border"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Abbrechen
            </Button>
            <Button>Content erstellen</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}