"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  type TooltipProps,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";

interface RevenueChartWidgetProps {
  data: Array<{ month: string; revenue: number }>;
}

const PERIODS = [
  { label: "3M", value: "3m" },
  { label: "6M", value: "6m" },
  { label: "12M", value: "12m" },
  { label: "YTD", value: "ytd" },
] as const;

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border bg-popover p-3 shadow-md">
      <p className="text-sm font-medium text-popover-foreground">{label}</p>
      <p className="text-sm font-semibold text-primary">
        {formatCurrency(payload[0].value as number)}
      </p>
    </div>
  );
}

export function RevenueChartWidget({ data }: RevenueChartWidgetProps) {
  const [activePeriod, setActivePeriod] = useState<string>("12m");

  const filteredData = (() => {
    switch (activePeriod) {
      case "3m":
        return data.slice(-3);
      case "6m":
        return data.slice(-6);
      case "ytd":
        return data.slice(0, new Date().getMonth() + 1);
      default:
        return data;
    }
  })();

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Revenue Trend</CardTitle>
        <div className="flex gap-1">
          {PERIODS.map((period) => (
            <Button
              key={period.value}
              variant={activePeriod === period.value ? "default" : "ghost"}
              size="sm"
              className={cn(
                "h-7 px-3 text-xs",
                activePeriod !== period.value && "text-muted-foreground"
              )}
              onClick={() => setActivePeriod(period.value)}
            >
              {period.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                className="text-muted-foreground"
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "hsl(var(--primary))",
                  stroke: "hsl(var(--background))",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
