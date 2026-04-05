import React from 'react';
import styles from './TestimonialsSection.module.css';

const TestimonialsSection: React.FC = () => {
  const reviews = [
    { name: 'Dr. Ricardo Valdés', role: 'Gerente General, Corp S.A.', text: 'El blindaje preventivo de Albirena Abogados no es una opción, es una necesidad estratégica. Su auditoría IA nos ahorró contingencias millonarias.' },
    { name: 'Elena Casals', role: 'Ex-Directora Regional', text: 'En una situación de alta vulnerabilidad, su defensa senior fue implacable. Su enfoque en el detalle jurídico es simplemente de otro nivel.' },
    { name: 'Ing. Marco Polo', role: 'Socio Fundador, TechLogistics', text: 'Resolvieron un conflicto de años en meses. La velocidad y sofisticación de su equipo es lo que toda empresa moderna necesita.' },
  ];

  return (
    <section className="section-luxury bg-dark/30">
      <div className="container-luxury">
        <header className="text-center mb-32 animate-spring">
           <span className="label-luxury" style={{ color: 'var(--accent-gold)' }}>TESTIMONIOS DE ALTO NIVEL</span>
           <h2 className="title-editorial text-4xl lg:text-5xl mt-6">Credibilidad <span className="text-gold italic">Comprobada</span></h2>
        </header>

        <div className={styles.grid}>
          {reviews.map((rev, i) => (
            <div key={i} className={`${styles.card} glass-luxury group`} style={{ animationDelay: `${i * 0.1}s` }}>
               <div className={styles.quote}>"</div>
               <p className={styles.text}>{rev.text}</p>
               <div className={styles.footer}>
                  <div className={styles.avatar}>
                    <div className={styles.avatarInner}></div>
                  </div>
                  <div>
                    <h4 className={styles.name}>{rev.name}</h4>
                    <p className={styles.role}>{rev.role}</p>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
