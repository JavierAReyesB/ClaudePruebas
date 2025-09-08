"use client";

import React, { useCallback } from 'react';
import { cn } from '@/lib/utils';

interface LegendFilterProps {
  tecnicos: Array<{ id: number; title: string; color: string }>;
  showingAll: boolean;
  selectedTecnicos: number[];
  onToggle: (id: number, exclusive?: boolean) => void;
  onClear: () => void;
}

export const LegendFilter: React.FC<LegendFilterProps> = ({
  tecnicos,
  showingAll,
  selectedTecnicos,
  onToggle,
  onClear
}) => {
  const handleTechnicianClick = useCallback((
    e: React.MouseEvent<HTMLButtonElement>,
    techId: number
  ) => {
    e.preventDefault();
    const isExclusive = e.ctrlKey || e.metaKey || e.button === 2;
    onToggle(techId, isExclusive);
  }, [onToggle]);

  const handleContextMenu = useCallback((
    e: React.MouseEvent<HTMLButtonElement>,
    techId: number
  ) => {
    e.preventDefault();
    onToggle(techId, true);
  }, [onToggle]);

  const isSelected = useCallback((techId: number) => {
    return showingAll || selectedTecnicos.includes(techId);
  }, [showingAll, selectedTecnicos]);

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-white border border-gray-200 rounded-lg">
      {/* Ver todos button */}
      <button
        onClick={onClear}
        className={cn(
          "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
          "border border-gray-300",
          showingAll
            ? "bg-blue-500 text-white border-blue-500"
            : "bg-white text-gray-700 hover:bg-gray-50"
        )}
        aria-pressed={showingAll}
      >
        Ver todos
      </button>

      {/* Separator */}
      <div className="w-px bg-gray-300 mx-1" aria-hidden="true" />

      {/* Technician buttons */}
      {tecnicos.map((tecnico) => {
        const selected = isSelected(tecnico.id);
        const isOnlySelected = !showingAll && selectedTecnicos.length === 1 && 
                              selectedTecnicos[0] === tecnico.id;
        
        return (
          <button
            key={tecnico.id}
            onClick={(e) => handleTechnicianClick(e, tecnico.id)}
            onContextMenu={(e) => handleContextMenu(e, tecnico.id)}
            className={cn(
              "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
              "border relative",
              selected
                ? "text-white shadow-sm"
                : "bg-gray-50 text-gray-500 opacity-50 hover:opacity-75"
            )}
            style={{
              backgroundColor: selected ? tecnico.color : undefined,
              borderColor: selected ? tecnico.color : '#d1d5db',
            }}
            aria-pressed={selected}
            title={`${tecnico.title}${isOnlySelected ? ' (Solo este)' : ''}\n` +
                  `Click: alternar | Ctrl/⌘+Click o botón derecho: solo este`}
          >
            <span className="flex items-center gap-1.5">
              {/* Color indicator */}
              {!selected && (
                <span
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: tecnico.color }}
                  aria-hidden="true"
                />
              )}
              {tecnico.title}
              {isOnlySelected && (
                <span className="text-xs ml-1">(Solo)</span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};