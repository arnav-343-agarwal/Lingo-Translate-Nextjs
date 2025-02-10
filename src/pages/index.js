import { useState } from "react";
import { Switch } from "@headlessui/react";

const languages = [
  { code: "en", name: "English" },
  { code: "nl", name: "Dutch" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
];

export default function Translator() {
  const [darkMode, setDarkMode] = useState(false);
  const [text, setText] = useState("");
  const [source, setSource] = useState("en");
  const [target, setTarget] = useState("nl");
  const [translatedText, setTranslatedText] = useState("");

  const handleTranslate = async () => {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, source, target }),
    });
    const data = await response.json();
    setTranslatedText(data.translatedText || "Translation failed");
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen p-6 transition-all`}>
      {/* Navbar */}
      <nav className="flex justify-between items-center py-4 px-6 shadow-md bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
        <h1 className="text-2xl font-bold">🌍 Translator</h1>
        <Switch
          checked={darkMode}
          onChange={setDarkMode}
          className={`${darkMode ? "bg-blue-600" : "bg-gray-400"} relative inline-flex items-center h-6 rounded-full w-11`}
        >
          <span className="sr-only">Toggle Dark Mode</span>
          <span className={`${darkMode ? "translate-x-6" : "translate-x-1"} inline-block w-4 h-4 transform bg-white rounded-full transition`} />
        </Switch>
      </nav>

      {/* Main Section */}
      <div className="max-w-lg mx-auto mt-10 space-y-4">
        <textarea
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
          rows="4"
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Language Selection */}
        <div className="flex gap-4">
          <select
            className="w-1/2 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>

          <select
            className="w-1/2 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>

        {/* Translate Button */}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          onClick={handleTranslate}
        >
          Translate
        </button>

        {/* Translated Text */}
        {translatedText && (
          <div className="p-4 border rounded-md bg-gray-200 dark:bg-gray-700 text-black dark:text-white">
            <strong>Translation:</strong> {translatedText}
          </div>
        )}
      </div>
    </div>
  );
}
