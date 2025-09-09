import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import dayjs from 'dayjs';
import { Views, View } from 'react-big-calendar';
import type { Language } from '../types';

interface CalendarToolbarProps {
  date: Date;
  view: View;
  views: View[];
  label: string;
  onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY' | Date) => void;
  onView: (view: View) => void;
  localizer: any;
  lang: Language;
}

const shiftDate = (view: string, date: Date, dir: 1 | -1): Date => {
  if (view === 'day') return dayjs(date).add(dir, 'day').toDate();
  if (view === 'week') return dayjs(date).add(dir * 7, 'day').toDate();
  if (view === 'month') return dayjs(date).add(dir, 'month').toDate();
  return dayjs(date).add(dir, 'day').toDate(); // fallback
};

export function CalendarToolbar({
  date,
  view,
  views,
  onNavigate,
  onView,
  localizer,
  lang
}: CalendarToolbarProps) {
  
  const handlePrev = () => {
    onNavigate(shiftDate(view, date, -1));
  };

  const handleNext = () => {
    onNavigate(shiftDate(view, date, 1));
  };

  // Format the title based on view
  const getFormattedTitle = () => {
    if (view === 'month') {
      return localizer.format(date, 'MMMM YYYY', lang);
    } else {
      return localizer.format(date, 'dddd DD/MM', lang);
    }
  };

  return (
    <div className="flex items-center justify-between px-2 py-1 border-b border-gray-200 bg-white">
      {/* Left: Navigation arrows */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={handlePrev}
          className="h-8 w-8 grid place-items-center rounded border bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
          aria-label={view === 'day' ? 'Día anterior' : view === 'week' ? 'Semana anterior' : 'Mes anterior'}
          title={view === 'day' ? 'Día anterior' : view === 'week' ? 'Semana anterior' : 'Mes anterior'}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="h-8 w-8 grid place-items-center rounded border bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
          aria-label={view === 'day' ? 'Día siguiente' : view === 'week' ? 'Semana siguiente' : 'Mes siguiente'}
          title={view === 'day' ? 'Día siguiente' : view === 'week' ? 'Semana siguiente' : 'Mes siguiente'}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Center: Date title */}
      <div className="text-sm font-medium select-none">
        {getFormattedTitle()}
      </div>

      {/* Right: View tabs */}
      <div className="flex items-center gap-1">
        {views.map((viewName) => (
          <button
            key={viewName}
            onClick={() => onView(viewName)}
            className={`px-3 py-1.5 text-sm rounded transition-colors ${
              view === viewName
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {viewName === Views.DAY ? 'Día' : 
             viewName === Views.WEEK ? 'Semana' : 
             viewName === Views.MONTH ? 'Mes' : viewName}
          </button>
        ))}
      </div>
    </div>
  );
}