"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Reminder } from "@/lib/types";
import { getReminderStatus } from "@/lib/utils";
import { BellOff, Clock, AlertTriangle, Calendar } from "lucide-react";

interface StatsOverviewProps {
  reminders: Reminder[];
}

export function StatsOverview({ reminders }: StatsOverviewProps) {
  // Calculate statistics
  const totalReminders = reminders.length;

  // Validamos que los recordatorios tengan fechas válidas
  const validReminders = reminders.filter(reminder =>
    reminder.dueDate && !isNaN(new Date(reminder.dueDate).getTime())
  );

  const { expired, urgent, upcoming, safe } = validReminders.reduce(
    (acc, reminder) => {
      try {
        const { status } = getReminderStatus(reminder);
        acc[status] += 1;
      } catch (error) {
        console.error("Error processing reminder:", reminder, error);
      }
      return acc;
    },
    { expired: 0, urgent: 0, upcoming: 0, safe: 0 }
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalReminders}</div>
          <p className="text-xs text-muted-foreground">
            Recordatorios activos
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Vencidos</CardTitle>
          <BellOff className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{expired}</div>
          <p className="text-xs text-muted-foreground">
            Requieren atención inmediata
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Próximos</CardTitle>
          <AlertTriangle className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{urgent}</div>
          <p className="text-xs text-muted-foreground">
            Vencen en menos de 7 días
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cercanos</CardTitle>
          <Clock className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{upcoming + safe}</div>
          <p className="text-xs text-muted-foreground">
            Vencen en los próximos 30 días o más
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
