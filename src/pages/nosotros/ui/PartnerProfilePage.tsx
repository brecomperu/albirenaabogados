"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../../../widgets/Navbar';
import FloatingContactButtons from '@/shared/ui/molecules/FloatingContactButtons';

const academicBackground = [
  { 
    institution: 'Universidad Nacional Mayor de San Marcos', 
    title: 'Maestría en Derecho del Trabajo y de la Seguridad Social',
    location: 'Sede Principal'
  },
  { 
    institution: 'Universidad de Lima', 
    title: 'Programa de Especialización Avanzada (PEA) en Tributación',
    location: 'Sede Principal'
  },
  { 
    institution: 'Pontificia Universidad Católica del Perú', 
    title: 'Especialización Avanzada en Derecho Administrativo',
    location: 'Sede Principal'
  },
  { 
    institution: 'Universidad Inca Garcilaso de la Vega', 
    title: 'Derecho y Ciencias Políticas',
    location: 'Grado Académico'
  }
];

const experience = [
  { year: '2017 — Actualidad', role: 'Socio Fundador', entity: 'Albirena Abogados Asociados' },
  { year: '2019', role: 'Abogado Consultor', entity: 'EsSalud - Sub Gerencia de Compensaciones' },
  { year: '2016', role: 'Gerencia Central de Asuntos Legales', entity: 'EsSalud' },
  { year: '2016', role: 'Segunda Sala de Derecho Constitucional y Social Transitoria', entity: 'Poder Judicial - Corte Suprema' },
  { year: '2013 — 2016', role: 'Primera Sala de Derecho Constitucional y Social Transitoria', entity: 'Poder Judicial - Corte Suprema' },
  { year: '2012', role: 'Primera Sala Laboral de Lima', entity: 'Poder Judicial' },
  { year: '2011', role: 'Primera Sala Laboral de Lima', entity: 'Poder Judicial' },
  { year: '2011', role: 'Tercera Sala Laboral de Lima', entity: 'Poder Judicial' },
  { year: '2010 — 2011', role: 'Vigésimo Quinto Juzgado Laboral de Lima', entity: 'Poder Judicial' }
];

export default function PartnerProfilePage() {
  const openBooking = () => {
    window.location.href = '/#inicio';
  };

  return (
    <div className="relative min-h-screen bg-brand-bg text-white overflow-hidden" style={{ backgroundColor: 'var(--page-bg)' }}>
      <Navbar onOpenBooking={openBooking} />
      
      <main className="pt-32 pb-40">
        {/* Section 1: Editorial Header */}
        <section className="section-luxury">
          <div className="container-luxury">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-5"
              >
                <div className="relative aspect-[4/5] rounded-sm overflow-hidden glass-luxury border-white/5 shadow-2xl">
                   <img 
                    src="/assets/lead_attorney.png" 
                    alt="Julio Alexander Albirena Vivar" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent opacity-60"></div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-7"
              >
                <span className="label-luxury">SOCIO FUNDADOR</span>
                <h1 className="title-editorial text-5xl lg:text-8xl mt-4 mb-8 leading-tight">
                   Julio Alexander <br /> 
                   <span className="text-brand-primary italic">Albirena Vivar</span>
                </h1>
                <p className="text-brand-silver/70 text-lg lg:text-xl font-light leading-relaxed mb-12">
                   Especialista en Derecho del Trabajo y Seguridad Social, con una trayectoria distinguida en la magistratura y la consultoría estratégica. Lidera el blindaje jurídico de las organizaciones más exigentes del país.
                </p>
                
                <div className="flex gap-8">
                   <a href="https://linkedin.com" target="_blank" className="flex items-center gap-3 text-brand-silver/50 hover:text-white transition-all text-[10px] font-bold tracking-[0.3em] uppercase">
                     <span className="w-8 h-[1px] bg-brand-primary"></span> LINKEDIN
                   </a>
                   <a href="https://facebook.com" target="_blank" className="flex items-center gap-3 text-brand-silver/50 hover:text-white transition-all text-[10px] font-bold tracking-[0.3em] uppercase">
                     <span className="w-8 h-[1px] bg-brand-primary"></span> FACEBOOK
                   </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 2: Formación Académica */}
        <section className="section-luxury bg-white/[0.02] border-y border-white/5">
          <div className="container-luxury">
             <header className="mb-20">
                <span className="label-luxury">SÓLIDA FORMACIÓN</span>
                <h2 className="title-editorial text-4xl lg:text-6xl mt-4 italic text-brand-silver">Trayectoria Académica</h2>
             </header>

             <div className="grid md:grid-cols-2 gap-8">
                {academicBackground.map((edu, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-luxury p-8 border-white/5 flex gap-8 items-start group hover:border-brand-primary/30 transition-all duration-500"
                  >
                     <div className="text-2xl text-brand-primary opacity-40 group-hover:opacity-100 transition-opacity">🎓</div>
                     <div>
                        <h4 className="text-brand-silver font-bold uppercase tracking-widest text-[11px] mb-2">{edu.institution}</h4>
                        <p className="text-white text-lg font-serif italic">{edu.title}</p>
                     </div>
                  </motion.div>
                ))}
             </div>
          </div>
        </section>

        {/* Section 3: Experiencia Laboral (Timeline) */}
        <section className="section-luxury">
          <div className="container-luxury">
             <header className="mb-32 text-center">
                <span className="label-luxury">HISTORIAL PROCESAL</span>
                <h2 className="title-editorial text-4xl lg:text-6xl mt-4 italic">Experiencia <span className="text-brand-primary">Estratégica</span></h2>
             </header>

             <div className="relative max-w-5xl mx-auto">
                {/* Center Line */}
                <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 md:-translate-x-1/2"></div>
                
                <div className="space-y-24">
                   {experience.map((exp, i) => (
                     <motion.div 
                       key={i}
                       initial={{ opacity: 0, y: 30 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.8 }}
                       className={`relative flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                     >
                        {/* Dot */}
                        <div className="absolute left-[16px] md:left-1/2 top-0 w-[9px] h-[9px] bg-brand-primary rounded-full md:-translate-x-1/2 z-10 shadow-[0_0_10px_rgba(var(--brand-primary-hsl),0.5)]"></div>
                        
                        <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12 text-left md:text-right">
                           {i % 2 === 0 ? (
                             <div className="md:text-left">
                                <span className="text-brand-primary font-bold tracking-widest text-[10px] uppercase mb-2 block">{exp.year}</span>
                                <h4 className="text-2xl font-serif text-white mb-2 italic">{exp.role}</h4>
                                <p className="text-brand-silver/50 text-sm font-light uppercase tracking-widest">{exp.entity}</p>
                             </div>
                           ) : (
                             <div className="md:text-right">
                                <span className="text-brand-primary font-bold tracking-widest text-[10px] uppercase mb-2 block">{exp.year}</span>
                                <h4 className="text-2xl font-serif text-white mb-2 italic">{exp.role}</h4>
                                <p className="text-brand-silver/50 text-sm font-light uppercase tracking-widest">{exp.entity}</p>
                             </div>
                           )}
                        </div>
                        <div className="hidden md:block w-1/2"></div>
                     </motion.div>
                   ))}
                </div>
             </div>
          </div>
        </section>
      </main>

      <FloatingContactButtons />

      <footer className="py-20 border-t border-white/5 bg-brand-dark text-center" style={{ backgroundColor: 'var(--footer-bg)' }}>
         <p className="text-[10px] text-brand-silver/20 font-bold tracking-[0.5em] uppercase">
            © 2026 ALBIRENA ABOGADOS | ELITE DEFENSE ARCHITECTURE
         </p>
      </footer>
    </div>
  );
}
