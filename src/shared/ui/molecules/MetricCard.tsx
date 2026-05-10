"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './MetricCard.module.css';

interface MetricCardProps {
  value: string;
  label: string;
  delay?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ value, label, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay / 1000, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="glass-luxury p-12 rounded-sm text-center border border-white/5 hover:border-brand-primary/30 hover:bg-white/[0.02] transition-all duration-500 group"
    >
      <div className="text-4xl lg:text-6xl font-serif font-bold text-white mb-4 italic group-hover:text-brand-primary transition-colors duration-500">
         {value}
      </div>
      <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-brand-silver/40 group-hover:text-brand-silver transition-colors duration-500">
         {label}
      </div>
    </motion.div>
  );
};

export default MetricCard;
