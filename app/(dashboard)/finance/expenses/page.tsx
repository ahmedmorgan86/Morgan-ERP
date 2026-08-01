"use client";

import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_EXPENSES } from "@/lib/mock-data";
import { type ColumnDef } from "@tanstack/react-table";
import { Plus, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const columns: ColumnDef<typeof MOCK_EXPENSES[number]>[] = [
  { accessorKey: "description", header: "Description" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "amount", header: "Amount", cell: ({ row }) => `$${row.original.amount.toLocaleString()}` },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "approved_by", header: "Approved By" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const variant = status === "approved" ? "success" : status === "pending" ? "warning" : "destructive";
      return <Badge variant={variant}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
    },
  },
  { id: "actions", cell: () => (<DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem>Edit</DropdownMenuItem><DropdownMenuItem>View</DropdownMenuItem></DropdownMenuContent></DropdownMenu>) },
];

export default function ExpensesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Expenses" description="Track and manage business expenses." actions={<Button><Plus className="mr-2 h-4 w-4" /> Add Expense</Button>} />
      <DataTable columns={columns} data={MOCK_EXPENSES} />
    </div>
  );
}
