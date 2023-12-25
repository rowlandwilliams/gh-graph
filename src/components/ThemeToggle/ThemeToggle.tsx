"use client";

import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => {
        theme == "dark" ? setTheme("light") : setTheme("dark");
      }}
      className="relative rounded-full border-dashed dark:border dark:border-orange-400 dark:p-1"
    >
      <div className="h-4 w-4 rounded-full bg-zinc-700 dark:bg-gradient-to-t dark:h-2 dark:w-2 dark:from-pink-600 dark:to-yellow-400 " />
      <div className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-gray-50 dark:hidden" />
    </button>
  );
};
