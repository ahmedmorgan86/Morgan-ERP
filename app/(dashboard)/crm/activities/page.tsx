"use client";

import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { MOCK_ACTIVITIES } from "@/lib/mock-data";
import { type ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";

const columns: ColumnDef<typeof MOCK_ACTIVITIES[number]>[] = [
  { accessorKey: "user", header: "User" },
  { accessorKey: "action", header: "Action" },
  { accessorKey: "target", header: "Target" },
  { accessorKey: "timestamp", header: "Time", cell: ({ row }) => <span suppressHydrationWarning>{new Date(row.original.timestamp).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span> },
];

export default function ActivitiesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Activities" description="Track CRM activities and interactions." actions={<Button><Plus className="mr-2 h-4 w-4" /> Log Activity</Button>} />
      <DataTable columns={columns} data={MOCK_ACTIVITIES} />
    </div>
  );
}
