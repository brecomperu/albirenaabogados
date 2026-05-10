import React, { useState } from 'react';
import styles from './BookingModal.module.css';
import Typography from '@/shared/ui/atoms/Typography';
import Button from '@/shared/ui/atoms/Button';
import Calendar from '@/shared/ui/molecules/Calendar';
import { bookingRepository } from '../api/repository';
import Badge from '@/shared/ui/atoms/Badge';

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
            <Typography variant="h2" font="serif" className="text-center mb-6 text-white italic">
              Consulta Rápida <span className="text-brand-primary">(15min)</span>
            </Typography>
            <Typography variant="p" className="text-center mb-12 text-brand-silver/60 font-light leading-relaxed">
               Seleccione el horario preferencial para su reunión virtual estratégica vía Google Meet.
            </Typography>
            
            <div className="mb-12">
               <Calendar selectedDate={date} onDateSelect={setDate} />
            </div>

            {date && (
              <div className="grid grid-cols-4 gap-4 mb-16 animate-spring">
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
             <Typography variant="h2" font="serif" className="text-center mb-6 text-white italic">
              Reserva de <span className="text-brand-primary">Alta Dirección</span>
            </Typography>
            <Typography variant="p" className="text-center mb-12 text-brand-silver/60 font-light leading-relaxed">
               Solo requerimos su información institucional para enviarle el enlace de acceso seguro.
            </Typography>

            <div className="space-y-6 mb-16">
               <input 
                  type="text" 
                  placeholder="NOMBRE COMPLETO" 
                  className={styles.input}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
               />
               <input 
                  type="email" 
                  placeholder="CORREO ELECTRÓNICO INSTITUCIONAL" 
                  className={styles.input}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
               />
            </div>

            <Button variant="primary" fullWidth onClick={handleBooking} disabled={isSubmitting || !formData.name || !formData.email}>
               {isSubmitting ? 'GENERANDO ACCESO SEGURO...' : 'CONFIRMAR REUNIÓN VIRTUAL'}
            </Button>
            <div className="text-center mt-8">
               <Typography variant="p" className="text-[9px] font-bold tracking-[0.4em] text-brand-silver/20 uppercase">
                  EL ENLACE DE MEET SERÁ ENVIADO AUTOMÁTICAMENTE
               </Typography>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-spring text-center">
             <div className="w-20 h-20 bg-brand-primary/20 rounded-sm flex items-center justify-center mx-auto mb-10 text-4xl shadow-2xl">✅</div>
             <Typography variant="h2" font="serif" className="mb-6 text-white italic">Reunión <span className="text-brand-primary">Confirmada</span></Typography>
             <Typography variant="p" className="mb-12 text-brand-silver/60 font-light leading-relaxed px-6">
                Hemos enviado exitosamente el enlace de Google Meet a <strong>{formData.email}</strong> para su sesión estratégica de 15 minutos.
             </Typography>
             <Button variant="primary" fullWidth onClick={onClose}>FINALIZAR</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
