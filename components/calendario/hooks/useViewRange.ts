import { useCallback } from 'react';
import { Views } from 'react-big-calendar';
import type { ViewRange } from '../types';

export function useViewRange() {
  const getViewRange = useCallback((date: Date, view: string): ViewRange => {
    const start = new Date(date);
    const end = new Date(date);

    switch (view) {
      case Views.MONTH:
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        end.setMonth(end.getMonth() + 1, 0);
        end.setHours(23, 59, 59, 999);
        // Expandir para incluir días de otras semanas que se muestran en vista mensual
        const firstDayOfWeek = start.getDay();
        start.setDate(start.getDate() - firstDayOfWeek);
        const lastDayOfWeek = end.getDay();
        end.setDate(end.getDate() + (6 - lastDayOfWeek));
        break;
      case Views.WEEK:
        const dayOfWeek = start.getDay();
        start.setDate(start.getDate() - dayOfWeek);
        start.setHours(0, 0, 0, 0);
        end.setDate(start.getDate() + 6);
        end.setHours(23, 59, 59, 999);
        break;
      case Views.DAY:
      default:
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        break;
    }

    return { start, end };
  }, []);

  return { getViewRange };
}