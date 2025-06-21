"use client"
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../lib/firebase"; // Adjust path as needed
import { Copy, ExternalLink, Link2, Zap } from "lucide-react";
import Layout from "@/components/layout/Landing";

export default function URLShortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recentUrls, setRecentUrls] = useState([]);
  const [copied, setCopied] = useState("");

  // Generate random short code
  const generateShortCode = () => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Validate URL
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Load recent URLs
  const loadRecentUrls = async () => {
    try {
      const q = query(
        collection(db, "urls"),
        orderBy("createdAt", "desc"),
        limit(10)
      );
      const querySnapshot = await getDocs(q);
      const urls = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecentUrls(urls);
    } catch (error) {
      console.error("Error loading recent URLs:", error);
    }
  };

  useEffect(() => {
    loadRecentUrls();
  }, []);

  // Check if short code exists
  const checkShortCodeExists = async (code) => {
    const q = query(collection(db, "urls"), where("shortCode", "==", code));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  // Handle URL shortening
  const handleShorten = async (e) => {
    e.preventDefault();

    if (!originalUrl.trim()) {
      alert("Please enter a URL");
      return;
    }

    if (!isValidUrl(originalUrl)) {
      alert("Please enter a valid URL");
      return;
    }

    setIsLoading(true);

    try {
      let finalShortCode = shortCode.trim();

      // If no custom code provided, generate one
      if (!finalShortCode) {
        do {
          finalShortCode = generateShortCode();
        } while (await checkShortCodeExists(finalShortCode));
      } else {
        // Check if custom code already exists
        if (await checkShortCodeExists(finalShortCode)) {
          alert("This short code is already taken. Please choose another one.");
          setIsLoading(false);
          return;
        }
      }

      // Save to Firestore
      const docRef = await addDoc(collection(db, "urls"), {
        originalUrl: originalUrl,
        shortCode: finalShortCode,
        createdAt: new Date(),
        clicks: 0,
      });

      const baseUrl = window.location.origin;
      const shortened = `${baseUrl}/${finalShortCode}`;
      setShortenedUrl(shortened);

      // Clear form
      setOriginalUrl("");
      setShortCode("");

      // Reload recent URLs
      loadRecentUrls();
    } catch (error) {
      console.error("Error shortening URL:", error);
      alert("Error creating short URL. Please try again.");
    }

    setIsLoading(false);
  };

  // Copy to clipboard
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(""), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Link2 className="w-12 h-12 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">URL Shortener</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Transform long URLs into short, shareable links
          </p>
        </div>

        {/* Main Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleShorten} className="space-y-6">
              {/* Original URL Input */}
              <div>
                <label
                  htmlFor="originalUrl"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Enter your long URL
                </label>
                <input
                  type="url"
                  id="originalUrl"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  placeholder="https://example.com/very-long-url-here"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              {/* Custom Short Code Input */}
              <div>
                <label
                  htmlFor="shortCode"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Custom short code (optional)
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    codeverta.com
                    /
                  </span>
                  <input
                    type="text"
                    id="shortCode"
                    value={shortCode}
                    onChange={(e) =>
                      setShortCode(e.target.value.replace(/[^a-zA-Z0-9]/g, ""))
                    }
                    placeholder="mylink"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    maxLength="20"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty for auto-generated code
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Shortening...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Shorten URL
                  </>
                )}
              </button>
            </form>

            {/* Result */}
            {shortenedUrl && (
              <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-green-800 font-medium mb-2">
                  Your shortened URL:
                </h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={shortenedUrl}
                    readOnly
                    className="flex-1 px-3 py-2 bg-white border border-green-300 rounded text-green-700 font-mono text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(shortenedUrl)}
                    className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <a
                    href={shortenedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                    title="Open link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                {copied === shortenedUrl && (
                  <p className="text-green-600 text-sm mt-2">
                    ✓ Copied to clipboard!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Recent URLs */}
        {/* {recentUrls.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Recent URLs
              </h2>
              <div className="space-y-4">
                {recentUrls.map((url) => (
                  <div
                    key={url.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {typeof window !== "undefined"
                            ? window.location.origin
                            : "domain.com"}
                          /{url.shortCode}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {url.originalUrl}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {url.createdAt?.toDate
                            ? url.createdAt.toDate().toLocaleDateString()
                            : "Recently created"}{" "}
                          • {url.clicks || 0} clicks
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() =>
                            copyToClipboard(
                              `${window.location.origin}/${url.shortCode}`
                            )
                          }
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Copy to clipboard"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <a
                          href={`/${url.shortCode}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Open link"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                    {copied ===
                      `${window.location.origin}/${url.shortCode}` && (
                      <p className="text-green-600 text-sm mt-2">
                        ✓ Copied to clipboard!
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}


URLShortener.getLayout = function getLayout(page) {
  return <Layout seo={{
    title: "URL Shortener - Codeverta",
    description: "Shorten your URLs easily with Codeverta's URL Shortener. Create custom short links and track clicks.",
    ogType: "website",
    ogTitle: "URL Shortener - Codeverta",
    ogDescription: "Shorten your URLs easily with Codeverta's URL Shortener. Create custom short links and track clicks.",
  }}>{page}</Layout>;
};
