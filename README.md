# Morgan ERP Enterprise

A modern, modular ERP platform built with Next.js 15, React 19, TypeScript, and Supabase.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** TanStack Query v5
- **Forms:** React Hook Form + Zod
- **Database:** PostgreSQL via Supabase
- **Auth:** Supabase Auth
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm
- Supabase account (or local Supabase instance)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/morgan-erp.git
cd morgan-erp

# Install dependencies
pnpm install

# Copy environment variables
cp .env.local.example .env.local

# Start development server
pnpm dev
```

### Environment Variables

Copy `.env.local.example` to `.env.local` and configure:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes (server) |
| `NEXT_PUBLIC_APP_URL` | Application base URL | Yes |
| `NEXTAUTH_SECRET` | Session encryption secret | Yes |

## Project Structure

```
morgan-erp/
├── app/                          # Next.js App Router pages
│   ├── (auth)/                   # Auth pages (login, register, etc.)
│   ├── (dashboard)/              # Authenticated dashboard pages
│   │   ├── dashboard/            # Executive dashboard
│   │   ├── hr/                   # Human Resources module
│   │   ├── finance/              # Finance & Accounting module
│   │   ├── sales/                # Sales module
│   │   ├── inventory/            # Inventory Management module
│   │   ├── crm/                  # Customer Relationship Management
│   │   ├── projects/             # Project Management module
│   │   ├── reports/              # Reports & Analytics
│   │   ├── settings/             # System Settings
│   │   └── users/                # User Management
│   ├── api/                      # API routes
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Root redirect to /dashboard
│   ├── not-found.tsx             # 404 page
│   └── error.tsx                 # Global error boundary
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui primitives
│   ├── layout/                   # Layout components (sidebar, topbar)
│   ├── dashboard/                # Dashboard widget components
│   ├── shared/                   # Shared business components
│   ├── forms/                    # Form system components
│   ├── tables/                   # Table system components
│   ├── charts/                   # Chart wrapper components
│   └── feedback/                 # Feedback components (toast, alert)
├── config/                       # Application configuration
├── constants/                    # Constants and enums
├── features/                     # Feature-specific code
│   └── auth/                     # Authentication feature
├── hooks/                        # Custom React hooks
├── lib/                          # Core utilities and services
│   ├── supabase/                 # Supabase client setup
│   ├── utils.ts                  # General utilities
│   ├── logger.ts                 # Structured logging
│   ├── api.ts                    # API response helpers
│   └── validators.ts             # Zod validation schemas
├── providers/                    # React context providers
├── types/                        # TypeScript type definitions
├── utils/                        # Additional utility functions
├── public/                       # Static assets
├── middleware.ts                  # Next.js middleware
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── next.config.js                # Next.js configuration
```

## Features

### Foundation (Phase 4)
- Authentication (Login, Register, Forgot Password)
- Role-Based Access Control (RBAC)
- Responsive navigation (sidebar, topbar, breadcrumbs)
- Executive Dashboard with widgets
- Design system (shadcn/ui + custom components)
- Form system with validation
- Data table system with sorting, filtering, pagination
- Error handling (404, 403, 500 pages)
- Theme support (Light/Dark mode)
- Keyboard shortcuts
- Accessibility (WCAG 2.1 AA)

### Business Modules (Future Phases)
- HR Management (Employees, Attendance, Leave, Payroll)
- Finance & Accounting (Invoices, Expenses, Journal Entries)
- Sales (Customers, Quotations, Orders, Pipeline)
- Inventory (Products, Warehouses, Stock Movements)
- Procurement (Suppliers, Purchase Orders)
- CRM (Contacts, Leads, Activities)
- Projects (Tasks, Calendar, Gantt)
- Reports & Analytics

## Development

```bash
# Start dev server
pnpm dev

# Run linter
pnpm lint

# Run type checker
pnpm typecheck

# Run tests
pnpm test
```

## Coding Standards

- TypeScript strict mode
- ESLint + Prettier
- Feature-based folder structure
- Component composition over inheritance
- Server Components by default, "use client" only when needed
- Server Actions for mutations
- TanStack Query for server state
- URL state for shareable filters

## License

Proprietary - Morgan ERP Enterprise
