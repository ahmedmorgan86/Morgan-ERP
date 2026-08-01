"use client";

import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_JOURNAL_ENTRIES } from "@/lib/mock-data";
import { type ColumnDef } from "@tanstack/react-table";
import { Plus, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const columns: ColumnDef<typeof MOCK_JOURNAL_ENTRIES[number]>[] = [
  { accessorKey: "entry_number", header: "Entry #" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "debit_account", header: "Debit A/C" },
  { accessorKey: "credit_account", header: "Credit A/C" },
  { accessorKey: "amount", header: "Amount", cell: ({ row }) => `$${row.original.amount.toLocaleString()}` },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const variant = status === "posted" ? "success" : "secondary";
      return <Badge variant={variant}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
    },
  },
  { accessorKey: "created_by", header: "Created By" },
  { id: "actions", cell: () => (<DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem>Edit</DropdownMenuItem><DropdownMenuItem>View</DropdownMenuItem></DropdownMenuContent></DropdownMenu>) },
];

export default function JournalEntriesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Journal Entries" description="Record and review financial journal entries." actions={<Button><Plus className="mr-2 h-4 w-4" /> New Entry</Button>} />
      <DataTable columns={columns} data={MOCK_JOURNAL_ENTRIES} />
    </div>
  );
}
