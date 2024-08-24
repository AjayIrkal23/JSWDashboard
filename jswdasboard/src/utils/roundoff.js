export const roundOff = (value) => Math.round(value);

export const ToMins = (value) => Math.round(value / 60);

export const ToAverage = (value, length) => value / length;

export const getLabels = () => {
  const arr = [];
  const arr1 = [0, 1, 2, 3, 4, 5, 6, 7];

  const currentDate = new Date();

  const formatDate = (date, time) =>
    `${date.getFullYear()} ${date.getMonth() + 1} ${date.getDate()} ${time}`;

  const datetoday = currentDate.getTime();

  const shift1 = new Date(formatDate(currentDate, "6:30:00")).getTime();
  const shift2 = new Date(formatDate(currentDate, "14:30:00")).getTime();
  const shift3 = new Date(formatDate(currentDate, "21:30:00")).getTime();
  const end = new Date(
    formatDate(
      new Date(currentDate.setDate(currentDate.getDate() + 1)),
      "6:30:00"
    )
  ).getTime();

  const generateLabels = (shiftStart) => {
    arr1.forEach((item) => {
      const dateStart = new Date(shiftStart).setHours(
        new Date(shiftStart).getHours() + item
      );
      const plus = new Date(dateStart).toLocaleTimeString();
      arr.push(plus);
    });
  };

  if (datetoday > shift1 && datetoday < shift2) {
    console.log("shift1");
    generateLabels(shift1);
  } else if (datetoday > shift2 && datetoday < shift3) {
    console.log("shift2");
    generateLabels(shift2);
  } else if (datetoday > shift3 && datetoday < end) {
    console.log("shift3");
    generateLabels(shift3);
  } else {
    arr.push(1, 2, 3, 4, 5, 6, 7, 8, 9);
  }

  return arr;
};
