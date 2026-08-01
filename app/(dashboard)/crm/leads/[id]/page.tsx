"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { MOCK_LEADS } from "@/lib/mock-data";

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const lead = MOCK_LEADS.find((l) => l.id === id);

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-12">
        <p className="text-lg font-medium">Lead not found</p>
        <Button variant="outline" onClick={() => router.push("/crm/leads")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>
    );
  }

  const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="space-y-6">
      <PageHeader title={lead.name} description={`Stage: ${lead.stage}`} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Name", value: lead.name },
          { label: "Source", value: lead.source },
          { label: "Stage", value: lead.stage.replace("_", " ") },
          { label: "Value", value: fmt.format(lead.value) },
          { label: "Assigned To", value: lead.assigned_to },
          { label: "Created", value: lead.created },
          { label: "Next Action", value: lead.next_action },
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
