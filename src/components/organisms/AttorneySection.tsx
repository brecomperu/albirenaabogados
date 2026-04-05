import React from 'react';
import styles from './AttorneySection.module.css';

const AttorneySection: React.FC = () => {
  return (
    <section className="section-luxury overflow-hidden bg-dark/30">
      <div className="container-luxury">
        <header className="mb-16 text-center animate-spring">
          <span className="label-luxury" style={{ color: 'var(--accent-gold)' }}>NUESTRO TALENTO</span>
          <h2 className="title-editorial text-5xl mt-4">Liderazgo <span className="text-gold italic">Estratégico</span></h2>
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
               <h3 className="title-editorial text-4xl mb-2">Julio Alexander Albirena Vivar</h3>
               <span className="text-gray-400 uppercase tracking-widest text-xs font-bold">Socio Fundador & Director</span>
            </header>

            <div className={`${styles.bio} animate-spring mb-8`} style={{ animationDelay: '0.3s' }}>
              <p>Conduce el diseño de estrategias legales de alta complejidad para la cartera premium de Albirena Abogados, asegurando un estándar de protección sin precedentes.</p>
            </div>

            <ul className={`${styles.expertiseList} animate-spring`} style={{ animationDelay: '0.4s' }}>
               <li><span className="text-gold mr-3">✓</span> Litigio Laboral de Alta Complejidad</li>
               <li><span className="text-gold mr-3">✓</span> Asesoría Corporativa Preventiva</li>
               <li><span className="text-gold mr-3">✓</span> Defensa Ejecutiva Senior</li>
            </ul>

            <button className={`${styles.contactBtn} animate-spring`} style={{ animationDelay: '0.5s' }} onClick={() => window.location.href='#servicios'}>
               CONTACTAR DIRECTAMENTE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttorneySection;
