import React from 'react';

interface EventRendererProps {
  event: any;
}

export function EventRenderer({ event }: EventRendererProps) {
  return (
    <div className="overflow-hidden text-ellipsis whitespace-nowrap text-xs px-0.5">
      <strong>{event.title}</strong>
    </div>
  );
}