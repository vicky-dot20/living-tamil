const ENDPOINT = "https://thirukkural.senkanthal.org/random";

export async function GET() {
  try {
    const response = await fetch(ENDPOINT, { next: { revalidate: 86400 } });
    if (!response.ok) throw new Error("Upstream API failed");
    return Response.json(await response.json(), { headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" } });
  } catch {
    return Response.json({ error: "The daily Kural is temporarily unavailable." }, { status: 503 });
  }
}
