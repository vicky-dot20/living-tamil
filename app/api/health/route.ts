export const dynamic = "force-static";

export function GET() {
  return Response.json({ status: "ok", service: "living-tamil", version: "0.5.0" }, { headers: { "Cache-Control": "no-store" } });
}
