import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("nl");

  const languages = {
    en: "English",
    nl: "Dutch",
    fr: "French",
    es: "Spanish",
    de: "German",
    hi: "Hindi",
  };

  const handleTranslate = async () => {
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, source: sourceLang, target: targetLang }),
      });

      const data = await response.json();
      if (data.translatedText) {
        setTranslatedText(data.translatedText);
      } else {
        setTranslatedText("Translation failed");
      }
    } catch (error) {
      console.error("Network Error:", error);
      setTranslatedText("Network error occurred");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Text Translator</h1>

      <label>Source Language:</label>
      <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
        {Object.entries(languages).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>

      <label>Target Language:</label>
      <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
        {Object.entries(languages).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>

      <br />
      <textarea
        rows="4"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate..."
      ></textarea>

      <br />
      <button onClick={handleTranslate}>Translate</button>

      <h2>Translated Text:</h2>
      <p>{translatedText}</p>
    </div>
  );
}
