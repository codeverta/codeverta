import React, { useState, useEffect, useCallback } from "react";
import {
  RefreshCw,
  Lock,
  Unlock,
  Copy,
  Check,
  Palette,
  Plus,
  Trash2,
  ChevronRight,
} from "lucide-react";

// --- Utility Functions ---

// Generate random hex color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Calculate brightness to decide text color (black or white)
const getContrastColor = (hex) => {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000" : "#FFFFFF";
};

// --- Components (Simulating Shadcn UI) ---

const Button = ({
  children,
  onClick,
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90 shadow",
    outline:
      "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900",
    ghost: "hover:bg-slate-100 hover:text-slate-900",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80",
    destructive: "bg-red-500 text-slate-50 hover:bg-red-500/90",
  };

  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

const Tooltip = ({ text, children }) => {
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute bottom-full mb-2 px-2 py-1 text-xs text-white bg-slate-800 rounded shadow-lg whitespace-nowrap z-50">
          {text}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
        </div>
      )}
    </div>
  );
};

// --- Main Application ---

export default function ColorPaletteApp() {
  const [colors, setColors] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Initialize Palette
  const generatePalette = useCallback((force = false) => {
    setColors((prevColors) => {
      // If first run (empty), generate 5 colors
      if (prevColors.length === 0 || force) {
        return Array.from({ length: 5 }).map(() => ({
          hex: getRandomColor(),
          isLocked: false,
          id: Math.random().toString(36).substr(2, 9),
        }));
      }

      // Update unlocked colors only
      return prevColors.map((color) => {
        if (color.isLocked) return color;
        return { ...color, hex: getRandomColor() };
      });
    });
  }, []);

  // Initial load
  useEffect(() => {
    generatePalette(true);
  }, [generatePalette]);

  // Handle Spacebar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" && e.target.tagName !== "INPUT") {
        e.preventDefault();
        generatePalette();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [generatePalette]);

  const toggleLock = (index) => {
    const newColors = [...colors];
    newColors[index].isLocked = !newColors[index].isLocked;
    setColors(newColors);
  };

  const copyToClipboard = (hex, index) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const removeColor = (index) => {
    if (colors.length <= 2) return; // Prevent deleting if too few
    const newColors = colors.filter((_, i) => i !== index);
    setColors(newColors);
  };

  const addColor = () => {
    if (colors.length >= 8) return; // Max limit
    setColors([
      ...colors,
      {
        hex: getRandomColor(),
        isLocked: false,
        id: Math.random().toString(36).substr(2, 9),
      },
    ]);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b bg-white flex items-center justify-between px-6 shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-2"></div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex text-sm text-slate-500 mr-4 items-center gap-2 border px-3 py-1 rounded-full bg-slate-50">
            <span className="text-xs font-semibold border border-slate-300 rounded px-1.5 py-0.5 bg-white">
              Spasi
            </span>
            untuk acak warna
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={addColor}
            disabled={colors.length >= 8}
            className="hidden sm:flex"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Warna
          </Button>

          <Button
            onClick={() => generatePalette()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Acak Sekarang
          </Button>
        </div>
      </header>

      {/* Main Palette Area */}
      <main className="flex-1 flex flex-col md:flex-row w-full h-full">
        {colors.map((color, index) => {
          const textColor = getContrastColor(color.hex);

          return (
            <div
              key={color.id}
              className="relative group flex-1 flex flex-row md:flex-col items-center justify-center transition-all duration-300 ease-in-out"
              style={{ backgroundColor: color.hex }}
            >
              {/* Controls Overlay - Hidden by default, shown on hover */}
              <div
                className={`
                absolute inset-0 flex md:flex-col items-center justify-center gap-4 
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                bg-black/10 backdrop-blur-[2px] md:bg-transparent md:backdrop-blur-none
              `}
              >
                {/* Remove Button (Only visible if > 2 colors) */}
                {colors.length > 2 && (
                  <div className="md:absolute md:top-8 md:opacity-0 md:group-hover:opacity-100 transition-all md:translate-y-2 md:group-hover:translate-y-0">
                    <Tooltip text="Hapus Warna">
                      <button
                        onClick={() => removeColor(index)}
                        className="p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-colors"
                        style={{ color: textColor }}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </Tooltip>
                  </div>
                )}

                {/* Lock Button */}
                <div className="md:absolute md:bottom-20">
                  <Tooltip text={color.isLocked ? "Buka Kunci" : "Kunci Warna"}>
                    <button
                      onClick={() => toggleLock(index)}
                      className={`
                        p-4 rounded-full transition-all duration-200 shadow-sm
                        ${
                          color.isLocked
                            ? "bg-white text-slate-900 shadow-lg scale-110"
                            : "bg-white/20 hover:bg-white/40 backdrop-blur-sm"
                        }
                      `}
                      style={{ color: color.isLocked ? "#0f172a" : textColor }}
                    >
                      {color.isLocked ? (
                        <Lock className="w-6 h-6" />
                      ) : (
                        <Unlock className="w-6 h-6" />
                      )}
                    </button>
                  </Tooltip>
                </div>
              </div>

              {/* Always Visible Info */}
              <div className="flex flex-col items-center z-10 pointer-events-none md:pointer-events-auto mt-0 md:mt-auto md:mb-8">
                <button
                  onClick={() => copyToClipboard(color.hex, index)}
                  className="group/hex flex flex-col items-center gap-1 cursor-pointer"
                >
                  <span
                    className="text-2xl md:text-3xl font-bold uppercase tracking-wider font-mono select-all transition-transform active:scale-95"
                    style={{ color: textColor }}
                  >
                    {color.hex.replace("#", "")}
                  </span>

                  <span
                    className={`
                      text-xs font-medium px-2 py-1 rounded-full transition-all duration-300
                      ${
                        copiedIndex === index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 -translate-y-2 group-hover/hex:opacity-50"
                      }
                    `}
                    style={{
                      backgroundColor: textColor,
                      color: color.hex,
                    }}
                  >
                    {copiedIndex === index ? "TERSALIN!" : "SALIN"}
                  </span>
                </button>

                <p
                  className="mt-2 text-xs opacity-60 font-medium hidden md:block"
                  style={{ color: textColor }}
                >
                  {color.isLocked ? "Terkunci" : ""}
                </p>
              </div>

              {/* Mobile Only: Color Stripe & Controls */}
              <div className="md:hidden absolute right-4 flex items-center gap-2">
                <button
                  onClick={() => toggleLock(index)}
                  className="p-2"
                  style={{ color: textColor }}
                >
                  {color.isLocked ? (
                    <Lock className="w-5 h-5" />
                  ) : (
                    <Unlock className="w-5 h-5 opacity-50" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </main>

      {/* Mobile Floating Action Button */}
      <div className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 shadow-xl z-50">
        <Button
          onClick={() => generatePalette()}
          className="bg-slate-900 text-white rounded-full h-14 px-8 shadow-2xl flex items-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          <span className="font-semibold text-lg">Acak</span>
        </Button>
      </div>
    </div>
  );
}
