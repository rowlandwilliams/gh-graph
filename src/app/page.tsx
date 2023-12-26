import { RadialBarChart } from "@/components/RadialBarChart/RadialBarChart";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";

export default function Home() {
  return (
    <main className="p-8 grow h-screen gap-4 flex flex-col  text-zinc-600">
      <div className="items-center absolute flex gap-x-4 ">
        <ThemeToggle />
        <input
          placeholder="@github_username"
          className="px-2 w-32 bg-zinc-800 border border-teal-500 rounded-sm h-8"
        />
      </div>
      <RadialBarChart />
    </main>
  );
}
