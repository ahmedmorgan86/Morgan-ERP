"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { MOCK_CONTACTS } from "@/lib/mock-data";

export default function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const contact = MOCK_CONTACTS.find((c) => c.id === id);

  if (!contact) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-12">
        <p className="text-lg font-medium">Contact not found</p>
        <Button variant="outline" onClick={() => router.push("/crm/contacts")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>
    );
  }

  const fields = [
    { label: "Name", value: contact.name },
    { label: "Email", value: contact.email || "—" },
    { label: "Phone", value: contact.phone || "—" },
    { label: "Company", value: contact.company || "—" },
    { label: "Type", value: contact.type || "—" },
    { label: "Status", value: contact.status || "—" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title={contact.name} description={contact.company || contact.email} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map((f) => (
          <div key={f.label} className="rounded-lg border p-4">
            <p className="text-xs font-medium uppercase text-muted-foreground">{f.label}</p>
            <p className="mt-1 text-sm font-medium">{f.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
