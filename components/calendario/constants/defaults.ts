import type { Tecnico, Evento } from '../types';

export const DEFAULT_TECNICOS: Tecnico[] = [
  { id: 1, title: 'Juan García', color: '#B8D4F0' },      // Azul pastel
  { id: 2, title: 'María López', color: '#F0B8C4' },      // Rosa pastel
  { id: 3, title: 'Carlos Ruiz', color: '#B8F0C4' },      // Verde pastel
  { id: 4, title: 'Ana Martín', color: '#F0D4B8' },       // Naranja pastel
  { id: 5, title: 'Pedro Sánchez', color: '#D4B8F0' }     // Púrpura pastel
];

export const DEFAULT_START_HOUR = 6;
export const DEFAULT_END_HOUR = 20;
export const DEFAULT_LANGUAGE = 'es';

export const RRULE_PRESETS = [
  { value: 'FREQ=DAILY;COUNT=5', label: '📅 Diario (5 días)' },
  { value: 'FREQ=WEEKLY;COUNT=4', label: '📅 Semanal (4 semanas)' },
  { value: 'FREQ=WEEKLY;BYDAY=MO,WE,FR;COUNT=12', label: '📅 Lun-Mié-Vie (12 veces)' },
  { value: 'FREQ=WEEKLY;BYDAY=MO;COUNT=8', label: '📅 Todos los Lunes (8 veces)' },
  { value: 'FREQ=WEEKLY;INTERVAL=2;COUNT=6', label: '📅 Cada 2 semanas (6 veces)' },
  { value: 'FREQ=MONTHLY;BYMONTHDAY=15;COUNT=6', label: '📅 Día 15 mensual (6 meses)' },
  { value: 'FREQ=MONTHLY;COUNT=3', label: '📅 Mensual (3 meses)' }
];

export const MODAL_INITIAL_DATA = {
  start: new Date(),
  end: new Date(),
  title: '',
  descripcion: '',
  tecnicos: [],
  prioridad: 'media' as const,
  rrule: '',
  isRecurring: false,
  isNote: false
};