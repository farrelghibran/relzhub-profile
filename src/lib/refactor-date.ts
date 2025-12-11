export function RefactorDate(dateString: Date): Date {
  const now = new Date();

  const combined = new Date(
    dateString.getFullYear(),
    dateString.getMonth(),
    dateString.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds()
  );

  return combined;
}
