const BASE_URL = "https://thirukkural.senkanthal.org";

type Paal = { id: number; paal: string; athikaaram: { count: number } };
type Athikaaram = { id: number; athikaaram: string };
type RawKural = { id: number; kural: string };

export async function GET() {
  try {
    const options = { next: { revalidate: 86400 } } as const;
    const [paalResponse, chapterResponse, kuralResponse] = await Promise.all([
      fetch(`${BASE_URL}/paal`, options),
      fetch(`${BASE_URL}/athikaaram`, options),
      fetch(`${BASE_URL}/kural`, options),
    ]);
    if (![paalResponse, chapterResponse, kuralResponse].every((response) => response.ok)) throw new Error("Upstream API failed");
    const paals = await paalResponse.json() as Paal[];
    const chapters = await chapterResponse.json() as Athikaaram[];
    const rawKurals = await kuralResponse.json() as RawKural[];
    const kurals = rawKurals.map((item) => ({
      number: item.id,
      lines: item.kural.split("$"),
      chapterId: Math.ceil(item.id / 10),
      paalId: item.id <= 380 ? 1 : item.id <= 1080 ? 2 : 3,
    }));
    return Response.json({ paals, chapters, kurals, source: "Senkanthal Thirukkural API", license: "MIT" }, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" },
    });
  } catch {
    return Response.json({ error: "The Kural library is temporarily unavailable." }, { status: 503 });
  }
}
