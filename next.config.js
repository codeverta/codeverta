const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    // You can add remark and rehype plugins here if needed
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
        ],
      },
    ];
  },
  reactStrictMode: false,
  staticPageGenerationTimeout: 120,
  typescript: {
    // Ignore TypeScript errors during production builds
    ignoreBuildErrors: true,
  },
  i18n,
  images: {
    domains: ['picsum.photos', 'firebasestorage.googleapis.com', 'cdn.dribbble.com'],
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

module.exports = withMDX(nextConfig);
