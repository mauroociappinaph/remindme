export type ReminderFrequency = 'once' | 'monthly' | 'yearly';

export interface Reminder {
  id: string;
  name: string;
  expiryDate: Date;
  frequency: ReminderFrequency;
  createdAt: Date;
}

export const FrequencyOptions = [
  { value: 'once', label: 'Una vez' },
  { value: 'monthly', label: 'Mensual' },
  { value: 'yearly', label: 'Anual' }
];