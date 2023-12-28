"use client";

import { useResponsiveGraphDims } from "@/hooks/useResponsiveGraphWidth";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Arc } from "@visx/shape";
import { scaleSequential } from "d3-scale";
import { interpolateTurbo } from "d3-scale-chromatic";

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

// Example usage:
interface Props {
  apiData: any;
}

export const RadialBarChart = ({ apiData }: Props) => {
  const data = apiData.contributions;

  const { ref, graphHeight, graphWidth } = useResponsiveGraphDims();
  const dims = [graphHeight, graphWidth];
  const dim = Math.min(...dims);
  const dimPadding = 50;
  const dimFinal = dim - dimPadding;
  const factor = 5;

  // Extract levels and counts from data
  const counts = data.map((d: { count: number }) => d.count);
  const dates = data.map((d: { date: string }) => d.date);
  const maxCount = Math.max(...counts);
  const maxCountRoundedUp = Math.ceil(maxCount / factor) * factor;

  const nCircles = maxCountRoundedUp / factor;

  // Set up scales
  const outerRadius = dimFinal / 2;
  const innerRadius = (0.6 * dimFinal) / 2;

  const countScale = scaleLinear({
    domain: [0, maxCountRoundedUp],
    range: [innerRadius, outerRadius],
  });

  const datesScale = scaleBand({ domain: dates, range: [0, Math.PI * 2] });
  const colorScale = scaleSequential(interpolateTurbo).domain([
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
    const x2 = dim / 2 + (outerRadius + innerExtension) * Math.cos(angle);
    const y2 = dim / 2 + (outerRadius + innerExtension) * Math.sin(angle);

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
    <div
      className="grow w-full h-full min-w-[800px] flex justify-center mx-auto"
      ref={ref}
    >
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
          {data.map((d: any, i: number) => {
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
  );
};
