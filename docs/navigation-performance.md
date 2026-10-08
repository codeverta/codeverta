# Navigation performance assets

The navbar uses a compact translation payload instead of loading complete project records. Run `node scripts/generate-navigation-data.cjs` after changing product names, descriptions, or images. The production build runs this generator before `next build`.

Menu thumbnails are separate 3:2 WebP copies; full-size source images remain unchanged for product pages. The source-to-thumbnail mapping is in `lib/navigation-thumbnails.json`. With Pillow installed, run `python3 scripts/compress-navigation-thumbnails.py` after replacing a mapped source image. The script keeps each thumbnail at or below 50,000 bytes.

Dropdown and language-panel transitions continue to use Framer Motion. Menu components are memoized at module scope so scroll and locale state changes do not recreate their animated elements.
