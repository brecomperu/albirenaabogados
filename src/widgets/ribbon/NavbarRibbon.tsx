"use client";

import React from 'react';
import { Phone } from 'lucide-react';
import styles from './NavbarRibbon.module.css';

const NavbarRibbon: React.FC = () => {
  return (
    <div className={styles.ribbon}>
      <div className={`${styles.ribbonContainer} container-luxury`}>
        <p className={styles.ribbonText}>Asesoría laboral especializada</p>
        <div className={styles.ribbonActions}>
          <a href="tel:+51946563373" className={styles.contactLink}>
            <Phone size={14} className={styles.contactIcon} />
            946 563 373
          </a>
          <div className={styles.iconGroup}>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Meta" className={styles.socialLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.486 2 2 6.485 2 12c0 4.99 3.657 9.127 8.438 9.878v-6.99H7.898v-2.888h2.54V9.797c0-2.507 1.492-3.89 3.778-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.242 0-1.63.771-1.63 1.56v1.874h2.773l-.443 2.888h-2.33v6.99C18.343 21.127 22 16.99 22 12c0-5.515-4.486-10-10-10z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className={styles.socialLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5C4.98 4.604 4.08 5.5 2.97 5.5 1.864 5.5.98 4.605.98 3.5.98 2.396 1.865 1.5 2.97 1.5 4.08 1.5 4.98 2.395 4.98 3.5zM.5 8.5h4.94V24H.5V8.5zM8.5 8.5h4.74v2.12h.07c.66-1.25 2.28-2.56 4.69-2.56 5.01 0 5.94 3.3 5.94 7.58V24h-4.94v-7.75c0-1.85-.03-4.23-2.58-4.23-2.58 0-2.98 2.02-2.98 4.1V24H8.5V8.5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarRibbon;
