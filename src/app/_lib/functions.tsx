export function formatDateRange(start_date: string, end_date: string) {
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  // Get the month abbreviation
  const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });
  const startMonth = monthFormatter.format(startDate);
  const endMonth = monthFormatter.format(endDate);

  // Get the day
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  // Check if months are different
  if (startMonth !== endMonth) {
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
  } else {
    return `${startMonth} ${startDay} - ${endDay}`;
  }
}

export function formatTimestampWithDate(timeStamp: Date): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  console.log(timeStamp);
  return formatter.format(timeStamp); // Example output: "Dec 27 at 5:40 PM
}
