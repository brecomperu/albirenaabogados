"use client";

import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Opacity for each scene
  const factoryOpacity = useTransform(scrollYProgress, [0, 0.2, 0.35], [0.15, 0.15, 0]);
  const officeOpacity = useTransform(scrollYProgress, [0.3, 0.45, 0.65], [0, 0.12, 0]);
  const courtOpacity = useTransform(scrollYProgress, [0.6, 0.75, 1], [0, 0.15, 0.15]);

  // Movement for silhouettes
  const factoryX = useTransform(scrollYProgress, [0, 0.35], [0, -100]);
  const officeX = useTransform(scrollYProgress, [0.3, 0.65], [100, 0]);
  const courtY = useTransform(scrollYProgress, [0.6, 1], [100, 0]);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-navy-deep">
      {/* Factory Scene */}
      <motion.div 
        style={{ opacity: factoryOpacity, x: factoryX }}
        className="absolute inset-0 flex items-end justify-start p-10"
      >
        <svg viewBox="0 0 800 400" className="w-[120%] h-auto text-gold/20 fill-current opacity-50">
           {/* Factory Silhouettes */}
           <path d="M0 400V300H50V250H100V300H150V200H250V300H300V250H350V400H0Z" />
           <circle cx="120" cy="220" r="30" />
           <rect x="200" y="150" width="40" height="100" />
           <path d="M400 400V320H450V280H500V320H550V240H650V320H700V280H750V400H400Z" />
           {/* Worker silhouettes */}
           <circle cx="80" cy="350" r="15" />
           <rect x="75" y="365" width="10" height="35" />
           <circle cx="280" cy="350" r="15" />
           <rect x="275" y="365" width="10" height="35" />
        </svg>
      </motion.div>

      {/* Office Scene */}
      <motion.div 
        style={{ opacity: officeOpacity, x: officeX }}
        className="absolute inset-0 flex items-center justify-end p-20"
      >
        <svg viewBox="0 0 800 400" className="w-[100%] h-auto text-maroon/20 fill-current">
           {/* Office Furniture / People */}
           <rect x="500" y="200" width="200" height="20" />
           <rect x="520" y="220" width="10" height="80" />
           <rect x="670" y="220" width="10" height="80" />
           {/* Person at desk */}
           <circle cx="600" cy="150" r="20" />
           <path d="M580 170 Q600 175 620 170 L630 200 L570 200 Z" />
           {/* Windows/Grid */}
           <rect x="0" y="0" width="800" height="400" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 10" opacity="0.2" />
        </svg>
      </motion.div>

      {/* Courtroom Scene */}
      <motion.div 
        style={{ opacity: courtOpacity, y: courtY }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg viewBox="0 0 1000 600" className="w-[80%] h-auto text-gold/30 fill-current">
           {/* Scales of Justice */}
           <path d="M500 100 V500 M400 500 H600 M300 200 H700 M300 200 V250 M700 200 V250" stroke="currentColor" strokeWidth="10" fill="none" />
           <path d="M250 250 A50 30 0 0 0 350 250 Z M650 250 A50 30 0 0 0 750 250 Z" />
           {/* Judge/Bench */}
           <rect x="400" y="450" width="200" height="100" />
           <circle cx="500" cy="420" r="25" />
           <path d="M460 445 L540 445 L520 470 L480 470 Z" />
        </svg>
      </motion.div>

      {/* Dynamic Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-navy-deep opacity-60"></div>
    </div>
  );
};

export default ScrollBackground;
