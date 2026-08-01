"use client";

import { useMemo, useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
  isSameMonth,
  isToday,
  parseISO,
} from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "meeting" | "hr" | "deadline" | "it";
}

interface CalendarWidgetProps {
  events: CalendarEvent[];
}

const EVENT_TYPE_COLORS = {
  meeting: "bg-blue-500",
  hr: "bg-purple-500",
  deadline: "bg-red-500",
  it: "bg-emerald-500",
};

export function CalendarWidget({ events }: CalendarWidgetProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    events.forEach((event) => {
      const dateKey = format(parseISO(event.date), "yyyy-MM-dd");
      const existing = map.get(dateKey) || [];
      map.set(dateKey, [...existing, event]);
    });
    return map;
  }, [events]);

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: calStart, end: calEnd });
  }, [currentDate]);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">
          {format(currentDate, "MMMM yyyy")}
        </CardTitle>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setCurrentDate((prev) => subMonths(prev, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setCurrentDate((prev) => addMonths(prev, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-px">
          {weekDays.map((day) => (
            <div
              key={day}
              className="py-1 text-center text-xs font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
          {calendarDays.map((day) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const dayEvents = eventsByDate.get(dateKey) || [];
            const inMonth = isSameMonth(day, currentDate);
            const today = isToday(day);

            return (
              <div
                key={dateKey}
                className={`relative flex h-10 flex-col items-center justify-center rounded-md text-sm ${
                  inMonth ? "" : "text-muted-foreground/40"
                } ${today ? "bg-primary/10 font-semibold text-primary" : ""}`}
              >
                <span>{format(day, "d")}</span>
                {dayEvents.length > 0 && (
                  <div className="absolute bottom-1 flex gap-0.5">
                    {dayEvents.slice(0, 3).map((event) => (
                      <span
                        key={event.id}
                        className={`h-1 w-1 rounded-full ${EVENT_TYPE_COLORS[event.type]}`}
                        title={event.title}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {events.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3 border-t pt-3">
            {Object.entries(EVENT_TYPE_COLORS).map(([type, color]) => {
              const hasEvents = events.some((e) => e.type === type);
              if (!hasEvents) return null;
              return (
                <div key={type} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className={`h-2 w-2 rounded-full ${color}`} />
                  <span className="capitalize">{type}</span>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
