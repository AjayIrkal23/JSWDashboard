export const roundOff = (value) => {
  console.debug("roundOff - value:", value);
  return Math.round(value);
};

export const ToMins = (value) => {
  console.debug("ToMins - value:", value);
  return Math.round(value / 60);
};

export const ToAverage = (value, length) => {
  console.debug("ToAverage - value:", value, "length:", length);
  return value / length;
};

export const getLabels = () => {
  const labels = [];
  const hours = Array.from({ length: 8 }, (_, i) => i);
  const currentDate = new Date();

  const formatDate = (date, time) =>
    `${date.getFullYear()} ${date.getMonth() + 1} ${date.getDate()} ${time}`;

  const now = formatDate(currentDate, currentDate.toLocaleTimeString());
  const shift1Start = formatDate(currentDate, "6:30:00");
  const shift2Start = formatDate(currentDate, "14:30:00");
  const shift3Start = formatDate(currentDate, "21:30:00");
  const shiftEnd = formatDate(
    new Date(currentDate.setDate(currentDate.getDate() + 1)),
    "6:30:00"
  );

  const populateLabels = (shiftStart) => {
    hours.forEach((hour) => {
      const dateStart = new Date(
        new Date(shiftStart).setHours(new Date(shiftStart).getHours() + hour)
      );
      labels.push(dateStart.toLocaleTimeString());
    });
  };

  if (
    new Date(now) > new Date(shift1Start) &&
    new Date(now) < new Date(shift2Start)
  ) {
    console.debug("Shift 1 active");
    populateLabels(shift1Start);
  } else if (
    new Date(now) > new Date(shift2Start) &&
    new Date(now) < new Date(shift3Start)
  ) {
    console.debug("Shift 2 active");
    populateLabels(shift2Start);
  } else if (
    new Date(now) > new Date(shift3Start) &&
    new Date(now) < new Date(shiftEnd)
  ) {
    console.debug("Shift 3 active");
    populateLabels(shift3Start);
  } else {
    labels.push(...Array.from({ length: 9 }, (_, i) => i + 1));
  }

  console.debug("Generated labels:", labels);
  return labels;
};
