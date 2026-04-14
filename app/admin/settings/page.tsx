"use client";

import React, { useEffect, useState } from 'react';
import Typography from '@/components/atoms/Typography';
import { adminRepository, ContactSettings } from '@/features/admin/repository';

export default function SettingsDashboard() {
  const [settings, setSettings] = useState<ContactSettings>({
    address: '',
    phone: '',
    whatsapp: '',
    shortWord: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await adminRepository.getContactSettings();
      if (data) {
        setSettings(data);
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });
    setSavedSuccess(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminRepository.updateContactSettings(settings);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error("Error saving settings", err);
      alert("Hubo un error al guardar la configuración.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 rounded-2xl border-2 border-gold/20 border-t-gold animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-spring max-w-4xl">
      <header>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-gold animate-pulse shadow-[0_0_10px_rgba(184,134,11,0.5)]"></div>
          <span className="text-[10px] text-gray-400 font-black uppercase tracking-[.3em]">Variables de Entorno</span>
        </div>
        <Typography variant="h1" font="serif" className="text-5xl lg:text-6xl text-white">
          Configuración <span className="text-gold">Global</span>
        </Typography>
      </header>

      <div className="glass-luxury p-10 rounded-[3rem] border-white/5 relative overflow-hidden">
        <Typography variant="h3" font="serif" className="text-2xl mb-2 text-white">Información de <span className="text-gold">Contacto</span></Typography>
        <Typography variant="p" className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-8">
          Estos datos alimentan la barra superior (Top Bar) dinámicamente y otras áreas vitales del portal.
        </Typography>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest ml-4">Dirección Física (Se mapeará a Google Maps)</label>
              <input
                type="text"
                name="address"
                value={settings.address}
                onChange={handleChange}
                placeholder="Ej. Av. Javier Prado Este 4040, Surco"
                className="w-full bg-black/20 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest ml-4">Palabra Corta Comercial</label>
              <input
                type="text"
                name="shortWord"
                value={settings.shortWord}
                onChange={handleChange}
                placeholder="Ej. ¡Llámanos Ahora!"
                className="w-full bg-black/20 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest ml-4">Número de Teléfono</label>
              <input
                type="text"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                placeholder="Ej. +51 987 654 321"
                className="w-full bg-black/20 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest ml-4">Número para WhatsApp (Sin '+' ni espacios)</label>
              <input
                type="text"
                name="whatsapp"
                value={settings.whatsapp}
                onChange={handleChange}
                placeholder="Ej. 51987654321"
                className="w-full bg-black/20 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
                required
              />
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between border-t border-white/5">
            <div className="h-6">
              {savedSuccess && (
                <span className="text-green-500 text-xs font-bold flex items-center gap-2 animate-pulse">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Ajustes procesados con éxito en la base de datos.
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={saving}
              className={`px-10 py-4 bg-maroon text-white font-bold rounded-full text-[10px] tracking-widest uppercase transition-all border border-gold/20 shadow-xl ${saving ? 'opacity-50 cursor-wait' : 'hover:bg-maroon/80 hover:shadow-maroon/20 hover:scale-105'}`}
            >
              {saving ? 'Guardando en Firebase...' : 'Guardar y Desplegar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
