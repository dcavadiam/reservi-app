export function isToday(date: Date, todayDate: Date): boolean {
  const today = new Date(todayDate);
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
