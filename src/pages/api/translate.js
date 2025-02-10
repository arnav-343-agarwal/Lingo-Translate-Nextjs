export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { text, source, target } = req.body;

  try {
    const response = await fetch("https://translate-plus.p.rapidapi.com/translate", {
      method: "POST",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": process.env.RAPIDAPI_HOST,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, source, target }),
    });

    const data = await response.json();
    
    if (data.translations && data.translations.translation) {
      res.status(200).json({ translatedText: data.translations.translation });
    } else {
      res.status(500).json({ error: "Translation failed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Translation failed" });
  }
}
