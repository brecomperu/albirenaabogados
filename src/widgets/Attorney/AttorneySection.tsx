import React from 'react';
import styles from './AttorneySection.module.css';

const AttorneySection: React.FC = () => {
  return (
    <section className="section-luxury overflow-hidden bg-brand-bg">
      <div className="container-luxury">
        <header className="mb-20 text-center animate-spring">
          <span className="label-luxury">NUESTRO TALENTO</span>
          <h2 className="title-editorial text-5xl lg:text-6xl mt-4">Liderazgo <span className="text-brand-primary italic">Estratégico</span></h2>
        </header>

        <div className={styles.layout}>
          <div className={`${styles.imageWrapper} animate-spring`}>
            <div className={styles.imageOverlay}></div>
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000&auto=format&fit=crop" 
              alt="Dr. Julio Alexander Albirena Vivar" 
              className={styles.image}
            />
          </div>

          <div className={styles.content}>
            <header className="mb-8 animate-spring" style={{ animationDelay: '0.2s' }}>
               <h3 className="title-editorial text-4xl mb-3">Julio Alexander Albirena Vivar</h3>
               <span className="text-brand-silver/60 uppercase tracking-[0.3em] text-[10px] font-bold">Socio Fundador & Director</span>
            </header>

            <div className={`${styles.bio} animate-spring mb-10`} style={{ animationDelay: '0.3s' }}>
              <p className="text-brand-silver/90 leading-relaxed text-lg font-light">Conduce el diseño de estrategias legales de alta complejidad para la cartera premium de Albirena Abogados, asegurando un estándar de protección sin precedentes bajo principios de excelencia y rigor jurídico.</p>
            </div>

            <ul className={`${styles.expertiseList} animate-spring mb-12`} style={{ animationDelay: '0.4s' }}>
               <li className="flex items-center gap-4 text-white font-medium">
                 <span className="w-5 h-5 rounded-full border border-brand-primary flex items-center justify-center text-[10px] text-brand-primary">✓</span> 
                 Litigio Laboral de Alta Complejidad
               </li>
               <li className="flex items-center gap-4 text-white font-medium">
                 <span className="w-5 h-5 rounded-full border border-brand-primary flex items-center justify-center text-[10px] text-brand-primary">✓</span> 
                 Asesoría Corporativa Preventiva
               </li>
               <li className="flex items-center gap-4 text-white font-medium">
                 <span className="w-5 h-5 rounded-full border border-brand-primary flex items-center justify-center text-[10px] text-brand-primary">✓</span> 
                 Defensa Ejecutiva Senior
               </li>
            </ul>

            <button 
              className="px-8 py-4 bg-transparent border border-brand-silver/30 text-white font-bold text-[10px] tracking-[0.2em] hover:bg-brand-primary hover:border-brand-primary transition-all duration-500 animate-spring" 
              style={{ animationDelay: '0.5s' }} 
              onClick={() => window.location.href='#servicios'}
            >
               CONTACTAR DIRECTAMENTE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttorneySection;
