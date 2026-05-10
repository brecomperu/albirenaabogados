import React from 'react';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  ctaLabel: string;
  onCtaClick: () => void;
  variant?: 'silver' | 'maroon';
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  features, 
  ctaLabel, 
  onCtaClick,
  variant = 'silver' 
}) => {
  return (
    <div className={`${styles.card} glass-luxury transition-luxury`}>
      <div className={`${styles.iconHeader}`}>
        <div className={`${styles.iconBox} ${variant === 'silver' ? styles.silver : styles.maroon}`}>
          {variant === 'silver' ? <span>👤</span> : <span>🏢</span>}
        </div>
      </div>
      
      <h3 className={`${styles.title} title-editorial`}>{title}</h3>
      <p className={styles.description}>{description}</p>
      
      <div className={styles.separator}></div>
      
      <ul className={styles.featureList}>
        {features.map((feature, index) => (
          <li key={index} className={styles.featureItem}>
            <span className={styles.checkIcon}>✅</span>
            <span className={styles.featureText}>{feature}</span>
          </li>
        ))}
      </ul>
      
      <button className={styles.cta} onClick={onCtaClick}>
        {ctaLabel} <span className={styles.arrow}>➔</span>
      </button>

      <div className={styles.noiseOverlay}></div>
    </div>
  );
};

export default ServiceCard;
