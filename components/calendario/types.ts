export interface Tecnico {
  id: number;
  title: string;
  color: string;
}

export interface Evento {
  id: number | string;
  title: string;
  start: Date;
  end: Date;
  resourceId: number;
  tecnicos: number[];
  descripcion?: string;
  prioridad?: 'alta' | 'media' | 'baja';
  // Propiedades para recurrencia
  rrule?: string;
  originalStart?: Date;
  originalEnd?: Date;
  exDates?: Date[];
  isRecurring?: boolean;
  recurrenceId?: string;
  parentId?: number;
  // Propiedad para notas
  isNote?: boolean;
}

export interface CalendarTecnicosProps {
  tecnicos?: Tecnico[];
  eventos?: Evento[];
  initialLang?: 'es' | 'en' | 'pt';
  startHour?: number;
  endHour?: number;
}

export interface ModalData {
  start: Date;
  end: Date;
  title: string;
  descripcion: string;
  tecnicos: number[];
  prioridad: 'alta' | 'media' | 'baja';
  rrule?: string;
  isRecurring?: boolean;
  isNote?: boolean;
}

export type Language = 'es' | 'en' | 'pt';

export interface ViewRange {
  start: Date;
  end: Date;
}