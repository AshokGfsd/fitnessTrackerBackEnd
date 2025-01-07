function ageCalculator(data = "2000-08-22") {
  let dob = new Date(data);
  let day = dob.getDate();
  let month = dob.getMonth();
  let year = dob.getFullYear();
  let currentDate = [
    new Date().getFullYear(),
    short(new Date().getMonth() + 1),
    short(new Date().getDate()),
  ].join("-");
  console.log(currentDate);
  let now = new Date(currentDate);
  let yearDiff = now.getFullYear() - year;
  let monthDiff = now.getMonth() - month;
  let dateDiff = now.getDate() - day;

  if (yearDiff < 0) return "invalid date";
  else {
    yearDiff = yearDiff - 1;
    if (monthDiff <= 0)
      if (dateDiff > 0) monthDiff = 12 + monthDiff;
      else monthDiff = 11 - monthDiff;
  }
  if (dateDiff < 0) {
    dateDiff = 30 + dateDiff;
    monthDiff -= 1;
  }
  return yearDiff;
}
function short(num) {
  return num.toString().padStart(2, "0");
}


module.exports = ageCalculator;
