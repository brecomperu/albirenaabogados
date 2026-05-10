"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Navbar } from '../../../widgets/Navbar';
import FloatingContactButtons from '@/shared/ui/molecules/FloatingContactButtons';

export default function NosotrosPage() {
  const openBooking = () => {
    // Logic for booking, usually handled by HomePage state but we can redirect or show a button
    window.location.href = '/#inicio';
  };

  return (
    <div className="relative min-h-screen bg-brand-bg text-white overflow-hidden" style={{ backgroundColor: 'var(--page-bg)' }}>
      <Navbar onOpenBooking={openBooking} />
      
      <main className="pt-32">
        {/* Section 1: Hero Editorial */}
        <section className="section-luxury relative">
          <div className="container-luxury">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="max-w-4xl"
            >
              <span className="label-luxury">IDENTIDAD INSTITUCIONAL</span>
              <h1 className="title-editorial text-5xl lg:text-8xl mt-6 mb-12">
                Arquitectura Jurídica <br />
                <span className="text-brand-primary italic">de Confianza</span>
              </h1>
              <p className="text-brand-silver/70 text-xl lg:text-2xl font-light leading-relaxed max-w-2xl">
                Nuestra firma brinda asesoría, consultoría y patrocinio integral a empresas privadas y públicas bajo estándares de excelencia y rigor ético.
              </p>
            </motion.div>
          </div>
          
          {/* Decorative watermark */}
          <div className="absolute -bottom-20 -right-20 text-[20rem] font-serif font-bold text-white/[0.02] pointer-events-none select-none italic leading-none hidden lg:block">AA</div>
        </section>

        {/* Section 2: Misión & Visión */}
        <section className="section-luxury bg-white/[0.02] border-y border-white/5">
          <div className="container-luxury">
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div 
                whileHover={{ y: -10 }}
                className="glass-luxury p-12 rounded-sm border-brand-primary/20 relative group"
              >
                <div className="absolute top-0 right-0 p-8 text-brand-primary opacity-20 group-hover:opacity-100 transition-opacity">
                  <svg width="40" height="40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
                  </svg>
                </div>
                <h2 className="title-editorial text-3xl mb-8 italic">Misión</h2>
                <p className="text-brand-silver/80 text-lg leading-relaxed font-light">
                  Fortalecer la confianza de nuestros clientes de manera práctica y transparente con trabajo comprometido y en equipo.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -10 }}
                className="glass-luxury p-12 rounded-sm border-white/10 relative group"
              >
                <div className="absolute top-0 right-0 p-8 text-brand-silver opacity-20 group-hover:opacity-100 transition-opacity">
                  <svg width="40" height="40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" />
                  </svg>
                </div>
                <h2 className="title-editorial text-3xl mb-8 italic">Visión</h2>
                <p className="text-brand-silver/80 text-lg leading-relaxed font-light">
                  Ser una firma de reconocida trayectoria por dar soluciones prácticas y eficaces a nuestros clientes. Asimismo, lograr la realización personal y profesional de los integrantes del estudio.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 3: Socio Fundador Teaser */}
        <section className="section-luxury">
          <div className="container-luxury">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-square lg:aspect-[4/5] overflow-hidden rounded-sm group"
              >
                <img 
                  src="/assets/lead_attorney.png" 
                  alt="Julio Alexander Albirena Vivar" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-brand-bg/40 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute bottom-0 left-0 w-full p-12 z-20">
                   <span className="label-luxury text-white mb-2">SOCIO FUNDADOR</span>
                   <h3 className="title-editorial text-4xl text-white italic">Julio Alexander Albirena Vivar</h3>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="label-luxury">LIDERAZGO ESTRATÉGICO</span>
                <h2 className="title-editorial text-4xl lg:text-6xl mt-4 mb-8 italic">Trayectoria y <span className="text-brand-primary">Excelencia</span></h2>
                <p className="text-brand-silver/70 text-lg mb-10 leading-relaxed font-light">
                  Nuestro fundador lidera la firma con una visión centrada en la justicia efectiva y el blindaje corporativo, combinando años de experiencia en el Poder Judicial con una sólida formación académica.
                </p>
                <Link 
                  href="/socio-fundador"
                  className="px-10 py-5 bg-brand-primary text-white font-bold rounded-sm text-[10px] tracking-[0.3em] hover:bg-brand-primary-light transition-all shadow-xl uppercase group inline-flex items-center gap-4"
                >
                  VER PERFIL COMPLETO <span className="text-xl group-hover:translate-x-2 transition-transform duration-500">➔</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <FloatingContactButtons />

      {/* Footer minimal for specialized pages */}
      <footer className="py-20 border-t border-white/5 bg-brand-dark text-center" style={{ backgroundColor: 'var(--footer-bg)' }}>
         <p className="text-[10px] text-brand-silver/20 font-bold tracking-[0.5em] uppercase">
            © 2026 ALBIRENA ABOGADOS | ELITE DEFENSE ARCHITECTURE
         </p>
      </footer>
    </div>
  );
}
