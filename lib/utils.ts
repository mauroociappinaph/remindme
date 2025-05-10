import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistance, isAfter, isBefore, addDays, isValid } from 'date-fns';
import { es } from 'date-fns/locale';
import { Reminder } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToLocale(date: Date): string {
  if (!date || !isValid(date)) {
    return 'Fecha no válida';
  }

  return new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

export function getReminderStatus(reminder: Reminder): {
  status: 'expired' | 'urgent' | 'upcoming' | 'safe';
  timeLeft: string;
} {
  const now = new Date();

  // Asegurarse de que dueDate sea una fecha válida
  let dueDate: Date;
  try {
    // Si es un string, convertirlo a Date
    if (typeof reminder.dueDate === 'string') {
      dueDate = new Date(reminder.dueDate);
    } else if (reminder.dueDate instanceof Date) {
      dueDate = reminder.dueDate;
    } else {
      throw new Error('Invalid date format');
    }

    // Verificar que la fecha sea válida
    if (!isValid(dueDate)) {
      throw new Error('Invalid date');
    }
  } catch (error) {
    console.error("Invalid date in reminder:", reminder.id, error);
    // Asignar una fecha futura por defecto para evitar errores
    dueDate = addDays(now, 30);
  }

  if (isBefore(dueDate, now)) {
    return {
      status: 'expired',
      timeLeft: formatDistance(dueDate, now, {
        addSuffix: true,
        locale: es
      })
    };
  }

  const urgentThreshold = addDays(now, 7);
  const upcomingThreshold = addDays(now, 30);

  if (isBefore(dueDate, urgentThreshold)) {
    return {
      status: 'urgent',
      timeLeft: formatDistance(dueDate, now, {
        addSuffix: false,
        locale: es
      })
    };
  }

  if (isBefore(dueDate, upcomingThreshold)) {
    return {
      status: 'upcoming',
      timeLeft: formatDistance(dueDate, now, {
        addSuffix: false,
        locale: es
      })
    };
  }

  return {
    status: 'safe',
    timeLeft: formatDistance(dueDate, now, {
      addSuffix: false,
      locale: es
    })
  };
}

export function getFrequencyLabel(frequency: string): string {
  switch (frequency) {
    case 'once':
      return 'Una vez';
    case 'monthly':
      return 'Mensual';
    case 'yearly':
      return 'Anual';
    default:
      return frequency;
  }
}
