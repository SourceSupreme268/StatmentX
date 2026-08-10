import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Upload,
  FileText,
  ArrowLeftRight,
  Download,
  Settings,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const SIDEBAR_NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Upload Statement", href: "/dashboard/upload", icon: Upload },
  { label: "Statements", href: "/dashboard/statements", icon: FileText },
  { label: "Exports", href: "/dashboard/exports", icon: Download },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];
