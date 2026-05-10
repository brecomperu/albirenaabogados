"use client";

import React from 'react';
import styles from './Navbar.module.css';
import TopBar from '../TopBar';
import NavbarRibbon from '../ribbon/NavbarRibbon';
import NavbarHeader from '../header/NavbarHeader';

interface NavbarProps {
  onOpenBooking: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  return (
    <div className={styles.wrapper}>
      <NavbarRibbon />
      <TopBar />
      <NavbarHeader onOpenBooking={onOpenBooking} />
    </div>
  );
};

export default Navbar;