"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface DateRangePickerProps {
  dateRange: { from: Date; to: Date };
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
}

export function DateRangePicker({ dateRange, onDateRangeChange }: DateRangePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[300px] justify-start text-left font-normal">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {format(dateRange.from, "dd.MM.yyyy", { locale: de })} - {format(dateRange.to, "dd.MM.yyyy", { locale: de })}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="range"
          selected={{ from: dateRange.from, to: dateRange.to }}
          onSelect={(range) => {
            if (range?.from && range?.to) {
              onDateRangeChange({ from: range.from, to: range.to });
            }
          }}
          numberOfMonths={2}
          locale={de}
        />
      </PopoverContent>
    </Popover>
  );
}