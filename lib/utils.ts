import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistance, isAfter, isBefore, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { Reminder } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToLocale(date: Date): string {
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
  const expiryDate = new Date(reminder.expiryDate);
  
  if (isBefore(expiryDate, now)) {
    return { 
      status: 'expired',
      timeLeft: formatDistance(expiryDate, now, { 
        addSuffix: true,
        locale: es
      }) 
    };
  }
  
  const urgentThreshold = addDays(now, 7);
  const upcomingThreshold = addDays(now, 30);
  
  if (isBefore(expiryDate, urgentThreshold)) {
    return { 
      status: 'urgent',
      timeLeft: formatDistance(expiryDate, now, { 
        addSuffix: false,
        locale: es
      })
    };
  }
  
  if (isBefore(expiryDate, upcomingThreshold)) {
    return { 
      status: 'upcoming',
      timeLeft: formatDistance(expiryDate, now, { 
        addSuffix: false,
        locale: es
      })
    };
  }
  
  return { 
    status: 'safe',
    timeLeft: formatDistance(expiryDate, now, { 
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