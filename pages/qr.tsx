// pages/index.js
import { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";
import {
  Download,
  Palette,
  Settings,
  Link,
  Wifi,
  CreditCard,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Copy,
  Check,
  RefreshCw,
  Share2,
  Star,
  Zap,
} from "lucide-react";
import Layout from "@/components/layout/Landing";

export default function QRGenerator() {
  const [qrData, setQrData] = useState("");
  const [qrType, setQrType] = useState("text");
  const [qrOptions, setQrOptions] = useState({
    width: 300,
    margin: 2,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
    errorCorrectionLevel: "M",
  });
  const [qrDataURL, setQrDataURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const canvasRef = useRef(null);

  // Form data for different QR types
  const [formData, setFormData] = useState({
    // WiFi
    ssid: "",
    password: "",
    security: "WPA",
    // Contact
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    organization: "",
    // Location
    latitude: "",
    longitude: "",
    // Email
    emailTo: "",
    subject: "",
    body: "",
  });

  const qrTypes = [
    { id: "text", label: "Text", icon: MessageSquare, color: "bg-blue-500" },
    { id: "url", label: "URL", icon: Link, color: "bg-green-500" },
    { id: "wifi", label: "WiFi", icon: Wifi, color: "bg-purple-500" },
    {
      id: "contact",
      label: "Contact",
      icon: CreditCard,
      color: "bg-orange-500",
    },
    { id: "email", label: "Email", icon: Mail, color: "bg-red-500" },
    { id: "phone", label: "Phone", icon: Phone, color: "bg-indigo-500" },
    { id: "location", label: "Location", icon: MapPin, color: "bg-pink-500" },
  ];

  const generateQRData = () => {
    switch (qrType) {
      case "wifi":
        return `WIFI:T:${formData.security};S:${formData.ssid};P:${formData.password};;`;
      case "contact":
        return `BEGIN:VCARD
VERSION:3.0
FN:${formData.firstName} ${formData.lastName}
TEL:${formData.phone}
EMAIL:${formData.email}
ORG:${formData.organization}
END:VCARD`;
      case "email":
        return `mailto:${formData.emailTo}?subject=${encodeURIComponent(
          formData.subject
        )}&body=${encodeURIComponent(formData.body)}`;
      case "phone":
        return `tel:${qrData}`;
      case "location":
        return `geo:${formData.latitude},${formData.longitude}`;
      case "url":
        return qrData.startsWith("http") ? qrData : `https://${qrData}`;
      default:
        return qrData;
    }
  };

  const generateQR = async () => {
    if (!qrData && qrType === "text") return;

    setLoading(true);
    try {
      const data = generateQRData();
      const canvas = canvasRef.current;
      await QRCode.toCanvas(canvas, data, qrOptions);

      // Convert to data URL for download
      const dataURL = canvas.toDataURL();
      setQrDataURL(dataURL);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
    setLoading(false);
  };

  const downloadQR = () => {
    if (!qrDataURL) return;

    const link = document.createElement("a");
    link.download = `qr-code-${Date.now()}.png`;
    link.href = qrDataURL;
    link.click();
  };

  const copyQRData = async () => {
    const data = generateQRData();
    await navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareQR = async () => {
    if (navigator.share && qrDataURL) {
      try {
        const blob = await fetch(qrDataURL).then((r) => r.blob());
        const file = new File([blob], "qrcode.png", { type: "image/png" });
        await navigator.share({
          files: [file],
          title: "QR Code",
          text: "Check out this QR code!",
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  useEffect(() => {
    if (qrData || qrType !== "text") {
      generateQR();
    }
  }, [qrData, qrType, qrOptions, formData]);

  const renderForm = () => {
    switch (qrType) {
      case "wifi":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Network Name (SSID)
              </label>
              <input
                type="text"
                value={formData.ssid}
                onChange={(e) =>
                  setFormData({ ...formData, ssid: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter WiFi network name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter WiFi password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Security Type
              </label>
              <select
                value={formData.security}
                onChange={(e) =>
                  setFormData({ ...formData, security: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No Password</option>
              </select>
            </div>
          </div>
        );
      case "contact":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="First Name"
              />
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Last Name"
              />
            </div>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Phone Number"
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Email Address"
            />
            <input
              type="text"
              value={formData.organization}
              onChange={(e) =>
                setFormData({ ...formData, organization: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Organization (Optional)"
            />
          </div>
        );
      case "email":
        return (
          <div className="space-y-4">
            <input
              type="email"
              value={formData.emailTo}
              onChange={(e) =>
                setFormData({ ...formData, emailTo: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Recipient Email"
            />
            <input
              type="text"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Subject"
            />
            <textarea
              value={formData.body}
              onChange={(e) =>
                setFormData({ ...formData, body: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent h-24"
              placeholder="Email Body"
            />
          </div>
        );
      case "location":
        return (
          <div className="space-y-4">
            <input
              type="number"
              step="any"
              value={formData.latitude}
              onChange={(e) =>
                setFormData({ ...formData, latitude: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Latitude"
            />
            <input
              type="number"
              step="any"
              value={formData.longitude}
              onChange={(e) =>
                setFormData({ ...formData, longitude: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Longitude"
            />
          </div>
        );
      default:
        return (
          <div>
            <label className="block text-sm font-medium mb-2">
              {qrType === "url"
                ? "Enter URL"
                : qrType === "phone"
                ? "Enter Phone Number"
                : "Enter Text"}
            </label>
            <textarea
              value={qrData}
              onChange={(e) => setQrData(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
              placeholder={
                qrType === "url"
                  ? "https://example.com"
                  : qrType === "phone"
                  ? "+1234567890"
                  : "Enter your text here..."
              }
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                QR Code Generator
              </h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>Free & Unlimited</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Input */}
          <div className="space-y-6">
            {/* QR Type Selection */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                QR Code Type
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {qrTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setQrType(type.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        qrType === type.id
                          ? `${type.color} text-white border-transparent shadow-lg transform scale-105`
                          : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      <Icon className="h-6 w-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">{type.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input Form */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Content</h2>
              {renderForm()}
            </div>

            {/* Advanced Options */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center justify-between w-full text-xl font-semibold mb-4"
              >
                <span className="flex items-center">
                  <Palette className="h-5 w-5 mr-2" />
                  Customization
                </span>
                <RefreshCw
                  className={`h-4 w-4 transition-transform ${
                    showAdvanced ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showAdvanced && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Size
                    </label>
                    <input
                      type="range"
                      min="200"
                      max="600"
                      value={qrOptions.width}
                      onChange={(e) =>
                        setQrOptions({
                          ...qrOptions,
                          width: parseInt(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                    <span className="text-sm text-gray-600">
                      {qrOptions.width}px
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Foreground Color
                      </label>
                      <input
                        type="color"
                        value={qrOptions.color.dark}
                        onChange={(e) =>
                          setQrOptions({
                            ...qrOptions,
                            color: { ...qrOptions.color, dark: e.target.value },
                          })
                        }
                        className="w-full h-10 rounded-lg border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Background Color
                      </label>
                      <input
                        type="color"
                        value={qrOptions.color.light}
                        onChange={(e) =>
                          setQrOptions({
                            ...qrOptions,
                            color: {
                              ...qrOptions.color,
                              light: e.target.value,
                            },
                          })
                        }
                        className="w-full h-10 rounded-lg border border-gray-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Error Correction Level
                    </label>
                    <select
                      value={qrOptions.errorCorrectionLevel}
                      onChange={(e) =>
                        setQrOptions({
                          ...qrOptions,
                          errorCorrectionLevel: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      <option value="L">Low (7%)</option>
                      <option value="M">Medium (15%)</option>
                      <option value="Q">Quartile (25%)</option>
                      <option value="H">High (30%)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - QR Code */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Your QR Code</h2>

              <div className="flex justify-center mb-6">
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    className={`rounded-lg shadow-lg ${
                      loading ? "opacity-50" : ""
                    }`}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={downloadQR}
                  disabled={!qrDataURL}
                  className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>

                <button
                  onClick={copyQRData}
                  className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
                >
                  {copied ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  {copied ? "Copied!" : "Copy Data"}
                </button>

                <button
                  onClick={shareQR}
                  disabled={!qrDataURL}
                  className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </button>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
              <h3 className="font-semibold text-blue-900 mb-3">
                💡 Quick Tips
              </h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>
                  • Higher error correction allows QR codes to work even when
                  partially damaged
                </li>
                <li>
                  • Larger sizes are better for printing and scanning from
                  distance
                </li>
                <li>
                  • Dark colors on light backgrounds scan better than light on
                  dark
                </li>
                <li>
                  • Test your QR code with different devices before printing
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


QRGenerator.getLayout = function getLayout(page) {
  return <Layout seo={{
    description: "Membuat QR Code dengan mudah dan cepat. Pilih jenis QR Code, sesuaikan opsi, dan hasilkan QR Code yang siap digunakan.",
    title: "QR Code Generator - Buat QR Code Gratis",
    keywords: "QR Code, generator QR Code, buat QR Code, QR Code gratis, QR Code online",
  }}>{page}</Layout>;
};
