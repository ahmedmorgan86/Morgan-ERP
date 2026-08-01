"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface SalesPipelineWidgetProps {
  stages: Array<{
    name: string;
    value: number;
    color: string;
    percentage: number;
  }>;
}

export function SalesPipelineWidget({ stages }: SalesPipelineWidgetProps) {
  const totalValue = stages.reduce((sum, stage) => sum + stage.value, 0);

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Sales Pipeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Total Pipeline Value:{" "}
          <span className="font-semibold text-foreground">
            {formatCurrency(totalValue)}
          </span>
        </div>
        <div className="space-y-3">
          {stages.map((stage) => (
            <div key={stage.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{stage.name}</span>
                <span className="text-muted-foreground">
                  {formatCurrency(stage.value)}
                </span>
              </div>
              <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                  style={{
                    width: `${stage.percentage}%`,
                    backgroundColor: stage.color,
                  }}
                />
              </div>
              <div className="text-right text-xs text-muted-foreground">
                {stage.percentage}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
