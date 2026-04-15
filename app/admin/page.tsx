"use client";
import React, { useEffect, useState } from 'react';
import { adminRepository, Lead } from '@/features/admin/repository';
import Typography from '@/components/atoms/Typography';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubAppointments = adminRepository.subscribeToAppointments((data) => {
      setAppointments(data);
      setLoading(false);
    });

    return () => {
      unsubAppointments();
    };
  }, []);

  // Sort total activity
  const allActivity = [...appointments].sort((a, b) => {
    const timeA = a.createdAt?.toDate?.()?.getTime() || 0;
    const timeB = b.createdAt?.toDate?.()?.getTime() || 0;
    return timeB - timeA;
  });

  return (
    <div className="space-y-12 animate-spring">
      <header>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
          <span className="text-[10px] text-gray-400 font-black uppercase tracking-[.3em]">Sistemas Operativos · Tiempo Real</span>
        </div>
        <Typography variant="h1" font="serif" className="text-5xl lg:text-6xl text-white">
          Centro de <span className="text-gold">Comando</span>
        </Typography>
      </header>

      {/* Metrics HUD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          label="CONSULTAS AGENDADAS"
          value={appointments.length.toString()}
          sublabel="Reuniones Meet pendientes"
          icon="📅"
          accent="gold"
        />
        <MetricCard
          label="TASA DE CONVERSIÓN"
          value="12%"
          sublabel="Incremento mensual"
          icon="📈"
          accent="white"
        />
      </div>

      <div className="grid lg:grid-cols-5 gap-10">
        {/* Live Activity Feed */}
        <div className="lg:col-span-3 space-y-8">
          <div className="flex items-center justify-between">
            <Typography variant="h3" font="serif" className="text-2xl">Actividad <span className="text-gold">Reciente</span></Typography>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Últimas 50 transacciones</span>
          </div>

          <div className="space-y-4">
            {allActivity.map((item: any, idx) => (
              <ActivityItem key={item.id} item={item} index={idx} />
            ))}

            {allActivity.length === 0 && !loading && (
              <div className="glass-luxury p-20 rounded-[3rem] text-center border-white/5 opacity-50 italic">
                Esperando actividad del portal...
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - System Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-luxury p-10 rounded-[3rem] border-white/5 bg-gradient-to-br from-white/5 to-transparent">
            <Typography variant="h3" font="serif" className="text-xl mb-6">Estado del <span className="text-maroon">Sistema</span></Typography>
            <div className="space-y-6">
              <SystemStatus label="Firebase Firestore" status="Operational" />
              <SystemStatus label="Google Meet API" status="Operational" />
              <SystemStatus label="SSL/Security" status="Shield Active" />
            </div>
          </div>

          <div className="glass-luxury p-10 rounded-[3rem] border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-maroon/20 opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
            <div className="relative z-10">
              <Typography variant="h3" font="serif" className="text-xl mb-4 text-gold">Aviso Legal</Typography>
              <Typography variant="p" className="text-[10px] text-gray-400 leading-relaxed font-bold uppercase tracking-widest">
                Este panel contiene información bajo secreto profesional. Cualquier acceso no autorizado será rastreado por IP y reportado a las autoridades competentes.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, sublabel, icon, accent }: any) {
  const accentColor = accent === 'maroon' ? 'text-maroon' : accent === 'gold' ? 'text-gold' : 'text-white';
  const borderHover = accent === 'maroon' ? 'hover:border-maroon/30' : accent === 'gold' ? 'hover:border-gold/30' : 'hover:border-white/20';

  return (
    <div className={`glass-luxury p-10 rounded-[3rem] border-white/5 transition-all duration-500 ${borderHover}`}>
      <div className="flex justify-between items-start mb-6">
        <Typography variant="p" className="label-luxury opacity-100 text-gray-500 text-[9px]">{label}</Typography>
        <div className="text-2xl">{icon}</div>
      </div>
      <Typography variant="p" className={`text-5xl font-black mb-2 ${accentColor}`}>{value}</Typography>
      <Typography variant="p" className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{sublabel}</Typography>
    </div>
  );
}

function ActivityItem({ item, index }: any) {
  return (
    <div className="glass-luxury p-6 rounded-[1.0rem] border-white/5 flex items-center gap-6 group hover:border-white/10 transition-all">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-lg bg-gold/10 text-gold`}>
        📅
      </div>
      <div className="flex-grow">
        <div className="flex items-center gap-3 mb-1">
          <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-gold/5 text-gold border border-gold/10`}>
            CONSULTA
          </span>
          <span className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">
            {item.createdAt ? format(item.createdAt.toDate(), "HH:mm '·' d MMM bbb", { locale: es }) : 'Pendiente'}
          </span>
        </div>
        <Typography variant="p" className="text-md font-bold text-white uppercase tracking-tight">
          {item.name}
        </Typography>
        <Typography variant="p" className="text-[10px] text-gray-500 font-bold lowercase tracking-widest">
          {item.email}
        </Typography>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className={`text-[9px] font-bold uppercase tracking-widest ${item.profileType === 'empresa' ? 'text-maroon' : 'text-gold'}`}>
          {item.profileType || 'Persona'}
        </div>
        <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">➔</button>
      </div>
    </div>
  );
}

function SystemStatus({ label, status }: any) {
  const isOk = status === 'Operational' || status === 'Shield Active';
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`text-[8px] font-black uppercase tracking-widest ${isOk ? 'text-green-500' : 'text-gold'}`}>{status}</span>
        <div className={`w-1.5 h-1.5 rounded-full ${isOk ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]' : 'bg-gold shadow-[0_0_5px_rgba(184,134,11,0.5)]'}`}></div>
      </div>
    </div>
  );
}
