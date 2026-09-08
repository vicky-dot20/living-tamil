export const UPSTREAM_TIMEOUT_MS = 8000;
export function upstreamSignal() { return AbortSignal.timeout(UPSTREAM_TIMEOUT_MS); }
export function upstreamError(error: unknown) { return error instanceof DOMException && error.name === "TimeoutError" ? "timeout" : "unavailable"; }
