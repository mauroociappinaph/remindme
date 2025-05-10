"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Reminder } from "@/lib/types";
import { formatDateToLocale, getReminderStatus, getFrequencyLabel } from "@/lib/utils";
import { isValid } from "date-fns";

interface ReminderCardProps {
  reminder: Reminder;
  onDelete: (id: string) => void;
}

export function ReminderCard({ reminder, onDelete }: ReminderCardProps) {
  // Validar la fecha antes de procesarla
  let status = 'safe';
  let timeLeft = 'desconocido';

  try {
    const dueDate = new Date(reminder.dueDate);
    if (isValid(dueDate)) {
      const statusInfo = getReminderStatus(reminder);
      status = statusInfo.status;
      timeLeft = statusInfo.timeLeft;
    } else {
      console.error("Invalid date in reminder card:", reminder.id);
    }
  } catch (error) {
    console.error("Error processing date in reminder card:", error);
  }

  // Mapa de colores según el estado
  const statusColors = {
    expired: '#FF6F91',   // Rojo
    urgent: '#FF9671',    // Naranja
    upcoming: '#FFC75F',  // Amarillo
    safe: '#845EC2'       // Púrpura
  };

  // Mapa de etiquetas de estado
  const statusLabels = {
    expired: 'Vencido',
    urgent: 'Próximo',
    upcoming: 'Cercano',
    safe: 'Activo'
  };

  return (
    <Card className="reminder-card overflow-hidden border-l-4 animate-fade-in"
      style={{
        borderLeftColor: statusColors[status as keyof typeof statusColors]
      }}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">{reminder.name}</CardTitle>
          <div className={`status-badge ${status}`}>
            {statusLabels[status as keyof typeof statusLabels]}
          </div>
        </div>
        <CardDescription>
          Vence: {formatDateToLocale(new Date(reminder.dueDate))}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-sm text-muted-foreground flex flex-col gap-1">
          <div className="flex justify-between">
            <span>Frecuencia:</span>
            <span className="font-medium">
              {getFrequencyLabel(reminder.frequency || 'once')}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Estado:</span>
            <span className="font-medium">
              {status === 'expired' ? `Venció hace ${timeLeft}` :
               `Vence en ${timeLeft}`}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => onDelete(reminder.id)}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          <span>Eliminar</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
