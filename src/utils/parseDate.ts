export type ParseableDate = string | Date | number | (string | Date | number)[]
export type DateValue = Date | null | Date[]

export default function parseDate(date: Date | null): string {
  if (!date) {
    return '';
  }

  return '';
}
