export function createDateWithHour(hour: number, minute: number = 0): Date {
  const d = new Date();
  d.setHours(hour, minute, 0, 0);
  return d;
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return date1.getDate() === date2.getDate() && 
         date1.getMonth() === date2.getMonth() && 
         date1.getFullYear() === date2.getFullYear();
}