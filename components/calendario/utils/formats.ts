export const formats = {
  timeGutterFormat: 'HH:mm',
  eventTimeRangeFormat: ({ start, end }: any, culture: any, localizer: any) =>
    `${localizer.format(start, 'HH:mm', culture)} - ${localizer.format(end, 'HH:mm', culture)}`,
  dayHeaderFormat: 'dddd DD/MM',
  dayFormat: 'DD/MM',
  weekdayFormat: 'ddd DD',
  dayRangeHeaderFormat: ({ start, end }: any, culture: any, localizer: any) =>
    `${localizer.format(start, 'DD/MM', culture)} - ${localizer.format(end, 'DD/MM', culture)}`
};