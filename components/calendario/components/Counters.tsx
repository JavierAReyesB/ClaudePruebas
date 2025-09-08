import React from 'react';
import { isSameDay } from '../utils/dates';
import type { Evento } from '../types';

interface CountersProps {
  eventos: Evento[];
}

export function Counters({ eventos }: CountersProps) {
  const today = new Date();
  const todayEvents = eventos.filter(evento => isSameDay(evento.start, today));

  return (
    <div className="mt-2.5 text-xs text-gray-600 text-center">
      Total de eventos: {eventos.length} | 
      Eventos hoy: {todayEvents.length}
    </div>
  );
}