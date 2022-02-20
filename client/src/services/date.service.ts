import { parse, isDate } from "date-fns";

export const parseDateString = (originalValue: string) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsedDate;
}

export const makeDate = (isoDate: Date, delimiter: string) => {
  var date = new Date(isoDate);
  return `${date.getUTCDate()}${delimiter}${date.getUTCMonth() + 1}${delimiter}${date.getFullYear()}`;
}

export const makeUSDate = (isoDate: Date, delimiter: string) => {
  var date = new Date(isoDate);
  return `${date.getFullYear()}${delimiter}${date.getUTCMonth() + 1}${delimiter}${date.getUTCDate()}`
}