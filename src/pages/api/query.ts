import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { message } = req.body;

    const response = await fetch("https://your-ai-endpoint.com/query", {
      method: "POST",
      body: JSON.stringify({ query: message }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    res.status(200).json({ reply: data.reply });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}