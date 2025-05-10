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

interface ReminderCardProps {
  reminder: Reminder;
  onDelete: (id: string) => void;
}

export function ReminderCard({ reminder, onDelete }: ReminderCardProps) {
  const { status, timeLeft } = getReminderStatus(reminder);
  
  return (
    <Card className="reminder-card overflow-hidden border-l-4 animate-fade-in"
      style={{ 
        borderLeftColor: status === 'expired' ? '#FF6F91' : 
                           status === 'urgent' ? '#FF9671' : 
                           status === 'upcoming' ? '#FFC75F' : 
                           '#845EC2' 
      }}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">{reminder.name}</CardTitle>
          <div className={`status-badge ${status}`}>
            {status === 'expired' ? 'Vencido' :
             status === 'urgent' ? 'Próximo' :
             status === 'upcoming' ? 'Cercano' : 'Activo'}
          </div>
        </div>
        <CardDescription>
          Vence: {formatDateToLocale(new Date(reminder.expiryDate))}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-sm text-muted-foreground flex flex-col gap-1">
          <div className="flex justify-between">
            <span>Frecuencia:</span>
            <span className="font-medium">{getFrequencyLabel(reminder.frequency)}</span>
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