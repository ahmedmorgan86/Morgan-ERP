"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { MOCK_INVOICES } from "@/lib/mock-data";

export default function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const invoice = MOCK_INVOICES.find((i) => i.id === id);

  if (!invoice) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-12">
        <p className="text-lg font-medium">Invoice not found</p>
        <Button variant="outline" onClick={() => router.push("/finance/invoices")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>
    );
  }

  const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="space-y-6">
      <PageHeader title={`Invoice ${invoice.invoice_number}`} description={invoice.client} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Invoice #", value: invoice.invoice_number },
          { label: "Client", value: invoice.client },
          { label: "Amount", value: fmt.format(invoice.amount) },
          { label: "Status", value: invoice.status },
          { label: "Category", value: invoice.category },
          { label: "Issue Date", value: invoice.date },
          { label: "Due Date", value: invoice.due_date },
        ].map((f) => (
          <div key={f.label} className="rounded-lg border p-4">
            <p className="text-xs font-medium uppercase text-muted-foreground">{f.label}</p>
            <p className="mt-1 text-sm font-medium">{f.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
