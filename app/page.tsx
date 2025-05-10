"use client";

import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { RemindersGrid } from "@/components/reminders/reminders-grid";
import { StatsOverview } from "@/components/stats-overview";
import { Reminder } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "@/lib/uuid";

// Mock implementation of UUID for client-side use
export function Home() {
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    // Try to load from localStorage on client-side
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("reminders");
      if (saved) {
        try {
          // Parse dates from strings back to Date objects
          return JSON.parse(saved, (key, value) => {
            if (key === "expiryDate" || key === "createdAt") {
              return new Date(value);
            }
            return value;
          });
        } catch (e) {
          console.error("Failed to parse reminders from localStorage", e);
        }
      }
    }
    return [];
  });

  const { toast } = useToast();

  // Save to localStorage whenever reminders change
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  const handleAddReminder = (data: Omit<Reminder, "id" | "createdAt">) => {
    const newReminder: Reminder = {
      ...data,
      id: uuidv4(),
      createdAt: new Date(),
    };

    setReminders((prev) => [...prev, newReminder]);
    toast({
      title: "Recordatorio creado",
      description: `Has creado un recordatorio para ${data.name}`,
    });
  };

  const handleDeleteReminder = (id: string) => {
    setReminders((prev) => {
      const reminder = prev.find((r) => r.id === id);
      const newReminders = prev.filter((r) => r.id !== id);
      
      if (reminder) {
        toast({
          title: "Recordatorio eliminado",
          description: `Has eliminado el recordatorio para ${reminder.name}`,
        });
      }
      
      return newReminders;
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader onAddReminder={handleAddReminder} />
      
      <main className="flex-1 container mx-auto p-4 pb-24 animate-slide-in">
        <div className="grid gap-6">
          <section>
            <div className="mb-4">
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              <p className="text-muted-foreground">
                Administra tus recordatorios de servicios, dominios y suscripciones.
              </p>
            </div>
            
            <StatsOverview reminders={reminders} />
          </section>
          
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Tus Recordatorios</h3>
            </div>
            
            <RemindersGrid 
              reminders={reminders} 
              onDeleteReminder={handleDeleteReminder} 
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Home;