"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./Hero.module.css";

interface ShowcaseItem {
  id: string;
  label: string;
  title: string;
  content: string;
  imgSrc: string;
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: "blindaje",
    label: "Blindaje Corporativo",
    title: "Protección Integral",
    content: "Gestión estratégica de riesgos y auditoría de cumplimiento para organizaciones de primer nivel.",
    imgSrc: "/assets/legal_showcase_corporate_1778355759700.png",
  },
  {
    id: "defensa",
    label: "Defensa Laboral Senior",
    title: "Defensa Estratégica",
    content: "Protección especializada para salvaguardar los derechos laborales en escenarios de alta complejidad.",
    imgSrc: "/assets/legal_showcase_defense_1778356062509.png",
  },
  {
    id: "auditoria",
    label: "Auditoría SUNAFIL",
    title: "Prevención Proactiva",
    content: "Detección temprana de contingencias y aseguramiento de cumplimiento normativo ante fiscalizaciones.",
    imgSrc: "/assets/legal_showcase_audit_1778356137772.png",
  },
  {
    id: "compliance",
    label: "Compliance Ejecutivo",
    title: "Gestión Ética",
    content: "Implementación de protocolos de cumplimiento para la alta dirección y perfiles ejecutivos.",
    imgSrc: "/assets/legal_scan_eye.png",
  },
  {
    id: "litigio",
    label: "Litigio Estratégico",
    title: "Éxito Judicial",
    content: "Representación experta en litigios de alto impacto con un enfoque en la arquitectura de defensa.",
    imgSrc: "/assets/lead_attorney.png",
  },
];

export default function Hero({ onOpenBooking }: { onOpenBooking: (profile: 'empresa' | 'trabajador') => void }) {
  const [activeId, setActiveId] = useState(showcaseItems[0].id);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      if (!isPaused) {
        setActiveId((prev) => {
          const currentIndex = showcaseItems.findIndex((item) => item.id === prev);
          const nextIndex = (currentIndex + 1) % showcaseItems.length;
          return showcaseItems[nextIndex].id;
        });
      }
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    startAutoPlay();
    return () => {
      window.removeEventListener("resize", checkMobile);
      stopAutoPlay();
    };
  }, [isPaused]);

  useEffect(() => {
    if (isMobile && scrollRef.current) {
      const activeIndex = showcaseItems.findIndex((item) => item.id === activeId);
      const scrollAmount = activeIndex * (window.innerWidth * 0.85 + 24);
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  }, [activeId, isMobile]);

  const activeItem = showcaseItems.find((item) => item.id === activeId) || showcaseItems[0];

  return (
    <section className={styles.heroSection} id="inicio">
      {/* Background Ambient Glow */}
      <div className={styles.ambientGlow}>
        <div className={styles.glowPrimary} />
        <div className={styles.glowSecondary} />
      </div>

      <div className={`${styles.contentContainer} container-luxury`}>

        {/* Desktop triggers (Left side) */}
        <div className={styles.leftSidebar}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.titleHeader}
          >
            <span className={styles.subLabel}>Defensa Laboral</span>
            <h1 className={styles.mainTitle}>
              Su victoria <br /> <span className={styles.titleDimmed}>comienza aquí</span>
            </h1>
          </motion.div>

          <div
            className={styles.triggerList}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {showcaseItems.map((item) => (
              <div
                key={item.id}
                onClick={() => { setActiveId(item.id); setIsPaused(true); }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') { setActiveId(item.id); setIsPaused(true); }
                }}
                role="button"
                tabIndex={0}
                className={`${styles.triggerItem} ${activeId === item.id ? styles.triggerItemActive : ""}`}
              >
                <div className={styles.triggerItemHeader}>
                  <div className={styles.triggerLineContainer}>
                    <div className={`${styles.triggerLine} ${activeId === item.id ? styles.triggerLineActive : ""}`} />
                    {activeId === item.id && !isPaused && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5, ease: "linear" }}
                        className={styles.triggerProgress}
                      />
                    )}
                  </div>
                  <span className={`${styles.triggerLabel} ${activeId === item.id ? styles.triggerLabelActive : styles.triggerLabelInactive}`}>
                    {item.label}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {activeId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={styles.triggerContentWrapper}
                    >
                      <p className={styles.triggerDescription}>{item.content}</p>
                      <button
                        onClick={(e) => { e.stopPropagation(); onOpenBooking('empresa'); }}
                        className={styles.triggerCta}
                      >
                        SOLICITAR ANÁLISIS <span>➔</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Image Display (Right side) */}
        <div className={styles.imageDisplay}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, scale: 0.9, x: 50, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -50, rotate: -2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`${styles.imageCard} ${styles.glassCard}`}
            >
              <div className={styles.imageGradient} />
              <Image
                src={activeItem.imgSrc}
                alt={activeItem.title}
                fill
                className={styles.imageElement}
                priority
              />
              <div className={styles.hudInfo}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className={styles.hudProtocol}>Protocolo Activo</span>
                  <h3 className={styles.hudTitle}>{activeItem.title}</h3>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Variation */}
        <div className={styles.mobileWrapper}>
          <div className={styles.mobileHeader}>
            <span className={styles.mobileLabel}>Defensa Laboral</span>
            <h1 className={styles.mobileTitle}>
              Su victoria legal <br /> <span className={styles.titleDimmed}>comienza hoy</span>
            </h1>
          </div>

          <div ref={scrollRef} className={styles.mobileScroll}>
            {showcaseItems.map((item) => (
              <div key={item.id} className={styles.mobileCardWrapper}>
                <div className={`${styles.mobileCard} ${styles.glassCard}`}>
                  <div className={styles.mobileCardGradient} />
                  <div style={{ position: 'relative', flexGrow: 1 }}>
                    <Image
                      src={item.imgSrc}
                      alt={item.title}
                      fill
                      className={styles.mobileImageElement}
                    />
                  </div>
                  <div className={styles.mobileCardContent}>
                    <span className={styles.mobileCardLabel}>{item.label}</span>
                    <h3 className={styles.mobileCardTitle}>{item.title}</h3>
                    <p className={styles.mobileCardDescription}>{item.content}</p>
                    <button onClick={() => onOpenBooking('empresa')} className={styles.mobileCta}>
                      AGENDAR AHORA
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.mobileDots}>
            {showcaseItems.map((item) => (
              <div
                key={item.id}
                className={`${styles.mobileDot} ${activeId === item.id ? styles.mobileDotActive : styles.mobileDotInactive}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}