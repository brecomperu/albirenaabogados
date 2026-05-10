import React, { useState, useEffect } from 'react';
import styles from './ScannerModal.module.css';
import Typography from '@/shared/ui/atoms/Typography';
import Button from '@/shared/ui/atoms/Button';
import Calendar from '@/shared/ui/molecules/Calendar';
import { bookingRepository } from '@/features/booking/api/repository';

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking?: () => void;
  externalProfile?: 'trabajador' | 'empresa' | null;
}

const ScannerModal: React.FC<ScannerModalProps> = ({ isOpen, onClose, externalProfile }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<'trabajador' | 'empresa' | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', details: '' });
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (externalProfile && isOpen) {
      setProfile(externalProfile);
      setStep(2);
    } else if (isOpen) {
      setStep(1);
      setProfile(null);
      setFormData({ name: '', email: '', details: '' });
      setDate(null);
      setTime('');
      setFiles([]);
    }
  }, [externalProfile, isOpen]);

  if (!isOpen) return null;

  const handleProfileSelect = (type: 'trabajador' | 'empresa') => {
    setProfile(type);
    setStep(2);
  };

  const handleBookingSubmit = async () => {
    if (!profile || !formData.name || !formData.email || !date || !time) return;

    setIsSubmitting(true);
    try {
      await bookingRepository.createAppointment({
        ...formData,
        date,
        time,
        profileType: profile,
        duration: 30 // Flow 2: 30 minutes with docs
      }, files);
      setStep(4);
    } catch (error) {
      console.error("Error submitting scan:", error);
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
              Escáner de <span className="text-brand-primary">Riesgos Legales</span>
            </Typography>
            <Typography variant="p" className="text-center mb-12 text-brand-silver/60 font-light">
               Seleccione su perfil para adaptar el análisis de arquitectura legal.
            </Typography>
            <div className={styles.profileGrid}>
               <button onClick={() => handleProfileSelect('trabajador')} className={styles.profileBtn}>
                  <div className={styles.profileIcon} style={{ background: 'rgba(255,255,255,0.05)', color: '#FFFFFF' }}>👤</div>
                  <Typography variant="span" className="font-bold tracking-widest text-xs">SOY TRABAJADOR</Typography>
                  <Typography variant="p" className="text-[11px] text-brand-silver/40 mt-2">Revisión de beneficios y despidos.</Typography>
               </button>
               <button onClick={() => handleProfileSelect('empresa')} className={styles.profileBtn}>
                  <div className={styles.profileIcon} style={{ background: '#760109', color: '#FFFFFF' }}>🏢</div>
                  <Typography variant="span" className="font-bold tracking-widest text-xs">SOY EMPRESA</Typography>
                  <Typography variant="p" className="text-[11px] text-brand-silver/40 mt-2">Auditoría corporativa y prevención.</Typography>
               </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-spring">
            <Typography variant="h2" font="serif" className="text-center mb-6 text-white italic">
              Sesión de <span className="text-brand-primary">Diagnóstico</span>
            </Typography>
            <Typography variant="p" className="text-center mb-12 text-brand-silver/60 font-light">
               Seleccione el horario para la revisión técnica de su documentación.
            </Typography>
            
            <div className="mb-12">
               <Calendar selectedDate={date} onDateSelect={setDate} />
            </div>

            {date && (
              <div className="grid grid-cols-4 gap-4 mb-16 animate-spring">
                {['08:30', '10:30', '14:30', '16:30'].map((t) => (
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

            <Button variant="primary" fullWidth onClick={() => setStep(3)} disabled={!date || !time}>
              CONTINUAR AL EXPEDIENTE ➔
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="animate-spring">
            <Typography variant="h2" font="serif" className="text-center mb-6 text-white italic">
              Expediente <span className="text-brand-primary">Casuístico</span>
            </Typography>
            <Typography variant="p" className="text-center mb-12 text-brand-silver/60 font-light">
              Adjunte la documentación probatoria para el análisis técnico previo.
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
               <textarea 
                  placeholder={profile === 'empresa' ? 'Detalle la situación corporativa (Demandas, SUNAFIL, Auditoría)' : 'Detalle su caso (Liquidación, Despido, Hostigamiento)'}
                  className={`${styles.input} min-h-[120px] py-6`}
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
               />

               <div className="relative group">
                 <input 
                    type="file" 
                    multiple
                    accept=".pdf,image/*"
                    onChange={(e) => setFiles(Array.from(e.target.files || []))}
                    className="hidden"
                    id="scanner-files"
                 />
                 <label 
                   htmlFor="scanner-files" 
                   className="w-full flex items-center justify-between glass-luxury p-8 rounded-sm border-white/5 cursor-pointer hover:border-brand-primary/30 transition-all duration-500"
                 >
                   <span className="text-brand-silver/40 font-bold text-[10px] uppercase tracking-[0.2em]">
                     {files.length > 0 ? `${files.length} ARCHIVOS CARGADOS` : 'ADJUNTAR DOCUMENTACIÓN / FOTOS'}
                   </span>
                   <span className="text-brand-primary text-xl">⊕</span>
                 </label>
               </div>
            </div>

            <Button variant="primary" fullWidth onClick={handleBookingSubmit} disabled={isSubmitting || !formData.name || !formData.email}>
              {isSubmitting ? 'SINCRONIZANDO AGENDA...' : 'AGENDAR SESIÓN ESTRATÉGICA'}
            </Button>
            <div className="text-center mt-8">
               <Typography variant="span" className="text-[9px] font-bold tracking-[0.4em] text-brand-silver/20 uppercase">
                 ENCRIPTACIÓN 256-BIT | PROTOCOLO DE CONFIDENCIALIDAD
               </Typography>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-spring text-center">
             <div className="w-20 h-20 bg-brand-primary/20 rounded-sm flex items-center justify-center mx-auto mb-10 text-4xl shadow-2xl">🛡️</div>
             <Typography variant="h2" font="serif" className="mb-6 text-white italic">Sesión <span className="text-brand-primary">Confirmada</span></Typography>
             <Typography variant="p" className="mb-12 text-brand-silver/60 font-light leading-relaxed px-6">
               Su información probatoria ha sido subida bajo secreto profesional. Hemos enviado a <strong>{formData.email}</strong> el enlace de conexión estratégica para nuestra sesión de 30 minutos.
             </Typography>
             
             <div className="flex flex-col gap-4">
                <Button variant="primary" fullWidth onClick={onClose}>
                   FINALIZAR Y VOLVER
                </Button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScannerModal;
