import { parse, isDate } from "date-fns";

const parseDateString = (value, originalValue) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsedDate;
}

const makeDate = (isoDate, delimiter) => {
  var date = new Date(isoDate);
  return `${date.getUTCDate()}${delimiter}${date.getUTCMonth() + 1}${delimiter}${date.getFullYear()}`;
}

const makeUSDate = (isoDate, delimiter) => {
  var date = new Date(isoDate);
  return `${date.getFullYear()}${delimiter}${date.getUTCMonth() + 1}${delimiter}${date.getUTCDate()}`
}

const dateHelper = {
  parseDateString,
  makeDate,
  makeUSDate
}

export default dateHelper;