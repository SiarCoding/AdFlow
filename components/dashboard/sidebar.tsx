"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  PenTool, 
  BarChart, 
  Settings,
  Users,
  MessageSquare,
  Megaphone,
  Calendar,
  LogOut
} from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Content",
    icon: PenTool,
    href: "/dashboard/content",
    color: "text-violet-500",
  },
  {
    label: "Kampagnen",
    icon: Megaphone,
    href: "/dashboard/campaigns",
    color: "text-pink-700",
  },
  {
    label: "Analytics",
    icon: BarChart,
    href: "/dashboard/analytics",
    color: "text-yellow-500",
  },
  {
    label: "Kalender",
    icon: Calendar,
    href: "/dashboard/calendar",
    color: "text-green-500",
  },
  {
    label: "Community",
    icon: Users,
    href: "/dashboard/community",
    color: "text-orange-500",
  },
  {
    label: "Nachrichten",
    icon: MessageSquare,
    href: "/dashboard/messages",
    color: "text-blue-500",
  },
];

const bottomRoutes = [
  {
    label: "Einstellungen",
    icon: Settings,
    href: "/dashboard/settings",
    color: "text-gray-500",
  },
  {
    label: "Abmelden",
    icon: LogOut,
    href: "/logout",
    color: "text-gray-500",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-72 flex-col bg-gray-900">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">KlickPilot</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-4">
          <div className="py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight text-gray-400">
              Navigation
            </h2>
            <div className="space-y-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "group flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-800 hover:text-white transition-all",
                    pathname === route.href ? "bg-gray-800 text-white" : "text-gray-400"
                  )}
                >
                  <route.icon className={cn("mr-3 h-5 w-5", route.color)} />
                  {route.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="mt-auto border-t border-gray-800 p-4">
        {bottomRoutes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "group flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-800 hover:text-white transition-all",
              pathname === route.href ? "bg-gray-800 text-white" : "text-gray-400"
            )}
          >
            <route.icon className={cn("mr-3 h-5 w-5", route.color)} />
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
}