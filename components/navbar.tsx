"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/hooks/useAuthStore";
import { toast } from "sonner";
import { BellRing, Plus } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ReminderForm } from "@/components/reminders/reminder-form";
import { Reminder } from "@/lib/types";

interface NavbarProps {
  onAddReminder?: (data: Omit<Reminder, "id" | "createdAt">) => void;
}

export function Navbar({ onAddReminder }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [formOpen, setFormOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/landing");
  };

  return (
    <header className="sticky top-0 z-10 backdrop-blur-sm bg-background/90 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href={isAuthenticated ? "/dashboard" : "/landing"} className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <BellRing className="h-6 w-6 text-primary" />
            <span className="font-semibold text-xl">Remind.me</span>
          </Link>

          <nav className="hidden md:flex space-x-6">
            <Link
              href="/landing"
              className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/landing" ? "text-primary font-semibold" : ""}`}
            >
              Inicio
            </Link>
            {isAuthenticated && (
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/dashboard" ? "text-primary font-semibold" : ""}`}
              >
                Dashboard
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-muted-foreground hidden sm:inline-block">
                {user?.email}
              </span>

              {onAddReminder && (
                <Button
                  onClick={() => setFormOpen(true)}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Recordatorio
                </Button>
              )}

              <ThemeToggle />

              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild variant="default" size="sm">
                <Link href="/register">Register</Link>
              </Button>
              <ThemeToggle />
            </>
          )}
        </div>
      </div>

      {onAddReminder && (
        <ReminderForm
          open={formOpen}
          onOpenChange={setFormOpen}
          onSubmit={onAddReminder}
        />
      )}
    </header>
  );
}
