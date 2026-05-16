type HeyGenV3Options = {
  requiredFields?: string[];
};

const HEYGEN_V3_BASE_URL = "https://api.heygen.com/v3";

export async function postHeyGenV3(path: string, body: unknown, options: HeyGenV3Options = {}) {
  const apiKey = process.env.HEYGEN_VIDEO_AGENT_API_KEY || process.env.HEYGEN_API_KEY;

  if (!apiKey) {
    return Response.json(
      {
        error: "HeyGen API key is not configured on the server."
      },
      { status: 503 }
    );
  }

  if (!isPlainObject(body)) {
    return Response.json({ error: "Request body must be a JSON object." }, { status: 400 });
  }

  const missingField = options.requiredFields?.find((field) => !hasNestedValue(body, field));

  if (missingField) {
    return Response.json({ error: `Missing required field: ${missingField}` }, { status: 400 });
  }

  const upstream = await fetch(`${HEYGEN_V3_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey
    },
    body: JSON.stringify(body),
    cache: "no-store"
  });

  const contentType = upstream.headers.get("content-type") || "application/json";
  const payload = await upstream.text();

  return new Response(payload, {
    status: upstream.status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": contentType
    }
  });
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function hasNestedValue(value: Record<string, unknown>, path: string) {
  const resolved = path.split(".").reduce<unknown>((current, key) => {
    if (!isPlainObject(current)) return undefined;
    return current[key];
  }, value);

  if (Array.isArray(resolved)) return resolved.length > 0;
  return typeof resolved === "string" ? resolved.trim().length > 0 : resolved !== undefined && resolved !== null;
}
