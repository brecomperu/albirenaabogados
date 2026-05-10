export interface Appointment {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  profileType: 'trabajador' | 'empresa';
  details?: string;
  attachmentUrls?: string[];
  duration?: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: any;
  meetLink?: string;
}
