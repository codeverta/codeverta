// pages/index.js or app/page.js (depending on your Next.js version)
import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  atomDark,
  tomorrow,
  prism,
  twilight,
  solarizedlight,
  dracula,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import Layout from "@/components/layout/Landing";

const themes = {
  "atom-dark": atomDark,
  tomorrow: tomorrow,
  prism: prism,
  twilight: twilight,
  "solarized-light": solarizedlight,
  dracula: dracula,
  "vsc-dark": vscDarkPlus,
};

const languages = [
  "javascript",
  "typescript",
  "python",
  "java",
  "cpp",
  "c",
  "csharp",
  "php",
  "ruby",
  "go",
  "rust",
  "swift",
  "kotlin",
  "html",
  "css",
  "json",
  "xml",
  "yaml",
  "markdown",
  "bash",
  "sql",
];

const backgroundColors = {
  "gradient-1": "bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600",
  "gradient-2": "bg-gradient-to-br from-green-400 via-blue-500 to-purple-600",
  "gradient-3": "bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500",
  "gradient-4": "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
  "solid-dark": "bg-gray-900",
  "solid-light": "bg-gray-100",
  "solid-blue": "bg-blue-600",
  "solid-purple": "bg-purple-600",
};

export default function Home() {
  const [code, setCode] = useState(`function helloWorld() {
  console.log("Hello, World!");
  return "Welcome to Codeverta.com!";
}

helloWorld();`);

  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("atom-dark");
  const [background, setBackground] = useState("gradient-1");
  const [padding, setPadding] = useState(64);
  const [showLineNumbers, setShowLineNumbers] = useState(false);
  const [fontFamily, setFontFamily] = useState("Fira Code");
  const [fontSize, setFontSize] = useState(14);
  const [windowTitle, setWindowTitle] = useState("Codeverta.com");
  const [showWindowControls, setShowWindowControls] = useState(true);

  const codeRef = useRef(null);

  const downloadImage = async () => {
    if (codeRef.current) {
      try {
        const dataUrl = await toPng(codeRef.current, {
          quality: 1,
          pixelRatio: 2,
        });

        const link = document.createElement("a");
        link.download = "carbon-code.png";
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Error generating image:", error);
      }
    }
  };

  const copyToClipboard = async () => {
    if (codeRef.current) {
      try {
        const blob = await toPng(codeRef.current, {
          quality: 1,
          pixelRatio: 2,
        }).then((dataUrl) => {
          return fetch(dataUrl).then((res) => res.blob());
        });

        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);

        alert("Image copied to clipboard!");
      } catch (error) {
        console.error("Error copying to clipboard:", error);
        alert("Failed to copy to clipboard");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Settings</h2>

              {/* Language */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Theme */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.keys(themes).map((themeName) => (
                    <option key={themeName} value={themeName}>
                      {themeName
                        .split("-")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </option>
                  ))}
                </select>
              </div>

              {/* Background */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(backgroundColors).map(([key, className]) => (
                    <button
                      key={key}
                      onClick={() => setBackground(key)}
                      className={`w-8 h-8 rounded-md ${className} ${
                        background === key
                          ? "ring-2 ring-blue-500 ring-offset-2"
                          : ""
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Padding */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Padding: {padding}px
                </label>
                <input
                  type="range"
                  min="16"
                  max="128"
                  value={padding}
                  onChange={(e) => setPadding(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Font Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Size: {fontSize}px
                </label>
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Window Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Window Title
                </label>
                <input
                  type="text"
                  value={windowTitle}
                  onChange={(e) => setWindowTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Toggles */}
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showLineNumbers}
                    onChange={(e) => setShowLineNumbers(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Line Numbers</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showWindowControls}
                    onChange={(e) => setShowWindowControls(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Window Controls</span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Code Editor */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-medium text-gray-900">
                    Code Editor
                  </h3>
                </div>
                <div className="p-4">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-64 px-4 py-3 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Enter your code here..."
                    style={{
                      fontFamily: "Fira Code, Monaco, Consolas, monospace",
                    }}
                  />
                </div>
              </div>

              {/* Preview */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4 border-b flex justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Preview</h3>
                  <div className="flex space-x-3">
                    <button
                      onClick={copyToClipboard}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                    >
                      Copy
                    </button>
                    <button
                      onClick={downloadImage}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Export
                    </button>
                  </div>
                </div>
                <div
                  ref={codeRef}
                  className={`${backgroundColors[background]} rounded-lg shadow-2xl`}
                  style={{ padding: `${padding}px` }}
                >
                  <div className="bg-gray-800 rounded-lg overflow-hidden">
                    {/* Window Header */}
                    {showWindowControls && (
                      <div className="flex items-center justify-between px-4 py-3 bg-gray-700">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="text-gray-300 px-8 text-sm font-medium">
                          {windowTitle}
                        </div>
                        <div className="w-14"></div>
                      </div>
                    )}

                    {/* Code Content */}
                    <div className="overflow-auto">
                      <SyntaxHighlighter
                        language={language}
                        style={themes[theme]}
                        showLineNumbers={showLineNumbers}
                        customStyle={{
                          margin: 0,
                          padding: "1.5rem",
                          fontSize: `${fontSize}px`,
                          fontFamily: "Fira Code, Monaco, Consolas, monospace",
                          background: "transparent",
                        }}
                        lineNumberStyle={{
                          minWidth: "2.5em",
                          paddingRight: "1em",
                          color: "#6B7280",
                        }}
                      >
                        {code}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
