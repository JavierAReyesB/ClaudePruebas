import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Views, View } from 'react-big-calendar';
import dayjs from 'dayjs';
import type { Language } from '../types';

interface CalendarHeaderProps {
  lang: Language;
  onLangChange: (lang: Language) => void;
  perTechnician?: boolean;
  onPerTechnicianChange?: (value: boolean) => void;
  showingResourcesInfo?: { shown: number; total: number };
  currentView: View;
  onView: (view: View) => void;
  currentDate: Date;
  onNavigate: (date: Date) => void;
  localizer: any;
}

const shiftDate = (view: string, date: Date, dir: 1 | -1): Date => {
  if (view === Views.DAY) return dayjs(date).add(dir, 'day').toDate();
  if (view === Views.WEEK) return dayjs(date).add(dir * 7, 'day').toDate();
  if (view === Views.MONTH) return dayjs(date).add(dir, 'month').toDate();
  return dayjs(date).add(dir, 'day').toDate();
};

export function CalendarHeader({ 
  lang, 
  onLangChange,
  perTechnician = false,
  onPerTechnicianChange,
  showingResourcesInfo,
  currentView,
  onView,
  currentDate,
  onNavigate,
  localizer
}: CalendarHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3 px-2 py-2">
      {/* LEFT: View switcher (replaces title) */}
      <div className="flex items-center gap-2">
        <div className="inline-flex rounded-md border bg-white">
          <button
            type="button"
            aria-pressed={currentView === Views.DAY}
            onClick={() => onView(Views.DAY)}
            className={`px-3 py-1.5 text-sm ${
              currentView === Views.DAY 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Día
          </button>
          <button
            type="button"
            aria-pressed={currentView === Views.WEEK}
            onClick={() => onView(Views.WEEK)}
            className={`px-3 py-1.5 text-sm border-l ${
              currentView === Views.WEEK 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Semana
          </button>
          <button
            type="button"
            aria-pressed={currentView === Views.MONTH}
            onClick={() => onView(Views.MONTH)}
            className={`px-3 py-1.5 text-sm border-l ${
              currentView === Views.MONTH 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Mes
          </button>
        </div>
      </div>

      {/* CENTER: Navigation arrows + date */}
      <div className="flex items-center gap-2">
        <button 
          aria-label="Anterior" 
          onClick={() => onNavigate(shiftDate(currentView, currentDate, -1))}
          className="h-8 w-8 grid place-items-center rounded border bg-white hover:bg-slate-50"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="text-sm font-medium select-none">
          {localizer.format(
            currentDate, 
            currentView === Views.MONTH ? 'MMMM YYYY' : 'dddd DD/MM', 
            lang
          )}
        </div>
        <button 
          aria-label="Siguiente" 
          onClick={() => onNavigate(shiftDate(currentView, currentDate, 1))}
          className="h-8 w-8 grid place-items-center rounded border bg-white hover:bg-slate-50"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* RIGHT: Per-technician toggle + language selector */}
      <div className="flex gap-3 items-center">
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