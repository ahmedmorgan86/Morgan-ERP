"use client";

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_REVENUE_DATA, MOCK_EXPENSE_CATEGORIES } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#6366f1", "#06b6d4", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Business intelligence and data insights." />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Revenue Trend</CardTitle></CardHeader>
          <CardContent><ResponsiveContainer width="100%" height={300}><LineChart data={MOCK_REVENUE_DATA}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} /></LineChart></ResponsiveContainer></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Expense Breakdown</CardTitle></CardHeader>
          <CardContent><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={MOCK_EXPENSE_CATEGORIES} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>{MOCK_EXPENSE_CATEGORIES.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Monthly Revenue</CardTitle></CardHeader>
          <CardContent><ResponsiveContainer width="100%" height={300}><BarChart data={MOCK_REVENUE_DATA}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Key Metrics</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Total Revenue</p><p className="text-2xl font-bold">$4.64M</p><p className="text-xs text-green-600">+12.5% from last year</p></div>
              <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Total Expenses</p><p className="text-2xl font-bold">$972K</p><p className="text-xs text-red-600">+3.2% from last month</p></div>
              <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Net Profit</p><p className="text-2xl font-bold">$3.67M</p><p className="text-xs text-green-600">+18.7% from last year</p></div>
              <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Active Projects</p><p className="text-2xl font-bold">6</p><p className="text-xs text-blue-600">3 due this quarter</p></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
