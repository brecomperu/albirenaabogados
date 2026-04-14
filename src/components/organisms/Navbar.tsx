"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import styles from './Navbar.module.css';
import TopBar from './TopBar';

interface NavbarProps {
  onOpenBooking: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
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
    { label: 'Inicio', target: '#inicio' },
    { label: 'Diagnóstico', target: '#diagnostico' },
    { label: 'Servicios', target: '#servicios' },
    { label: 'Nosotros', target: '/nosotros' },
    { label: 'Blog', target: '#blog' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    if (target.startsWith('#')) {
      e.preventDefault();
      const id = target.substring(1);
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
      }
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Container for both TopBar and Header so they lay out naturally and stay fixed */}
      <div className="fixed top-0 left-0 w-full z-[1000]">
        <TopBar />
        <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
          <div className="container-luxury flex items-center justify-between h-24 lg:h-28">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12 bg-maroon rounded-xl flex items-center justify-center border border-gold/30 shadow-lg group-hover:scale-110 transition-transform">
            <span className="text-white font-serif font-bold text-2xl">A</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-2xl tracking-tighter text-white uppercase leading-none">Albirena</span>
            <span className="text-[10px] font-black tracking-[.4em] text-gold uppercase opacity-80">Abogados</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.label}
              href={link.target}
              onClick={(e) => handleNavClick(e, link.target)}
              className={`${styles.navLink} ${activeSection === link.target.substring(1) ? styles.active : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <button 
            onClick={onOpenBooking}
            className="px-10 py-4 bg-maroon text-white font-bold rounded-full text-xs tracking-widest uppercase hover:bg-maroon-light transition-all border border-gold/20 shadow-xl hover:shadow-maroon/20"
          >
            Consulta Senior
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button className="lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5" onClick={toggleMenu}>
          <motion.span 
            animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-8 h-0.5 bg-white rounded-full"
          />
          <motion.span 
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-8 h-0.5 bg-white rounded-full"
          />
          <motion.span 
            animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-8 h-0.5 bg-white rounded-full"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navy-deep/95 backdrop-blur-3xl border-b border-white/5"
          >
            <div className="container-luxury py-10 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.label}
                  href={link.target}
                  onClick={(e) => handleNavClick(e, link.target)}
                  className="text-2xl font-serif font-bold text-white/60 hover:text-gold transition-colors italic"
                >
                  {link.label}
                </Link>
              ))}
              <button 
                onClick={onOpenBooking}
                className="mt-6 w-full py-5 bg-maroon text-white font-black rounded-2xl text-sm tracking-widest uppercase"
              >
                Consulta Senior
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
        </header>
      </div>
    </>
  );
};

export default Navbar;