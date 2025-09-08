import type { Evento } from '../types';

export const fanOutEventsForResources = (
  events: Evento[], 
  resourceIds: number[]
): Evento[] => {
  const fannedOutEvents: Evento[] = [];

  events.forEach(event => {
    // Find intersection between event.tecnicos and resourceIds
    const matchingResourceIds = event.tecnicos?.filter(techId => 
      resourceIds.includes(techId)
    ) || [];

    if (matchingResourceIds.length > 0) {
      // Create a copy for each matching resource
      matchingResourceIds.forEach(resourceId => {
        fannedOutEvents.push({
          ...event,
          id: `${event.id}-r${resourceId}`,
          resourceId: resourceId
        });
      });
    }
    // If no intersection in perTechnician mode, omit the event
    // (It will not appear in any column)
  });

  return fannedOutEvents;
};