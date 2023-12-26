"use client";

import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { useResponsiveGraphDims } from "@/hooks/useResponsiveGraphWidth";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Arc } from "@visx/shape";
import { scaleSequential } from "d3-scale";
import {
  interpolateTurbo,
  interpolateCividis,
  interpolateGreens,
  interpolateOrRd,
} from "d3-scale-chromatic";

type DataEntry = {
  date: string;
  count: number;
  level: number;
};

const monthStrings: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function generateRandomData(): DataEntry[] {
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
      : Math.floor(Math.random() * 110);

    const dateString = date.toISOString().split("T")[0]; // Get date in "YYYY-MM-DD" format

    return {
      date: dateString,
      count: randomValue,
      level: isWeekend ? 0 : Math.floor(Math.random() * 2), // Level 0 for weekends
    };
  });

  return data;
}

// Example usage:
const data = generateRandomData();

export default function Home() {
  const { ref, graphHeight, graphWidth } = useResponsiveGraphDims();
  const dims = [graphHeight, graphWidth];
  const dim = Math.min(...dims);
  const dimPadding = 50;
  const dimFinal = dim - dimPadding;

  // Extract levels and counts from data
  const counts = data.map((d) => d.count);
  const dates = data.map((d) => d.date);
  const maxCount = Math.max(...counts);
  const maxCountRoundedUp = Math.ceil(maxCount / 10) * 10;

  const nCircles = maxCountRoundedUp / 10;

  // Set up scales
  const outerRadius = dimFinal / 2;
  const innerRadius = (0.6 * dimFinal) / 2;

  const countScale = scaleLinear({
    domain: [0, maxCountRoundedUp],
    range: [innerRadius, outerRadius],
  });

  const datesScale = scaleBand({ domain: dates, range: [0, Math.PI * 2] });
  const colorScale = scaleSequential(interpolateOrRd).domain([
    0,
    maxCountRoundedUp,
  ]);

  const generateIncrements = (
    innerRadius: number,
    outerRadius: number,
    nCircles: number
  ): number[] => {
    const stepSize = (outerRadius - innerRadius) / nCircles;
    const numberOfIncrements =
      Math.ceil((outerRadius - innerRadius) / stepSize) + 1;

    return Array.from(
      { length: numberOfIncrements },
      (_, index) => innerRadius + index * stepSize
    );
  };

  const increments = generateIncrements(innerRadius, outerRadius, nCircles);

  const innerExtension = 20; // Set the extension length for the lines into the inner circle

  const months = Array.from({ length: 12 }, (_, i) => i); // 0 to 11 representing January to December
  const monthLabels = months.map((month) => {
    const angle = (month / 12) * Math.PI * 2 - Math.PI / 2; // Adjust the starting angle to 12 o'clock
    const x1 = dim / 2 + (innerRadius - innerExtension) * Math.cos(angle);
    const y1 = dim / 2 + (innerRadius - innerExtension) * Math.sin(angle);
    const x2 = dim / 2 + outerRadius * Math.cos(angle);
    const y2 = dim / 2 + outerRadius * Math.sin(angle);

    // Calculate the position for the text labels
    const labelX = dim / 2 + (innerRadius - 30) * Math.cos(angle);
    const labelY = dim / 2 + (innerRadius - 30) * Math.sin(angle);

    // Calculate the angle for the text rotation
    const labelAngle = angle + Math.PI / 2; // Rotate by 90 degrees to make the labels perpendicular

    return (
      <g key={`month-group-${month}`}>
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          className="stroke-zinc-300 dark:stroke-zinc-600"
        />
        <text
          x={labelX}
          y={labelY}
          dy="0.3em"
          textAnchor="middle"
          transform={`rotate(${
            (labelAngle * 180) / Math.PI
          }, ${labelX}, ${labelY})`}
          className="fill-zinc-400 dark:fill-zinc-300 text-[10px] "
        >
          {monthStrings[month]}
        </text>
      </g>
    );
  });

  return (
    <main className="p-8 grow h-screen gap-4 flex flex-col  text-zinc-600">
      <div className="items-center absolute flex gap-x-4 ">
        <ThemeToggle />
        <input
          placeholder="@github_username"
          className="px-2 w-32 bg-zinc-800 border border-teal-500 rounded-sm h-8"
        />
      </div>
      <div className="grow w-full h-full flex justify-center mx-auto" ref={ref}>
        <svg height={dim} width={dim}>
          <g>
            {increments.map((increment) => (
              <circle
                key={increment}
                r={increment}
                cx={dim / 2}
                cy={dim / 2}
                className="fill-none stroke-zinc-300 dark:stroke-zinc-600"
              />
            ))}
          </g>
          <g transform={`translate(${dim / 2}, ${dim / 2})`}>
            {data.map((d, i) => {
              const arcPath = (
                <Arc
                  key={`arc-${i}`}
                  data={d}
                  innerRadius={countScale(0)}
                  outerRadius={countScale(d.count)}
                  startAngle={datesScale(d.date)}
                  endAngle={datesScale(d.date) || 0 + datesScale.bandwidth()}
                  padAngle={0.9}
                  stroke={String(colorScale(d.count)) || undefined}
                  className="stroke-[2.15px]"
                />
              );

              return arcPath;
            })}
          </g>
          {monthLabels}
        </svg>
      </div>
    </main>
  );
}
