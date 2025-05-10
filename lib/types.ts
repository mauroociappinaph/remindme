export type ReminderFrequency = 'once' | 'monthly' | 'yearly';

export interface Reminder {
  id: string;
  name: string;
  description?: string;
  dueDate: Date;
  frequency?: 'monthly' | 'quarterly' | 'yearly' | 'once';
  amount?: number;
  currency?: string;
  category?: string;
  isImportant?: boolean;
  createdAt: Date;
}

export const FrequencyOptions = [
  { value: 'once', label: 'Una vez' },
  { value: 'monthly', label: 'Mensual' },
  { value: 'yearly', label: 'Anual' }
];

export type RemindersFilter = {
  category?: string;
  fromDate?: Date;
  toDate?: Date;
  isImportant?: boolean;
};
