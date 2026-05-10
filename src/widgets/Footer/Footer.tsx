'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';

/* ── SVG Social Icons ── */
const FacebookIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const WhatsAppIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

const LinkedInIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TikTokIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z" />
  </svg>
);

type SocialItem = { label: string; href: string; Icon: React.FC };

const SOCIALS: SocialItem[] = [
  { label: 'Facebook',  href: 'https://facebook.com/albirenaabogados',         Icon: FacebookIcon  },
  { label: 'Instagram', href: 'https://instagram.com/albirenaabogados',         Icon: InstagramIcon },
  { label: 'WhatsApp',  href: 'https://wa.me/51999999999',                      Icon: WhatsAppIcon  },
  { label: 'LinkedIn',  href: 'https://linkedin.com/company/albirenaabogados',  Icon: LinkedInIcon  },
  { label: 'TikTok',    href: 'https://tiktok.com/@albirenaabogados',           Icon: TikTokIcon    },
];

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} aria-label="Pie de página">
      <div className={styles.inner}>

        {/* ── Main grid ── */}
        <div className={styles.grid}>

          {/* Col 1 — Brand + Social */}
          <div className={styles.brand}>
            <div className={styles.logoWrap}>
              <Image
                src="/assets/header/logoalbirenaabogados.png"
                alt="Albirena Abogados"
                width={48}
                height={48}
                className={styles.logoImg}
              />
              <span className={styles.brandName}>Albirena<br />Abogados</span>
            </div>

            <p className={styles.tagline}>
              Firma boutique de arquitectura jurídica y defensa laboral
              especializada en Lima, Perú.
            </p>

            <nav aria-label="Redes sociales" className={styles.socialRow}>
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={styles.socialLink}
                >
                  <Icon />
                </a>
              ))}
            </nav>
          </div>

          {/* Col 2 — Áreas de práctica */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Áreas de prácticas</h3>
            <ul className={styles.areaList}>
              <li>
                <Link href="/servicios#trabajador" className={styles.areaItem}>
                  <span className={styles.areaArrow}>➡</span>
                  Servicios para el trabajador
                </Link>
              </li>
              <li>
                <Link href="/servicios#empresa" className={styles.areaItem}>
                  <span className={styles.areaArrow}>➡</span>
                  Servicios para la empresa
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 — Contacto + Horario */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Contáctenos</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon} aria-hidden="true">📍</span>
                <div className={styles.contactText}>
                  <span className={styles.contactLabel}>Dirección</span>
                  <span className={styles.contactValue}>
                    Jirón Daniel Carrión 442<br />
                    Magdalena del Mar, Lima, Perú
                  </span>
                </div>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon} aria-hidden="true">✉️</span>
                <div className={styles.contactText}>
                  <span className={styles.contactLabel}>Email</span>
                  <a href="mailto:info@albirenaabogados.com" className={styles.contactValue}>
                    info@albirenaabogados.com
                  </a>
                </div>
              </li>
            </ul>

            <h3 className={styles.colTitle} style={{ marginTop: '1.5rem' }}>Horario</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon} aria-hidden="true">🕘</span>
                <div className={styles.contactText}>
                  <span className={styles.contactLabel}>Lunes a Viernes</span>
                  <span className={styles.contactValue}>9:00 am – 6:00 pm</span>
                </div>
              </li>
            </ul>
          </div>

        </div>{/* /grid */}

        {/* ── Bottom bar ── */}
        <div className={styles.divider} />
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {year} Albirena Abogados — Todos los derechos reservados
          </p>
          <nav aria-label="Enlaces legales" className={styles.legalLinks}>
            <a href="#" className={styles.legalLink}>Aviso Legal</a>
            <a href="#" className={styles.legalLink}>Privacidad</a>
            <a href="#" className={styles.legalLink}>Cookies</a>
          </nav>
        </div>

      </div>{/* /inner */}
    </footer>
  );
};

export default Footer;
