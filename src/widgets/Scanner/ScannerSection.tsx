"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './ScannerSection.module.css';

interface ScannerSectionProps {
  onOpenScanner: (profile: 'trabajador' | 'empresa') => void;
}

const ScannerSection: React.FC<ScannerSectionProps> = ({ onOpenScanner }) => {
  return (
    <section id="diagnostico" className="section-luxury relative overflow-hidden bg-brand-bg">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-silver/5 rounded-full blur-[150px]"></div>

      <div className="container-luxury relative z-10">
        <header className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="label-luxury"
          >
            Auditoría Estratégica
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="title-editorial text-4xl lg:text-6xl text-white mt-4"
          >
            Escáner de <span className="text-brand-primary italic">Riesgos y Derechos</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-brand-silver/60 text-lg max-w-2xl mx-auto mt-8 font-light leading-relaxed"
          >
            Detecte contingencias críticas o valide beneficios no pagados con nuestro motor de análisis legal de alta precisión. Confidencialidad absoluta bajo protocolo de alta dirección.
          </motion.p>
        </header>

        <div className="flex flex-col md:flex-row gap-10 max-w-5xl mx-auto">
          {/* Worker Option */}
          <motion.div 
            whileHover={{ y: -10 }}
            onClick={() => onOpenScanner('trabajador')}
            className="flex-1 glass-luxury p-12 rounded-sm cursor-pointer group hover:bg-white/5 transition-all duration-500 border border-white/5"
          >
            <div className="w-16 h-16 bg-white rounded-sm flex items-center justify-center mb-10 shadow-2xl group-hover:scale-105 group-hover:bg-brand-silver transition-all duration-500">
               <svg className="w-8 h-8 text-brand-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
               </svg>
            </div>
            <h3 className="text-3xl font-serif font-bold text-white mb-6 italic">Soy Trabajador</h3>
            <p className="text-[15px] text-brand-silver/50 leading-relaxed mb-10 font-light">Análisis técnico de beneficios sociales, CTS, gratificaciones y detección proactiva de despidos arbitrarios.</p>
            <div className="text-[10px] font-bold tracking-[0.25em] text-brand-primary uppercase flex items-center gap-3 group-hover:gap-5 transition-all duration-500">
               INICIAR ESCANEO <span className="text-lg">→</span>
            </div>
          </motion.div>

          {/* Company Option */}
          <motion.div 
            whileHover={{ y: -10 }}
            onClick={() => onOpenScanner('empresa')}
            className="flex-1 glass-luxury p-12 rounded-sm cursor-pointer group hover:bg-white/5 transition-all duration-500 border border-brand-primary/20"
          >
            <div className="w-16 h-16 bg-brand-primary rounded-sm flex items-center justify-center mb-10 shadow-2xl group-hover:scale-105 group-hover:bg-brand-primary-light transition-all duration-500">
               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
               </svg>
            </div>
            <h3 className="text-3xl font-serif font-bold text-white mb-6 italic">Soy Empresa</h3>
            <p className="text-[15px] text-brand-silver/50 leading-relaxed mb-10 font-light">Auditoría de cumplimiento normativo preventivo y blindaje estratégico ante fiscalizaciones de SUNAFIL.</p>
            <div className="text-[10px] font-bold tracking-[0.25em] text-white uppercase flex items-center gap-3 group-hover:gap-5 transition-all duration-500">
               AUDITAR ORGANIZACIÓN <span className="text-lg">→</span>
            </div>
          </motion.div>
        </div>

        {/* Security Badges */}
        <div className="mt-24 flex flex-wrap justify-center gap-12 opacity-20 hover:opacity-40 transition-opacity duration-700">
           <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.35em] text-white uppercase">
              <span className="w-1.5 h-1.5 bg-brand-primary rounded-full"></span> ENCRIPTACIÓN 256-BIT
           </div>
           <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.35em] text-white uppercase">
              <span className="w-1.5 h-1.5 bg-brand-primary rounded-full"></span> PROTOCOLO CONFIDENCIAL
           </div>
           <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.35em] text-white uppercase">
              <span className="w-1.5 h-1.5 bg-brand-primary rounded-full"></span> RESPALDO INSTITUCIONAL
           </div>
        </div>
      </div>
    </section>
  );
};

export default ScannerSection;
