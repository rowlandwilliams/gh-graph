import { RadialBarChart } from "@/components/RadialBarChart/RadialBarChart";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { headers } from "next/headers";

const getData = async () => {
  const headersList = headers();
  const incomingUrl = headersList.get("x-url");

  const res = await fetch(`${incomingUrl}/api/contributions`);
  return res.json();
};

export default async function Home() {
  const data = await getData();

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
