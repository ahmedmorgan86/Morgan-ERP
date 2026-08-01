"use client";

import { useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
}

interface TaskListWidgetProps {
  tasks: Task[];
}

const PRIORITY_CONFIG = {
  high: { label: "High", variant: "destructive" as const },
  medium: { label: "Medium", variant: "warning" as const },
  low: { label: "Low", variant: "secondary" as const },
};

export function TaskListWidget({ tasks: initialTasks }: TaskListWidgetProps) {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Upcoming Tasks</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {sortedTasks.map((task) => {
            const dueDate = parseISO(task.dueDate);
            const dueDateText = formatDistanceToNow(dueDate, { addSuffix: true });

            return (
              <div
                key={task.id}
                className={cn(
                  "flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50",
                  task.completed && "opacity-60"
                )}
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      task.completed && "line-through text-muted-foreground"
                    )}
                  >
                    {task.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Due {dueDateText}
                  </p>
                </div>
                <Badge variant={PRIORITY_CONFIG[task.priority].variant} className="shrink-0">
                  {PRIORITY_CONFIG[task.priority].label}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
