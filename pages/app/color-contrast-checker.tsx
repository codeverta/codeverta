import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle, AlertCircle, Lightbulb } from "lucide-react";

const ColorContrastChecker = () => {
  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#FFFFFF");
  const [contrast, setContrast] = useState(21);
  const [suggestions, setSuggestions] = useState([]);

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

  const getLuminance = (r, g, b) => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const getContrastRatio = (fg, bg) => {
    const fgRgb = hexToRgb(fg);
    const bgRgb = hexToRgb(bg);

    if (!fgRgb || !bgRgb) return 1;

    const l1 = getLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
    const l2 = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);

    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    return (lighter + 0.05) / (darker + 0.05);
  };

  const rgbToHex = (r, g, b) => {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = Math.round(x).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  };

  const adjustBrightness = (hex, amount) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;

    const adjust = (val) => Math.max(0, Math.min(255, val + amount));
    return rgbToHex(adjust(rgb.r), adjust(rgb.g), adjust(rgb.b));
  };

  const generateSuggestions = (fg, bg, currentRatio) => {
    if (currentRatio >= 7) return [];

    const suggestions = [];
    const fgRgb = hexToRgb(fg);
    const bgRgb = hexToRgb(bg);

    if (!fgRgb || !bgRgb) return [];

    const fgLum = getLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
    const bgLum = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);

    // Suggestion 1: Darken foreground
    if (fgLum > bgLum) {
      for (let amount = -30; amount >= -150; amount -= 30) {
        const newFg = adjustBrightness(fg, amount);
        const newRatio = getContrastRatio(newFg, bg);
        if (newRatio >= 7) {
          suggestions.push({
            type: "Gelapkan teks",
            foreground: newFg,
            background: bg,
            ratio: newRatio,
          });
          break;
        }
      }
    }

    // Suggestion 2: Lighten foreground
    if (fgLum < bgLum) {
      for (let amount = 30; amount <= 150; amount += 30) {
        const newFg = adjustBrightness(fg, amount);
        const newRatio = getContrastRatio(newFg, bg);
        if (newRatio >= 7) {
          suggestions.push({
            type: "Terangkan teks",
            foreground: newFg,
            background: bg,
            ratio: newRatio,
          });
          break;
        }
      }
    }

    // Suggestion 3: Darken background
    if (bgLum > fgLum) {
      for (let amount = -30; amount >= -150; amount -= 30) {
        const newBg = adjustBrightness(bg, amount);
        const newRatio = getContrastRatio(fg, newBg);
        if (newRatio >= 7) {
          suggestions.push({
            type: "Gelapkan latar",
            foreground: fg,
            background: newBg,
            ratio: newRatio,
          });
          break;
        }
      }
    }

    // Suggestion 4: Lighten background
    if (bgLum < fgLum) {
      for (let amount = 30; amount <= 150; amount += 30) {
        const newBg = adjustBrightness(bg, amount);
        const newRatio = getContrastRatio(fg, newBg);
        if (newRatio >= 7) {
          suggestions.push({
            type: "Terangkan latar",
            foreground: fg,
            background: newBg,
            ratio: newRatio,
          });
          break;
        }
      }
    }

    // Suggestion 5: Classic combinations
    if (suggestions.length < 3) {
      suggestions.push({
        type: "Hitam pada putih",
        foreground: "#000000",
        background: "#FFFFFF",
        ratio: 21,
      });
      suggestions.push({
        type: "Putih pada hitam",
        foreground: "#FFFFFF",
        background: "#000000",
        ratio: 21,
      });
    }

    return suggestions.slice(0, 3);
  };

  useEffect(() => {
    const ratio = getContrastRatio(foreground, background);
    setContrast(ratio);
    setSuggestions(generateSuggestions(foreground, background, ratio));
  }, [foreground, background]);

  const getRating = (ratio) => {
    if (ratio >= 12)
      return { text: "Sempurna", color: "bg-green-600", icon: CheckCircle2 };
    if (ratio >= 7)
      return { text: "Sangat Baik", color: "bg-green-500", icon: CheckCircle2 };
    if (ratio >= 4.5)
      return { text: "Baik", color: "bg-blue-500", icon: CheckCircle2 };
    if (ratio >= 3)
      return { text: "Cukup", color: "bg-yellow-500", icon: AlertCircle };
    return { text: "Buruk", color: "bg-red-500", icon: XCircle };
  };

  const getWCAGStatus = (ratio) => {
    return {
      aaa: ratio >= 7,
      aa: ratio >= 4.5,
      aaLarge: ratio >= 3,
    };
  };

  const rating = getRating(contrast);
  const wcag = getWCAGStatus(contrast);
  const RatingIcon = rating.icon;

  const applySuggestion = (suggestion) => {
    setForeground(suggestion.foreground);
    setBackground(suggestion.background);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-900">
            Color Contrast Checker
          </h1>
          <p className="text-slate-600">
            Periksa kontras warna dan dapatkan saran untuk aksesibilitas yang
            lebih baik
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Warna</CardTitle>
              <CardDescription>
                Pilih warna teks dan latar belakang
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="foreground">Warna Teks (Foreground)</Label>
                <div className="flex gap-3">
                  <Input
                    id="foreground"
                    type="color"
                    value={foreground}
                    onChange={(e) => setForeground(e.target.value)}
                    className="w-20 h-12 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={foreground.toUpperCase()}
                    onChange={(e) => setForeground(e.target.value)}
                    className="flex-1 font-mono"
                    placeholder="#000000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="background">Warna Latar (Background)</Label>
                <div className="flex gap-3">
                  <Input
                    id="background"
                    type="color"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="w-20 h-12 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={background.toUpperCase()}
                    onChange={(e) => setBackground(e.target.value)}
                    className="flex-1 font-mono"
                    placeholder="#FFFFFF"
                  />
                </div>
              </div>

              <div
                className="rounded-lg p-8 border-2 border-slate-200"
                style={{ backgroundColor: background, color: foreground }}
              >
                <p className="text-lg font-medium mb-2">
                  Sample Text - Contoh Teks
                </p>
                <p className="text-sm">
                  The quick brown fox jumps over the lazy dog.
                </p>
                <p className="text-xs mt-2">
                  Teks kecil untuk testing aksesibilitas
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hasil Analisis</CardTitle>
              <CardDescription>Rating dan standar WCAG</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2">
                  <RatingIcon className="w-8 h-8" />
                  <span className="text-5xl font-bold text-slate-900">
                    {contrast.toFixed(2)}
                  </span>
                </div>
                <p className="text-slate-600">Rasio Kontras</p>
                <Badge
                  className={`${rating.color} text-white px-4 py-1 text-base`}
                >
                  {rating.text}
                </Badge>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-slate-900">Standar WCAG</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium">WCAG AAA (≥7:1)</span>
                    {wcag.aaa ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium">
                      WCAG AA (≥4.5:1)
                    </span>
                    {wcag.aa ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium">
                      WCAG AA Large (≥3:1)
                    </span>
                    {wcag.aaLarge ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {suggestions.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                <CardTitle>Saran Perbaikan</CardTitle>
              </div>
              <CardDescription>
                Klik salah satu saran untuk mengaplikasikan kombinasi warna
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => applySuggestion(suggestion)}
                    className="text-left p-4 border-2 border-slate-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-slate-700">
                        {suggestion.type}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {suggestion.ratio.toFixed(2)}:1
                      </Badge>
                    </div>
                    <div
                      className="rounded p-4 border border-slate-200"
                      style={{
                        backgroundColor: suggestion.background,
                        color: suggestion.foreground,
                      }}
                    >
                      <p className="text-sm font-medium">Sample Text</p>
                      <p className="text-xs mt-1">Contoh teks kecil</p>
                    </div>
                    <div className="flex gap-2 mt-3 text-xs font-mono text-slate-600">
                      <span>{suggestion.foreground}</span>
                      <span>•</span>
                      <span>{suggestion.background}</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Tips:</strong> Untuk aksesibilitas optimal, usahakan rasio
            kontras minimal 4.5:1 untuk teks normal dan 3:1 untuk teks besar.
            Rasio 7:1 atau lebih tinggi memenuhi standar WCAG AAA.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default ColorContrastChecker;
