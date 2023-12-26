import { RadialBarChart } from "@/components/RadialBarChart/RadialBarChart";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";

const getData = async () => {
  const res = await fetch(`http://localhost:3000/api/contributions`);
  return res.json();
};

export default async function Home() {
  const data = await getData();

  console.log(data);
  return (
    <main className="p-8 grow h-screen gap-4 flex flex-col  text-zinc-600">
      <div className="items-center absolute flex gap-x-4 ">
        <ThemeToggle />
        <input
          placeholder="@github_username"
          className="px-2 w-32 bg-zinc-800 border border-teal-500 rounded-sm h-8"
        />
      </div>
      <RadialBarChart apiData={data} />
    </main>
  );
}
