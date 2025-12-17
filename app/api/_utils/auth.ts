export function validateApiKey(req: Request) {
  const header = req.headers.get("x-api-key");

  if (!header || header !== process.env.GLIDE_API_KEY) {
    return false;
  }

  return true;
}
