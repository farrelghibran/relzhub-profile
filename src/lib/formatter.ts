export function compactFormat(value: number) {
  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
  });

  return formatter.format(value);
}

export function dateFormat(date: string) {
  return new Date(date).toLocaleDateString("en-EN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
