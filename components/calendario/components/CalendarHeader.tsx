import React from 'react';
import type { Language } from '../types';

interface CalendarHeaderProps {
  lang: Language;
  onLangChange: (lang: Language) => void;
  perTechnician?: boolean;
  onPerTechnicianChange?: (value: boolean) => void;
  showingResourcesInfo?: { shown: number; total: number };
}

export function CalendarHeader({ 
  lang, 
  onLangChange,
  perTechnician = false,
  onPerTechnicianChange,
  showingResourcesInfo
}: CalendarHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between flex-wrap gap-4">
      <h2 className="text-2xl font-light text-slate-800 m-0">Calendario de Técnicos</h2>
      <div className="flex gap-4 items-center flex-wrap">
        {showingResourcesInfo && showingResourcesInfo.total > 5 && (
          <span className="text-sm text-orange-600 font-medium">
            Mostrando {showingResourcesInfo.shown} de {showingResourcesInfo.total}
          </span>
        )}
        
        {onPerTechnicianChange && (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={perTechnician}
              onChange={(e) => onPerTechnicianChange(e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">Vista por técnico</span>
          </label>
        )}
        
        <span className="text-xs text-gray-600">
          Click en slot vacío para crear evento/nota | Click en evento para editar o eliminar
        </span>
        
        <select 
          value={lang} 
          onChange={(e) => onLangChange(e.target.value as Language)}
          className="px-3 py-1.5 rounded border border-gray-300 text-sm"
        >
          <option value="es">Español</option>
          <option value="en">English</option>
          <option value="pt">Português</option>
        </select>
      </div>
    </div>
  );
}