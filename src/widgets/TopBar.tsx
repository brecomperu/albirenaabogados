"use client";

import React, { useEffect, useState } from 'react';
import { MapPin, Phone } from 'lucide-react';
import { adminRepository } from '@/features/admin/api/repository';
import { ContactSettings } from '@/entities/settings/model/types';

export default function TopBar() {
  const [settings, setSettings] = useState<ContactSettings | null>(null);

  useEffect(() => {
    const unsubscribe = adminRepository.subscribeToContactSettings((data) => {
      if (data) setSettings(data);
    });
    return () => unsubscribe();
  }, []);

  if (!settings) return null;

  const mapsQuery = encodeURIComponent(settings.address);

  return (
    <div className="bg-brand-primary text-white w-full z-50 relative border-b border-white/10 shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
      <div className="container-luxury flex flex-col sm:flex-row items-center justify-between py-2 gap-2 sm:gap-4 text-[10px] font-bold tracking-[0.2em] uppercase">
        
        {/* Address Link (Left/Top) */}
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-brand-silver transition-colors opacity-90 hover:opacity-100 truncate max-w-full group"
        >
          <MapPin size={12} className="shrink-0 group-hover:-translate-y-0.5 transition-transform" />
          <span className="truncate">{settings.address || 'Ubicación Premium'}</span>
        </a>

        {/* Action Links (Right/Bottom) */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0 bg-black/10 sm:bg-transparent px-4 sm:px-0 py-1 sm:py-0 rounded-full">
          
          <span className="hidden md:inline-block text-brand-silver opacity-70 mr-1 italic lowercase font-serif tracking-normal text-xs normal-case">
            {settings.shortWord || 'Atención prioritaria:'}
          </span>

          {/* Phone Link */}
          <a 
            href={`tel:${settings.phone}`} 
            className="flex items-center gap-1.5 hover:text-brand-silver transition-colors group"
          >
            <Phone size={12} className="shrink-0 group-hover:scale-110 transition-transform" />
            <span>{settings.phone || 'Llamar'}</span>
          </a>

          <div className="w-px h-2.5 bg-white/10"></div>

          {/* WhatsApp Link */}
          <a 
            href={`https://wa.me/${settings.whatsapp}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white hover:text-brand-silver transition-colors group"
          >
            <svg className="w-3 h-3 shrink-0 group-hover:rotate-12 transition-transform" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
}
