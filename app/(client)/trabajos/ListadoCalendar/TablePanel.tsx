'use client'

import React from 'react'
import CalendarTecnicos from './calendar'

export const TablePanel: React.FC = () => {
  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-6 py-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-x-4 mb-4">
        <h1 className="text-2xl sm:text-3xl font-light text-slate-800 tracking-wide">
          Calendario de Técnicos
        </h1>
        <p className="text-slate-600 font-light text-sm sm:text-base">
          Vista de calendario para gestión de técnicos y trabajos
        </p>
      </div>

      {/* Calendario de Técnicos */}
      <div className="relative z-[7000] bg-white rounded-md shadow-md p-4">
        <CalendarTecnicos />
      </div>
    </div>
  )
}