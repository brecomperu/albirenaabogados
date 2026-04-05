import React, { useState } from 'react';
import styles from './BookingModal.module.css';
import Typography from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import Calendar from '@/components/molecules/Calendar';
import { bookingRepository } from '../repository';
import Badge from '@/components/atoms/Badge';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileType: 'trabajador' | 'empresa';
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, profileType }) => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleBooking = async () => {
    if (!date || !time || !formData.name || !formData.email) return;

    setIsSubmitting(true);
    try {
      await bookingRepository.createAppointment({
        ...formData,
        date,
        time,
        profileType,
        duration: 15 // Flow 1: 15 minutes friction-free
      }, []);
      setStep(3);
    } catch (error) {
      console.error("Error creating booking:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.modal} glass-luxury`} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        
        {step === 1 && (
          <div className="animate-spring">
            <Typography variant="h2" font="serif" className="text-center mb-4">
              Consulta Rápida <span className="text-gold">(15min)</span>
            </Typography>
            <Typography variant="p" color="gray" className="text-center mb-10">
               Seleccione el horario para su reunión virtual en Meet.
            </Typography>
            
            <div className="mb-10">
               <Calendar selectedDate={date} onDateSelect={setDate} />
            </div>

            {date && (
              <div className="grid grid-cols-4 gap-3 mb-12 animate-spring">
                {['09:00', '11:00', '15:00', '17:00'].map((t) => (
                  <button 
                    key={t}
                    onClick={() => setTime(t)}
                    className={`${styles.timeBtn} ${time === t ? styles.activeTime : ''}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}

            <Button variant="primary" fullWidth onClick={() => setStep(2)} disabled={!date || !time}>
              CONTINUAR ➔
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-spring">
             <Typography variant="h2" font="serif" className="text-center mb-4">
              Reserva sin <span className="text-gold">Fricción</span>
            </Typography>
            <Typography variant="p" color="gray" className="text-center mb-10">
               Solo necesitamos su correo para enviarle el link de Google Meet.
            </Typography>

            <div className="space-y-6 mb-12">
               <input 
                  type="text" 
                  placeholder="NOMBRE" 
                  className={styles.input}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
               />
               <input 
                  type="email" 
                  placeholder="CORREO ELECTRÓNICO" 
                  className={styles.input}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
               />
            </div>

            <Button variant="primary" fullWidth onClick={handleBooking} disabled={isSubmitting || !formData.name || !formData.email}>
               {isSubmitting ? 'GENERANDO LINK DE MEET...' : 'CONFIRMAR REUNIÓN VIRTUAL'}
            </Button>
            <Typography variant="p" className="text-center mt-6 text-[9px] uppercase tracking-widest text-gray-500 font-bold">
               ENLACE DE MEET DIRECTO AL CORREO
            </Typography>
          </div>
        )}

        {step === 3 && (
          <div className="animate-spring text-center">
             <div className="text-6xl mb-8">✅</div>
             <Typography variant="h2" font="serif">Reunión <span className="text-gold">Confirmada</span></Typography>
             <Typography variant="p" color="gray" className="mb-10 lg:px-12">
                Hemos enviado exitosamente el enlace de Google Meet a <strong>{formData.email}</strong> para su cita de 15 minutos.
             </Typography>
             <Button variant="glass" fullWidth onClick={onClose}>CERRAR</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
