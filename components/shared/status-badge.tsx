import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        success:
          "border-transparent bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-400",
        destructive:
          "border-transparent bg-red-500/10 text-red-700 dark:bg-red-500/20 dark:text-red-400",
        warning:
          "border-transparent bg-yellow-500/10 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400",
        info: "border-transparent bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        default: "border-transparent bg-primary/10 text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const STATUS_MAP: Record<string, VariantProps<typeof statusBadgeVariants>["variant"]> = {
  active: "success",
  completed: "success",
  approved: "success",
  published: "success",
  paid: "success",
  delivered: "success",
  inactive: "secondary",
  archived: "secondary",
  draft: "secondary",
  closed: "secondary",
  pending: "warning",
  processing: "warning",
  in_review: "warning",
  "in progress": "warning",
  under_review: "warning",
  overdue: "destructive",
  cancelled: "destructive",
  rejected: "destructive",
  failed: "destructive",
  deleted: "destructive",
  new: "info",
  open: "info",
  sent: "info",
  submitted: "info",
}

interface StatusBadgeProps {
  status: string
  size?: "sm" | "md" | "lg"
  className?: string
}

function StatusBadge({ status, size = "md", className }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase().replace(/[\s-]/g, "_")
  const variant = STATUS_MAP[normalizedStatus] ?? "default"

  const sizeClasses = {
    sm: "text-[10px] px-2 py-0",
    md: "text-xs px-2.5 py-0.5",
    lg: "text-sm px-3 py-1",
  }

  const displayText = status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())

  return (
    <span
      className={cn(statusBadgeVariants({ variant }), sizeClasses[size], className)}
    >
      {displayText}
    </span>
  )
}

export { StatusBadge, statusBadgeVariants }
export type { StatusBadgeProps }
