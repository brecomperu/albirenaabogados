"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './ScannerSection.module.css';

interface ScannerSectionProps {
  onOpenScanner: (profile: 'trabajador' | 'empresa') => void;
}

const ScannerSection: React.FC<ScannerSectionProps> = ({ onOpenScanner }) => {
  return (
    <section id="diagnostico" className="section-luxury bg-navy-deep/40 backdrop-blur-sm relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-maroon/5 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px]"></div>

      <div className="container-luxury relative z-10">
        <header className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="label-luxury"
          >
            Auditoría Institucional
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="title-editorial text-4xl lg:text-6xl text-white mt-4"
          >
            Escáner de <span className="text-gold italic">Riesgos y Derechos</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto mt-8 font-light"
          >
            Detecte contingencias críticas o valide beneficios no pagados con nuestro motor de análisis legal de alta precisión. Confidencialidad absoluta garantizada.
          </motion.p>
        </header>

        <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
          {/* Worker Option */}
          <motion.div 
            whileHover={{ y: -10 }}
            onClick={() => onOpenScanner('trabajador')}
            className="flex-1 glass-luxury p-10 rounded-[2.5rem] cursor-pointer group hover:bg-white/5 transition-all border border-white/5"
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform">
               <svg className="w-8 h-8 text-navy-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
               </svg>
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-4">Soy Trabajador</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">Valide sus beneficios sociales, CTS, gratificaciones y detecte despidos arbitrarios.</p>
            <div className="text-[10px] font-black tracking-widest text-gold uppercase flex items-center gap-2">
               Iniciar Escaneo <span className="group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </motion.div>

          {/* Company Option */}
          <motion.div 
            whileHover={{ y: -10 }}
            onClick={() => onOpenScanner('empresa')}
            className="flex-1 glass-luxury p-10 rounded-[2.5rem] cursor-pointer group hover:bg-white/5 transition-all border border-gold/20"
          >
            <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform">
               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
               </svg>
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-4">Soy Empresa</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">Audite su cumplimiento normativo y anticipe riesgos ante fiscalizaciones de SUNAFIL.</p>
            <div className="text-[10px] font-black tracking-widest text-white uppercase flex items-center gap-2">
               Auditar Organización <span className="group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </motion.div>
        </div>

        {/* Security Badges */}
        <div className="mt-20 flex flex-wrap justify-center gap-10 opacity-30 invert hover:opacity-60 transition-opacity">
           <div className="flex items-center gap-3 text-[10px] font-black tracking-[.3em] text-white">
              <span className="w-1.5 h-1.5 bg-gold rounded-full"></span> ENCRIPTACIÓN MILITAR 256-BIT
           </div>
           <div className="flex items-center gap-3 text-[10px] font-black tracking-[.3em] text-white">
              <span className="w-1.5 h-1.5 bg-gold rounded-full"></span> PROTOCOLO DE CONFIDENCIALIDAD
           </div>
           <div className="flex items-center gap-3 text-[10px] font-black tracking-[.3em] text-white">
              <span className="w-1.5 h-1.5 bg-gold rounded-full"></span> RESPALDO INSTITUCIONAL
           </div>
        </div>
      </div>
    </section>
  );
};

export default ScannerSection;