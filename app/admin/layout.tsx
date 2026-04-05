"use client";

import React, { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      
      // Redirect if not logged in and not on login page
      if (!u && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    });

    return () => unsub();
  }, [pathname, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  // While loading auth state, show a clean splash screen
  if (loading) {
    return (
      <div className="min-h-screen bg-deep flex items-center justify-center">
        <div className="w-12 h-12 rounded-2xl border-2 border-gold/20 border-t-gold animate-spin"></div>
      </div>
    );
  }

  // If on login page, don't show the sidebar/header
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-deep flex overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-80 h-screen glass-luxury border-y-0 border-l-0 hidden lg:flex flex-col z-50">
        <div className="p-10 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl gradient-wine flex items-center justify-center text-xl shadow-lg">🛡️</div>
          <span className="font-serif font-black tracking-[.2em] text-white uppercase text-xs">
            ALBIRENA <span className="text-maroon">ADMIN</span>
          </span>
        </div>

        <nav className="flex-grow px-6 py-10 space-y-2">
          <SidebarLink href="/admin" icon="📊" label="Dashboard" active={pathname === '/admin'} />
          <SidebarLink href="/admin/blog" icon="✍️" label="Gestionar Blog" active={pathname === '/admin/blog'} />
          <SidebarLink href="/admin/settings" icon="⚙️" label="Configuración" active={pathname === '/admin/settings'} />
        </nav>

        <div className="p-8 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-maroon hover:bg-maroon/10 transition-all font-bold text-[10px] tracking-widest uppercase"
          >
            <span>🚪</span> CERRAR SESIÓN
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col relative h-screen overflow-hidden">
        {/* Top Navigation */}
        <header className="h-24 glass-luxury border-x-0 border-t-0 flex items-center justify-between px-12 z-40">
           <div className="lg:hidden flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg gradient-wine flex items-center justify-center text-sm shadow-lg">🛡️</div>
              <span className="font-serif font-black tracking-[.2em] text-white uppercase text-[10px]">ADMIN</span>
           </div>
           
           <div className="flex-grow"></div>

           <div className="flex items-center gap-6">
              <div className="hidden sm:flex flex-col items-end">
                 <span className="text-[10px] text-white font-black uppercase tracking-widest">{user?.email?.split('@')[0]}</span>
                 <span className="text-[8px] text-gold font-bold uppercase tracking-widest opacity-60">Socio Senior</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-lg shadow-inner">
                👤
              </div>
           </div>
        </header>

        <main className="flex-grow overflow-y-auto relative p-8 lg:p-12 custom-scrollbar">
          {children}
        </main>

        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100]" style={{ backgroundImage: 'var(--glass-noise)' }}></div>
      </div>
    </div>
  );
}

function SidebarLink({ href, icon, label, active }: { href: string; icon: string; label: string; active: boolean }) {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-[10px] tracking-widest uppercase group ${active ? 'bg-white/5 text-gold border border-white/5' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
    >
      <span className={`text-lg transition-transform ${active ? 'scale-110' : 'group-hover:scale-110'}`}>{icon}</span>
      {label}
    </Link>
  );
}
