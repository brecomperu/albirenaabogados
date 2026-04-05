import React, { useState, useEffect } from 'react';
import styles from './ScannerModal.module.css';
import Typography from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import Calendar from '@/components/molecules/Calendar';
import { bookingRepository } from '@/features/booking/repository';

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
            <Typography variant="h2" font="serif" className="text-center mb-4">
              Escáner de <span className="text-gold">Riesgos IA</span>
            </Typography>
            <Typography variant="p" color="gray" className="text-center mb-10">
               Seleccione su perfil para adaptar el análisis casuístico.
            </Typography>
            <div className={styles.profileGrid}>
               <button onClick={() => handleProfileSelect('trabajador')} className={styles.profileBtn}>
                  <div className={styles.profileIcon}>👤</div>
                  <Typography variant="span" className="font-bold">SOY TRABAJADOR</Typography>
                  <Typography variant="p" className="text-[10px] text-gray-400">Revisión de beneficios y despidos.</Typography>
               </button>
               <button onClick={() => handleProfileSelect('empresa')} className={styles.profileBtn}>
                  <div className={styles.profileIcon}>🏢</div>
                  <Typography variant="span" className="font-bold">SOY EMPRESA</Typography>
                  <Typography variant="p" className="text-[10px] text-gray-400">Auditoría corporativa y prevención.</Typography>
               </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-spring">
            <Typography variant="h2" font="serif" className="text-center mb-4">
              Sesión de <span className="text-gold">Diagnóstico (30m)</span>
            </Typography>
            <Typography variant="p" color="gray" className="text-center mb-10">
               Seleccione cuándo desea que revisemos su documentación en conjunto.
            </Typography>
            
            <div className="mb-10">
               <Calendar selectedDate={date} onDateSelect={setDate} />
            </div>

            {date && (
              <div className="grid grid-cols-4 gap-3 mb-12 animate-spring">
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
              CONTINUAR AL ENVIÓ DE CASO ➔
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="animate-spring">
            <Typography variant="h2" font="serif" className="text-center mb-4">
              Expediente <span className="text-gold">Casuístico</span>
            </Typography>
            <Typography variant="p" color="gray" className="text-center mb-10">
              Adjunte fotos o documentos para que el abogado los analice antes de la sesión.
            </Typography>

            <div className="space-y-6 mb-12">
               <input 
                  type="text" 
                  placeholder="NOMBRE COMPLETO" 
                  className={styles.input} 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
               <input 
                  type="email" 
                  placeholder="CORREO ELECTRÓNICO DIRECTO" 
                  className={styles.input} 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
               <textarea 
                  placeholder={profile === 'empresa' ? 'Detalle la situación corporativa (Demandas, SUNAFIL, Contratos)' : 'Detalle su caso (Despedidos, Liquidaciones, Hostigamiento)'}
                  className={`${styles.input} min-h-[100px] py-4`}
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
                   className="w-full flex items-center justify-between glass-luxury p-6 rounded-2xl border-white/5 cursor-pointer hover:border-gold/30 transition-all"
                 >
                   <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">
                     {files.length > 0 ? `${files.length} ARCHIVOS CARGADOS` : 'ADJUNTAR DOCUMENTACIÓN / FOTOS'}
                   </span>
                   <span className="text-gold text-xl">⊕</span>
                 </label>
               </div>
            </div>

            <Button variant="primary" fullWidth onClick={handleBookingSubmit} disabled={isSubmitting || !formData.name || !formData.email}>
              {isSubmitting ? 'SINCRONIZANDO AGENDA...' : 'AGENDAR SESIÓN (30 MIN)'}
            </Button>
            <Typography variant="span" className={styles.disclaimer}>
              ENCRIPTACIÓN AES-256 | PROTECCIÓN LEGAL
            </Typography>
          </div>
        )}

        {step === 4 && (
          <div className="animate-spring text-center">
             <div className={styles.successIcon}>🛡️</div>
             <Typography variant="h2" font="serif">Sesión <span className="text-gold">Confirmada</span></Typography>
             <Typography variant="p" color="gray" className="mb-8 lg:px-12">
               Su información probatoria ha sido subida bajo secreto profesional. Hemos enviado a <strong>{formData.email}</strong> el enlace de conexión para nuestra sesión de 30 minutos.
             </Typography>
             
             <div className="flex flex-col gap-4">
                <Button variant="primary" fullWidth onClick={onClose}>
                  ENTENDIDO, MOSTRAR PANEL
                </Button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScannerModal;
