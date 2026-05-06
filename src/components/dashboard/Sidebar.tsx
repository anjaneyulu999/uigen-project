"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  FolderOpen,
  Settings,
  Zap,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "@/actions";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/projects", label: "Projects", icon: FolderOpen },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  user?: { id: string; email: string } | null;
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-60 h-full flex flex-col bg-white border-r border-neutral-200 shrink-0">
      {/* Brand */}
      <div className="h-14 flex items-center gap-2.5 px-5 border-b border-neutral-200">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-600">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <span className="text-sm font-semibold text-neutral-900 tracking-tight">UIGen</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", active ? "text-blue-600" : "text-neutral-400")} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      {user && (
        <div className="px-3 py-4 border-t border-neutral-200">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
              {user.email[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-neutral-900 truncate">{user.email}</p>
            </div>
            <form action={signOut}>
              <button
                type="submit"
                title="Sign out"
                className="p-1 rounded hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
}
