"use client";

import { useState } from "react";
import { BellRing, CalendarDays, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ReminderForm } from "@/components/reminders/reminder-form";
import { Reminder } from "@/lib/types";
import Link from "next/link";

interface DashboardHeaderProps {
  onAddReminder: (data: Omit<Reminder, "id" | "createdAt">) => void;
}

export function DashboardHeader({ onAddReminder }: DashboardHeaderProps) {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 backdrop-blur-sm bg-background/90 border-b">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/landing" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
              <BellRing className="h-6 w-6 text-brand-purple" />
              <h1 className="text-xl font-semibold">Remind.me</h1>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-sm font-medium transition-colors hover:text-brand-purple">
                Dashboard
              </Link>

            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setFormOpen(true)}
              className="bg-brand-purple hover:bg-brand-purple/90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Recordatorio
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <ReminderForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={onAddReminder}
      />
    </header>
  );
}
