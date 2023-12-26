type DataEntry = {
  date: string;
  count: number;
  level: number;
};

export const generateRandomData = (): DataEntry[] => {
  const startDate = new Date("2023-01-01");
  const endDate = new Date("2023-12-31");

  const dateArray = Array.from(
    {
      length:
        (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000) + 1,
    },
    (_, index) => {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + index);
      return currentDate;
    }
  );

  const data: DataEntry[] = dateArray.map((date) => {
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const randomValue = isWeekend
      ? [0, 2, 3][Math.floor(Math.random() * 3)]
      : Math.floor(Math.random() * 50);

    const dateString = date.toISOString().split("T")[0]; // Get date in "YYYY-MM-DD" format

    return {
      date: dateString,
      count: randomValue,
      level: isWeekend ? 0 : Math.floor(Math.random() * 2), // Level 0 for weekends
    };
  });

  return data;
};
