const BASE_URL = "https://tamil-kural-api.vercel.app/api/kural";

type UpstreamMeaning = {
  chapter: string;
  section: string;
  number: number;
  meaning: { ta_mu_va: string; ta_salamon: string; ta_kalaignar: string; en: string };
};

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const number = Number(id);
  if (!Number.isInteger(number) || number < 1 || number > 1330) return Response.json({ error: "Invalid Kural number." }, { status: 400 });
  try {
    const response = await fetch(`${BASE_URL}/${number}`, { next: { revalidate: 604800 } });
    if (!response.ok) throw new Error("Upstream API failed");
    const data = await response.json() as UpstreamMeaning;
    return Response.json({
      number: data.number,
      chapter: data.chapter,
      section: data.section,
      tamil: [
        { author: "மு. வரதராசனார்", text: data.meaning.ta_mu_va.replace(/^மு\.வ\s*:\s*/, "") },
        { author: "சாலமன் பாப்பையா", text: data.meaning.ta_salamon.replace(/^சாலமன் பாப்பையா\s*:\s*/, "") },
        { author: "கலைஞர்", text: data.meaning.ta_kalaignar.replace(/^கலைஞர்\s*:\s*/, "") },
      ],
      english: data.meaning.en,
      source: "nramc/thirukkural-api",
      license: "MIT repository; commentary attribution retained",
    }, { headers: { "Cache-Control": "public, s-maxage=604800, stale-while-revalidate=2592000" } });
  } catch {
    return Response.json({ error: "Meaning is temporarily unavailable." }, { status: 503 });
  }
}
