"use client";

import React from 'react';
import { 
  Route, 
  MapPin, 
  Clock,
  Ellipsis 
} from 'lucide-react';
import { LocationsCompact } from './LocationsCompact';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const MAX_LOC_CHIPS = 3;

type TechnicianResource = { 
  id: number; 
  title: string; 
  color?: string; 
  avatarColor?: string;
  timeLabel?: string;
  location?: string;        // compat
  locations?: string[];     // NUEVO
  training?: string[];
};

interface ResourceHeaderProps {
  label: string;
  resource: TechnicianResource;
  onMobile: (id: number) => void;
  onTeam: (id: number) => void;
  onKpi: (id: number) => void;
  onAssign: (id: number) => void;
  onUnassign: (id: number) => void;
}

export function ResourceHeader({
  label,
  resource,
  onMobile,
  onTeam,
  onKpi,
  onAssign,
  onUnassign
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
          <TooltipProvider delayDuration={150}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className="font-semibold text-sm text-gray-900 truncate cursor-help"
                  onClick={(e) => { e.stopPropagation(); }}
                  onMouseDown={(e) => { e.stopPropagation(); }}
                  tabIndex={0}
                >
                  {resource.title}
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="start" className="max-w-xs rounded-md">
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-700">Capacidades / Certificaciones</div>
                  {Array.isArray(resource.training) && resource.training.length > 0 ? (
                    <ul className="flex flex-wrap gap-1">
                      {resource.training.map((cap: string, i: number) => (
                        <li key={i} className="px-2 py-0.5 rounded bg-slate-100 text-[11px] text-slate-700">
                          {cap}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-[11px] text-slate-500">Sin datos de formación</div>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Right side: Time + Locations */}
        <div className="flex items-center gap-2 justify-end w-full">
          {/* Hora primero (no shrink) */}
          {resource.timeLabel && (
            <span className="shrink-0 bg-slate-100 text-slate-700 text-[11px] px-2 py-0.5 rounded inline-flex items-center gap-1">
              <Clock size={12} /> {resource.timeLabel}
            </span>
          )}
          {/* Ubicaciones compactas (una línea, controladas) */}
          <LocationsCompact locations={resource.locations?.length ? resource.locations : (resource.location ? [resource.location] : [])} />
        </div>
      </div>

      {/* Row 2: Action buttons (todos pastel) */}
      <div className="flex items-center gap-1">
        {/* 3-dots menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); }}
              onMouseDown={(e) => { e.stopPropagation(); }}
              className="h-5 w-5 grid place-items-center rounded border bg-slate-100 text-slate-700 border-slate-200 hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-1"
              aria-label="Más acciones"
              title="Más acciones"
            >
              <Ellipsis size={16} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            side="bottom"
            onClick={(e) => e.stopPropagation()}
            className="min-w-[160px]"
          >
            <DropdownMenuItem onSelect={() => onMobile(resource.id)}>
              📱  Entra a PDA de tecnico
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => onTeam(resource.id)}>
              👥  Editar info de tecnico
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => onKpi(resource.id)}>
              📈  Navegar a productividad
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
      </div>
    </div>
  );
}
