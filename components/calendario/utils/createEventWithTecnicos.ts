import type { Tecnico } from '../types';

export function createEventWithTecnicos(
  title: string, 
  tecnicosIds: number[], 
  tecnicos: Tecnico[],
  hour: number, 
  minutes: number, 
  duration: number, 
  daysOffset: number = 0, 
  descripcion: string = '', 
  prioridad: 'alta' | 'media' | 'baja' = 'media'
) {
  const today = new Date();
  const targetDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysOffset);
  const start = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), hour, minutes, 0);
  const end = new Date(
    targetDate.getFullYear(), 
    targetDate.getMonth(), 
    targetDate.getDate(), 
    hour + Math.floor(duration), 
    minutes + (duration % 1) * 60, 
    0
  );
  
  const tecnicosNames = tecnicosIds.map(id => tecnicos.find(t => t.id === id)?.title).filter(Boolean).join(', ');
  
  return { 
    title: `[${tecnicosNames}] ${title}`,
    start, 
    end, 
    resourceId: tecnicosIds[0] || 1,
    tecnicos: tecnicosIds,
    descripcion,
    prioridad
  };
}