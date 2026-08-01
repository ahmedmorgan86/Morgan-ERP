"use client";

import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_AUDIT_LOG } from "@/lib/mock-data";
import { type ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<typeof MOCK_AUDIT_LOG[number]>[] = [
  { accessorKey: "user", header: "User" },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const action = row.original.action;
      const variant = action === "Created" ? "success" : action === "Updated" ? "info" : action === "Deleted" ? "destructive" : action === "Approved" ? "success" : "secondary";
      return <Badge variant={variant}>{action}</Badge>;
    },
  },
  { accessorKey: "entity", header: "Entity" },
  { accessorKey: "timestamp", header: "Timestamp" },
  { accessorKey: "ip", header: "IP Address" },
];

export default function AuditLogPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Audit Log" description="Review system activity and changes." actions={<Button variant="outline" size="sm">Export Log</Button>} />
      <DataTable columns={columns} data={MOCK_AUDIT_LOG} />
    </div>
  );
}
