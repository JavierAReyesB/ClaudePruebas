import type { Evento } from '../types';

export function getNextEventId(eventos: Evento[]): number {
  return Math.max(...eventos.map(e => typeof e.id === 'string' ? 0 : e.id), 0) + 1;
}

export function generateRecurrenceId(eventId: number | string, index: number): string {
  return `${eventId}-${index}`;
}

export function generateInstanceId(eventId: number | string, occurrence: Date): string {
  return `${eventId}-${occurrence.toISOString()}`;
}