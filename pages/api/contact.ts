import type { NextApiRequest, NextApiResponse } from "next";

const requestLog = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type ContactPayload = {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
  website?: string;
};

type ApiResponse = {
  ok: boolean;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const forwardedFor = req.headers["x-forwarded-for"];
  const ip =
    (Array.isArray(forwardedFor)
      ? forwardedFor[0]
      : forwardedFor?.split(",")[0]) ||
    req.socket.remoteAddress ||
    "unknown";
  const now = Date.now();
  const recentRequests = (requestLog.get(ip) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );
  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return res.status(429).json({ ok: false, error: "Too many requests." });
  }
  recentRequests.push(now);
  requestLog.set(ip, recentRequests);

  const body = req.body && typeof req.body === "object" ? req.body : {};
  const { name, email, service, message, website } = body as ContactPayload;

  if (website) {
    return res.status(200).json({ ok: true });
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    name.length > 120 ||
    email.length > 254 ||
    (service && (typeof service !== "string" || service.length > 80)) ||
    (message && (typeof message !== "string" || message.length > 5000))
  ) {
    return res
      .status(400)
      .json({ ok: false, error: "Name and email are required." });
  }

  const webhookUrl = process.env.DISCORD_CONTACT_WEBHOOK_URL;
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CONTACT_CHAT_ID;
  if (!webhookUrl || !telegramToken || !telegramChatId) {
    console.error("Contact notification configuration is incomplete.");
    return res
      .status(500)
      .json({ ok: false, error: "Server misconfiguration." });
  }

  const embed = {
    title: "📨 Penawaran Baru dari Contact Form",
    color: 0xc88a3d, // codeverta gold
    fields: [
      { name: "👤 Nama", value: name.trim(), inline: true },
      { name: "📧 Email", value: email.trim(), inline: true },
      ...(service
        ? [{ name: "🛠️ Layanan", value: service.trim(), inline: false }]
        : []),
      ...(message
        ? [{ name: "💬 Pesan", value: message.trim(), inline: false }]
        : []),
    ],
    footer: { text: "Codeverta — codeverta.com" },
    timestamp: new Date().toISOString(),
  };

  try {
    const telegramText = [
      "📨 Pesan baru dari Contact Form Codeverta",
      `👤 Nama: ${name.trim()}`,
      `📧 Email: ${email.trim()}`,
      service ? `🛠️ Layanan: ${service.trim()}` : "",
      message ? `💬 Pesan: ${message.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const [discordRes, telegramRes] = await Promise.all([
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ embeds: [embed] }),
      }),
      fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: telegramChatId, text: telegramText }),
      }),
    ]);

    if (!discordRes.ok || !telegramRes.ok) {
      console.error("Contact notification error:", {
        discord: discordRes.status,
        telegram: telegramRes.status,
      });
      return res
        .status(502)
        .json({ ok: false, error: "Failed to send contact notifications." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Error sending to Discord:", err);
    return res.status(500).json({ ok: false, error: "Internal server error." });
  }
}
