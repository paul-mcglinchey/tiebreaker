import { parse, isDate } from "date-fns";

export const parseDateString = (originalValue: string)  => {
  if (isDate(originalValue)) return originalValue;

  if (typeof originalValue === "string") {
    return parse(originalValue, "yyyy-MM-dd", new Date());
  } else {
    return new Date();
  }
}

export const makeDate = (isoDate: Date, delimiter: string) => {
  var date = new Date(isoDate);
  return `${date.getUTCDate()}${delimiter}${date.getUTCMonth() + 1}${delimiter}${date.getFullYear()}`;
}

export const makeUSDate = (isoDate: Date, delimiter: string) => {
  var date = new Date(isoDate);
  return `${date.getFullYear()}${delimiter}${date.getUTCMonth() + 1}${delimiter}${date.getUTCDate()}`
}