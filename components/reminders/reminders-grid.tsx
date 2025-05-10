"use client";

import { useState } from "react";
import { Reminder } from "@/lib/types";
import { ReminderCard } from "./reminder-card";
import { DeleteReminderDialog } from "./delete-reminder-dialog";
import { CalendarDays } from "lucide-react";

interface RemindersGridProps {
  reminders: Reminder[];
  onDeleteReminder: (id: string) => void;
}

export function RemindersGrid({ reminders, onDeleteReminder }: RemindersGridProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);

  const handleDeleteClick = (id: string) => {
    const reminder = reminders.find(r => r.id === id);
    if (reminder) {
      setSelectedReminder(reminder);
      setDeleteDialogOpen(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedReminder) {
      onDeleteReminder(selectedReminder.id);
      setDeleteDialogOpen(false);
      setSelectedReminder(null);
    }
  };

  if (reminders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="bg-muted/50 rounded-full p-6 mb-4">
          <CalendarDays className="h-12 w-12 text-muted-foreground/70" />
        </div>
        <h3 className="text-xl font-medium mb-2">No hay recordatorios</h3>
        <p className="text-muted-foreground max-w-md">
          Aún no has agregado ningún recordatorio. Haz clic en el botón &quot;Agregar Recordatorio&quot; para comenzar.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reminders.map((reminder) => (
        <ReminderCard
          key={reminder.id}
          reminder={reminder}
          onDelete={handleDeleteClick}
        />
      ))}
      {selectedReminder && (
        <DeleteReminderDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDeleteConfirm}
          reminderName={selectedReminder.name}
        />
      )}
    </div>
  );
}
