"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

interface HeroProps {
  onOpenBooking: (profile: 'empresa' | 'trabajador') => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className={styles.hero} id="inicio">
      <div className="container-luxury grid lg:grid-cols-2 gap-16 items-center min-h-screen pt-32 pb-20">
        
        {/* Left Side: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="z-10"
        >
          <div className="label-luxury flex items-center gap-3">
             <span className="w-2 h-2 bg-gold rounded-full animate-pulse shadow-[0_0_10px_#D4AF37]"></span>
             Blindaje Jurídico & Defensa Senior
          </div>

          <h1 className="title-editorial text-5xl lg:text-8xl text-white mb-8">
            Estrategia <br />
            <span className="text-gold italic">Laboral Senior</span>
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-lg font-light leading-relaxed">
            Protegemos la integridad de su organización y validamos la justicia de sus derechos con rigor institucional y tecnología de vanguardia.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              onClick={() => onOpenBooking('empresa')}
              className="px-10 py-6 bg-maroon text-white font-black rounded-2xl text-xs tracking-[.2em] uppercase hover:scale-105 transition-all shadow-2xl border border-gold/20"
            >
              Blindaje Empresas
            </button>
            <button 
              onClick={() => onOpenBooking('trabajador')}
              className="px-10 py-6 bg-white/5 backdrop-blur-xl text-white font-black rounded-2xl text-xs tracking-[.2em] uppercase hover:bg-white/10 transition-all border border-white/10"
            >
              Defensa Trabajador
            </button>
          </div>
        </motion.div>

        {/* Right Side: HUD Dashboard */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:block hidden"
        >
          <div className="glass-luxury p-10 rounded-[3rem] border border-white/10 relative">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl"></div>
             
             <header className="flex justify-between items-center mb-12">
                <div>
                   <p className="text-[9px] font-black tracking-[.3em] text-gray-500 uppercase mb-2">Estatus Sistema</p>
                   <h4 className="text-3xl font-serif font-bold text-white italic">Análisis Activo</h4>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                   <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
                   </svg>
                </div>
             </header>

             <div className="space-y-8">
                <div className="space-y-3">
                   <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      <span>Precisión Legal</span>
                      <span className="text-gold">99.9%</span>
                   </div>
                   <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '99.9%' }}
                        transition={{ duration: 2, delay: 0.5 }}
                        className="h-full bg-gold"
                      />
                   </div>
                </div>

                <div className="space-y-3">
                   <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      <span>Carga Probatoria</span>
                      <span className="text-maroon animate-pulse">Optimizando...</span>
                   </div>
                   <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 2, delay: 0.7 }}
                        className="h-full bg-maroon"
                      />
                   </div>
                </div>
             </div>

             <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-2 gap-6">
                <div>
                   <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Casos Éxito</p>
                   <p className="text-xl font-serif font-bold text-white">2,840+</p>
                </div>
                <div>
                   <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Soporte 24/7</p>
                   <p className="text-xl font-serif font-bold text-white">Activo</p>
                </div>
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;