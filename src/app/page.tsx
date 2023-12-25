"use client";

import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { useResponsiveGraphDims } from "@/hooks/useResponsiveGraphWidth";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Arc } from "@visx/shape";
import { scaleSequential } from "d3-scale";
import { interpolateTurbo } from "d3-scale-chromatic";

const data = [
  { date: "2023-01-01", count: 0, level: 0 },
  { date: "2023-01-02", count: 0, level: 0 },
  { date: "2023-01-03", count: 0, level: 0 },
  { date: "2023-01-04", count: 7, level: 1 },
  { date: "2023-01-05", count: 10, level: 1 },
  { date: "2023-01-06", count: 7, level: 1 },
  { date: "2023-01-07", count: 0, level: 0 },
  { date: "2023-01-08", count: 0, level: 0 },
  { date: "2023-01-09", count: 22, level: 2 },
  { date: "2023-01-10", count: 8, level: 1 },
  { date: "2023-01-11", count: 1, level: 1 },
  { date: "2023-01-12", count: 14, level: 2 },
  { date: "2023-01-13", count: 4, level: 1 },
  { date: "2023-01-14", count: 0, level: 0 },
  { date: "2023-01-15", count: 0, level: 0 },
  { date: "2023-01-16", count: 4, level: 1 },
  { date: "2023-01-17", count: 8, level: 1 },
  { date: "2023-01-18", count: 18, level: 2 },
  { date: "2023-01-19", count: 25, level: 3 },
  { date: "2023-01-20", count: 3, level: 1 },
  { date: "2023-01-21", count: 0, level: 0 },
  { date: "2023-01-22", count: 0, level: 0 },
  { date: "2023-01-23", count: 10, level: 1 },
  { date: "2023-01-24", count: 14, level: 2 },
  { date: "2023-01-25", count: 18, level: 2 },
  { date: "2023-01-26", count: 15, level: 2 },
  { date: "2023-01-27", count: 18, level: 2 },
  { date: "2023-01-28", count: 0, level: 0 },
  { date: "2023-01-29", count: 0, level: 0 },
  { date: "2023-01-30", count: 16, level: 2 },
  { date: "2023-01-31", count: 20, level: 2 },
  { date: "2023-02-01", count: 13, level: 2 },
  { date: "2023-02-02", count: 19, level: 2 },
  { date: "2023-02-03", count: 22, level: 2 },
  { date: "2023-02-04", count: 0, level: 0 },
  { date: "2023-02-05", count: 11, level: 1 },
  { date: "2023-02-06", count: 14, level: 2 },
  { date: "2023-02-07", count: 17, level: 2 },
  { date: "2023-02-08", count: 11, level: 1 },
  { date: "2023-02-09", count: 29, level: 3 },
  { date: "2023-02-10", count: 19, level: 2 },
  { date: "2023-02-11", count: 0, level: 0 },
  { date: "2023-02-12", count: 0, level: 0 },
  { date: "2023-02-13", count: 16, level: 2 },
  { date: "2023-02-14", count: 7, level: 1 },
  { date: "2023-02-15", count: 17, level: 2 },
  { date: "2023-02-16", count: 8, level: 1 },
  { date: "2023-02-17", count: 8, level: 1 },
  { date: "2023-02-18", count: 4, level: 1 },
  { date: "2023-02-19", count: 6, level: 1 },
  { date: "2023-02-20", count: 17, level: 2 },
  { date: "2023-02-21", count: 18, level: 2 },
  { date: "2023-02-22", count: 12, level: 2 },
  { date: "2023-02-23", count: 17, level: 2 },
  { date: "2023-02-24", count: 14, level: 2 },
  { date: "2023-02-25", count: 7, level: 1 },
  { date: "2023-02-26", count: 4, level: 1 },
  { date: "2023-02-27", count: 22, level: 2 },
  { date: "2023-02-28", count: 19, level: 2 },
  { date: "2023-03-01", count: 5, level: 1 },
  { date: "2023-03-02", count: 4, level: 1 },
  { date: "2023-03-03", count: 32, level: 3 },
  { date: "2023-03-04", count: 1, level: 1 },
  { date: "2023-03-05", count: 0, level: 0 },
  { date: "2023-03-06", count: 17, level: 2 },
  { date: "2023-03-07", count: 16, level: 2 },
  { date: "2023-03-08", count: 32, level: 3 },
  { date: "2023-03-09", count: 15, level: 2 },
  { date: "2023-03-10", count: 7, level: 1 },
  { date: "2023-03-11", count: 4, level: 1 },
  { date: "2023-03-12", count: 1, level: 1 },
  { date: "2023-03-13", count: 19, level: 2 },
  { date: "2023-03-14", count: 14, level: 2 },
  { date: "2023-03-15", count: 6, level: 1 },
  { date: "2023-03-16", count: 13, level: 2 },
  { date: "2023-03-17", count: 13, level: 2 },
  { date: "2023-03-18", count: 0, level: 0 },
  { date: "2023-03-19", count: 0, level: 0 },
  { date: "2023-03-20", count: 10, level: 1 },
  { date: "2023-03-21", count: 12, level: 2 },
  { date: "2023-03-22", count: 20, level: 2 },
  { date: "2023-03-23", count: 14, level: 2 },
  { date: "2023-03-24", count: 7, level: 1 },
  { date: "2023-03-25", count: 4, level: 1 },
  { date: "2023-03-26", count: 6, level: 1 },
  { date: "2023-03-27", count: 11, level: 1 },
  { date: "2023-03-28", count: 26, level: 3 },
  { date: "2023-03-29", count: 16, level: 2 },
  { date: "2023-03-30", count: 16, level: 2 },
  { date: "2023-03-31", count: 21, level: 2 },
  { date: "2023-04-01", count: 0, level: 0 },
  { date: "2023-04-02", count: 7, level: 1 },
  { date: "2023-04-03", count: 1, level: 1 },
  { date: "2023-04-04", count: 9, level: 1 },
  { date: "2023-04-05", count: 22, level: 2 },
  { date: "2023-04-06", count: 11, level: 1 },
  { date: "2023-04-07", count: 0, level: 0 },
  { date: "2023-04-08", count: 1, level: 1 },
  { date: "2023-04-09", count: 0, level: 0 },
  { date: "2023-04-10", count: 8, level: 1 },
  { date: "2023-04-11", count: 7, level: 1 },
  { date: "2023-04-12", count: 22, level: 2 },
  { date: "2023-04-13", count: 10, level: 1 },
  { date: "2023-04-14", count: 27, level: 3 },
  { date: "2023-04-15", count: 0, level: 0 },
  { date: "2023-04-16", count: 0, level: 0 },
  { date: "2023-04-17", count: 25, level: 3 },
  { date: "2023-04-18", count: 28, level: 3 },
  { date: "2023-04-19", count: 10, level: 1 },
  { date: "2023-04-20", count: 21, level: 2 },
  { date: "2023-04-21", count: 4, level: 1 },
  { date: "2023-04-22", count: 0, level: 0 },
  { date: "2023-04-23", count: 0, level: 0 },
  { date: "2023-04-24", count: 12, level: 2 },
  { date: "2023-04-25", count: 18, level: 2 },
  { date: "2023-04-26", count: 36, level: 4 },
  { date: "2023-04-27", count: 31, level: 3 },
  { date: "2023-04-28", count: 19, level: 2 },
  { date: "2023-04-29", count: 0, level: 0 },
  { date: "2023-04-30", count: 0, level: 0 },
  { date: "2023-05-01", count: 0, level: 0 },
  { date: "2023-05-02", count: 0, level: 0 },
  { date: "2023-05-03", count: 0, level: 0 },
  { date: "2023-05-04", count: 0, level: 0 },
  { date: "2023-05-05", count: 0, level: 0 },
  { date: "2023-05-06", count: 0, level: 0 },
  { date: "2023-05-07", count: 0, level: 0 },
  { date: "2023-05-08", count: 0, level: 0 },
  { date: "2023-05-09", count: 0, level: 0 },
  { date: "2023-05-10", count: 0, level: 0 },
  { date: "2023-05-11", count: 0, level: 0 },
  { date: "2023-05-12", count: 0, level: 0 },
  { date: "2023-05-13", count: 0, level: 0 },
  { date: "2023-05-14", count: 0, level: 0 },
  { date: "2023-05-15", count: 0, level: 0 },
  { date: "2023-05-16", count: 0, level: 0 },
  { date: "2023-05-17", count: 0, level: 0 },
  { date: "2023-05-18", count: 3, level: 1 },
  { date: "2023-05-19", count: 3, level: 1 },
  { date: "2023-05-20", count: 0, level: 0 },
  { date: "2023-05-21", count: 0, level: 0 },
  { date: "2023-05-22", count: 13, level: 2 },
  { date: "2023-05-23", count: 11, level: 1 },
  { date: "2023-05-24", count: 8, level: 1 },
  { date: "2023-05-25", count: 3, level: 1 },
  { date: "2023-05-26", count: 6, level: 1 },
  { date: "2023-05-27", count: 0, level: 0 },
  { date: "2023-05-28", count: 3, level: 1 },
  { date: "2023-05-29", count: 5, level: 1 },
  { date: "2023-05-30", count: 13, level: 2 },
  { date: "2023-05-31", count: 9, level: 1 },
  { date: "2023-06-01", count: 37, level: 4 },
  { date: "2023-06-02", count: 6, level: 1 },
  { date: "2023-06-03", count: 6, level: 1 },
  { date: "2023-06-04", count: 9, level: 1 },
  { date: "2023-06-05", count: 15, level: 2 },
  { date: "2023-06-06", count: 23, level: 2 },
  { date: "2023-06-07", count: 23, level: 2 },
  { date: "2023-06-08", count: 11, level: 1 },
  { date: "2023-06-09", count: 24, level: 3 },
  { date: "2023-06-10", count: 0, level: 0 },
  { date: "2023-06-11", count: 0, level: 0 },
  { date: "2023-06-12", count: 12, level: 2 },
  { date: "2023-06-13", count: 12, level: 2 },
  { date: "2023-06-14", count: 13, level: 2 },
  { date: "2023-06-15", count: 18, level: 2 },
  { date: "2023-06-16", count: 27, level: 3 },
  { date: "2023-06-17", count: 2, level: 1 },
  { date: "2023-06-18", count: 12, level: 2 },
  { date: "2023-06-19", count: 18, level: 2 },
  { date: "2023-06-20", count: 16, level: 2 },
  { date: "2023-06-21", count: 9, level: 1 },
  { date: "2023-06-22", count: 13, level: 2 },
  { date: "2023-06-23", count: 6, level: 1 },
  { date: "2023-06-24", count: 1, level: 1 },
  { date: "2023-06-25", count: 0, level: 0 },
  { date: "2023-06-26", count: 7, level: 1 },
  { date: "2023-06-27", count: 17, level: 2 },
  { date: "2023-06-28", count: 6, level: 1 },
  { date: "2023-06-29", count: 16, level: 2 },
  { date: "2023-06-30", count: 17, level: 2 },
  { date: "2023-07-01", count: 0, level: 0 },
  { date: "2023-07-02", count: 0, level: 0 },
  { date: "2023-07-03", count: 20, level: 2 },
  { date: "2023-07-04", count: 17, level: 2 },
  { date: "2023-07-05", count: 13, level: 2 },
  { date: "2023-07-06", count: 8, level: 1 },
  { date: "2023-07-07", count: 19, level: 2 },
  { date: "2023-07-08", count: 0, level: 0 },
  { date: "2023-07-09", count: 0, level: 0 },
  { date: "2023-07-10", count: 11, level: 1 },
  { date: "2023-07-11", count: 5, level: 1 },
  { date: "2023-07-12", count: 1, level: 1 },
  { date: "2023-07-13", count: 12, level: 2 },
  { date: "2023-07-14", count: 11, level: 1 },
  { date: "2023-07-15", count: 0, level: 0 },
  { date: "2023-07-16", count: 0, level: 0 },
  { date: "2023-07-17", count: 13, level: 2 },
  { date: "2023-07-18", count: 21, level: 2 },
  { date: "2023-07-19", count: 13, level: 2 },
  { date: "2023-07-20", count: 0, level: 0 },
  { date: "2023-07-21", count: 6, level: 1 },
  { date: "2023-07-22", count: 3, level: 1 },
  { date: "2023-07-23", count: 0, level: 0 },
  { date: "2023-07-24", count: 16, level: 2 },
  { date: "2023-07-25", count: 25, level: 3 },
  { date: "2023-07-26", count: 18, level: 2 },
  { date: "2023-07-27", count: 28, level: 3 },
  { date: "2023-07-28", count: 8, level: 1 },
  { date: "2023-07-29", count: 1, level: 1 },
  { date: "2023-07-30", count: 5, level: 1 },
  { date: "2023-07-31", count: 15, level: 2 },
  { date: "2023-08-01", count: 23, level: 2 },
  { date: "2023-08-02", count: 28, level: 3 },
  { date: "2023-08-03", count: 22, level: 2 },
  { date: "2023-08-04", count: 8, level: 1 },
  { date: "2023-08-05", count: 0, level: 0 },
  { date: "2023-08-06", count: 0, level: 0 },
  { date: "2023-08-07", count: 19, level: 2 },
  { date: "2023-08-08", count: 26, level: 3 },
  { date: "2023-08-09", count: 11, level: 1 },
  { date: "2023-08-10", count: 28, level: 3 },
  { date: "2023-08-11", count: 7, level: 1 },
  { date: "2023-08-12", count: 0, level: 0 },
  { date: "2023-08-13", count: 0, level: 0 },
  { date: "2023-08-14", count: 0, level: 0 },
  { date: "2023-08-15", count: 0, level: 0 },
  { date: "2023-08-16", count: 0, level: 0 },
  { date: "2023-08-17", count: 0, level: 0 },
  { date: "2023-08-18", count: 0, level: 0 },
  { date: "2023-08-19", count: 0, level: 0 },
  { date: "2023-08-20", count: 0, level: 0 },
  { date: "2023-08-21", count: 20, level: 2 },
  { date: "2023-08-22", count: 15, level: 2 },
  { date: "2023-08-23", count: 31, level: 3 },
  { date: "2023-08-24", count: 14, level: 2 },
  { date: "2023-08-25", count: 11, level: 1 },
  { date: "2023-08-26", count: 0, level: 0 },
  { date: "2023-08-27", count: 0, level: 0 },
  { date: "2023-08-28", count: 26, level: 3 },
  { date: "2023-08-29", count: 46, level: 4 },
  { date: "2023-08-30", count: 26, level: 3 },
  { date: "2023-08-31", count: 14, level: 2 },
  { date: "2023-09-01", count: 20, level: 2 },
  { date: "2023-09-02", count: 4, level: 1 },
  { date: "2023-09-03", count: 0, level: 0 },
  { date: "2023-09-04", count: 9, level: 1 },
  { date: "2023-09-05", count: 8, level: 1 },
  { date: "2023-09-06", count: 13, level: 2 },
  { date: "2023-09-07", count: 2, level: 1 },
  { date: "2023-09-08", count: 26, level: 3 },
  { date: "2023-09-09", count: 0, level: 0 },
  { date: "2023-09-10", count: 6, level: 1 },
  { date: "2023-09-11", count: 20, level: 2 },
  { date: "2023-09-12", count: 24, level: 3 },
  { date: "2023-09-13", count: 18, level: 2 },
  { date: "2023-09-14", count: 10, level: 1 },
  { date: "2023-09-15", count: 12, level: 2 },
  { date: "2023-09-16", count: 0, level: 0 },
  { date: "2023-09-17", count: 1, level: 1 },
  { date: "2023-09-18", count: 12, level: 2 },
  { date: "2023-09-19", count: 15, level: 2 },
  { date: "2023-09-20", count: 27, level: 3 },
  { date: "2023-09-21", count: 19, level: 2 },
  { date: "2023-09-22", count: 0, level: 0 },
  { date: "2023-09-23", count: 0, level: 0 },
  { date: "2023-09-24", count: 4, level: 1 },
  { date: "2023-09-25", count: 16, level: 2 },
  { date: "2023-09-26", count: 5, level: 1 },
  { date: "2023-09-27", count: 33, level: 3 },
  { date: "2023-09-28", count: 22, level: 2 },
  { date: "2023-09-29", count: 8, level: 1 },
  { date: "2023-09-30", count: 2, level: 1 },
  { date: "2023-10-01", count: 2, level: 1 },
  { date: "2023-10-02", count: 11, level: 1 },
  { date: "2023-10-03", count: 9, level: 1 },
  { date: "2023-10-04", count: 27, level: 3 },
  { date: "2023-10-05", count: 36, level: 4 },
  { date: "2023-10-06", count: 16, level: 2 },
  { date: "2023-10-07", count: 0, level: 0 },
  { date: "2023-10-08", count: 0, level: 0 },
  { date: "2023-10-09", count: 7, level: 1 },
  { date: "2023-10-10", count: 37, level: 4 },
  { date: "2023-10-11", count: 13, level: 2 },
  { date: "2023-10-12", count: 11, level: 1 },
  { date: "2023-10-13", count: 0, level: 0 },
  { date: "2023-10-14", count: 0, level: 0 },
  { date: "2023-10-15", count: 0, level: 0 },
  { date: "2023-10-16", count: 20, level: 2 },
  { date: "2023-10-17", count: 35, level: 4 },
  { date: "2023-10-18", count: 11, level: 1 },
  { date: "2023-10-19", count: 16, level: 2 },
  { date: "2023-10-20", count: 3, level: 1 },
  { date: "2023-10-21", count: 0, level: 0 },
  { date: "2023-10-22", count: 0, level: 0 },
  { date: "2023-10-23", count: 21, level: 2 },
  { date: "2023-10-24", count: 14, level: 2 },
  { date: "2023-10-25", count: 7, level: 1 },
  { date: "2023-10-26", count: 26, level: 3 },
  { date: "2023-10-27", count: 11, level: 1 },
  { date: "2023-10-28", count: 0, level: 0 },
  { date: "2023-10-29", count: 0, level: 0 },
  { date: "2023-10-30", count: 32, level: 3 },
  { date: "2023-10-31", count: 11, level: 1 },
  { date: "2023-11-01", count: 43, level: 4 },
  { date: "2023-11-02", count: 12, level: 2 },
  { date: "2023-11-03", count: 14, level: 2 },
  { date: "2023-11-04", count: 0, level: 0 },
  { date: "2023-11-05", count: 0, level: 0 },
  { date: "2023-11-06", count: 58, level: 4 },
  { date: "2023-11-07", count: 18, level: 2 },
  { date: "2023-11-08", count: 15, level: 2 },
  { date: "2023-11-09", count: 22, level: 2 },
  { date: "2023-11-10", count: 29, level: 3 },
  { date: "2023-11-11", count: 0, level: 0 },
  { date: "2023-11-12", count: 0, level: 0 },
  { date: "2023-11-13", count: 0, level: 0 },
  { date: "2023-11-14", count: 0, level: 0 },
  { date: "2023-11-15", count: 0, level: 0 },
  { date: "2023-11-16", count: 0, level: 0 },
  { date: "2023-11-17", count: 0, level: 0 },
  { date: "2023-11-18", count: 0, level: 0 },
  { date: "2023-11-19", count: 0, level: 0 },
  { date: "2023-11-20", count: 18, level: 2 },
  { date: "2023-11-21", count: 21, level: 2 },
  { date: "2023-11-22", count: 26, level: 3 },
  { date: "2023-11-23", count: 32, level: 3 },
  { date: "2023-11-24", count: 19, level: 2 },
  { date: "2023-11-25", count: 0, level: 0 },
  { date: "2023-11-26", count: 0, level: 0 },
  { date: "2023-11-27", count: 17, level: 2 },
  { date: "2023-11-28", count: 45, level: 4 },
  { date: "2023-11-29", count: 10, level: 1 },
  { date: "2023-11-30", count: 45, level: 4 },
  { date: "2023-12-01", count: 21, level: 2 },
  { date: "2023-12-02", count: 4, level: 1 },
  { date: "2023-12-03", count: 3, level: 1 },
  { date: "2023-12-04", count: 17, level: 2 },
  { date: "2023-12-05", count: 31, level: 3 },
  { date: "2023-12-06", count: 25, level: 3 },
  { date: "2023-12-07", count: 40, level: 4 },
  { date: "2023-12-08", count: 6, level: 1 },
  { date: "2023-12-09", count: 0, level: 0 },
  { date: "2023-12-10", count: 0, level: 0 },
  { date: "2023-12-11", count: 39, level: 4 },
  { date: "2023-12-12", count: 16, level: 2 },
  { date: "2023-12-13", count: 23, level: 2 },
  { date: "2023-12-14", count: 29, level: 3 },
  { date: "2023-12-15", count: 21, level: 2 },
  { date: "2023-12-16", count: 3, level: 1 },
  { date: "2023-12-17", count: 2, level: 1 },
  { date: "2023-12-18", count: 11, level: 1 },
  { date: "2023-12-19", count: 25, level: 3 },
  { date: "2023-12-20", count: 39, level: 4 },
  { date: "2023-12-21", count: 34, level: 3 },
  { date: "2023-12-22", count: 13, level: 2 },
  { date: "2023-12-23", count: 0, level: 0 },
  { date: "2023-12-24", count: 7, level: 1 },
  { date: "2023-12-25", count: 0, level: 0 },
  { date: "2023-12-26", count: 0, level: 0 },
  { date: "2023-12-27", count: 0, level: 0 },
  { date: "2023-12-28", count: 0, level: 0 },
  { date: "2023-12-29", count: 0, level: 0 },
  { date: "2023-12-30", count: 0, level: 0 },
  { date: "2023-12-31", count: 0, level: 0 },
];

export default function Home() {
  const { ref, graphHeight, graphWidth } = useResponsiveGraphDims();
  const dims = [graphHeight, graphWidth];
  const dim = Math.min(...dims);

  // Extract levels and counts from data
  const counts = data.map((d) => d.count);
  const dates = data.map((d) => d.date);

  // Set up scales
  const outerRadius = dim / 2;
  const innerRadius = (0.2 * graphWidth) / 2;

  const countScale = scaleLinear({
    domain: [0, Math.max(...counts)],
    range: [innerRadius, outerRadius],
  });

  const datesScale = scaleBand({ domain: dates, range: [0, Math.PI * 2] });
  const colorScale = scaleSequential(interpolateTurbo).domain([
    0,
    Math.max(...counts),
  ]);

  const generateIncrements = (
    innerRadius: number,
    outerRadius: number
  ): number[] => {
    const stepSize = (outerRadius - innerRadius) * 0.1;
    const numberOfIncrements =
      Math.ceil((outerRadius - innerRadius) / stepSize) + 1;

    return Array.from(
      { length: numberOfIncrements },
      (_, index) => innerRadius + index * stepSize
    );
  };

  const increments = generateIncrements(innerRadius, outerRadius);

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
                className="fill-none stroke-zinc-200 dark:stroke-zinc-600"
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
                  className="stroke-[2.5px]"
                />
              );

              return arcPath;
            })}
          </g>
        </svg>
      </div>
    </main>
  );
}
