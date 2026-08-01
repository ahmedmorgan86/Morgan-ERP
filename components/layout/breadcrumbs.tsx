"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

const SEGMENT_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  employees: "Employees",
  departments: "Departments",
  positions: "Positions",
  hr: "Human Resources",
  attendance: "Attendance",
  leave: "Leave Management",
  payroll: "Payroll",
  finance: "Finance",
  invoices: "Invoices",
  payments: "Payments",
  accounts: "Accounts",
  budgets: "Budgets",
  expenses: "Expenses",
  sales: "Sales",
  orders: "Orders",
  customers: "Customers",
  quotes: "Quotes",
  targets: "Targets",
  inventory: "Inventory",
  products: "Products",
  stock: "Stock",
  warehouses: "Warehouses",
  adjustments: "Adjustments",
  procurement: "Procurement",
  "purchase-orders": "Purchase Orders",
  suppliers: "Suppliers",
  requisitions: "Requisitions",
  crm: "CRM",
  contacts: "Contacts",
  leads: "Leads",
  deals: "Deals",
  activities: "Activities",
  projects: "Projects",
  tasks: "Tasks",
  "time-tracking": "Time Tracking",
  reports: "Reports",
  analytics: "Analytics",
  settings: "Settings",
  profile: "Profile",
  organization: "Organization",
  users: "Users",
  roles: "Roles & Permissions",
  security: "Security",
  notifications: "Notifications",
  integrations: "Integrations",
};

const MAX_VISIBLE = 5;

function formatSegment(segment: string): string {
  if (SEGMENT_LABELS[segment]) return SEGMENT_LABELS[segment];
  if (/^[0-9a-f-]{36}$/i.test(segment)) return "Details";
  return segment
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export interface BreadcrumbsProps {
  className?: string;
}

export function Breadcrumbs({ className }: BreadcrumbsProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const items = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = formatSegment(segment);
    const isLast = index === segments.length - 1;
    return { href, label, isLast };
  });

  const visible = items.length > MAX_VISIBLE ? items.slice(-MAX_VISIBLE) : items;
  const collapsedCount = items.length - visible.length;

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1", className)}>
      {collapsedCount > 0 && (
        <>
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">...</span>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        </>
      )}

      {collapsedCount === 0 && items.length > 1 && (
        <>
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        </>
      )}

      {visible.map((item) => (
        <span key={item.href} className="flex items-center gap-1">
          {item.isLast ? (
            <span className="text-sm font-medium text-foreground">
              {item.label}
            </span>
          ) : (
            <>
              <Link
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            </>
          )}
        </span>
      ))}
    </nav>
  );
}
