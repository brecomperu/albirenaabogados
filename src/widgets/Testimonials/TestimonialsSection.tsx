import React from 'react';
import styles from './TestimonialsSection.module.css';

const TestimonialsSection: React.FC = () => {
  const reviews = [
    { name: 'Dr. Ricardo Valdés', role: 'Gerente General, Corp S.A.', text: 'El blindaje preventivo de Albirena Abogados no es una opción, es una necesidad estratégica. Su auditoría especializada nos ahorró contingencias millonarias.' },
    { name: 'Elena Casals', role: 'Ex-Directora Regional', text: 'En una situación de alta vulnerabilidad, su defensa senior fue implacable. Su enfoque en el detalle jurídico es simplemente de otro nivel de sofisticación.' },
    { name: 'Ing. Marco Polo', role: 'Socio Fundador, TechLogistics', text: 'Resolvieron un conflicto de años en meses. La velocidad y sofisticación de su equipo es lo que toda organización moderna necesita para operar segura.' },
  ];

  return (
    <section className="section-luxury bg-brand-bg">
      <div className="container-luxury">
        <header className="text-center mb-32 animate-spring">
           <span className="label-luxury">TESTIMONIOS DE ALTO NIVEL</span>
           <h2 className="title-editorial text-4xl lg:text-6xl mt-6">Credibilidad <span className="text-brand-primary italic">Comprobada</span></h2>
        </header>

        <div className={styles.grid}>
          {reviews.map((rev, i) => (
            <div key={i} className={`${styles.card} glass-luxury group animate-spring`} style={{ animationDelay: `${i * 0.15}s` }}>
               <div className={styles.quote} style={{ color: 'var(--brand-primary)' }}>"</div>
               <p className={styles.text} style={{ color: 'var(--brand-silver)' }}>{rev.text}</p>
               <div className={styles.footer}>
                  <div className={styles.avatar}>
                    <div className={styles.avatarInner} style={{ background: 'var(--brand-primary)' }}></div>
                  </div>
                  <div>
                    <h4 className={styles.name} style={{ color: 'var(--brand-white)' }}>{rev.name}</h4>
                    <p className={styles.role} style={{ color: 'var(--brand-silver)', opacity: 0.6 }}>{rev.role}</p>
                  </div>
               </div>
               
               {/* Hover effect accent */}
               <div className="absolute bottom-0 left-0 w-0 h-1 bg-brand-primary group-hover:w-full transition-all duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
