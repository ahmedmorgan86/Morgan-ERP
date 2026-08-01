"use client";

import { formatDistanceToNow, parseISO } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";

interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  avatar: string;
}

interface ActivityFeedWidgetProps {
  activities: Activity[];
}

export function ActivityFeedWidget({ activities }: ActivityFeedWidgetProps) {
  const displayActivities = activities.slice(0, 8);

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {displayActivities.map((activity) => {
            const timestamp = parseISO(activity.timestamp);
            const timeAgo = formatDistanceToNow(timestamp, { addSuffix: true });

            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activity.avatar} alt={activity.user} />
                  <AvatarFallback className="text-xs">
                    {getInitials(activity.user)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-relaxed">
                    <span className="font-medium">{activity.user}</span>{" "}
                    <span className="text-muted-foreground">{activity.action}</span>{" "}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{timeAgo}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
