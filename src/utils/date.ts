export const dateToYearMonthDay = (date: Date) =>
  new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);

export const dateToMonthWordYear = (date: Date) =>
  new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'long'
  }).format(date);
