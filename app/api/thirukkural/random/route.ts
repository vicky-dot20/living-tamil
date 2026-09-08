import { upstreamError, upstreamSignal } from "@/lib/upstream";
const ENDPOINT = "https://thirukkural.senkanthal.org/random";

export async function GET() {
  try {
    const response = await fetch(ENDPOINT, { next: { revalidate: 86400 }, signal: upstreamSignal() });
    if (!response.ok) throw new Error("Upstream API failed");
    return Response.json(await response.json(), { headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" } });
  } catch (error) {
    return Response.json({ error: "The daily Kural is temporarily unavailable.", reason: upstreamError(error), retryable: true }, { status: 503, headers: { "Retry-After": "60" } });
  }
}
