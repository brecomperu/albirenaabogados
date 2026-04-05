import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'maroon' | 'outline';
  animate?: boolean;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'outline', animate = true, className = '' }) => {
  return (
    <div className={`${styles.badge} ${styles[variant]} ${animate ? styles.animate : ''} ${className}`}>
      {variant === 'gold' && <span className={styles.dot}></span>}
      <span className={styles.text}>{children}</span>
    </div>
  );
};


export default Badge;
