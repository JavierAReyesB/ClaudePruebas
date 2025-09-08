import React from 'react';
import type { Tecnico } from '../types';

interface TechniciansLegendProps {
  tecnicos: Tecnico[];
}

export function TechniciansLegend({ tecnicos }: TechniciansLegendProps) {
  return (
    <div className="mt-5 flex gap-4 flex-wrap text-sm justify-center">
      {tecnicos.map(tecnico => (
        <div key={tecnico.id} className="flex items-center gap-2">
          <div 
            className="w-5 h-5 rounded-sm"
            style={{ backgroundColor: tecnico.color }}
          />
          <span>{tecnico.title}</span>
        </div>
      ))}
    </div>
  );
}