const ABSOLUTE_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

/**
 * Returns a relative label ("Today", "Yesterday", "3 days ago") for dates
 * within the last week, falling back to the absolute date further back.
 */
export function formatRelativeDate(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();

  const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const diffInDays = Math.round(
    (startOfDay(now).getTime() - startOfDay(date).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays > 1 && diffInDays < 7) return `${diffInDays} days ago`;

  return ABSOLUTE_DATE_FORMATTER.format(date);
}

export function formatAbsoluteDate(isoDate: string): string {
  return ABSOLUTE_DATE_FORMATTER.format(new Date(isoDate));
}