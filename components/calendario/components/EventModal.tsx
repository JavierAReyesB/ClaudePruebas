"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RRULE_PRESETS } from '../constants/defaults';
import type { Tecnico, Evento, ModalData } from '../types';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalData: ModalData;
  setModalData: React.Dispatch<React.SetStateAction<ModalData>>;
  tecnicos: Tecnico[];
  editingEvent: Evento | null;
  onSave: () => void;
  onDelete: () => void;
  onTecnicoToggle: (id: number) => void;
}

export function EventModal({
  isOpen,
  onClose,
  modalData,
  setModalData,
  tecnicos,
  editingEvent,
  onSave,
  onDelete,
  onTecnicoToggle
}: EventModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>
            {editingEvent ? 'Editar Evento' : 'Nuevo Evento'}
          </DialogTitle>
          {editingEvent && (
            <Button 
              variant="destructive" 
              size="sm"
              onClick={onDelete}
              className="ml-auto"
            >
              🗑️ Eliminar
            </Button>
          )}
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Título */}
          <div>
            <Label htmlFor="title" className="text-sm font-semibold">
              Título de la Tarea *
            </Label>
            <Input
              id="title"
              type="text"
              value={modalData.title}
              onChange={(e) => setModalData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Ej: Instalación de sistema HVAC"
              required
              className="mt-2"
            />
          </div>

          {/* Descripción */}
          <div>
            <Label htmlFor="description" className="text-sm font-semibold">
              Descripción
            </Label>
            <Textarea
              id="description"
              value={modalData.descripcion}
              onChange={(e) => setModalData(prev => ({ ...prev, descripcion: e.target.value }))}
              placeholder="Detalles adicionales del trabajo..."
              rows={3}
              className="mt-2 resize-y"
            />
          </div>

          {/* Técnicos */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">
              Técnicos Asignados * (selecciona uno o más)
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {tecnicos.map(tecnico => (
                <div
                  key={tecnico.id}
                  className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                    modalData.tecnicos.includes(tecnico.id)
                      ? `border-[${tecnico.color}] bg-opacity-10`
                      : 'border-gray-200'
                  }`}
                  style={{
                    backgroundColor: modalData.tecnicos.includes(tecnico.id) ? `${tecnico.color}15` : 'transparent',
                    borderColor: modalData.tecnicos.includes(tecnico.id) ? tecnico.color : '#e5e7eb'
                  }}
                >
                  <Checkbox
                    id={`tecnico-${tecnico.id}`}
                    checked={modalData.tecnicos.includes(tecnico.id)}
                    onCheckedChange={() => onTecnicoToggle(tecnico.id)}
                    className="mr-3"
                  />
                  <div 
                    className="w-4 h-4 rounded mr-2"
                    style={{ backgroundColor: tecnico.color }}
                  />
                  <Label htmlFor={`tecnico-${tecnico.id}`} className="text-sm font-medium cursor-pointer">
                    {tecnico.title}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Prioridad */}
          <div>
            <Label className="text-sm font-semibold">
              Prioridad
            </Label>
            <Select
              value={modalData.prioridad}
              onValueChange={(value: 'alta' | 'media' | 'baja') => 
                setModalData(prev => ({ ...prev, prioridad: value }))
              }
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="baja">🟢 Baja</SelectItem>
                <SelectItem value="media">🟡 Media</SelectItem>
                <SelectItem value="alta">🔴 Alta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tipo de Evento */}
          <div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="isNote"
                checked={modalData.isNote || false}
                onCheckedChange={(checked) => 
                  setModalData(prev => ({ ...prev, isNote: !!checked }))
                }
              />
              <Label htmlFor="isNote" className="text-sm font-semibold">
                📝 Es una nota/anotación rápida
              </Label>
            </div>
            <p className="text-xs text-gray-600 mt-1 ml-6">
              Las notas se muestran con estilo más sutil: fondo claro, borde punteado y texto pequeño
            </p>
          </div>

          {/* Recurrencia */}
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <Checkbox
                id="isRecurring"
                checked={modalData.isRecurring || false}
                onCheckedChange={(checked) => 
                  setModalData(prev => ({ 
                    ...prev, 
                    isRecurring: !!checked,
                    rrule: checked ? prev.rrule || 'FREQ=WEEKLY;COUNT=4' : ''
                  }))
                }
              />
              <Label htmlFor="isRecurring" className="text-sm font-semibold">
                🔄 Evento Recurrente
              </Label>
            </div>
            
            {modalData.isRecurring && (
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">
                    Regla de Recurrencia (RRULE)
                  </Label>
                  <Select
                    value={modalData.rrule}
                    onValueChange={(value) => setModalData(prev => ({ ...prev, rrule: value }))}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {RRULE_PRESETS.map(preset => (
                        <SelectItem key={preset.value} value={preset.value}>
                          {preset.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Input
                  type="text"
                  value={modalData.rrule}
                  onChange={(e) => setModalData(prev => ({ ...prev, rrule: e.target.value }))}
                  placeholder="Ej: FREQ=WEEKLY;BYDAY=MO,WE;COUNT=10"
                  className="font-mono text-xs"
                />
                <p className="text-xs text-gray-600">
                  💡 Ejemplos: FREQ=DAILY (diario), FREQ=WEEKLY;BYDAY=MO,WE (lunes y miércoles), FREQ=MONTHLY;COUNT=6 (mensual 6 veces)
                </p>
              </div>
            )}
          </div>

          {/* Horarios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime" className="text-sm font-semibold">
                Hora de Inicio
              </Label>
              <Input
                id="startTime"
                type="datetime-local"
                value={modalData.start.toISOString().slice(0, 16)}
                onChange={(e) => setModalData(prev => ({ ...prev, start: new Date(e.target.value) }))}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="endTime" className="text-sm font-semibold">
                Hora de Fin
              </Label>
              <Input
                id="endTime"
                type="datetime-local"
                value={modalData.end.toISOString().slice(0, 16)}
                onChange={(e) => setModalData(prev => ({ ...prev, end: new Date(e.target.value) }))}
                className="mt-2"
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-between pt-4">
            <div>
              {editingEvent && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={onDelete}
                >
                  🗑️ Eliminar Evento
                </Button>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {editingEvent ? '💾 Guardar Cambios' : '➕ Crear Evento'}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}