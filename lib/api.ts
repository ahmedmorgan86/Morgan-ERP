import { NextResponse } from "next/server";

interface SuccessResponse<T> {
  success: true;
  data: T;
}

interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export function success<T>(data: T, status: number = 200): NextResponse<SuccessResponse<T>> {
  return NextResponse.json({ success: true, data }, { status });
}

export function error(
  message: string,
  status: number = 500,
  code?: string,
  details?: unknown
): NextResponse<ErrorResponse> {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: code ?? "INTERNAL_ERROR",
        message,
        ...(details !== undefined && { details }),
      },
    },
    { status }
  );
}

export function paginated<T>(
  items: T[],
  meta: PaginationMeta
): NextResponse<SuccessResponse<PaginatedData<T>>> {
  return NextResponse.json(
    {
      success: true,
      data: {
        items,
        total: meta.total,
        page: meta.page,
        pageSize: meta.pageSize,
        totalPages: meta.totalPages,
      },
    },
    { status: 200 }
  );
}
