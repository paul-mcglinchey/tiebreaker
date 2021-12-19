import { parse, isDate } from "date-fns";

const parseDateString = (value, originalValue) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsedDate;
}

const makeDate = (isoDate, delimiter) => {
  var date = new Date(isoDate);
  return `${date.getDate()}${delimiter}${date.getMonth() + 1}${delimiter}${date.getFullYear()}`;
}

const makeUSDate = (isoDate, delimiter) => {
  var date = new Date(isoDate);
  return `${date.getFullYear()}${delimiter}${date.getMonth() + 1}${delimiter}${date.getDate()}`
}

export const dateHelper = {
  parseDateString,
  makeDate,
  makeUSDate
}