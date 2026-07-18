import type { NextApiRequest, NextApiResponse } from "next";

type ContactPayload = {
  name: string;
  email: string;
  service?: string;
  message?: string;
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

  const { name, email, service, message } = req.body as ContactPayload;

  if (!name || !email) {
    return res
      .status(400)
      .json({ ok: false, error: "Name and email are required." });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("DISCORD_WEBHOOK_URL is not configured.");
    return res
      .status(500)
      .json({ ok: false, error: "Server misconfiguration." });
  }

  const embed = {
    title: "📨 Penawaran Baru dari Contact Form",
    color: 0xc88a3d, // codeverta gold
    fields: [
      { name: "👤 Nama", value: name, inline: true },
      { name: "📧 Email", value: email, inline: true },
      ...(service
        ? [{ name: "🛠️ Layanan", value: service, inline: false }]
        : []),
      ...(message ? [{ name: "💬 Pesan", value: message, inline: false }] : []),
    ],
    footer: { text: "Codeverta — codeverta.com" },
    timestamp: new Date().toISOString(),
  };

  try {
    const discordRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (!discordRes.ok) {
      const text = await discordRes.text();
      console.error("Discord webhook error:", discordRes.status, text);
      return res
        .status(502)
        .json({ ok: false, error: "Failed to send to Discord." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Error sending to Discord:", err);
    return res.status(500).json({ ok: false, error: "Internal server error." });
  }
}
