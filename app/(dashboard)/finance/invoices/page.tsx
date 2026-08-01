"use client";

import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_INVOICES } from "@/lib/mock-data";
import { type ColumnDef } from "@tanstack/react-table";
import { Plus, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const columns: ColumnDef<typeof MOCK_INVOICES[number]>[] = [
  { accessorKey: "invoice_number", header: "Invoice #" },
  { accessorKey: "client", header: "Client" },
  { accessorKey: "amount", header: "Amount", cell: ({ row }) => `$${row.original.amount.toLocaleString()}` },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "due_date", header: "Due Date" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const variant = status === "paid" ? "success" : status === "sent" ? "info" : status === "draft" ? "secondary" : "destructive";
      return <Badge variant={variant}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
    },
  },
  { id: "actions", cell: () => (<DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem>Edit</DropdownMenuItem><DropdownMenuItem>View</DropdownMenuItem></DropdownMenuContent></DropdownMenu>) },
];

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Invoices" description="Manage client invoices and track payments." actions={<Button><Plus className="mr-2 h-4 w-4" /> New Invoice</Button>} />
      <DataTable columns={columns} data={MOCK_INVOICES} />
    </div>
  );
}
