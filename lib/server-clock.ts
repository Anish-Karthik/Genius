export function getIST () {
  var dateIST = new Date();
  //date shifting for IST timezone (+5 hours and 30 minutes)
  dateIST.setHours(dateIST.getHours() + 5); 
  dateIST.setMinutes(dateIST.getMinutes() + 30);
  return dateIST;
}

// a function to check time is 00:00:00
export function isNewDay (dateIST: Date) {
  return dateIST.getHours() === 0 && dateIST.getMinutes() === 0 && dateIST.getSeconds() === 0;
}
export function isNewWeek (date: Date) {
  return isNewDay(date) && date.getUTCDay() === 1;
}

export function getServerTime () {
  var dateIST = getIST();
  var date = new Date();
  var diff = dateIST.getTime() - date.getTime();
  var serverTime = new Date(date.getTime() + diff);
  return serverTime;
}
export function isSameTime(date1: Date, date2: Date) {
  return date1.getUTCHours() === date2.getUTCHours() && date1.getUTCMinutes() === date2.getUTCMinutes() && date1.getUTCSeconds() === date2.getUTCSeconds();
}