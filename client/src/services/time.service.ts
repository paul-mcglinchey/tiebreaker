export const parseTimeDifference = (target: Date) => {
  const currentDate: Date = new Date();
  const milliDiff: number = currentDate.getTime() - new Date(target).getTime();
  const secondsDiff = milliDiff / 1000;
  const minutesDiff = secondsDiff / 60;
  const hoursDiff = minutesDiff / 60;
  const daysDiff = hoursDiff / 60;

  if (daysDiff >= 1) return `${Math.floor(daysDiff)}d ago`
  else if (hoursDiff >= 1) return `${Math.floor(hoursDiff)}h ago`
  else if (minutesDiff >= 1) return `${Math.floor(minutesDiff)}m ago`
  else if (secondsDiff >= 30) return `${Math.floor(secondsDiff)}s ago`
  else return "Just now";
}