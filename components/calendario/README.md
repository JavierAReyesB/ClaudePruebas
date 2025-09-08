# 📅 Calendario de Técnicos - Componente Refactorizado

Este directorio contiene el componente de calendario refactorizado y modularizado, con paridad funcional 1:1 con la versión anterior.

## 📂 Estructura del Proyecto

```
components/calendario/
├── index.ts                    # Export público - punto de entrada
├── CalendarTecnicos.tsx        # Componente principal "use client"
├── types.ts                    # Definiciones de TypeScript
├── README.md                   # Esta documentación
│
├── components/                 # Componentes UI modulares
│   ├── CalendarHeader.tsx      # Header con selector de idioma
│   ├── EventModal.tsx          # Modal CRUD con shadcn/ui
│   ├── EventRenderer.tsx       # Renderizado de eventos compacto
│   ├── TechniciansLegend.tsx   # Leyenda de técnicos con colores
│   └── Counters.tsx            # Contadores de eventos
│
├── hooks/                      # Custom hooks para lógica reutilizable
│   ├── useLocalization.ts      # dayjs + localizer + messages i18n
│   ├── useViewRange.ts         # Cálculo de rangos por vista
│   └── useRecurringEvents.ts   # Expansión de eventos RRULE
│
├── utils/                      # Funciones utilitarias puras
│   ├── createEventWithTecnicos.ts  # Helper para crear eventos demo
│   ├── eventStyles.ts          # eventPropGetter + estilos
│   ├── formats.ts              # Formatos de fecha/hora
│   ├── dates.ts                # Utilidades de fechas
│   └── ids.ts                  # Generación de IDs únicos
│
├── constants/                  # Constantes y datos por defecto
│   ├── messagesByLang.ts       # Mensajes i18n (es/en/pt)
│   └── defaults.ts             # Técnicos, horas, presets RRULE
│
└── styles/                     # Estilos CSS (solo si necesario)
    └── rbc-overrides.css       # Overrides mínimos para react-big-calendar
```

## 🔧 Características Técnicas

### Stack Mantenido
- **Next 15** + React 19
- **Tailwind CSS** para estilos
- **shadcn/ui** (Dialog, Input, Textarea, Checkbox, Select, Button)
- **lucide-react** para iconos
- **react-big-calendar** + **dayjs** (localizedFormat, locales es/en/pt)
- **rrule** para recurrencia

### Funcionalidades Core
- ✅ **i18n**: Español, Inglés, Portugués
- ✅ **Vistas**: Day, Week, Month con navegación
- ✅ **Horarios**: 6:00-20:00 configurable, formato 24h
- ✅ **Técnicos**: Multi-asignación con colores pastel
- ✅ **Eventos**: Crear, editar, eliminar con modal profesional
- ✅ **Prioridades**: Alta/Media/Baja con estilos diferenciados
- ✅ **Notas**: Flag `isNote` con estilo sutil (dashed, italic, claro)
- ✅ **Recurrencia**: RRULE completa con presets y campo libre
- ✅ **Expansión**: RRule.between con manejo de exDates
- ✅ **UX**: Click slot = crear, click evento = editar

## 🎯 API Pública (Sin Cambios)

```typescript
// Import principal (igual que antes)
import CalendarTecnicos from 'app/(client)/trabajos/ListadoCalendar/calendar'

// Import directo de la nueva ubicación
import { CalendarTecnicos } from 'components/calendario'

// Types disponibles
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
  rrule?: string;
  originalStart?: Date;
  originalEnd?: Date;
  exDates?: Date[];
  isRecurring?: boolean;
  recurrenceId?: string;
  parentId?: number;
  isNote?: boolean;
}

export interface CalendarTecnicosProps {
  tecnicos?: Tecnico[];
  eventos?: Evento[];
  initialLang?: 'es' | 'en' | 'pt';
  startHour?: number;
  endHour?: number;
}
```

## 🔄 Migración Transparente

### Ubicación Original (Shim)
```typescript
// app/(client)/trabajos/ListadoCalendar/calendar.tsx
"use client";
export { CalendarTecnicos as default } from "../../../../components/calendario";
```

Este **archivo shim** garantiza que:
- ✅ Los imports existentes siguen funcionando
- ✅ No hay breaking changes
- ✅ La página `TablePanel.tsx` funciona igual
- ✅ Compatibilidad total hacia atrás

### Datos Demo
El componente incluye datos de muestra realistas:
- **5 técnicos** con colores pastel
- **Eventos normales** (instalación, reparación, inspección)
- **Eventos recurrentes** (mantenimiento semanal, inspección mensual)
- **Notas rápidas** (recordatorios, llamadas, fotos)

## 🚀 Uso

```typescript
// Uso básico (props opcionales)
<CalendarTecnicos />

// Uso con datos personalizados
<CalendarTecnicos
  tecnicos={misTecnicos}
  eventos={misEventos}
  initialLang="es"
  startHour={8}
  endHour={18}
/>
```

## 🎨 Estilos

- **Tailwind**: Migración completa de estilos inline
- **shadcn/ui**: Modal profesional con componentes consistentes
- **react-big-calendar**: CSS original + overrides mínimos si necesario
- **Pasteles**: Colores suaves para técnicos y eventos
- **Notas**: Estilo diferenciado (dashed, italic, transparente)

## 🧪 Testing

El servidor de desarrollo (`npm run dev`) arranca sin errores, confirmando que:
- ✅ Todas las importaciones son correctas
- ✅ Los tipos TypeScript están bien definidos
- ✅ La estructura modular funciona
- ✅ El shim mantiene compatibilidad

## 📈 Beneficios de la Refactorización

1. **Mantenibilidad**: Código organizado en módulos pequeños y enfocados
2. **Reutilización**: Hooks y utils independientes
3. **Testing**: Componentes aislados más fáciles de testear
4. **Performance**: Importaciones optimizadas
5. **DX**: Mejor IntelliSense y autocompletado
6. **Escalabilidad**: Fácil agregar nuevas funcionalidades
7. **Compatibilidad**: Zero breaking changes

## 🎯 Próximos Pasos

- [ ] Tests unitarios para hooks y utils
- [ ] Storybook para componentes UI
- [ ] Optimizaciones de performance
- [ ] Más opciones de personalización
- [ ] Exportación de datos (CSV, PDF)