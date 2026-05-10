"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../../../widgets/Navbar';
import { Hero } from '../../../widgets/Hero';
import { ScannerSection } from '../../../widgets/Scanner';
import ServiceCard from '@/shared/ui/molecules/ServiceCard';
import { RutaSection } from '../../../widgets/Ruta';
import MetricCard from '@/shared/ui/molecules/MetricCard';
import { AttorneySection } from '../../../widgets/Attorney';
import { TestimonialsSection } from '../../../widgets/Testimonials';
import { BlogSection } from '../../../widgets/Blog';
import { Footer } from '../../../widgets/Footer';
import Typography from '@/shared/ui/atoms/Typography';
import ScannerModal from '@/features/scanner/ui/ScannerModal';
import BookingModal from '@/features/booking/ui/BookingModal';
import FloatingContactButtons from '@/shared/ui/molecules/FloatingContactButtons';

export default function HomePage() {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [profile, setProfile] = useState<'trabajador' | 'empresa'>('trabajador');

  const openBooking = (p: 'trabajador' | 'empresa') => {
    setProfile(p);
    setIsBookingOpen(true);
  };

  const openScanner = (p: 'trabajador' | 'empresa') => {
    setProfile(p);
    setIsScannerOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-brand-bg" style={{ backgroundColor: 'var(--page-bg)' }}>
      <Navbar onOpenBooking={() => openBooking('empresa')} />
      
      <main>
        {/* Section 1: Hero Editorial Dashboard */}
        <Hero onOpenBooking={openBooking} />

        {/* Section 2: Tactical Control Center Scanner */}
        <ScannerSection onOpenScanner={openScanner} />

        <section id="servicios" className="section-luxury">
          <div className="container-luxury">
             <header className="text-center mb-24">
                <span className="label-luxury">SOLUCIONES ESTRATÉGICAS</span>
                <h2 className="title-editorial text-5xl lg:text-7xl mt-6">Estrategias de <span className="text-brand-primary italic">Prevención</span></h2>
                <p className="text-brand-silver/50 mt-8 text-lg max-w-xl mx-auto font-light leading-relaxed">Blindaje jurídico integral diseñado para la alta dirección y perfiles ejecutivos.</p>
             </header>
             <div className="grid lg:grid-cols-2 gap-12">
                <ServiceCard 
                  title="Blindaje Corporativo"
                  description="Gestión estratégica de riesgos y auditoría de cumplimiento para organizaciones que exigen excelencia."
                  features={["Auditoría SUNAFIL", "Comités SST", "Optimización Contractual"]}
                  ctaLabel="ANÁLISIS CORPORATIVO"
                  onCtaClick={() => openBooking('empresa')}
                  variant="maroon"
                />
                <ServiceCard 
                  title="Defensa Senior"
                  description="Protección especializada para salvaguardar los derechos laborales en escenarios de alta complejidad."
                  features={["Despido Arbitrario", "Hostigamiento Laboral", "Beneficios Ejecutivos"]}
                  ctaLabel="CONSULTA PRIVADA"
                  onCtaClick={() => openBooking('trabajador')}
                  variant="silver"
                />
             </div>
          </div>
        </section>

        {/* Section 4: Strategic Protocol */}
        <RutaSection />

        {/* Section 5: Impact Metrics */}
        <section className="section-luxury">
          <div className="container-luxury">
             <header className="text-center mb-32">
                <span className="label-luxury">DATA & RESULTADOS</span>
                <h2 className="title-editorial text-5xl lg:text-7xl mt-6">Impacto <span className="text-brand-primary italic">Institucional</span></h2>
             </header>
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                <MetricCard value="3.2k+" label="Casos Exitosos" />
                <MetricCard value="99.2%" label="Efectividad Legal" delay={150} />
                <MetricCard value="S/50M+" label="Activos Blindados" delay={300} />
                <MetricCard value="24/7" label="Soporte Senior" delay={450} />
             </div>
          </div>
        </section>

        {/* Section 6: Human Leadership */}
        <div id="estudio">
          <AttorneySection />
        </div>

        {/* Section 7: Proof of Excellence */}
        <BlogSection />
        <TestimonialsSection />

        {/* Section 8: Final Strategic CTA - High Premium Design */}
        <section className="py-64 text-center relative overflow-hidden">
           {/* Sophisticated background effect */}
           <div className="absolute inset-0 bg-brand-dark"></div>
           <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1400px] h-[700px] bg-brand-primary/10 rounded-full blur-[200px] opacity-30"></div>
           
           <div className="container-luxury relative z-10">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="title-editorial text-6xl lg:text-[10rem] mb-12 leading-[0.85] text-white tracking-tighter"
              >
                 Su victoria legal <br /> <span className="text-brand-primary italic">comienza ahora</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-brand-silver/60 text-xl lg:text-2xl mb-24 max-w-3xl mx-auto font-light leading-relaxed"
              >
                 No permita que su integridad corporativa o personal quede al azar. Inicie hoy el blindaje legal que definirá su futuro con Albirena Abogados.
              </motion.p>
              <motion.button 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="px-16 py-7 bg-brand-primary text-white font-bold rounded-sm text-[11px] tracking-[0.3em] hover:bg-maroon-light transition-all shadow-[0_20px_50px_rgba(118,1,9,0.4)] uppercase group inline-flex items-center gap-5"
                onClick={() => openBooking('empresa')}
              >
                SOLICITAR CONFERENCIA ESTRATÉGICA <span className="text-xl group-hover:translate-x-2 transition-transform duration-500">➔</span>
              </motion.button>
           </div>
        </section>
      </main>

      {/* Persistence Modals */}
      <ScannerModal 
        isOpen={isScannerOpen} 
        onClose={() => setIsScannerOpen(false)} 
        onOpenBooking={() => openBooking('trabajador')} 
        externalProfile={profile}
      />
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        profileType={profile} 
      />
      
      <FloatingContactButtons />

      {/* Footer — independent widget */}
      <Footer />
    </div>
  );
}
