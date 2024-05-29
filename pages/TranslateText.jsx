import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const TranslateText = () => {
  const [options, setOptions] = useState([]);
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setInput(
        `${location.state.metaTitle}\n\n${location.state.metaDescription}`
      );
    }
  }, [location.state]);

  const translate = async () => {
    if (!from || !to || !input) {
      alert("Please select both languages and enter the text to translate.");
      return;
    }
    try {
      const response = await fetch(
        `http://184.72.121.152/translation/translate/${from}/${to}?text=${encodeURIComponent(
          input
        )}`,
        {
          headers: { Accept: "application/json" },
        }
      );
      const data = await response.json();
      if (data.translatedText) {
        setOutput(data.translatedText);
      } else {
        alert("Translation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during translation:", error);
      alert("An error occurred during translation. Please try again.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("https://libretranslate.com/languages", {
        headers: { Accept: "application/json" },
      });
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error("Error fetching the languages:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-center items-center mb-4">
        <label className="mr-2">From:</label>
        <select className="mr-2" onChange={(e) => setFrom(e.target.value)}>
          <option value="">Select Language</option>
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
        <label className="mr-2">To:</label>
        <select className="mr-2" onChange={(e) => setTo(e.target.value)}>
          <option value="">Select Language</option>
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center items-center mb-4">
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          rows="8"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
      </div>
      <div className="flex justify-center items-center mb-4">
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          rows="8"
          value={output}
          readOnly
        ></textarea>
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={translate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Translate
        </button>
      </div>
    </div>
  );
};

export default TranslateText;
