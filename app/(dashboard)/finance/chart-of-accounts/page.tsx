"use client";

import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_CHART_OF_ACCOUNTS } from "@/lib/mock-data";
import { type ColumnDef } from "@tanstack/react-table";
import { Plus, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const columns: ColumnDef<typeof MOCK_CHART_OF_ACCOUNTS[number]>[] = [
  { accessorKey: "code", header: "Code" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "sub_type", header: "Sub Type" },
  { accessorKey: "balance", header: "Balance", cell: ({ row }) => `$${row.original.balance.toLocaleString()}` },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const variant = status === "active" ? "success" : "secondary";
      return <Badge variant={variant}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
    },
  },
  { id: "actions", cell: () => (<DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem>Edit</DropdownMenuItem><DropdownMenuItem>View</DropdownMenuItem></DropdownMenuContent></DropdownMenu>) },
];

export default function ChartOfAccountsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Chart of Accounts" description="Manage your chart of accounts and account balances." actions={<Button><Plus className="mr-2 h-4 w-4" /> Add Account</Button>} />
      <DataTable columns={columns} data={MOCK_CHART_OF_ACCOUNTS} />
    </div>
  );
}
