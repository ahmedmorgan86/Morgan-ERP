"use client";

import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MOCK_DEPARTMENTS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

interface EmployeeRow {
  id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  department_id?: string;
  employment_status: string;
  salary?: number;
  hire_date?: string;
  profile_image_url?: string;
}

const deptMap = Object.fromEntries(
  MOCK_DEPARTMENTS.map((d) => [d.id, d.name])
);

function EmployeeActions({ employee }: { employee: EmployeeRow }) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(employee.id)}
        >
          Copy ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push(`/hr/employees/${employee.id}`)}>
          View Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/hr/employees/${employee.id}/edit`)}>
          Edit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const employeeColumns: ColumnDef<EmployeeRow>[] = [
  {
    accessorKey: "employee_id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-2 h-8 text-xs font-medium"
      >
        ID
        <ArrowUpDown className="ml-1 h-3 w-3" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.getValue("employee_id")}</span>
    ),
  },
  {
    id: "full_name",
    header: "Name",
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    cell: ({ row }) => {
      const r = row.original;
      return (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
            {r.first_name[0]}
            {r.last_name[0]}
          </div>
          <div>
            <div className="text-sm font-medium">
              {r.first_name} {r.last_name}
            </div>
            <div className="text-xs text-muted-foreground">{r.email}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "department_id",
    header: "Department",
    cell: ({ row }) => {
      const deptId = row.getValue("department_id") as string;
      return (
        <span className="text-sm">
          {deptId ? deptMap[deptId] || "—" : "—"}
        </span>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.getValue("phone") || "—"}
      </span>
    ),
  },
  {
    accessorKey: "hire_date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-2 h-8 text-xs font-medium"
      >
        Hire Date
        <ArrowUpDown className="ml-1 h-3 w-3" />
      </Button>
    ),
    cell: ({ row }) => {
      const d = row.getValue("hire_date") as string;
      if (!d) return "—";
      return (
        <span className="text-sm">
          {new Date(d).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "salary",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-2 h-8 text-xs font-medium"
      >
        Salary
        <ArrowUpDown className="ml-1 h-3 w-3" />
      </Button>
    ),
    cell: ({ row }) => {
      const val = row.getValue("salary") as number | undefined;
      return val ? (
        <span className="text-sm font-medium">{formatCurrency(val)}</span>
      ) : (
        "—"
      );
    },
  },
  {
    accessorKey: "employment_status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("employment_status") as string;
      const variant =
        status === "active"
          ? "success"
          : status === "inactive"
            ? "secondary"
            : status === "on_leave"
              ? "warning"
              : "destructive";
      return (
        <Badge variant={variant as BadgeProps["variant"]} className="capitalize">
          {status.replace("_", " ")}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <EmployeeActions employee={row.original} />,
  },
];
