import { parse, isDate } from "date-fns";

export const parseDateString = (value, originalValue) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsedDate;
}

export const makeDate = (isoDate, delimiter) => {
  var date = new Date(isoDate);
  return `${date.getDate()}${delimiter}${date.getMonth() + 1}${delimiter}${date.getFullYear()}`;
}

export const makeUSDate = (isoDate, delimiter) => {
  var date = new Date(isoDate);
  return `${date.getFullYear()}${delimiter}${date.getMonth() + 1}${delimiter}${date.getDate()}`
}

export default parseDateString;