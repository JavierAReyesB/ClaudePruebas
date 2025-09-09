"use client";
import React from "react";
import { MapPin } from "lucide-react";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function LocationsCompact({ locations = [] as string[] }){
  const MAX_FULL = 4;        // hasta 4 → todos en chips
  const MAX_WHEN_MANY = 2;   // si >4 → 2 chips + +N
  const list = Array.isArray(locations) ? locations : [];
  const showAll = list.length <= MAX_FULL;
  const visible = showAll ? list : list.slice(0, MAX_WHEN_MANY);
  const hidden = showAll ? [] : list.slice(MAX_WHEN_MANY);

  const Chips = (
    <div className="min-w-0 flex items-center gap-1 whitespace-nowrap overflow-hidden leading-none">
      {visible.map((loc, i) => (
        <span key={i}
          className="shrink-0 bg-orange-100 text-orange-700 text-[9px] px-1 py-0.5 rounded inline-flex items-center gap-0.5 leading-none"
          title={loc}>
          <MapPin size={10}/>{loc}
        </span>
      ))}
      {hidden.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              onClick={(e)=>{e.stopPropagation();}}
              onMouseDown={(e)=>{e.stopPropagation();}}
              className="shrink-0 bg-orange-100 text-orange-700 text-[9px] px-1 py-0.5 rounded border border-orange-200 hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-orange-300 leading-none"
              aria-label={`Ver ${hidden.length} ubicaciones más`}
              title={hidden.join(", ")}>
              +{hidden.length}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="bottom" onClick={(e)=>e.stopPropagation()}>
            {hidden.map((loc, i)=>(<DropdownMenuItem key={i}>{loc}</DropdownMenuItem>))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* contenedor de una sola línea, no rompe layout */}
          <div className="min-w-0 max-w-[240px] overflow-hidden" onClick={(e)=>e.stopPropagation()}>
            {Chips}
          </div>
        </TooltipTrigger>
        {list.length > 0 && (
          <TooltipContent side="bottom" align="end" className="max-w-sm">
            <div className="text-xs font-semibold mb-1">Ubicaciones</div>
            <div className="flex flex-wrap gap-1.5">
              {list.map((loc, i)=>(
                <span key={i} className="bg-orange-100 text-orange-700 text-[10px] px-1.5 py-0.5 rounded inline-flex items-center gap-0.5 leading-none">
                  <MapPin size={10}/>{loc}
                </span>
              ))}
            </div>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}