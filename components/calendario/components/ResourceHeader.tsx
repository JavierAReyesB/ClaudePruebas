"use client";

import React from 'react';
import { 
  Smartphone, 
  Users2, 
  LineChart, 
  Route, 
  MapPin, 
  GraduationCap, 
  Clock, 
  Plus 
} from 'lucide-react';

type TechnicianResource = { 
  id: number; 
  title: string; 
  color?: string; 
  avatarColor?: string;
  location?: string;
  timeLabel?: string;
};

interface ResourceHeaderProps {
  label: string;
  resource: TechnicianResource;
  onMobile: (id: number) => void;
  onTeam: (id: number) => void;
  onKpi: (id: number) => void;
  onAssign: (id: number) => void;
  onUnassign: (id: number) => void;
  onTraining: (id: number) => void;
  onNew: (id: number) => void;
}

export function ResourceHeader({
  label,
  resource,
  onMobile,
  onTeam,
  onKpi,
  onAssign,
  onUnassign,
  onTraining,
  onNew
}: ResourceHeaderProps) {
  
  const handleClick = (e: React.MouseEvent, callback: (id: number) => void) => {
    e.stopPropagation();
    e.preventDefault();
    if (resource.id !== undefined) {
      callback(resource.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, callback: (id: number) => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.stopPropagation();
      e.preventDefault();
      if (resource.id !== undefined) {
        callback(resource.id);
      }
    }
  };

  return (
    <div className="px-2 py-1.5 space-y-1.5">
      {/* Row 1: Avatar + Name (left) | Location + Time (right) */}
      <div className="flex items-center justify-between gap-2">
        {/* Left side: Avatar + Name */}
        <div className="flex items-center gap-2">
          <div 
            className="h-4 w-4 rounded-full flex items-center justify-center text-white text-sm font-semibold"
            style={{ backgroundColor: resource.avatarColor || '#cbd5e1' /* slate-300 pastel */ }}
          >
            {resource.title.charAt(0).toUpperCase()}
          </div>
          <span className="font-semibold text-sm text-gray-900 truncate">
            {resource.title}
          </span>
        </div>

        {/* Right side: Location + Time */}
        <div className="flex items-center gap-2">
          {/* Location badge (pastel naranja) */}
          {resource.location && (
            <span className="bg-orange-100 text-orange-700 text-[9px] px-2 py-0.5 rounded inline-flex items-center gap-1">
              <MapPin size={12} />
              {resource.location}
            </span>
          )}

          {/* Schedule pill (gris pastel) */}
          {resource.timeLabel && (
            <span className="bg-slate-100 text-slate-700 text-[9px] px-2 py-0.5 rounded inline-flex items-center gap-1">
              <Clock size={12} />
              {resource.timeLabel}
            </span>
          )}
        </div>
      </div>

      {/* Row 2: Action buttons (todos pastel) */}
      <div className="flex items-center gap-1">
        {/* Mobile — naranja pastel */}
        <button
          onClick={(e) => handleClick(e, onMobile)}
          onKeyDown={(e) => handleKeyDown(e, onMobile)}
          className="h-5 w-5 grid place-items-center rounded border bg-orange-100 text-orange-700 border-orange-200 hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-1"
          aria-label={`Contactar móvil de ${resource.title}`}
          title={`Móvil de ${resource.title}`}
        >
          <Smartphone size={16} />
        </button>

        {/* Team — azul pastel */}
        <button
          onClick={(e) => handleClick(e, onTeam)}
          onKeyDown={(e) => handleKeyDown(e, onTeam)}
          className="h-5 w-5 grid place-items-center rounded border bg-blue-100 text-blue-700 border-blue-200 hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1"
          aria-label={`Ver equipo de ${resource.title}`}
          title={`Equipo de ${resource.title}`}
        >
          <Users2 size={16} />
        </button>

        {/* KPIs — azul pastel */}
        <button
          onClick={(e) => handleClick(e, onKpi)}
          onKeyDown={(e) => handleKeyDown(e, onKpi)}
          className="h-5 w-5 grid place-items-center rounded border bg-blue-100 text-blue-700 border-blue-200 hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1"
          aria-label={`Ver KPIs de ${resource.title}`}
          title={`KPIs de ${resource.title}`}
        >
          <LineChart size={16} />
        </button>

        {/* Assign — verde pastel */}
        <button
          onClick={(e) => handleClick(e, onAssign)}
          onKeyDown={(e) => handleKeyDown(e, onAssign)}
          className="h-5 w-5 grid place-items-center rounded border bg-green-100 text-green-700 border-green-200 hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-1"
          aria-label={`Asignar rutas a ${resource.title}`}
          title={`Asignar a ${resource.title}`}
        >
          <Route size={16} />
        </button>

        {/* Unassign — rojo pastel */}
        <button
          onClick={(e) => handleClick(e, onUnassign)}
          onKeyDown={(e) => handleKeyDown(e, onUnassign)}
          className="h-5 w-5 grid place-items-center rounded border bg-red-100 text-red-700 border-red-200 hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-1"
          aria-label={`Desasignar de ${resource.title}`}
          title={`Desasignar de ${resource.title}`}
        >
          <MapPin size={16} />
        </button>

        {/* Training — azul pastel */}
        <button
          onClick={(e) => handleClick(e, onTraining)}
          onKeyDown={(e) => handleKeyDown(e, onTraining)}
          className="h-5 w-5 grid place-items-center rounded border bg-blue-100 text-blue-700 border-blue-200 hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1"
          aria-label={`Ver formación de ${resource.title}`}
          title={`Formación de ${resource.title}`}
        >
          <GraduationCap size={16} />
        </button>

        {/* New (pill) — amarillo pastel */}
        <button
          onClick={(e) => handleClick(e, onNew)}
          onKeyDown={(e) => handleKeyDown(e, onNew)}
          className="h-5 px-2 rounded-md border bg-yellow-100 text-yellow-700 border-yellow-200 inline-flex items-center gap-1 hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-1"
          aria-label={`Crear nuevo para ${resource.title}`}
          title={`Nuevo para ${resource.title}`}
        >
          <Plus size={14} />
          <span className="text-xs font-medium">Nuevo</span>
        </button>
      </div>
    </div>
  );
}
