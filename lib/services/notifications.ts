export async function sendWebhook(event: string, payload: any) {
  const webhookUrl = process.env.WAKANOW_WEBHOOK_URL;
  if (!webhookUrl) return;

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event,
      data: payload,
      timestamp: new Date().toISOString(),
    }),
  });
}
