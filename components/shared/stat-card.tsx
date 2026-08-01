import { TrendingDown, TrendingUp, Minus } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  icon?: LucideIcon
  trend?: "up" | "down" | "neutral"
  className?: string
}

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  trend,
  className,
}: StatCardProps) {
  const computedTrend = trend ?? (change !== undefined ? (change >= 0 ? "up" : "down") : undefined)

  const trendColors = {
    up: "text-green-600 dark:text-green-400",
    down: "text-red-600 dark:text-red-400",
    neutral: "text-muted-foreground",
  }

  const TrendIcon =
    computedTrend === "up"
      ? TrendingUp
      : computedTrend === "down"
        ? TrendingDown
        : Minus

  return (
    <Card className={cn("transition-shadow hover:shadow-md", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
          </div>
          {Icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          )}
        </div>
        {computedTrend && (
          <div className="mt-3 flex items-center gap-1">
            <TrendIcon className={cn("h-4 w-4", trendColors[computedTrend])} />
            {change !== undefined && (
              <span className={cn("text-sm font-medium", trendColors[computedTrend])}>
                {change >= 0 ? "+" : ""}
                {change}%
              </span>
            )}
            <span className="text-xs text-muted-foreground">vs last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { StatCard }
export type { StatCardProps }
