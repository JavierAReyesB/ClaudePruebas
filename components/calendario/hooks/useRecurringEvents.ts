import { useCallback } from 'react';
import { RRule } from 'rrule';
import { generateInstanceId } from '../utils/ids';
import type { Evento } from '../types';

export function useRecurringEvents() {
  const expandRecurringEvents = useCallback((eventos: Evento[], viewStart: Date, viewEnd: Date): Evento[] => {
    const expandedEvents: Evento[] = [];

    eventos.forEach(evento => {
      if (evento.isRecurring && evento.rrule && evento.originalStart && evento.originalEnd) {
        try {
          // Crear la regla RRule
          const rule = RRule.fromString(evento.rrule);
          
          // Obtener las fechas de ocurrencia dentro del rango de vista
          const occurrences = rule.between(
            new Date(viewStart.getTime() - 24 * 60 * 60 * 1000), // 1 día antes para margen
            new Date(viewEnd.getTime() + 24 * 60 * 60 * 1000),   // 1 día después para margen
            true
          );

          // Calcular la duración del evento original
          const originalDuration = evento.originalEnd.getTime() - evento.originalStart.getTime();

          // Crear instancias para cada ocurrencia
          occurrences.forEach((occurrence, index) => {
            // Verificar si esta fecha está excluida
            const isExcluded = evento.exDates?.some(exDate => 
              exDate.toDateString() === occurrence.toDateString()
            );

            if (!isExcluded) {
              // Mantener la misma hora del evento original
              const occurrenceStart = new Date(occurrence);
              occurrenceStart.setHours(
                evento.originalStart.getHours(),
                evento.originalStart.getMinutes(),
                evento.originalStart.getSeconds(),
                evento.originalStart.getMilliseconds()
              );

              const occurrenceEnd = new Date(occurrenceStart.getTime() + originalDuration);

              expandedEvents.push({
                ...evento,
                id: generateInstanceId(evento.id, occurrence), // ID único para cada instancia
                start: occurrenceStart,
                end: occurrenceEnd,
                recurrenceId: `${evento.id}-${index}`,
                parentId: typeof evento.id === 'string' ? parseInt(evento.id) : evento.id
              });
            }
          });
        } catch (error) {
          console.error('Error expandiendo evento recurrente:', error, evento);
          // Si hay error, incluir el evento original
          expandedEvents.push(evento);
        }
      } else {
        // Evento no recurrente, incluir tal como está
        expandedEvents.push(evento);
      }
    });

    return expandedEvents;
  }, []);

  return { expandRecurringEvents };
}