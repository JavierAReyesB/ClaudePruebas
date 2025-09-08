import type { Tecnico } from '../types';

export function getEventStyles(event: any, tecnicos: Tecnico[]) {
  // Si hay múltiples técnicos, usar el color del primero
  const tecnico = tecnicos.find(t => t.id === event.resourceId);
  const baseColor = tecnico?.color || '#E8E8E8'; // Gris pastel por defecto
  
  // Estilos especiales para notas
  if (event.isNote) {
    // Fondo más claro para las notas
    const noteColor = baseColor + '40'; // Agregar transparencia
    return {
      style: {
        backgroundColor: noteColor,
        borderColor: baseColor,
        color: '#666666', // Texto más suave para notas
        borderRadius: '4px',
        border: `1px dashed ${baseColor}`, // Borde punteado característico
        fontSize: '10px', // Fuente más pequeña
        padding: '2px 4px',
        opacity: 0.8,
        fontWeight: '400',
        fontStyle: 'italic' // Texto en cursiva para diferenciar
      }
    };
  }
  
  // Colores pastel para bordes según prioridad (eventos normales)
  const borderColor = event.prioridad === 'alta' ? '#FFB8B8' : event.prioridad === 'baja' ? '#D0D0D0' : baseColor;
  const borderStyle = event.prioridad === 'alta' ? '3px solid' : event.prioridad === 'baja' ? '2px dotted' : '2px solid';
  
  return {
    style: {
      backgroundColor: baseColor,
      borderColor: borderColor,
      color: '#555555', // Texto gris oscuro para contraste con pasteles
      borderRadius: '6px',
      border: `${borderStyle} ${borderColor}`,
      fontSize: '12px',
      padding: '3px 6px',
      opacity: event.prioridad === 'baja' ? 0.85 : 1,
      fontWeight: event.prioridad === 'alta' ? '600' : '500'
    }
  };
}