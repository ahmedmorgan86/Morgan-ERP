"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";

const SIDEBAR_COLLAPSED_KEY = "morgan-erp-sidebar-collapsed";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
      if (stored !== null) {
        setCollapsed(JSON.parse(stored));
      }
    } catch {}
  }, []);

  const handleCollapsedChange = useCallback((value: boolean) => {
    setCollapsed(value);
  }, []);

  const handleMobileNavClose = useCallback(() => {
    setMobileNavOpen(false);
  }, []);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  return (
    <div className="relative min-h-screen bg-background">
      <Sidebar
        collapsed={collapsed}
        onCollapsedChange={handleCollapsedChange}
      />

      <MobileNav open={mobileNavOpen} onClose={handleMobileNavClose} />

      <div
        className={cn(
          "transition-[padding-left] duration-200 ease-in-out",
          "lg:pl-[240px]",
          collapsed && "lg:pl-[64px]"
        )}
      >
        <Topbar onMenuClick={() => setMobileNavOpen(true)} />
        <main className="pt-14">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
