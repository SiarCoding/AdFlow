"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      title: "Content-Erstellung",
      description: "KI-gestützte Vorschläge für Ihre Social Media Inhalte",
      href: "/features/content",
    },
    {
      title: "Analytics",
      description: "Detaillierte Einblicke in Ihre Performance",
      href: "/features/analytics",
    },
    {
      title: "Kampagnen",
      description: "Effektives Management Ihrer Werbekampagnen",
      href: "/features/campaigns",
    },
  ];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold text-xl">
            KlickPilot
          </Link>

          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {features.map((feature) => (
                        <li key={feature.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={feature.href}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              )}
                            >
                              <div className="text-sm font-medium leading-none">
                                {feature.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {feature.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/pricing" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      Preise
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="hidden md:flex gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Anmelden</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Kostenlos testen</Link>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Features</p>
              {features.map((feature) => (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="block px-4 py-2 text-sm hover:bg-accent rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {feature.title}
                </Link>
              ))}
            </div>
            <div className="space-y-2">
              <Link
                href="/pricing"
                className="block px-4 py-2 text-sm hover:bg-accent rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Preise
              </Link>
            </div>
            <div className="grid gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Anmelden</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Kostenlos testen</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}