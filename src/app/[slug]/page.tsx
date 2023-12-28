import { RadialBarChart } from "@/components/RadialBarChart/RadialBarChart";
import { headers } from "next/headers";
import { ReactNode } from "react";

const getData = async () => {
  try {
    const headersList = headers();
    const pathname = headersList.get("pathname");

    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${pathname?.replace(
        "/",
        ""
      )}?y=2023`
    );

    if (!res.ok) {
      // If the response is not successful, throw an error
      const errorResponse = await res.json();
      throw new Error(errorResponse.error || "User not found");
    }

    return res.json();
  } catch (error) {
    throw error; // Rethrow the error to be caught by the caller
  }
};

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <main className="p-8 grow h-screen gap-4 flex flex-col text-zinc-600">
      {children}{" "}
    </main>
  );
};

export default async function UserVisualisation() {
  try {
    const data = await getData();
    return (
      <Wrapper>
        <RadialBarChart apiData={data} />
      </Wrapper>
    );
  } catch (error: any) {
    return (
      <Wrapper>
        <p>Error: {error.message}</p>
      </Wrapper>
    );
  }
}
