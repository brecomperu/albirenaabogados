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
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay / 1000, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="glass-luxury p-10 rounded-3xl text-center border border-white/5 hover:border-gold/30 hover:bg-gold/[0.02] transition-colors group"
    >
      <div className="text-4xl lg:text-5xl font-serif font-bold text-white mb-3 italic group-hover:text-gold transition-colors">
         {value}
      </div>
      <div className="text-[10px] font-black uppercase tracking-[.3em] text-gray-500 group-hover:text-gray-300 transition-colors">
         {label}
      </div>
    </motion.div>
  );
};

export default MetricCard;
