"use client";

import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_LEADS } from "@/lib/mock-data";
import { type ColumnDef } from "@tanstack/react-table";
import { Plus, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const columns: ColumnDef<typeof MOCK_LEADS[number]>[] = [
  { accessorKey: "name", header: "Lead" },
  { accessorKey: "source", header: "Source" },
  { accessorKey: "value", header: "Value", cell: ({ row }) => `$${row.original.value.toLocaleString()}` },
  {
    accessorKey: "stage",
    header: "Stage",
    cell: ({ row }) => {
      const stage = row.original.stage;
      const variant = stage === "prospecting" ? "secondary" : stage === "qualified" ? "info" : stage === "proposal" ? "warning" : stage === "negotiation" ? "info" : "success";
      const label = stage === "closed_won" ? "Closed Won" : stage.charAt(0).toUpperCase() + stage.slice(1);
      return <Badge variant={variant}>{label}</Badge>;
    },
  },
  { accessorKey: "assigned_to", header: "Assigned To" },
  { accessorKey: "next_action", header: "Next Action" },
  { id: "actions", cell: () => (<DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem>Edit</DropdownMenuItem><DropdownMenuItem>View</DropdownMenuItem></DropdownMenuContent></DropdownMenu>) },
];

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Leads" description="Track and manage your sales leads." actions={<Button><Plus className="mr-2 h-4 w-4" /> Add Lead</Button>} />
      <DataTable columns={columns} data={MOCK_LEADS} />
    </div>
  );
}
