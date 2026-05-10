"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import styles from './NavbarHeader.module.css';

interface NavbarHeaderProps {
  onOpenBooking: () => void;
}

const NavbarHeader: React.FC<NavbarHeaderProps> = ({ onOpenBooking }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['inicio', 'diagnostico', 'servicios', 'protocolo', 'estudio', 'blog'];
      const scrollPosition = window.scrollY + 100;

      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', target: '/#inicio' },
    { label: 'Diagnóstico', target: '/#diagnostico' },
    { 
      label: 'Servicios', 
      target: '/servicios',
      subLinks: [
        { label: 'Blindaje Corporativo', target: '/servicios#blindaje' },
        { label: 'Defensa Laboral Senior', target: '/servicios#defensa' },
        { label: 'Auditoría SUNAFIL', target: '/servicios#auditoria' },
        { label: 'Compliance Ejecutivo', target: '/servicios#compliance' },
        { label: 'Litigio Estratégico', target: '/servicios#litigio' },
        { label: 'Asesoría de Alta Dirección', target: '/servicios#asesoria' },
      ]
    },
    { label: 'Nosotros', target: '/nosotros' },
    { label: 'Blog', target: '/blog' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    const isHash = target.includes('#');
    const [path, hash] = target.split('#');
    const isSamePage = window.location.pathname === path || (window.location.pathname === '/' && path === '');

    if (isHash && isSamePage) {
      const element = document.getElementById(hash);
      if (element) {
        e.preventDefault();
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
    
    setIsMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <div className={`${styles.headerInner} container-luxury`}>
        <Link href="/" className={styles.logoLink}>
          <div className={styles.logoImageWrapper}>
            <Image
              src="/assets/header/logoalbirenaabogados.png"
              alt="Albirena Abogados"
              width={160}
              height={48}
              className={styles.logoImage}
              priority
            />
          </div>
        </Link>

        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <div key={link.label} className={styles.navItem}>
              <Link
                href={link.target}
                onClick={(e) => handleNavClick(e, link.target)}
                className={`${styles.navLink} ${activeSection === link.target.substring(1) ? styles.active : ''} flex items-center gap-2`}
              >
                {link.label}
                {link.subLinks && <ChevronDown size={14} className="opacity-40" />}
              </Link>
              {link.subLinks && (
                <div className={styles.dropdown}>
                  {link.subLinks.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.target}
                      onClick={(e) => handleNavClick(e, sub.target)}
                      className={styles.dropdownItem}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button onClick={onOpenBooking} className={styles.ctaButton}>
            Agendar consulta
          </button>
        </nav>

        <button className={styles.mobileToggle} onClick={toggleMenu} aria-expanded={isMenuOpen} aria-label="Abrir menú">
          <motion.span animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className={styles.toggleLine} />
          <motion.span animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }} className={styles.toggleLine} />
          <motion.span animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className={styles.toggleLine} />
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={styles.mobileMenuWrapper}
          >
            <div className={`${styles.mobileMenuContent} container-luxury`}>
              {navLinks.map((link) => (
                <div key={link.label} className="flex flex-col gap-2">
                  <Link
                    href={link.target}
                    onClick={(e) => handleNavClick(e, link.target)}
                    className={`${styles.mobileLink} flex items-center justify-between`}
                  >
                    {link.label}
                    {link.subLinks && <ChevronDown size={20} className="opacity-20" />}
                  </Link>
                  {link.subLinks && (
                    <div className={styles.mobileSubNav}>
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.target}
                          onClick={(e) => handleNavClick(e, sub.target)}
                          className={styles.mobileSubLink}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button onClick={onOpenBooking} className={styles.mobileCTA}>
                Agendar consulta
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavbarHeader;
