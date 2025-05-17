"use client";
import { useEffect } from "react";
import Script from "next/script";

interface CommentsProps {
  postId: string;
  postTitle: string;
}

export default function Comments({ postId, postTitle }: CommentsProps) {
  return (
    <div className="mt-16">
      <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Komentar
        </h2>
        <div id="giscus-container" className="w-full" />
        <Script
          src="https://giscus.app/client.js"
          strategy="afterInteractive"
          data-repo="RobyCigar/robycigar.github.io"
          data-repo-id="327066458"
          data-category="Comments"
          data-category-id="44208076"
          data-mapping="pathname"
          data-strict="0"
          data-reactions-enabled="1"
          data-emit-metadata="0"
          data-input-position="bottom"
          data-theme="light_dark"
          data-lang="id"
          crossOrigin="anonymous"
        />
      </div>
    </div>
  );
}
