"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/hooks/useAuthStore";
import { toast } from "sonner";
import { RemindersGrid } from "@/components/reminders/reminders-grid";
import { StatsOverview } from "@/components/stats-overview";
import { Reminder } from "@/lib/types";
import { Navbar } from "@/components/navbar";
import { v4 as uuidv4 } from "@/lib/uuid";
import { isValid } from "date-fns";

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  // Inicializar los recordatorios desde localStorage si están disponibles
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("reminders");
        if (saved) {
          // Parse dates from strings back to Date objects
          const parsedReminders = JSON.parse(saved, (key, value) => {
            if (key === "dueDate" || key === "createdAt") {
              const date = new Date(value);
              return isValid(date) ? date : new Date(); // Si la fecha no es válida, usar la fecha actual
            }
            return value;
          });

          // Filtrar recordatorios con datos válidos
          return parsedReminders.filter((reminder: Partial<Reminder>) =>
            reminder &&
            typeof reminder === 'object' &&
            reminder.id &&
            reminder.name &&
            reminder.dueDate &&
            isValid(new Date(reminder.dueDate))
          );
        }
      } catch (e) {
        console.error("Failed to parse reminders from localStorage", e);
        // Si hay un error, mostrar un toast y no cargar recordatorios
        if (typeof window !== "undefined") {
          toast.error("Hubo un problema al cargar tus recordatorios");
        }
      }
    }
    return [];
  });

  // Guardar recordatorios en localStorage cuando cambien
  useEffect(() => {
    if (reminders.length > 0) {
      try {
        localStorage.setItem("reminders", JSON.stringify(reminders));
      } catch (e) {
        console.error("Failed to save reminders to localStorage", e);
      }
    }
  }, [reminders]);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión para acceder al dashboard");
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router]);

  const handleAddReminder = (data: Omit<Reminder, "id" | "createdAt">) => {
    try {
      // Verificar que la fecha sea válida
      const dueDate = new Date(data.dueDate);
      if (!isValid(dueDate)) {
        throw new Error("La fecha no es válida");
      }

      const newReminder: Reminder = {
        ...data,
        id: uuidv4(),
        createdAt: new Date(),
      };

      setReminders((prev) => [...prev, newReminder]);
      toast.success(`Recordatorio creado para ${data.name}`);
    } catch (error) {
      console.error("Error creating reminder:", error);
      toast.error("No se pudo crear el recordatorio. Verifica la fecha.");
    }
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(prev => {
      const reminder = prev.find(r => r.id === id);
      const newReminders = prev.filter(r => r.id !== id);

      if (reminder) {
        toast.success(`Recordatorio para ${reminder.name} eliminado correctamente`);
      }

      return newReminders;
    });
  };

  // Show loading or redirect if not authenticated
  if (isLoading || !isAuthenticated || !user) {
    return null;
  }

  return (
    <>
      <Navbar onAddReminder={handleAddReminder} />
      <main className="flex-1 container mx-auto p-4 pb-24 animate-slide-in">
        <div className="grid gap-6">
          <section>
            <div className="mb-4">
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              <p className="text-muted-foreground">
                Administra tus recordatorios de servicios, dominios y suscripciones
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
    </>
  );
}
