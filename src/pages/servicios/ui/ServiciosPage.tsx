"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Navbar } from "../../../widgets/Navbar";
import FloatingContactButtons from "@/shared/ui/molecules/FloatingContactButtons";

const services = [
  {
    id: "blindaje",
    title: "Blindaje Corporativo",
    tagline: "Protección Institucional 360°",
    description: "Diseñamos la arquitectura legal necesaria para proteger los activos y la reputación de su organización frente a contingencias críticas.",
    details: "Análisis preventivo de riesgos, auditoría de contratos, protocolos de buen gobierno corporativo y blindaje patrimonial estratégico.",
    img: "/assets/legal_showcase_corporate_1778355759700.png"
  },
  {
    id: "defensa",
    title: "Defensa Laboral Senior",
    tagline: "Justicia de Alto Impacto",
    description: "Representación especializada para la defensa de derechos laborales en casos de alta complejidad y perfiles ejecutivos.",
    details: "Patrocinio en procesos judiciales, negociación estratégica de desvinculaciones y defensa ante reclamaciones de beneficios sociales.",
    img: "/assets/legal_showcase_defense_1778356062509.png"
  },
  {
    id: "auditoria",
    title: "Auditoría SUNAFIL",
    tagline: "Prevención & Cumplimiento",
    description: "Aseguramos que su empresa cumpla con todos los estándares sociolaborales y de seguridad y salud en el trabajo.",
    details: "Simulacros de inspección, revisión de planillas, gestión de registros obligatorios y levantamiento de observaciones ante fiscalizaciones.",
    img: "/assets/legal_showcase_audit_1778356137772.png"
  },
  {
    id: "compliance",
    title: "Compliance Ejecutivo",
    tagline: "Ética & Transparencia",
    description: "Implementamos sistemas de gestión de cumplimiento para prevenir infracciones legales y fortalecer la cultura ética directiva.",
    details: "Canal de denuncias, debida diligencia de socios, gestión de conflictos de interés y capacitación normativa especializada.",
    img: "/assets/legal_scan_eye.png"
  },
  {
    id: "litigio",
    title: "Litigio Estratégico",
    tagline: "Arquitectura del Éxito",
    description: "Abordamos los conflictos judiciales con una visión global, combinando táctica procesal y profundidad jurídica.",
    details: "Defensa en fueros constitucionales, civiles y laborales, casaciones ante la Corte Suprema y arbitrajes corporativos.",
    img: "/assets/lead_attorney.png",
    color: "#760109"
  },
  {
    id: "asesoria",
    title: "Asesoría de Alta Dirección",
    tagline: "Decisión Estratégica",
    description: "Consultoría directa para juntas directivas y gerencia general en la toma de decisiones críticas con impacto legal.",
    details: "Opinión legal de segundo nivel, planeamiento estratégico preventivo y gestión de crisis institucionales de alta visibilidad.",
    img: "/assets/legal_showcase_corporate_1778355759700.png", // Reused
    color: "#C4C4C4"
  }
];

export default function ServiciosPage() {
  const openBooking = () => {
    window.location.href = "/#inicio";
  };

  return (
    <div className="relative min-h-screen bg-brand-bg text-white" style={{ backgroundColor: 'var(--page-bg)' }}>
      <Navbar onOpenBooking={openBooking} />
      
      <main>
        {services.map((service, index) => (
          <ServiceSection key={service.id} service={service} index={index} />
        ))}
      </main>

      <FloatingContactButtons />

      <footer className="py-20 border-t border-white/5 bg-brand-dark text-center" style={{ backgroundColor: 'var(--footer-bg)' }}>
         <p className="text-[10px] text-brand-silver/20 font-bold tracking-[0.5em] uppercase">
            © 2026 ALBIRENA ABOGADOS | SERVICIOS ESPECIALIZADOS
         </p>
      </footer>
    </div>
  );
}

function ServiceSection({ service, index }: { service: any; index: number }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const getAnimationProps = () => {
    switch (index % 6) {
      case 0: return { initial: { opacity: 0, scale: 0.9 }, whileInView: { opacity: 1, scale: 1 }, transition: { duration: 1.2 } };
      case 1: return { initial: { opacity: 0, x: -100 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 1, ease: "easeOut" } };
      case 2: return { initial: { opacity: 0, y: 100 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.8 } };
      case 3: return { initial: { opacity: 0, filter: "blur(20px)" }, whileInView: { opacity: 1, filter: "blur(0px)" }, transition: { duration: 1.5 } };
      case 4: return { initial: { opacity: 0, rotateY: 30 }, whileInView: { opacity: 1, rotateY: 0 }, transition: { duration: 1.2 } };
      case 5: return { initial: { opacity: 0, scale: 1.1 }, whileInView: { opacity: 1, scale: 1 }, transition: { duration: 1.5 } };
      default: return {};
    }
  };

  return (
    <section 
      ref={containerRef}
      id={service.id}
      className="relative min-h-screen flex flex-col justify-center py-20 lg:py-0 overflow-hidden border-b border-white/5"
    >
      <div className="container-luxury z-10">
        <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
          
          <motion.div 
            {...getAnimationProps()}
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 space-y-8"
          >
            <div className="space-y-4">
              <span className="text-brand-primary font-bold tracking-[0.4em] uppercase text-xs">
                {service.tagline}
              </span>
              <h2 className="text-white text-5xl lg:text-7xl font-serif font-bold italic leading-tight">
                {service.title}
              </h2>
            </div>
            
            <p className="text-brand-silver/70 text-xl lg:text-2xl font-light leading-relaxed max-w-xl">
              {service.description}
            </p>

            <div className="glass-luxury p-8 border-white/5 rounded-sm">
               <h4 className="text-[10px] font-bold tracking-[.3em] text-brand-primary uppercase mb-4">Alcance Operativo</h4>
               <p className="text-brand-silver/50 text-base leading-relaxed">
                 {service.details}
               </p>
            </div>

            <button 
              onClick={() => window.location.href = '/#inicio'}
              className="px-10 py-5 bg-transparent border border-white/10 text-white font-bold rounded-sm text-[10px] tracking-[.3em] uppercase hover:bg-white/5 transition-all"
            >
              Agendar Protocolo
            </button>
          </motion.div>

          <motion.div 
            style={{ opacity, scale }}
            className="flex-1 relative aspect-[4/5] lg:aspect-square w-full max-w-2xl rounded-sm overflow-hidden glass-luxury border border-white/5 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent z-10" />
            <Image
              src={service.img}
              alt={service.title}
              fill
              className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </motion.div>

        </div>
      </div>

      <div className={`absolute top-1/2 -translate-y-1/2 text-[15rem] lg:text-[25rem] font-serif font-bold text-white/[0.02] pointer-events-none select-none italic leading-none whitespace-nowrap z-0 ${index % 2 === 0 ? '-right-20' : '-left-20'}`}>
        {service.title.split(' ')[0]}
      </div>
    </section>
  );
}
