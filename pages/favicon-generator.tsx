import React, { useState, useRef, useEffect } from "react";

// JSZip library for creating zip files
// Ensure this script is loaded in the HTML head:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>

const App = () => {
  const [selectedTab, setSelectedTab] = useState("favicon"); // 'favicon', 'imageConverter', 'appIcon'
  const [faviconEmoji, setFaviconEmoji] = useState("✨");
  const [faviconImageFile, setFaviconImageFile] = useState(null);
  const [imageConvertFile, setImageConvertFile] = useState(null);
  const [imageConvertFormat, setImageConvertFormat] = useState("png");
  const [imageConvertWidth, setImageConvertWidth] = useState("");
  const [imageConvertHeight, setImageConvertHeight] = useState("");
  const [appIconFile, setAppIconFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);

  // Ensure JSZip is available
  useEffect(() => {
    if (typeof window.JSZip === "undefined") {
      console.error(
        "JSZip library not loaded. Please ensure <script src='https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'></script> is in your HTML."
      );
    }
  }, []);

  // Helper function to resize and draw image on canvas
  const drawImageOnCanvas = (image, size) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = size;
    canvas.height = size;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, size, size);
    return canvas.toDataURL("image/png");
  };

  // Helper function to draw emoji on canvas
  const drawEmojiOnCanvas = (emoji, size) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = size;
    canvas.height = size;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${
      size * 0.8
    }px 'Segoe UI Emoji', 'Apple Color Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(emoji, size / 2, size / 2);
    return canvas.toDataURL("image/png");
  };

  // Favicon Generator Logic
  const handleGenerateFavicon = async () => {
    setLoading(true);
    const sizes = [16, 32, 48, 64, 128, 256]; // Common favicon sizes
    const generatedFavicons = [];

    try {
      if (faviconImageFile) {
        const img = new Image();
        img.src = URL.createObjectURL(faviconImageFile);
        await new Promise((resolve) => (img.onload = resolve));

        for (const size of sizes) {
          const dataUrl = drawImageOnCanvas(img, size);
          generatedFavicons.push({ size, dataUrl });
        }
      } else if (faviconEmoji) {
        for (const size of sizes) {
          const dataUrl = drawEmojiOnCanvas(faviconEmoji, size);
          generatedFavicons.push({ size, dataUrl });
        }
      } else {
        alert("Silakan masukkan emoji atau unggah gambar untuk favicon.");
        setLoading(false);
        return;
      }

      // Create a temporary container for download links
      const downloadContainer = document.createElement("div");
      downloadContainer.className = "flex flex-wrap gap-4 mt-4";

      generatedFavicons.forEach((favicon) => {
        const link = document.createElement("a");
        link.href = favicon.dataUrl;
        link.download = `favicon-${favicon.size}x${favicon.size}.png`;
        link.className =
          "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105";
        link.textContent = `Unduh ${favicon.size}x${favicon.size} PNG`;
        downloadContainer.appendChild(link);
      });

      // Display the download links in a modal or specific area
      // For simplicity, we'll append to the body for now, but a proper modal would be better.
      const existingDownloads = document.getElementById("favicon-downloads");
      if (existingDownloads) {
        existingDownloads.remove();
      }
      const downloadsDiv = document.createElement("div");
      downloadsDiv.id = "favicon-downloads";
      downloadsDiv.className = "mt-8 p-6 bg-gray-100 rounded-xl shadow-inner";
      downloadsDiv.innerHTML =
        '<h3 class="text-xl font-semibold mb-4 text-gray-800">Favicon yang Dihasilkan:</h3>';
      downloadsDiv.appendChild(downloadContainer);
      document.getElementById("favicon-section").appendChild(downloadsDiv);
    } catch (error) {
      console.error("Error generating favicon:", error);
      alert("Terjadi kesalahan saat membuat favicon. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // Image Converter Logic
  const handleConvertImage = async () => {
    setLoading(true);
    if (!imageConvertFile) {
      alert("Silakan unggah gambar untuk dikonversi.");
      setLoading(false);
      return;
    }

    try {
      const img = new Image();
      img.src = URL.createObjectURL(imageConvertFile);
      await new Promise((resolve) => (img.onload = resolve));

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      let targetWidth = imageConvertWidth
        ? parseInt(imageConvertWidth)
        : img.width;
      let targetHeight = imageConvertHeight
        ? parseInt(imageConvertHeight)
        : img.height;

      // Maintain aspect ratio if only one dimension is provided
      if (imageConvertWidth && !imageConvertHeight) {
        targetHeight = (img.height / img.width) * targetWidth;
      } else if (!imageConvertWidth && imageConvertHeight) {
        targetWidth = (img.width / img.height) * targetHeight;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      let mimeType;
      let extension;
      switch (imageConvertFormat) {
        case "jpeg":
          mimeType = "image/jpeg";
          extension = "jpg";
          break;
        case "webp":
          mimeType = "image/webp";
          extension = "webp";
          break;
        case "png":
        default:
          mimeType = "image/png";
          extension = "png";
          break;
      }

      const dataUrl = canvas.toDataURL(mimeType);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `converted_image.${extension}`;
      link.className =
        "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 mt-4";
      link.textContent = "Unduh Gambar yang Dikonversi";

      const existingDownload = document.getElementById(
        "image-converter-download"
      );
      if (existingDownload) {
        existingDownload.remove();
      }
      const downloadDiv = document.createElement("div");
      downloadDiv.id = "image-converter-download";
      downloadDiv.className =
        "mt-8 p-6 bg-gray-100 rounded-xl shadow-inner flex justify-center";
      downloadDiv.appendChild(link);
      document
        .getElementById("image-converter-section")
        .appendChild(downloadDiv);
    } catch (error) {
      console.error("Error converting image:", error);
      alert("Terjadi kesalahan saat mengonversi gambar. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // App Icon Generator Logic
  const handleGenerateAppIcons = async () => {
    setLoading(true);
    if (!appIconFile) {
      alert("Silakan unggah gambar sumber untuk ikon aplikasi.");
      setLoading(false);
      return;
    }

    try {
      const img = new Image();
      img.src = URL.createObjectURL(appIconFile);
      await new Promise((resolve) => (img.onload = resolve));

      const zip = new JSZip();

      // Android Icons (drawable folders)
      const androidSizes = {
        mdpi: 48,
        hdpi: 72,
        xhdpi: 96,
        xxhdpi: 144,
        xxxhdpi: 192,
      };

      for (const density in androidSizes) {
        const size = androidSizes[density];
        const dataUrl = drawImageOnCanvas(img, size);
        const blob = await (await fetch(dataUrl)).blob();
        zip.file(`android/mipmap-${density}/ic_launcher.png`, blob);
      }

      // iOS Icons (various sizes)
      // Note: iOS icons have many specific sizes for different devices/purposes.
      // This is a simplified set. For a full set, refer to Apple's guidelines.
      const iOSSizes = [
        { name: "AppIcon-20x20@1x", size: 20 },
        { name: "AppIcon-20x20@2x", size: 40 },
        { name: "AppIcon-20x20@3x", size: 60 },
        { name: "AppIcon-29x29@1x", size: 29 },
        { name: "AppIcon-29x29@2x", size: 58 },
        { name: "AppIcon-29x29@3x", size: 87 },
        { name: "AppIcon-40x40@1x", size: 40 },
        { name: "AppIcon-40x40@2x", size: 80 },
        { name: "AppIcon-40x40@3x", size: 120 },
        { name: "AppIcon-60x60@2x", size: 120 },
        { name: "AppIcon-60x60@3x", size: 180 },
        { name: "AppIcon-76x76@1x", size: 76 },
        { name: "AppIcon-76x76@2x", size: 152 },
        { name: "AppIcon-83.5x83.5@2x", size: 167 }, // iPad Pro
        { name: "AppIcon-1024x1024@1x", size: 1024 }, // App Store
      ];

      for (const icon of iOSSizes) {
        const dataUrl = drawImageOnCanvas(img, icon.size);
        const blob = await (await fetch(dataUrl)).blob();
        zip.file(`ios/AppIcon.appiconset/${icon.name}.png`, blob);
      }

      // Generate and download the zip file
      zip.generateAsync({ type: "blob" }).then(function (content) {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = "app_icons.zip";
        link.className =
          "bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 mt-4";
        link.textContent = "Unduh Paket Ikon Aplikasi (ZIP)";

        const existingDownload = document.getElementById("app-icon-download");
        if (existingDownload) {
          existingDownload.remove();
        }
        const downloadDiv = document.createElement("div");
        downloadDiv.id = "app-icon-download";
        downloadDiv.className =
          "mt-8 p-6 bg-gray-100 rounded-xl shadow-inner flex justify-center";
        downloadDiv.appendChild(link);
        document.getElementById("app-icon-section").appendChild(downloadDiv);
      });
    } catch (error) {
      console.error("Error generating app icons:", error);
      alert("Terjadi kesalahan saat membuat ikon aplikasi. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 font-inter text-gray-800 p-4 sm:p-8 flex flex-col items-center">
      <style>
        {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
                body { font-family: 'Inter', sans-serif; }
                `}
      </style>

      <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl w-full max-w-4xl mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
          Generator & Konverter Ikon
        </h1>
        <p className="text-center text-lg text-gray-600 mb-8">
          Buat favicon, konversi gambar, dan hasilkan ikon aplikasi untuk
          Android & iOS dengan mudah!
        </p>

        <div className="flex justify-center mb-8 border-b-2 border-gray-200">
          <button
            onClick={() => setSelectedTab("favicon")}
            className={`py-3 px-6 text-lg font-semibold rounded-t-lg transition duration-300 ease-in-out ${
              selectedTab === "favicon"
                ? "bg-blue-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Favicon
          </button>
          <button
            onClick={() => setSelectedTab("imageConverter")}
            className={`py-3 px-6 text-lg font-semibold rounded-t-lg transition duration-300 ease-in-out ${
              selectedTab === "imageConverter"
                ? "bg-blue-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Konverter Gambar
          </button>
          <button
            onClick={() => setSelectedTab("appIcon")}
            className={`py-3 px-6 text-lg font-semibold rounded-t-lg transition duration-300 ease-in-out ${
              selectedTab === "appIcon"
                ? "bg-blue-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Ikon Aplikasi
          </button>
        </div>

        {/* Favicon Generator Section */}
        {selectedTab === "favicon" && (
          <div
            id="favicon-section"
            className="p-4 sm:p-6 bg-white rounded-b-3xl"
          >
            <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
              Generator Favicon
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <div className="flex flex-col items-center">
                <label
                  htmlFor="emoji-input"
                  className="block text-gray-700 text-xl font-medium mb-2"
                >
                  Pilih Emoji:
                </label>
                <input
                  type="text"
                  id="emoji-input"
                  value={faviconEmoji}
                  onChange={(e) => {
                    setFaviconEmoji(e.target.value);
                    setFaviconImageFile(null); // Clear image if emoji is used
                  }}
                  placeholder="Contoh: ✨"
                  className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-center text-2xl w-32"
                />
              </div>
              <span className="text-gray-500 text-xl font-semibold">ATAU</span>
              <div className="flex flex-col items-center">
                <label
                  htmlFor="favicon-image-upload"
                  className="block text-gray-700 text-xl font-medium mb-2"
                >
                  Unggah Gambar:
                </label>
                <input
                  type="file"
                  id="favicon-image-upload"
                  accept="image/*"
                  onChange={(e) => {
                    setFaviconImageFile(e.target.files[0]);
                    setFaviconEmoji(""); // Clear emoji if image is used
                  }}
                  className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100"
                />
                {faviconImageFile && (
                  <p className="text-sm text-gray-500 mt-2">
                    File dipilih: {faviconImageFile.name}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleGenerateFavicon}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Buat Favicon"
                )}
              </button>
            </div>
          </div>
        )}

        {/* Image Converter Section */}
        {selectedTab === "imageConverter" && (
          <div
            id="image-converter-section"
            className="p-4 sm:p-6 bg-white rounded-b-3xl"
          >
            <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
              Konverter Gambar
            </h2>
            <div className="flex flex-col items-center justify-center gap-6 mb-8">
              <label
                htmlFor="image-convert-upload"
                className="block text-gray-700 text-xl font-medium mb-2"
              >
                Unggah Gambar:
              </label>
              <input
                type="file"
                id="image-convert-upload"
                accept="image/*"
                onChange={(e) => setImageConvertFile(e.target.files[0])}
                className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
              />
              {imageConvertFile && (
                <p className="text-sm text-gray-500 mt-2">
                  File dipilih: {imageConvertFile.name}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <div className="flex-1">
                  <label
                    htmlFor="convert-format"
                    className="block text-gray-700 text-lg font-medium mb-2"
                  >
                    Format Target:
                  </label>
                  <select
                    id="convert-format"
                    value={imageConvertFormat}
                    onChange={(e) => setImageConvertFormat(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full"
                  >
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                    <option value="webp">WebP</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="convert-width"
                    className="block text-gray-700 text-lg font-medium mb-2"
                  >
                    Lebar (px, opsional):
                  </label>
                  <input
                    type="number"
                    id="convert-width"
                    value={imageConvertWidth}
                    onChange={(e) => setImageConvertWidth(e.target.value)}
                    placeholder="Otomatis"
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="convert-height"
                    className="block text-gray-700 text-lg font-medium mb-2"
                  >
                    Tinggi (px, opsional):
                  </label>
                  <input
                    type="number"
                    id="convert-height"
                    value={imageConvertHeight}
                    onChange={(e) => setImageConvertHeight(e.target.value)}
                    placeholder="Otomatis"
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleConvertImage}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Konversi Gambar"
                )}
              </button>
            </div>
          </div>
        )}

        {/* App Icon Generator Section */}
        {selectedTab === "appIcon" && (
          <div
            id="app-icon-section"
            className="p-4 sm:p-6 bg-white rounded-b-3xl"
          >
            <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
              Generator Ikon Aplikasi
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Unggah gambar sumber beresolusi tinggi (disarankan minimal
              1024x1024 px) untuk menghasilkan semua ukuran ikon yang diperlukan
              untuk proyek Android dan iOS Anda.
            </p>
            <div className="flex flex-col items-center justify-center gap-6 mb-8">
              <label
                htmlFor="app-icon-upload"
                className="block text-gray-700 text-xl font-medium mb-2"
              >
                Unggah Gambar Sumber:
              </label>
              <input
                type="file"
                id="app-icon-upload"
                accept="image/*"
                onChange={(e) => setAppIconFile(e.target.files[0])}
                className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
              />
              {appIconFile && (
                <p className="text-sm text-gray-500 mt-2">
                  File dipilih: {appIconFile.name}
                </p>
              )}
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleGenerateAppIcons}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Buat Ikon Aplikasi"
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hidden Canvas for Image Processing */}
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
};

export default App;
