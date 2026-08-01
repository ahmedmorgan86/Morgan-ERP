"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  Clock,
  CalendarOff,
  Wallet,
  DollarSign,
  FileText,
  CreditCard,
  Landmark,
  PieChart,
  Receipt,
  TrendingUp,
  ShoppingCart,
  Target,
  Package,
  Box,
  Warehouse,
  ArrowLeftRight,
  Truck,
  ClipboardList,
  Building,
  FilePlus,
  Contact,
  BookOpen,
  UserPlus,
  Handshake,
  Activity,
  FolderKanban,
  FolderOpen,
  CheckSquare,
  Timer,
  BarChart3,
  LineChart,
  FileBarChart,
  Settings,
  Sliders,
  Shield,
  Lock,
  Bell,
  Plug,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { MAIN_NAVIGATION } from "@/constants/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { NavGroup } from "@/types";

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  Clock,
  CalendarOff,
  Wallet,
  DollarSign,
  FileText,
  CreditCard,
  Landmark,
  PieChart,
  Receipt,
  TrendingUp,
  ShoppingCart,
  Target,
  Package,
  Box,
  Warehouse,
  ArrowLeftRight,
  Truck,
  ClipboardList,
  Building,
  FilePlus,
  Contact,
  BookOpen,
  UserPlus,
  Handshake,
  Activity,
  FolderKanban,
  FolderOpen,
  CheckSquare,
  Timer,
  BarChart3,
  LineChart,
  FileBarChart,
  Settings,
  Sliders,
  Shield,
  Lock,
  Bell,
  Plug,
  User: Users,
};

function NavIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon className={cn("h-5 w-5 shrink-0", className)} />;
}

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  useEffect(() => {
    const activeGroup = MAIN_NAVIGATION.find((group) =>
      group.children.some((child) => pathname.startsWith(child.href))
    );
    if (activeGroup) {
      setExpandedGroups((prev) =>
        prev.includes(activeGroup.id) ? prev : [...prev, activeGroup.id]
      );
    }
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleGroup = (id: string) => {
    setExpandedGroups((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const handleNavClick = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:hidden"
          >
            <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="text-sm font-bold">M</span>
              </div>
              <span className="text-lg font-semibold">Morgan ERP</span>
            </div>

            <ScrollArea className="flex-1 py-3">
              <nav className="space-y-1 px-3">
                {MAIN_NAVIGATION.map((group: NavGroup) => {
                  const hasChildren = group.children.length > 0;
                  const isExpanded = expandedGroups.includes(group.id);
                  const isGroupActive = hasChildren
                    ? group.children.some((child) => isActive(child.href))
                    : group.href
                      ? isActive(group.href)
                      : false;

                  if (!hasChildren && group.href) {
                    return (
                      <button
                        key={group.id}
                        onClick={() => handleNavClick(group.href!)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                          isGroupActive
                            ? "bg-primary/10 text-primary"
                            : "text-sidebar-accent-foreground hover:bg-sidebar-accent"
                        )}
                      >
                        <NavIcon name={group.icon} />
                        <span>{group.label}</span>
                      </button>
                    );
                  }

                  return (
                    <div key={group.id}>
                      <button
                        onClick={() => toggleGroup(group.id)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                          isGroupActive
                            ? "bg-primary/10 text-primary"
                            : "text-sidebar-accent-foreground hover:bg-sidebar-accent"
                        )}
                      >
                        <NavIcon name={group.icon} />
                        <span className="flex-1 text-left">{group.label}</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 shrink-0 transition-transform duration-200",
                            isExpanded && "rotate-180"
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 mt-0.5 space-y-0.5 border-l border-sidebar-border pl-3">
                              {group.children.map((child) => {
                                const active = isActive(child.href);
                                return (
                                  <button
                                    key={child.id}
                                    onClick={() => handleNavClick(child.href)}
                                    className={cn(
                                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                      active
                                        ? "bg-primary/10 text-primary font-medium"
                                        : "text-sidebar-accent-foreground hover:bg-sidebar-accent"
                                    )}
                                  >
                                    <NavIcon
                                      name={child.icon}
                                      className="h-4 w-4"
                                    />
                                    <span>{child.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>
            </ScrollArea>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
