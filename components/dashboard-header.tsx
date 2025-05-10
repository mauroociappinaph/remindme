"use client";

import { useState } from "react";
import { BellRing, CalendarDays, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ReminderForm } from "@/components/reminders/reminder-form";
import { Reminder } from "@/lib/types";

interface DashboardHeaderProps {
  onAddReminder: (data: Omit<Reminder, "id" | "createdAt">) => void;
}

export function DashboardHeader({ onAddReminder }: DashboardHeaderProps) {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 backdrop-blur-sm bg-background/80 border-b">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BellRing className="h-6 w-6 text-brand-purple" />
            <h1 className="text-xl font-semibold">Remind.me</h1>
          </div>
          
          <div className="flex items-center space-x-3">
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