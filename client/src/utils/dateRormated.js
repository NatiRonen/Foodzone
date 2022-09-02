export const getFromattedDate = (_date) => {
  // returns date in format of mm-dd-yyyy
  _date = new Date(_date);
  _date = new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(_date);
  return _date;
};

export const getFormatedTime = (_date) => {
  _date = new Date(_date);
  const time = _date.toLocaleTimeString([], {
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
  });
  return time;
};

export const getTimeAndDateFormat = (_date) => {
  return getFormatedTime(_date) + " " + getFromattedDate(_date);
};
