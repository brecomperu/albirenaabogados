"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './RutaSection.module.css';

const steps = [
  { 
    num: '01', 
    title: 'Auditoría Legal', 
    desc: 'Revisión exhaustiva de su situación contractual frente al marco normativo vigente.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  { 
    num: '02', 
    title: 'Diseño Estratégico', 
    desc: 'Determinación de derechos y construcción de la defensa técnica basada en precedentes.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 4a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2V4zm-7 3a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2V7zm14 0a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2V7zM4 17a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1zm14 0a2 2 0 114 0v1a2 2 0 01-2 2 2 2 0 01-2-2v-1z" />
      </svg>
    )
  },
  { 
    num: '03', 
    title: 'Ejecución Pro', 
    desc: 'Asignación de equipo legal senior para la defensa o blindaje de sus intereses.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    )
  },
];

const RutaSection: React.FC = () => {
  return (
    <section id="protocolo" className="section-luxury relative overflow-hidden border-t border-white/5 bg-brand-bg">
      <div className="container-luxury">
        <header className="text-center mb-32">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="label-luxury"
          >
            Metodología de Excelencia
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="title-editorial text-4xl lg:text-6xl text-white mt-4"
          >
            Ruta de <span className="text-brand-primary italic">Blindaje</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-brand-silver/60 text-lg max-w-2xl mx-auto mt-8 font-light leading-relaxed"
          >
            Gestión institucional en tres fases críticas diseñadas para garantizar su máxima seguridad jurídica bajo estándares de alta dirección.
          </motion.p>
        </header>

        <div className="grid md:grid-cols-3 gap-16 lg:gap-24 relative">
          {/* Connector Line - More subtle and professional */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-silver/10 to-transparent z-0"></div>

          {steps.map((step, index) => (
            <motion.div 
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 text-center group"
            >
              <div className="w-20 h-20 mx-auto mb-12 rounded-sm bg-brand-primary flex items-center justify-center border border-white/10 shadow-[0_10px_30px_rgba(118,1,9,0.3)] group-hover:scale-105 group-hover:bg-brand-primary-light transition-all duration-500">
                 <span className="text-white text-3xl font-serif font-bold italic">{step.num}</span>
              </div>
              
              <div className="w-10 h-10 mx-auto mb-8 text-brand-silver/40 group-hover:text-brand-silver group-hover:scale-110 transition-all duration-500">
                 {step.icon}
              </div>

              <h3 className="text-2xl font-serif font-bold text-white mb-6 italic tracking-tight">{step.title}</h3>
              <p className="text-[15px] text-brand-silver/50 leading-relaxed font-light px-4">{step.desc}</p>
              
              {/* Hover highlight border */}
              <div className="absolute -inset-8 border border-white/0 group-hover:border-white/5 transition-all duration-500 rounded-sm -z-10 scale-95 group-hover:scale-100"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RutaSection;
