"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { Calendar, Views, View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './styles/rbc-overrides.css';

// Components
import { CalendarHeader } from './components/CalendarHeader';
import { CalendarToolbar } from './components/CalendarToolbar';
import { EventModal } from './components/EventModal';
import { EventRenderer } from './components/EventRenderer';
import { LegendFilter } from './components/LegendFilter';
import { Counters } from './components/Counters';
import { ResourceHeader } from './components/ResourceHeader';

// Hooks
import { useLocalization } from './hooks/useLocalization';
import { useViewRange } from './hooks/useViewRange';
import { useRecurringEvents } from './hooks/useRecurringEvents';
import { useTechnicianFilter } from './hooks/useTechnicianFilter';
import { usePerTechnicianView } from './hooks/usePerTechnicianView';

// Utils
import { createEventWithTecnicos } from './utils/createEventWithTecnicos';
import { getEventStyles } from './utils/eventStyles';
import { formats } from './utils/formats';
import { createDateWithHour } from './utils/dates';
import { getNextEventId } from './utils/ids';
import { filterEventsByTechnicians } from './utils/filterEventsByTechnicians';
import { fanOutEventsForResources } from './utils/fanOutEventsForResources';
import { getTechnicianZones } from './utils/technicianZones';

// Constants
import { 
  DEFAULT_TECNICOS, 
  DEFAULT_START_HOUR, 
  DEFAULT_END_HOUR, 
  DEFAULT_LANGUAGE,
  MODAL_INITIAL_DATA 
} from './constants/defaults';

// Types
import type { CalendarTecnicosProps, Evento, ModalData, Language } from './types';

const CalendarTecnicos: React.FC<CalendarTecnicosProps> = ({ 
  tecnicos = DEFAULT_TECNICOS,
  eventos: propEventos,
  initialLang = DEFAULT_LANGUAGE,
  startHour = DEFAULT_START_HOUR,
  endHour = DEFAULT_END_HOUR
}) => {
  const [lang, setLang] = useState<Language>(initialLang);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<View>(Views.DAY);
  
  // Hooks
  const { localizer, messages } = useLocalization(lang);
  const { getViewRange } = useViewRange();
  const { expandRecurringEvents } = useRecurringEvents();
  const { selectedTecnicos, showingAll, toggle, clear, setSelectedTecnicos } = useTechnicianFilter();
  const { 
    perTechnician, 
    setPerTechnician, 
    shownResources, 
    shownResourceIds, 
    allResources,
    soloEste 
  } = usePerTechnicianView({ 
    tecnicos,
    selectedTecnicos,
    onSelectTechnician: toggle
  });
  
  // Estados del modal
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Evento | null>(null);
  const [modalData, setModalData] = useState<ModalData>(MODAL_INITIAL_DATA);

  // Función para crear eventos por defecto con datos de muestra
  const createDefaultEvents = useCallback(() => {
    const events: Evento[] = [
      // Eventos normales para hoy
      { id: 1, ...createEventWithTecnicos('Instalación HVAC - Oficinas Zentral', [1], tecnicos, 8, 0, 2.5, 0, 'Instalación de sistema HVAC completo', 'media') },
      { id: 2, ...createEventWithTecnicos('Reparación Caldera - Residencial Norte', [2, 5], tecnicos, 14, 0, 1.5, 0, 'Reparación de caldera principal', 'media') },
      { id: 3, ...createEventWithTecnicos('Inspección Eléctrica - Centro Sur', [4], tecnicos, 15, 30, 2, 0, 'Inspección rutinaria del sistema eléctrico', 'baja') },
      
      // Eventos recurrentes
      {
        id: 100,
        title: '[Juan García] Mantenimiento Semanal - Oficina Centro',
        start: new Date(), // Se usará originalStart para las recurrencias
        end: new Date(),   // Se usará originalEnd para las recurrencias
        originalStart: (() => {
          const date = new Date();
          date.setHours(10, 0, 0, 0);
          return date;
        })(),
        originalEnd: (() => {
          const date = new Date();
          date.setHours(11, 30, 0, 0);
          return date;
        })(),
        resourceId: 1,
        tecnicos: [1],
        descripcion: 'Mantenimiento preventivo semanal todos los lunes',
        prioridad: 'media' as const,
        isRecurring: true,
        rrule: 'FREQ=WEEKLY;BYDAY=MO;COUNT=8', // Todos los lunes por 8 semanas
        exDates: [] // Sin fechas excluidas
      },
      {
        id: 101,
        title: '[María López, Carlos Ruiz] Inspección Mensual - Torre Norte',
        start: new Date(),
        end: new Date(),
        originalStart: (() => {
          const date = new Date();
          date.setDate(15); // Día 15 de cada mes
          date.setHours(9, 0, 0, 0);
          return date;
        })(),
        originalEnd: (() => {
          const date = new Date();
          date.setDate(15);
          date.setHours(12, 0, 0, 0);
          return date;
        })(),
        resourceId: 2,
        tecnicos: [2, 3],
        descripcion: 'Inspección mensual completa el día 15 de cada mes',
        prioridad: 'alta' as const,
        isRecurring: true,
        rrule: 'FREQ=MONTHLY;BYMONTHDAY=15;COUNT=6', // Día 15 de cada mes por 6 meses
        exDates: []
      },
      {
        id: 102,
        title: '[Pedro Sánchez] Revisión Bisemanal - Fábrica Sur',
        start: new Date(),
        end: new Date(),
        originalStart: (() => {
          const date = new Date();
          const day = date.getDay();
          const diff = date.getDate() - day + (day === 0 ? -6 : 2); // Conseguir próximo miércoles
          date.setDate(diff);
          date.setHours(14, 0, 0, 0);
          return date;
        })(),
        originalEnd: (() => {
          const date = new Date();
          const day = date.getDay();
          const diff = date.getDate() - day + (day === 0 ? -6 : 2);
          date.setDate(diff);
          date.setHours(16, 30, 0, 0);
          return date;
        })(),
        resourceId: 5,
        tecnicos: [5],
        descripcion: 'Revisión cada dos semanas los miércoles',
        prioridad: 'media' as const,
        isRecurring: true,
        rrule: 'FREQ=WEEKLY;INTERVAL=2;BYDAY=WE;COUNT=10', // Cada 2 semanas los miércoles, 10 veces
        exDates: []
      },

      // Eventos de anotación/notas rápidas
      {
        id: 200,
        ...createEventWithTecnicos('Recordar traer herramientas especiales', [1], tecnicos, 7, 30, 0.5, 0, 'Nota: No olvidar las llaves hexagonales del set especial', 'baja'),
        isNote: true
      },
      {
        id: 201,  
        ...createEventWithTecnicos('Llamar cliente antes de llegar', [2], tecnicos, 13, 45, 0.25, 0, 'Nota: Cliente prefiere aviso 30 min antes', 'baja'),
        isNote: true
      },
      {
        id: 202,
        ...createEventWithTecnicos('Revisar stock de repuestos', [3, 4], tecnicos, 12, 0, 0.5, 1, 'Nota: Verificar inventario de filtros HVAC', 'baja'),
        isNote: true
      },
      {
        id: 203,
        ...createEventWithTecnicos('Foto del problema antes de reparar', [5], tecnicos, 16, 15, 0.25, 0, 'Nota: Documentar el estado inicial para el reporte', 'baja'),
        isNote: true
      }
    ];
    return events;
  }, [tecnicos]);

  // Estado para eventos
  const [eventos, setEventos] = useState<Evento[]>(() => propEventos || createDefaultEvents());

  const min = useMemo(() => createDateWithHour(startHour), [startHour]);
  const max = useMemo(() => createDateWithHour(endHour), [endHour]);

  // Eventos expandidos con recurrencias
  const expandedEventos = useMemo(() => {
    const viewRange = getViewRange(currentDate, currentView);
    return expandRecurringEvents(eventos, viewRange.start, viewRange.end);
  }, [eventos, currentDate, currentView, expandRecurringEvents, getViewRange]);

  // Aplicar filtro por técnicos
  const filteredEventos = useMemo(
    () => filterEventsByTechnicians(expandedEventos, selectedTecnicos),
    [expandedEventos, selectedTecnicos]
  );

  // Aplicar fan-out para vista por técnico
  const eventsForCalendar = useMemo(
    () => perTechnician && currentView === Views.DAY
      ? fanOutEventsForResources(filteredEventos, shownResourceIds)
      : filteredEventos,
    [perTechnician, filteredEventos, shownResourceIds, currentView]
  );

  // Enhanced resources with location and schedule
  const shownResourcesWithZones = useMemo(() => 
    shownResources.map(r => ({
      ...r,
      avatarColor: r.color,
      location: "Cáceres",  // Placeholder - replace with actual data
      timeLabel: "08:00–17:00",  // Placeholder - replace with actual data
      zones: getTechnicianZones(r.id)
    })),
    [shownResources]
  );

  // Resource header action handlers
  const onMobile = useCallback((id: number) => {
    console.log('mobile', id);
  }, []);

  const onTeam = useCallback((id: number) => {
    console.log('team', id);
  }, []);

  const onKpi = useCallback((id: number) => {
    console.log('kpi', id);
  }, []);

  const onAssign = useCallback((id: number) => {
    console.log('assign', id);
  }, []);

  const onUnassign = useCallback((id: number) => {
    console.log('unassign', id);
  }, []);

  const onTraining = useCallback((id: number) => {
    console.log('training', id);
  }, []);

  const onNew = useCallback((id: number) => {
    console.log('new', id);
  }, []);

  const eventPropGetter = useCallback((event: any) => {
    return getEventStyles(event, tecnicos);
  }, [tecnicos]);

  // Función para limpiar modal
  const clearModal = useCallback(() => {
    setModalData(MODAL_INITIAL_DATA);
    setEditingEvent(null);
  }, []);

  // Manejador para crear nuevos eventos - abre modal
  const handleSelectSlot = useCallback((slotInfo: any) => {
    clearModal();
    const preselectTechnician = selectedTecnicos.length === 1 && !editingEvent 
      ? selectedTecnicos 
      : [];
    
    setModalData({
      ...MODAL_INITIAL_DATA,
      start: slotInfo.start,
      end: slotInfo.end || new Date(slotInfo.start.getTime() + 60 * 60 * 1000), // +1 hora por defecto
      tecnicos: preselectTechnician
    });
    setShowModal(true);
  }, [clearModal, selectedTecnicos, editingEvent]);

  // Manejador para guardar evento desde modal
  const handleSaveEvent = useCallback(() => {
    if (!modalData.title.trim() || modalData.tecnicos.length === 0) {
      alert('Por favor completa el título y selecciona al menos un técnico');
      return;
    }

    const tecnicosNames = modalData.tecnicos.map(id => tecnicos.find(t => t.id === id)?.title).filter(Boolean).join(', ');
    
    if (editingEvent) {
      // Editando evento existente
      const updatedEvent: Evento = {
        ...editingEvent,
        start: modalData.start,
        end: modalData.end,
        title: `[${tecnicosNames}] ${modalData.title}`,
        resourceId: modalData.tecnicos[0],
        tecnicos: modalData.tecnicos,
        descripcion: modalData.descripcion,
        prioridad: modalData.prioridad,
        // Propiedades de recurrencia
        isRecurring: modalData.isRecurring,
        rrule: modalData.isRecurring ? modalData.rrule : undefined,
        originalStart: modalData.isRecurring ? modalData.start : undefined,
        originalEnd: modalData.isRecurring ? modalData.end : undefined,
        exDates: modalData.isRecurring ? [] : undefined,
        // Propiedad de nota
        isNote: modalData.isNote
      };
      
      setEventos(eventos.map(e => e.id === editingEvent.id ? updatedEvent : e));
    } else {
      // Creando nuevo evento
      const newEventId = getNextEventId(eventos);
      const newEvent: Evento = {
        id: newEventId,
        start: modalData.start,
        end: modalData.end,
        title: `[${tecnicosNames}] ${modalData.title}`,
        resourceId: modalData.tecnicos[0],
        tecnicos: modalData.tecnicos,
        descripcion: modalData.descripcion,
        prioridad: modalData.prioridad,
        // Propiedades de recurrencia
        isRecurring: modalData.isRecurring,
        rrule: modalData.isRecurring ? modalData.rrule : undefined,
        originalStart: modalData.isRecurring ? modalData.start : undefined,
        originalEnd: modalData.isRecurring ? modalData.end : undefined,
        exDates: modalData.isRecurring ? [] : undefined,
        // Propiedad de nota
        isNote: modalData.isNote
      };
      
      setEventos([...eventos, newEvent]);
    }

    setShowModal(false);
    clearModal();
  }, [modalData, eventos, tecnicos, editingEvent, clearModal]);

  // Manejador para seleccionar eventos existentes - abre modal de edición
  const handleSelectEvent = useCallback((event: Evento) => {
    // Extraer el título real quitando la parte de técnicos
    const titleMatch = event.title.match(/^\[([^\]]+)\]\s*(.*)$/);
    const realTitle = titleMatch ? titleMatch[2] : event.title;
    
    setEditingEvent(event);
    setModalData({
      start: event.start,
      end: event.end,
      title: realTitle,
      descripcion: event.descripcion || '',
      tecnicos: event.tecnicos || [event.resourceId],
      prioridad: event.prioridad || 'media',
      rrule: event.rrule || '',
      isRecurring: event.isRecurring || false,
      isNote: event.isNote || false
    });
    setShowModal(true);
  }, []);

  // Función para eliminar evento
  const handleDeleteEvent = useCallback(() => {
    if (editingEvent) {
      const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar "${editingEvent.title}"?`);
      if (confirmDelete) {
        setEventos(eventos.filter(e => e.id !== editingEvent.id));
        setShowModal(false);
        clearModal();
      }
    }
  }, [editingEvent, eventos, clearModal]);

  // Función para manejar selección múltiple de técnicos
  const handleTecnicoToggle = useCallback((tecnicoId: number) => {
    setModalData(prev => ({
      ...prev,
      tecnicos: prev.tecnicos.includes(tecnicoId)
        ? prev.tecnicos.filter(id => id !== tecnicoId)
        : [...prev.tecnicos, tecnicoId]
    }));
  }, []);

  return (
    <div className="h-full w-full flex flex-col">
      <CalendarHeader 
        lang={lang}
        onLangChange={setLang}
        perTechnician={perTechnician}
        onPerTechnicianChange={setPerTechnician}
        showingResourcesInfo={
          selectedTecnicos.length > 5 || allResources.length > 5
            ? { shown: shownResourceIds.length, total: selectedTecnicos.length || allResources.length }
            : undefined
        }
      />
      
      {/* Contenedor del calendario */}
      <div 
        className="h-[600px] w-full border border-gray-200 rounded overflow-hidden relative"
        style={{
          overflowX: perTechnician && currentView === Views.DAY ? 'auto' : 'hidden'
        }}
      >
        <div
          style={{
            minWidth: perTechnician && currentView === Views.DAY ? '900px' : '100%',
            height: '100%'
          }}
        >
          <Calendar
            localizer={localizer}
            events={eventsForCalendar}
            view={currentView}
            onView={setCurrentView}
            views={[Views.DAY, Views.WEEK, Views.MONTH]}
            date={currentDate}
            onNavigate={setCurrentDate}
            step={30}
            timeslots={2}
            min={min}
            max={max}
            formats={formats}
            messages={messages}
            eventPropGetter={eventPropGetter}
            selectable={true}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            resources={currentView === Views.DAY && perTechnician ? shownResourcesWithZones : undefined}
            resourceIdAccessor="id"
            resourceTitleAccessor="title"
            style={{ height: '100%', width: '100%' }}
            components={{
              event: EventRenderer,
              toolbar: (props: any) => (
                <CalendarToolbar
                  {...props}
                  localizer={localizer}
                  lang={lang}
                />
              ),
              resourceHeader: currentView === Views.DAY && perTechnician ? 
                (props: any) => {
                  const res = props.resource ?? 
                    shownResourcesWithZones.find(r => r.title === props.label) ?? 
                    { id: 0, title: String(props.label) };
                  return (
                    <ResourceHeader
                      label={props.label}
                      resource={res}
                      onMobile={onMobile}
                      onTeam={onTeam}
                      onKpi={onKpi}
                      onAssign={onAssign}
                      onUnassign={onUnassign}
                      onTraining={onTraining}
                      onNew={onNew}
                    />
                  );
                }
                : undefined
            }}
          />
        </div>
      </div>
      
      <LegendFilter 
        tecnicos={tecnicos}
        showingAll={showingAll}
        selectedTecnicos={selectedTecnicos}
        onToggle={toggle}
        onClear={clear}
      />
      <Counters eventos={filteredEventos} />

      {/* Modal para crear/editar eventos */}
      <EventModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          clearModal();
        }}
        modalData={modalData}
        setModalData={setModalData}
        tecnicos={tecnicos}
        editingEvent={editingEvent}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        onTecnicoToggle={handleTecnicoToggle}
      />
    </div>
  );
};

export default CalendarTecnicos;