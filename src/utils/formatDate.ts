export type ParseableDate = string | Date | number | (string | Date | number)[]
export type DateValue = Date | null | Date[]

export default function formatDate(date: Date): DateValue {
  if (typeof date === 'string') {
    return new Date(Date.parse(date));
  }

  if (typeof date === 'number') {
    return new Date(date);
  }

  if (date instanceof Date) {
    return date;
  }

  if (Array.isArray(date)) {
    date.map((day : string | Date | number) => parseDate(day));
  }

  return null;
}
