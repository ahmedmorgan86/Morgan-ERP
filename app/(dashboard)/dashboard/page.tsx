"use client";

import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

import { StatCardWidget } from "@/components/dashboard/stat-card-widget";
import { RevenueChartWidget } from "@/components/dashboard/revenue-chart-widget";
import { ExpenseBreakdownWidget } from "@/components/dashboard/expense-breakdown-widget";
import { SalesPipelineWidget } from "@/components/dashboard/sales-pipeline-widget";
import { ActivityFeedWidget } from "@/components/dashboard/activity-feed-widget";
import { TaskListWidget } from "@/components/dashboard/task-list-widget";
import { CalendarWidget } from "@/components/dashboard/calendar-widget";
import { InventoryAlertsWidget } from "@/components/dashboard/inventory-alerts-widget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import {
  MOCK_REVENUE_DATA,
  MOCK_EXPENSE_CATEGORIES,
  MOCK_SALES_PIPELINE,
  MOCK_ACTIVITIES,
  MOCK_TASKS,
  MOCK_CALENDAR_EVENTS,
  MOCK_INVENTORY_ALERTS,
  MOCK_EMPLOYEES,
} from "@/lib/mock-data";

const totalRevenue = MOCK_REVENUE_DATA.reduce((sum, d) => sum + d.revenue, 0);
const totalExpenses = MOCK_EXPENSE_CATEGORIES.reduce((sum, c) => sum + c.value, 0);
const netProfit = totalRevenue - totalExpenses;
const activeEmployees = MOCK_EMPLOYEES.filter(
  (e) => e.employment_status === "active"
).length;

const revenueSparkline = MOCK_REVENUE_DATA.slice(-8).map((d) => d.revenue);

const expenseSparkline = [125000, 118000, 132000, 128000, 140000, 135000, 142000, 138000];

const profitSparkline = MOCK_REVENUE_DATA.slice(-8).map((d) => {
  const exp = MOCK_EXPENSE_CATEGORIES.reduce((sum, c) => sum + c.value, 0) / 12;
  return d.revenue - exp;
});

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, Omar. Here&apos;s an overview of your organization.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCardWidget
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          change={12.5}
          icon={DollarSign}
          trend="up"
          sparklineData={revenueSparkline}
        />
        <StatCardWidget
          title="Total Expenses"
          value={formatCurrency(totalExpenses)}
          change={3.2}
          icon={TrendingDown}
          trend="down"
          sparklineData={expenseSparkline}
        />
        <StatCardWidget
          title="Net Profit"
          value={formatCurrency(netProfit)}
          change={18.7}
          icon={TrendingUp}
          trend="up"
          sparklineData={profitSparkline}
        />
        <StatCardWidget
          title="Active Employees"
          value={String(activeEmployees)}
          change={4.0}
          icon={Users}
          trend="up"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <RevenueChartWidget data={MOCK_REVENUE_DATA} />
        <ExpenseBreakdownWidget data={MOCK_EXPENSE_CATEGORIES} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SalesPipelineWidget stages={MOCK_SALES_PIPELINE} />
        <ActivityFeedWidget activities={MOCK_ACTIVITIES} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <TaskListWidget tasks={MOCK_TASKS} />
        <CalendarWidget events={MOCK_CALENDAR_EVENTS} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InventoryAlertsWidget alerts={MOCK_INVENTORY_ALERTS} />
        <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
              Product analytics coming soon
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
