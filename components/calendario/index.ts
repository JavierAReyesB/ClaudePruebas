// Main component
export { default as CalendarTecnicos } from './CalendarTecnicos';

// Types
export type { 
  Tecnico, 
  Evento, 
  CalendarTecnicosProps, 
  ModalData, 
  Language, 
  ViewRange 
} from './types';

// Utils (exportar para uso externo si es necesario)
export { createEventWithTecnicos } from './utils/createEventWithTecnicos';
export { getEventStyles } from './utils/eventStyles';

// Constants (exportar defaults para uso externo)
export { 
  DEFAULT_TECNICOS, 
  DEFAULT_START_HOUR, 
  DEFAULT_END_HOUR, 
  DEFAULT_LANGUAGE 
} from './constants/defaults';