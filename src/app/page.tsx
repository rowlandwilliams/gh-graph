export default async function Home() {
  return (
    <main className="p-8 grow h-screen gap-4 flex flex-col items-center justify-center text-zinc-600">
      <div className="space-y-8">
        <h1 className="m-auto dark:text-white text-6xl font-semibold">
          Your GitHub year visualised
        </h1>
        <input
          placeholder="@github_username"
          className="px-2 w-80 bg-zinc-800 border border-teal-500 rounded-sm h-8"
        />
      </div>
    </main>
  );
}
