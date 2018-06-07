export const extractWeekday = dateToExtractWeekDayFrom =>
  new Date(dateToExtractWeekDayFrom).toDateString().substr(0, 3);

export const convertUnixToDate = unixTimestamp =>
  new Date(unixTimestamp * 1000);

export const sortHourIntervalsIntoWeekdays = arrayOfData => {
  const result = arrayOfData.reduce((set, element) => {
    // Get a readable Day from current iterations date
    const dateOfCurrentElement = convertUnixToDate(element.dt);
    // Add these properties & values to the current object to use for later
    element.temp = element.main.temp;
    element.day = extractWeekday(dateOfCurrentElement.toDateString());
    element.time = `${dateOfCurrentElement.getHours()}:00`;

    // If the accumulator (previous group) has "quasi-index" of the current day
    // push the current day in to that group since they're of the same day
    // else create a new array and push the currentday into that one since the day
    // has obviously changed
    set[element.day] = set[element.day] || [];
    set[element.day].push(element);
    // return the whole array to the next iteration and in the end to the week variable
    return set;
  }, {});
  return result;
};

export const filterTodaysHourIntervals = objectOfData => {
  const weekday = extractWeekday(Date.now());

  const mapOfData = new Map(Object.entries(objectOfData));
  const todaysHourIntervals = mapOfData.get(weekday);
  return todaysHourIntervals;
};
