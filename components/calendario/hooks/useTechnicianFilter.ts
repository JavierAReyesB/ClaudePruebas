import { useState, useMemo, useCallback } from 'react';

export const useTechnicianFilter = () => {
  const [selectedTecnicos, setSelectedTecnicos] = useState<number[]>([]);

  const showingAll = useMemo(() => selectedTecnicos.length === 0, [selectedTecnicos]);

  const toggle = useCallback((id: number, exclusive?: boolean) => {
    if (exclusive) {
      setSelectedTecnicos([id]);
    } else {
      setSelectedTecnicos(prev => 
        prev.includes(id) 
          ? prev.filter(techId => techId !== id)
          : [...prev, id]
      );
    }
  }, []);

  const clear = useCallback(() => {
    setSelectedTecnicos([]);
  }, []);

  return {
    selectedTecnicos,
    showingAll,
    toggle,
    clear,
    setSelectedTecnicos
  };
};