"use client"

import * as React from "react"
import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pagination?: PaginationState
  onPaginationChange?: (pagination: PaginationState) => void
  sorting?: SortingState
  onSortingChange?: (sorting: SortingState) => void
  filtering?: ColumnFiltersState
  onFilteringChange?: (filtering: ColumnFiltersState) =>
    void
  loading?: boolean
  pageSizeOptions?: number[]
  className?: string
}

function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  onPaginationChange,
  sorting,
  onSortingChange,
  filtering,
  onFilteringChange,
  loading = false,
  pageSizeOptions = [10, 20, 30, 50],
  className,
}: DataTableProps<TData, TValue>) {
  const [internalPagination, setInternalPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    })
  const [internalSorting, setInternalSorting] =
    React.useState<SortingState>([])
  const [internalFiltering, setInternalFiltering] =
    React.useState<ColumnFiltersState>([])

  const currentPagination = pagination ?? internalPagination
  const currentSorting = sorting ?? internalSorting
  const currentFiltering = filtering ?? internalFiltering

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(data.length / currentPagination.pageSize),
    state: {
      pagination: currentPagination,
      sorting: currentSorting,
      columnFilters: currentFiltering,
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater(currentPagination)
          : updater
      setInternalPagination(newPagination)
      onPaginationChange?.(newPagination)
    },
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === "function"
          ? updater(currentSorting)
          : updater
      setInternalSorting(newSorting)
      onSortingChange?.(newSorting)
    },
    onColumnFiltersChange: (updater) => {
      const newFiltering =
        typeof updater === "function"
          ? updater(currentFiltering)
          : updater
      setInternalFiltering(newFiltering)
      onFilteringChange?.(newFiltering)
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const skeletonRows = React.useMemo(
    () => Array.from({ length: currentPagination.pageSize }, (_, i) => i),
    [currentPagination.pageSize]
  )

  return (
    <div className={cn("space-y-4", className)}>
      <div className="rounded-md border">
        <table className="w-full caption-bottom text-sm">
          <thead className="border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {loading
              ? skeletonRows.map((rowIndex) => (
                  <tr
                    key={`skeleton-${rowIndex}`}
                    className="border-b transition-colors"
                  >
                    {columns.map((_, colIndex) => (
                      <td key={colIndex} className="p-4">
                        <Skeleton className="h-4 w-full" />
                      </td>
                    ))}
                  </tr>
                ))
              : table.getRowModel().rows?.length
                ? table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="p-4 align-middle">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                : (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="h-24 text-center text-muted-foreground"
                      >
                        No results.
                      </td>
                    </tr>
                  )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">Rows per page</p>
          <select
            className="h-8 rounded-md border bg-transparent px-2 text-sm outline-none"
            value={currentPagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            Page {currentPagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { DataTable }
export type { DataTableProps }
