"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
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
  PanelLeftClose,
  PanelLeftOpen,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

import { MAIN_NAVIGATION } from "@/constants/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

const SIDEBAR_COLLAPSED_KEY = "morgan-erp-sidebar-collapsed";
const EXPANDED_WIDTH = 240;
const COLLAPSED_WIDTH = 64;

function NavIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon className={cn("h-5 w-5 shrink-0", className)} />;
}

interface SidebarProps {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed, onCollapsedChange }: SidebarProps) {
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

  const toggleCollapse = useCallback(() => {
    const next = !collapsed;
    onCollapsedChange(next);
    try {
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, JSON.stringify(next));
    } catch {}
  }, [collapsed, onCollapsedChange]);

  const toggleGroup = (id: string) => {
    if (collapsed) return;
    setExpandedGroups((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const handleNavClick = (href: string) => {
    router.push(href);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        animate={{ width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="fixed inset-y-0 left-0 z-30 hidden flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex"
      >
        <div
          className={cn(
            "flex h-14 shrink-0 items-center border-b border-sidebar-border",
            collapsed ? "justify-center px-2" : "gap-2 px-4"
          )}
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-bold">M</span>
            </div>
            {!collapsed && (
              <span className="text-lg font-semibold text-sidebar-foreground">
                Morgan ERP
              </span>
            )}
          </Link>
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
                const button = (
                  <button
                    onClick={() => handleNavClick(group.href!)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg text-sm font-medium transition-colors",
                      collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5",
                      isGroupActive
                        ? "bg-primary text-primary-foreground"
                        : "text-sidebar-accent-foreground hover:bg-sidebar-accent"
                    )}
                  >
                    <NavIcon
                      name={group.icon}
                      className={cn(
                        isGroupActive && !collapsed && "text-primary-foreground"
                      )}
                    />
                    {!collapsed && <span>{group.label}</span>}
                  </button>
                );

                if (collapsed) {
                  return (
                    <Tooltip key={group.id}>
                      <TooltipTrigger asChild>{button}</TooltipTrigger>
                      <TooltipContent side="right">{group.label}</TooltipContent>
                    </Tooltip>
                  );
                }

                return <div key={group.id}>{button}</div>;
              }

              const groupContent = (
                <div key={group.id}>
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg text-sm font-medium transition-colors",
                      collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5",
                      isGroupActive
                        ? "bg-primary/10 text-primary"
                        : "text-sidebar-accent-foreground hover:bg-sidebar-accent"
                    )}
                  >
                    <NavIcon name={group.icon} />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{group.label}</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                            isExpanded && "rotate-180"
                          )}
                        />
                      </>
                    )}
                  </button>

                  {!collapsed && (
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-200",
                        isExpanded ? "mt-0.5" : "h-0"
                      )}
                    >
                      <div className="ml-4 space-y-0.5 border-l border-sidebar-border pl-3">
                        {group.children.map((child) => {
                          const active = isActive(child.href);
                          return (
                            <button
                              key={child.id}
                              onClick={() => handleNavClick(child.href)}
                              className={cn(
                                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                active
                                  ? "bg-primary text-primary-foreground font-medium"
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
                    </div>
                  )}
                </div>
              );

              if (collapsed) {
                return (
                  <Tooltip key={group.id}>
                    <TooltipTrigger asChild>{groupContent}</TooltipTrigger>
                    <TooltipContent side="right">
                      <div className="py-1">
                        <p className="mb-1 text-xs font-semibold text-muted-foreground">
                          {group.label}
                        </p>
                        {group.children.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => handleNavClick(child.href)}
                            className={cn(
                              "block w-full rounded px-2 py-1 text-left text-sm transition-colors",
                              isActive(child.href)
                                ? "bg-primary/10 text-primary"
                                : "hover:bg-muted"
                            )}
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return <div key={group.id}>{groupContent}</div>;
            })}
          </nav>
        </ScrollArea>

        <div className="shrink-0 border-t border-sidebar-border p-3">
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              pathname.startsWith("/settings")
                ? "bg-primary/10 text-primary"
                : "text-sidebar-accent-foreground hover:bg-sidebar-accent",
              collapsed && "justify-center px-2"
            )}
          >
            <Settings className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Settings</span>}
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapse}
            className={cn(
              "mt-1 h-9 w-full text-muted-foreground hover:text-foreground",
              collapsed && "px-0"
            )}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
          </Button>
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}
