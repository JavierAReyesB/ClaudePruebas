/**
 * Utility to get zones assigned to a technician
 * This is a stub implementation for now
 */

// Example zones mapping (can be replaced with API call or database query)
const technicianZonesMap = new Map<number, string[]>([
  [1, ['Mérida', 'Badajoz']],
  [2, ['Cáceres']],
  [3, ['Plasencia', 'Navalmoral']],
  [4, ['Don Benito', 'Villanueva']],
  [5, ['Zafra']],
]);

/**
 * Get zones for a specific technician
 * @param id - Technician ID
 * @returns Array of zone names
 */
export function getTechnicianZones(id: number): string[] {
  return technicianZonesMap.get(id) || [];
}