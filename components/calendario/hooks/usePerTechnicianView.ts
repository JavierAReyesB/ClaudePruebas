import { useState, useMemo, useCallback } from 'react';
import type { Tecnico } from '../types';

interface UsePerTechnicianViewProps {
  tecnicos: Tecnico[];
  selectedTecnicos?: number[];
  onSelectTechnician?: (id: number, exclusive?: boolean) => void;
}

interface Resource {
  id: number;
  title: string;
  color: string;
}

export const usePerTechnicianView = ({
  tecnicos,
  selectedTecnicos,
  onSelectTechnician
}: UsePerTechnicianViewProps) => {
  const [perTechnician, setPerTechnician] = useState(false);

  // Convert tecnicos to resources format
  const allResources = useMemo<Resource[]>(() => 
    tecnicos.map(t => ({
      id: t.id,
      title: t.title,
      color: t.color
    })),
    [tecnicos]
  );

  // Determine which resource IDs to show (max 5)
  const shownResourceIds = useMemo(() => {
    // If there's a selection from useTechnicianFilter, use those
    if (selectedTecnicos && selectedTecnicos.length > 0) {
      return selectedTecnicos.slice(0, 5);
    }
    // Otherwise use all resources (limited to 5)
    return allResources.map(r => r.id).slice(0, 5);
  }, [selectedTecnicos, allResources]);

  // Get the actual resource objects to show
  const shownResources = useMemo(() => 
    allResources.filter(r => shownResourceIds.includes(r.id)),
    [allResources, shownResourceIds]
  );

  // Handle "solo este" action
  const soloEste = useCallback((id: number) => {
    if (onSelectTechnician) {
      // Use the filter from useTechnicianFilter if available
      onSelectTechnician(id, true);
    } else {
      // Expose callback for container to handle
      console.log(`Solo technician ${id} requested but no handler provided`);
    }
  }, [onSelectTechnician]);

  return {
    perTechnician,
    setPerTechnician,
    allResources,
    shownResourceIds,
    shownResources,
    soloEste
  };
};