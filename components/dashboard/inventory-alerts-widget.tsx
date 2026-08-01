"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface InventoryAlert {
  id: string;
  product: string;
  stock: number;
  minimum: number;
  severity: "critical" | "warning";
}

interface InventoryAlertsWidgetProps {
  alerts: InventoryAlert[];
}

const SEVERITY_CONFIG = {
  critical: {
    icon: AlertCircle,
    badgeVariant: "destructive" as const,
    rowClass: "bg-red-500/5",
  },
  warning: {
    icon: AlertTriangle,
    badgeVariant: "warning" as const,
    rowClass: "bg-yellow-500/5",
  },
};

export function InventoryAlertsWidget({ alerts }: InventoryAlertsWidgetProps) {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Low Stock Alerts</CardTitle>
        <Badge variant="destructive" className="text-xs">
          {alerts.filter((a) => a.severity === "critical").length} critical
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {alerts.map((alert) => {
            const config = SEVERITY_CONFIG[alert.severity];
            const Icon = config.icon;
            const stockPercentage = Math.round((alert.stock / alert.minimum) * 100);

            return (
              <div
                key={alert.id}
                className={cn(
                  "flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50",
                  config.rowClass
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    alert.severity === "critical"
                      ? "text-red-500"
                      : "text-yellow-500"
                  )}
                />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium">{alert.product}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="relative h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
                      <div
                        className={cn(
                          "absolute inset-y-0 left-0 rounded-full",
                          alert.severity === "critical" ? "bg-red-500" : "bg-yellow-500"
                        )}
                        style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {alert.stock}/{alert.minimum}
                    </span>
                  </div>
                </div>
                <Badge variant={config.badgeVariant} className="shrink-0 text-xs capitalize">
                  {alert.severity}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
