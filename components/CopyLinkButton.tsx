import React, { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";

const CopyLinkButton = () => {
  const [copied, setCopied] = useState(false);

  // Reset the copied state after 2 seconds
  useEffect(() => {
    let timeout;
    if (copied) {
      timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [copied]);

  const copyCurrentUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => setCopied(true))
      .catch((err) => console.error("Failed to copy URL:", err));
  };

  return (
    <button
      onClick={copyCurrentUrl}
      className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      title="Copy link to clipboard"
    >
      {copied ? (
        <>
          <Check className="w-5 h-5 text-green-500" />
          <span className="text-green-500">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-5 h-5" />
          <span>Copy link</span>
        </>
      )}
    </button>
  );
};

export default CopyLinkButton;
