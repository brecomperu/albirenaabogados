"use client";

import React, { useState } from 'react';
import { auth } from '@/lib/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Typography from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin'); 
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Credenciales inválidas o acceso denegado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-deep">
      {/* Cinematic Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,hsla(var(--accent-maroon),0.1)_0%,transparent_70%)] pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-md p-10 animate-spring">
        <div className="glass-luxury p-12 rounded-[3rem] border-white/5 shadow-2xl">
          <header className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl gradient-wine flex items-center justify-center text-3xl shadow-xl shadow-maroon/20 mx-auto mb-6">🛡️</div>
            <Typography variant="h2" font="serif" className="text-white text-3xl mb-2">
              Albirena <span className="text-maroon">Admin</span>
            </Typography>
            <Typography variant="p" className="text-gray-500 text-[10px] font-black uppercase tracking-[.3em]">
              Portal de Acceso Restringido
            </Typography>
          </header>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-4">Usuario Digital</label>
              <input 
                type="email" 
                placeholder="EMAIL PROFESIONAL"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:border-gold outline-none transition-all placeholder:text-gray-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-4">Llave Maestra</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:border-gold outline-none transition-all placeholder:text-gray-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="p-4 bg-maroon/10 border border-maroon/20 rounded-xl text-[10px] text-maroon font-bold text-center uppercase tracking-widest">
                {error}
              </div>
            )}

            <Button variant="primary" fullWidth type="submit" disabled={loading}>
              {loading ? 'AUTENTICANDO...' : 'INICIAR SESIÓN SENIOR'}
            </Button>
          </form>

          <footer className="mt-12 text-center">
            <Typography variant="p" className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">
              Sesión protegida por encriptación de nivel militar
            </Typography>
          </footer>
        </div>
      </div>

      {/* Noise Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100]" style={{ backgroundImage: 'var(--glass-noise)' }}></div>
    </div>
  );
}
