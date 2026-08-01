"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  type TooltipProps,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface ExpenseBreakdownWidgetProps {
  data: Array<{ name: string; value: number; color: string }>;
}

function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;

  const item = payload[0].payload as { name: string; value: number };

  return (
    <div className="rounded-lg border bg-popover p-3 shadow-md">
      <p className="text-sm font-medium text-popover-foreground">{item.name}</p>
      <p className="text-sm font-semibold text-primary">
        {formatCurrency(item.value)}
      </p>
    </div>
  );
}

export function ExpenseBreakdownWidget({ data }: ExpenseBreakdownWidgetProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6">
          <div className="relative h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-xs font-medium text-muted-foreground">Total</p>
              <p className="text-lg font-bold">{formatCurrency(total)}</p>
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-x-6 gap-y-2">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="truncate text-xs text-muted-foreground">
                  {item.name}
                </span>
                <span className="ml-auto text-xs font-medium">
                  {formatCurrency(item.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
