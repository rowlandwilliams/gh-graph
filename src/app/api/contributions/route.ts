export async function GET(request: Request) {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/rowlandwilliams?y=2023`
  );
  const data = await res.json();

  return Response.json({ data });
}
