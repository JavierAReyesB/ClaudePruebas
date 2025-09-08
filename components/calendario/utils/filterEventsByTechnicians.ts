import type { Evento } from '../types';

export const filterEventsByTechnicians = (events: Evento[], selected: number[]): Evento[] => {
  if (selected.length === 0) {
    return events;
  }
  
  return events.filter(event => 
    event.tecnicos?.some(id => selected.includes(id))
  );
};