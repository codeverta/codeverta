// pages/api/register.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, whatsapp, program } = req.body;

    const discordMessage = {
      embeds: [
        {
          title: "🚀 Pendaftaran Kursus Baru",
          color: 0xec4899,
          fields: [
            { name: "Nama Lengkap", value: name, inline: true },
            {
              name: "WhatsApp",
              value: `https://wa.me/${whatsapp.replace(/\D/g, "")}`,
              inline: true,
            },
            { name: "Email", value: email, inline: false },
            { name: "Program Dipilih", value: program, inline: false },
          ],
          footer: { text: "Sent from Website via Pages Router" },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    if (!process.env.DISCORD_WEBHOOK_URL) {
      throw new Error(
        "DISCORD_WEBHOOK_URL is not defined in environment variables"
      );
    }

    const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordMessage),
    });

    if (!response.ok) throw new Error("Failed to send to Discord");

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
