"use client";

import React, { useState } from 'react';
import Navbar from '@/components/organisms/Navbar';
import Hero from '@/components/organisms/Hero';
import ScannerSection from '@/components/organisms/ScannerSection';
import ServiceCard from '@/components/molecules/ServiceCard';
import RutaSection from '@/components/organisms/RutaSection';
import MetricCard from '@/components/molecules/MetricCard';
import AttorneySection from '@/components/organisms/AttorneySection';
import TestimonialsSection from '@/components/organisms/TestimonialsSection';
import BlogSection from '@/components/organisms/BlogSection';
import Typography from '@/components/atoms/Typography';
import ScannerModal from '@/features/scanner/components/ScannerModal';
import BookingModal from '@/features/booking/components/BookingModal';
import FloatingContactButtons from '@/components/molecules/FloatingContactButtons';

export default function Home() {
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
    <div className="relative min-h-screen">
      <Navbar onOpenBooking={() => openBooking('empresa')} />
      
      <main>
        {/* Section 1: Hero Editorial Dashboard */}
        <div id="inicio">
          <Hero onOpenBooking={openBooking} />
        </div>

        {/* Section 2: Tactical Control Center Scanner */}
        <div id="diagnostico">
          <ScannerSection onOpenScanner={openScanner} />
        </div>

        <section id="servicios" className="section-luxury">
          <div className="container-luxury">
             <header className="text-center mb-16">
                <span className="label-luxury" style={{ color: 'var(--accent-gold)' }}>SOLUCIONES LEGALES</span>
                <h2 className="title-editorial text-5xl mt-4">Estrategias de <span className="text-gold italic">Prevención</span></h2>
                <p className="text-gray-400 mt-4 text-sm max-w-lg mx-auto opacity-70">Prevención en el ámbito laboral y empresarial.</p>
             </header>
             <div className="grid lg:grid-cols-2 gap-8">
                <ServiceCard 
                  title="Blindaje Corporativo"
                  description="Gestión estratégica de riesgos y auditoría de cumplimiento para organizaciones de primer nivel."
                  features={["Auditoría SUNAFIL", "Comités SST", "Contratos Laborales"]}
                  ctaLabel="MÁS DETALLES ->"
                  onCtaClick={() => openBooking('empresa')}
                  variant="maroon"
                />
                <ServiceCard 
                  title="Protección del Trabajador"
                  description="Defensa especializada para hacer valer los derechos laborales en situaciones críticas."
                  features={["Despido Arbitrario", "Hostigamiento Laboral", "Beneficios Sociales"]}
                  ctaLabel="MÁS DETALLES ->"
                  onCtaClick={() => openBooking('trabajador')}
                  variant="gold"
                />
             </div>
          </div>
        </section>

        {/* Section 4: Strategic Protocol */}
        <div id="protocolo">
          <RutaSection />
        </div>

        {/* Section 5: Impact Metrics */}
        <section className="section-luxury bg-dark/40">
          <div className="container-luxury">
             <header className="text-center mb-32">
                <span className="label-luxury" style={{ opacity: 1, color: 'var(--accent-gold)' }}>DATA & RESULTADOS</span>
                <h2 className="title-editorial text-5xl lg:text-7xl mt-6">Impacto <span className="text-gold italic">Institucional</span></h2>
             </header>
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
                <MetricCard value="2.8k+" label="Casos Resolvidos" />
                <MetricCard value="98%" label="Éxito Judicial" delay={100} />
                <MetricCard value="S/45M" label="Activos Blindados" delay={200} />
                <MetricCard value="24/7" label="Respuesta Senior" delay={300} />
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

        {/* Section 8: Final Strategic CTA */}
        <section className="py-80 text-center relative overflow-hidden bg-gradient-to-b from-transparent to-[#0a0f16]">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[600px] bg-maroon/[0.1] rounded-full blur-[200px] opacity-40"></div>
           <div className="container-luxury relative z-10">
              <h2 className="title-editorial text-6xl lg:text-9xl mb-12 leading-[0.9] text-white">
                 Su victoria legal <br /> <span className="text-gold italic">comienza ahora</span>
              </h2>
              <p className="text-gray-400 text-xl lg:text-2xl mb-24 max-w-3xl mx-auto font-light leading-relaxed">
                 No permita que su integridad quede al azar. Inicie el blindaje legal que definirá el rumbo de su organización con Albirena Abogados.
              </p>
              <button 
                className="px-20 py-8 bg-[hsl(var(--accent-maroon))] text-white font-black rounded-[100px] text-sm tracking-[.1em] hover:scale-105 transition-all shadow-[0_15px_30px_-5px_hsla(var(--accent-maroon),0.6)] hover:bg-[hsl(var(--accent-maroon-glow))] uppercase group inline-flex items-center gap-4"
                onClick={() => openBooking('empresa')}
              >
                SOLICITA CONFERENCIA ESTRATÉGICA <span className="opacity-70 group-hover:opacity-100 transition-opacity">➔</span>
              </button>
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

      <footer className="py-24 border-t border-white/5 bg-dark/80 relative">
         <div className="container-luxury flex flex-col items-center gap-16">
            <div className="flex items-center gap-6 opacity-40 hover:opacity-100 transition-opacity">
               <div className="w-10 h-10 rounded-xl gradient-wine flex items-center justify-center text-xl shadow-lg">🛡️</div>
               <span className="font-serif font-bold tracking-[.4em] text-white uppercase text-xl">ALBIRENA ABOGADOS</span>
            </div>
            <div className="flex flex-wrap justify-center gap-12 lg:gap-24">
               {['AVISO LEGAL', 'PRIVACIDAD', 'COOKIES', 'DERECHOS RESERVADOS'].map((text, i) => (
                 <a key={i} href="#" className="label-luxury text-[9px] hover:text-gold transition-colors">{text}</a>
               ))}
            </div>
            <p className="text-[10px] text-gray-700 font-black tracking-[.8em] uppercase opacity-40">
               © 2026 ALBIRENA ABOGADOS | ELITE DEFENSE ARCHITECTURE
            </p>
         </div>
      </footer>
    </div>
  );
}
