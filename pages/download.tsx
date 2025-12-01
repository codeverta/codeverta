// pages/index.tsx
// Main page component

import { useState } from "react";
import {
  Download,
  Loader2,
  AlertCircle,
  CheckCircle,
  Instagram,
  ExternalLink,
} from "lucide-react";

export default function InstagramDownloader() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [videoData, setVideoData] = useState<{
    videoUrl: string;
    thumbnail: string;
    title: string;
  } | null>(null);

  const validateInstagramUrl = (url: string) => {
    const patterns = [
      /^https?:\/\/(www\.)?instagram\.com\/reel\//,
      /^https?:\/\/(www\.)?instagram\.com\/p\//,
      /^https?:\/\/(www\.)?instagram\.com\/stories\//,
      /^https?:\/\/(www\.)?instagram\.com\/tv\//,
    ];
    return patterns.some((pattern) => pattern.test(url));
  };

  const handleDownload = async () => {
    setError("");
    setSuccess("");
    setVideoData(null);

    if (!url.trim()) {
      setError("Please enter an Instagram URL");
      return;
    }

    if (!validateInstagramUrl(url)) {
      setError("Please enter a valid Instagram Reel, Post, or Story URL");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to fetch video");
      }

      setVideoData(data.data);
      setSuccess("Video ready for download!");
    } catch (err: any) {
      setError(
        err.message ||
          "Failed to download video. Please check the URL and try again."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadVideo = async () => {
    if (!videoData?.videoUrl) return;

    try {
      // Fetch the video
      const response = await fetch(videoData.videoUrl);
      const blob = await response.blob();

      // Create download link
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "instagram-video.mp4";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      // Fallback: open in new tab
      window.open(videoData.videoUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 p-4 rounded-2xl shadow-lg">
              <Instagram className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
            Instagram Video Downloader
          </h1>
          <p className="text-gray-600">
            Download Reels, Posts, and Stories easily
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* Input Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instagram URL
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleDownload()}
                placeholder="https://www.instagram.com/p/xxxxx/"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
                disabled={loading}
              />
              <button
                onClick={handleDownload}
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="hidden sm:inline">Processing...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span className="hidden sm:inline">Get Video</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-green-800 text-sm">{success}</p>
            </div>
          )}

          {/* Video Preview */}
          {videoData && (
            <div className="border-2 border-gray-200 rounded-lg p-6 bg-gray-50">
              {videoData.thumbnail && (
                <div className="relative mb-4 rounded-lg overflow-hidden shadow-md">
                  <img
                    src={videoData.thumbnail}
                    alt="Video thumbnail"
                    className="w-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Download className="w-8 h-8 text-pink-600" />
                    </div>
                  </div>
                </div>
              )}
              {videoData.title && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {videoData.title}
                </p>
              )}
              <div className="flex gap-3">
                <button
                  onClick={downloadVideo}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Video
                </button>
                <a
                  href={videoData.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">How to use:</h3>
            <ol className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="font-semibold text-pink-600">1.</span>
                <span>
                  Open Instagram and find the Reel, Post, or Story you want to
                  download
                </span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-pink-600">2.</span>
                <span>Tap the three dots (...) and select "Copy link"</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-pink-600">3.</span>
                <span>Paste the link in the input box above</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-pink-600">4.</span>
                <span>Click "Get Video" and download your content!</span>
              </li>
            </ol>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-sm text-gray-500">
          <p>
            ⚠️ Please respect content creators' rights and Instagram's terms of
            service.
          </p>
          <p className="mt-1">
            Only download content you have permission to use.
          </p>
        </div>
      </div>
    </div>
  );
}
