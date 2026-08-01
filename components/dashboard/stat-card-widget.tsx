"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, Minus, type LucideIcon } from "lucide-react";

type Trend = "up" | "down" | "neutral";

interface StatCardWidgetProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  trend: Trend;
  sparklineData?: number[];
}

function getTrendColor(trend: Trend) {
  if (trend === "up") return "text-emerald-600 dark:text-emerald-400";
  if (trend === "down") return "text-red-600 dark:text-red-400";
  return "text-muted-foreground";
}

function getTrendBg(trend: Trend) {
  if (trend === "up") return "bg-emerald-500/10";
  if (trend === "down") return "bg-red-500/10";
  return "bg-muted";
}

function getIconBg(trend: Trend) {
  if (trend === "up") return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  if (trend === "down") return "bg-red-500/10 text-red-600 dark:text-red-400";
  return "bg-primary/10 text-primary";
}

function TrendIcon({ trend }: { trend: Trend }) {
  if (trend === "up") return <ArrowUp className="h-3 w-3" />;
  if (trend === "down") return <ArrowDown className="h-3 w-3" />;
  return <Minus className="h-3 w-3" />;
}

function Sparkline({ data, trend }: { data: number[]; trend: Trend }) {
  const width = 120;
  const height = 32;
  const padding = 2;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(" L ")}`;
  const areaD = `${pathD} L ${width - padding},${height} L ${padding},${height} Z`;

  const strokeColor =
    trend === "up"
      ? "rgb(16, 185, 129)"
      : trend === "down"
        ? "rgb(239, 68, 68)"
        : "rgb(148, 163, 184)";

  const fillId = `sparkline-fill-${trend}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-8 w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity={0.3} />
          <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#${fillId})`} />
      <path d={pathD} fill="none" stroke={strokeColor} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StatCardWidget({
  title,
  value,
  change,
  icon: Icon,
  trend,
  sparklineData,
}: StatCardWidgetProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
          </div>
          <div className={cn("rounded-full p-3", getIconBg(trend))}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
              getTrendBg(trend),
              getTrendColor(trend)
            )}
          >
            <TrendIcon trend={trend} />
            {Math.abs(change)}%
          </span>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
        {sparklineData && sparklineData.length > 0 && (
          <div className="mt-4 -mb-2">
            <Sparkline data={sparklineData} trend={trend} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
