"use client"

import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import {
  HomeIcon,
  Settings,
  LayoutDashboard,
  Sparkles,
  BarChart2,
  Zap,
  Users
} from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashboardSideBar() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/kampagnen", icon: Sparkles, label: "Kampagnen" },
    { href: "/dashboard/strategie", icon: BarChart2, label: "Strategie" },
    { href: "/dashboard/automatisierung", icon: Zap, label: "Automatisierung" },
    { href: "/dashboard/community", icon: Users, label: "Community" },
  ];

  return (
    <div className="lg:block hidden border-r h-full bg-background">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[55px] items-center justify-between border-b px-3 w-full">
          <Link className="flex items-center gap-2 font-semibold ml-1" href="/dashboard">
            <span className="text-2xl font-extrabold font-poppins tracking-tight bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500 text-transparent bg-clip-text">
              KlickPilot
            </span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all",
                  "hover:bg-gradient-to-r hover:from-pink-100 hover:via-purple-100 hover:to-blue-100 dark:hover:from-pink-900 dark:hover:via-purple-900 dark:hover:to-blue-900",
                  {
                    "bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 dark:from-pink-900 dark:via-purple-900 dark:to-blue-900": pathname === item.href,
                    "text-foreground": pathname !== item.href
                  }
                )}
                href={item.href}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <item.icon className={cn(
                    "h-5 w-5",
                    pathname === item.href
                      ? "text-pink-600 dark:text-pink-400"
                      : "text-muted-foreground"
                  )} />
                </div>
                <span className={cn(
                  "text-foreground dark:text-white",
                  pathname === item.href && "font-semibold"
                )}>
                  {item.label}
                </span>
              </Link>
            ))}
            <Separator className="my-4" />
            <Link
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all",
                "hover:bg-gradient-to-r hover:from-pink-100 hover:via-purple-100 hover:to-blue-100 dark:hover:from-pink-900 dark:hover:via-purple-900 dark:hover:to-blue-900",
                {
                  "bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 dark:from-pink-900 dark:via-purple-900 dark:to-blue-900": pathname === "/dashboard/settings",
                  "text-foreground": pathname !== "/dashboard/settings"
                }
              )}
              href="/dashboard/settings"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <Settings className={cn(
                  "h-5 w-5",
                  pathname === "/dashboard/settings"
                    ? "text-pink-600 dark:text-pink-400"
                    : "text-muted-foreground"
                )} />
              </div>
              <span className={cn(
                "text-foreground dark:text-white",
                pathname === "/dashboard/settings" && "font-semibold"
              )}>
                Einstellung
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}