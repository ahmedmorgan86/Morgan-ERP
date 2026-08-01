"use client";

import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_ATTENDANCE } from "@/lib/mock-data";
import { type ColumnDef } from "@tanstack/react-table";
import { Plus, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const columns: ColumnDef<typeof MOCK_ATTENDANCE[number]>[] = [
  { accessorKey: "employee_name", header: "Employee" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "clock_in", header: "Clock In" },
  { accessorKey: "clock_out", header: "Clock Out" },
  { accessorKey: "hours_worked", header: "Hours" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const variant = status === "present" ? "success" : status === "absent" ? "destructive" : status === "half_day" ? "warning" : status === "on_leave" ? "info" : "warning";
      const label = status === "half_day" ? "Half Day" : status === "on_leave" ? "On Leave" : status.charAt(0).toUpperCase() + status.slice(1);
      return <Badge variant={variant}>{label}</Badge>;
    },
  },
  { accessorKey: "department", header: "Department" },
  { id: "actions", cell: () => (<DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem>Edit</DropdownMenuItem><DropdownMenuItem>View</DropdownMenuItem></DropdownMenuContent></DropdownMenu>) },
];

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Attendance" description="Track daily employee attendance and working hours." actions={<Button><Plus className="mr-2 h-4 w-4" /> Add Entry</Button>} />
      <DataTable columns={columns} data={MOCK_ATTENDANCE} />
    </div>
  );
}
