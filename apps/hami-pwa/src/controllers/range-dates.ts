export function rangeDates(length = 10): Date[] {
  const day: number = new Date().getDate();
  const month: number = new Date().getMonth();
  const year: number = new Date().getFullYear();

  return Array.from({ length }, (_, i) => new Date(year, month, i + day));
}
