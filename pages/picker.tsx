"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Copy,
  RefreshCw,
  Lock,
  Unlock,
  Heart,
  Download,
  Trash2,
} from "lucide-react";
import Layout from "@/components/layout/Landing";

export default function ColorPicker() {
  const [colors, setColors] = useState([]);
  const [lockedColors, setLockedColors] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [savedPalettes, setSavedPalettes] = useState([]);

  // Load saved palettes from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("colorgen-saved-palettes");
    if (saved) {
      try {
        setSavedPalettes(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading saved palettes:", error);
      }
    }
  }, []);

  // Save palettes to localStorage whenever savedPalettes changes
  useEffect(() => {
    if (savedPalettes.length > 0) {
      localStorage.setItem(
        "colorgen-saved-palettes",
        JSON.stringify(savedPalettes)
      );
    }
  }, [savedPalettes]);

  // Generate random hex color
  const generateRandomColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    );
  };

  // Generate initial palette
  const generatePalette = useCallback(() => {
    const newColors = [];
    for (let i = 0; i < 5; i++) {
      if (lockedColors[i]) {
        newColors.push(colors[i]);
      } else {
        newColors.push(generateRandomColor());
      }
    }
    setColors(newColors);
  }, [colors, lockedColors]);

  // Initialize palette on mount
  useEffect(() => {
    if (colors.length === 0) {
      const initialColors = Array(5)
        .fill()
        .map(() => generateRandomColor());
      setColors(initialColors);
      setLockedColors(Array(5).fill(false));
    }
  }, []);

  // Convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  // Calculate luminance to determine text color
  const getLuminance = (hex) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;
    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const getTextColor = (hex) => {
    return getLuminance(hex) > 0.5 ? "#000000" : "#ffffff";
  };

  // Copy color to clipboard
  const copyColor = async (color, index) => {
    try {
      await navigator.clipboard.writeText(color.toUpperCase());
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1000);
    } catch (err) {
      console.error("Failed to copy color:", err);
    }
  };

  // Toggle color lock
  const toggleLock = (index) => {
    const newLocked = [...lockedColors];
    newLocked[index] = !newLocked[index];
    setLockedColors(newLocked);
  };

  // Save current palette
  const savePalette = () => {
    const newPalette = {
      id: Date.now(),
      colors: [...colors],
      createdAt: new Date().toLocaleDateString(),
    };
    setSavedPalettes((prev) => {
      const updated = [newPalette, ...prev.slice(0, 9)]; // Keep max 10 palettes
      return updated;
    });
  };

  // Delete saved palette
  const deletePalette = (paletteId) => {
    setSavedPalettes((prev) => {
      const updated = prev.filter((p) => p.id !== paletteId);
      if (updated.length === 0) {
        // If no palettes left, remove from localStorage
        localStorage.removeItem("colorgen-saved-palettes");
      }
      return updated;
    });
  };

  // Load saved palette
  const loadPalette = (palette) => {
    setColors(palette.colors);
    setLockedColors(Array(5).fill(false));
  };

  // Export palette as CSS
  const exportPalette = () => {
    const cssVariables = colors
      .map((color, index) => `  --color-${index + 1}: ${color};`)
      .join("\n");

    const cssContent = `:root {\n${cssVariables}\n}`;

    const blob = new Blob([cssContent], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "palette.css";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        generatePalette();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [generatePalette]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ColorGen
              </h1>
              <span className="text-gray-500 text-sm">
                Generate beautiful color palettes
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={generatePalette}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Generate</span>
              </button>
              <button
                onClick={exportPalette}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Color Palette */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="flex h-96">
            {colors.map((color, index) => (
              <div
                key={index}
                className="flex-1 relative group cursor-pointer transition-all duration-300 hover:flex-[1.1]"
                style={{ backgroundColor: color }}
                onClick={() => copyColor(color, index)}
              >
                {/* Color Info Overlay */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-20"
                  style={{ color: getTextColor(color) }}
                >
                  <div className="text-center">
                    <div className="text-lg font-mono font-bold mb-2">
                      {color.toUpperCase()}
                    </div>
                    <div className="text-sm opacity-75 mb-4">
                      RGB({hexToRgb(color)?.r}, {hexToRgb(color)?.g},{" "}
                      {hexToRgb(color)?.b})
                    </div>
                    <div className="flex items-center space-x-2">
                      <Copy className="w-4 h-4" />
                      <span className="text-sm">
                        {copiedIndex === index ? "Copied!" : "Click to copy"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lock Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLock(index);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-20 hover:bg-opacity-30 transition-all duration-200 opacity-0 group-hover:opacity-100"
                  style={{ color: getTextColor(color) }}
                >
                  {lockedColors[index] ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    <Unlock className="w-4 h-4" />
                  )}
                </button>

                {/* Color Value at Bottom */}
                <div
                  className="absolute bottom-4 left-4 font-mono text-sm font-medium"
                  style={{ color: getTextColor(color) }}
                >
                  {color.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
          <button
            onClick={savePalette}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Heart className="w-5 h-5" />
            <span>Save Palette</span>
          </button>
          <div className="text-center text-gray-600">
            <p>
              Press{" "}
              <kbd className="px-2 py-1 bg-gray-200 rounded text-sm font-mono">
                SPACE
              </kbd>{" "}
              to generate new colors
            </p>
            <p className="text-sm mt-1">
              Click on colors to copy • Use lock to keep colors
            </p>
          </div>
        </div>

        {/* Saved Palettes */}
        {savedPalettes.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Saved Palettes ({savedPalettes.length}/10)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedPalettes.map((palette) => (
                <div
                  key={palette.id}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow group"
                >
                  <div
                    className="flex h-16 cursor-pointer"
                    onClick={() => loadPalette(palette)}
                  >
                    {palette.colors.map((color, index) => (
                      <div
                        key={index}
                        className="flex-1"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">
                          Saved on {palette.createdAt}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2 text-xs font-mono">
                          {palette.colors.map((color, index) => (
                            <span key={index} className="text-gray-500">
                              {color.substring(1)}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePalette(palette.id);
                        }}
                        className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
                        title="Delete palette"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


ColorPicker.getLayout = function getLayout(page) {
  return <Layout seo={{
    title: "Codeverta ColorGen - Bikin Palet Warna Cantik",
    description: "Buat palet warna yang indah dengan ColorGen. Klik untuk menyalin warna, kunci warna, dan simpan palet Anda.",
    keywords: "color generator, color palette, color picker, web design, UI design",
  }}>{page}</Layout>;
};
