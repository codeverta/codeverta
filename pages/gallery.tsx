import fs from "fs";
import path from "path";
import Image from "next/image";
import Head from "next/head";
import { withI18n } from "@/lib/withi18n";

export default function Gallery({ images }) {
  return (
    <>
      <Head>
        <title>Portfolio & Assets Gallery | Codeverta</title>
        <meta
          name="description"
          content="Kumpulan galeri gambar dari berbagai project seperti camping, kontraktor, dan gym management."
        />
      </Head>

      <main style={{ padding: "2rem" }}>
        <h1>Project Gallery</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {images.map((img, index) => (
            <figure key={index} style={{ margin: 0 }}>
              <div
                style={{ position: "relative", height: "250px", width: "100%" }}
              >
                {/* next/image wajib untuk high performance & SEO */}
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <figcaption
                style={{
                  textAlign: "center",
                  marginTop: "0.5rem",
                  fontSize: "14px",
                }}
              >
                {img.folder}: {img.fileName}
              </figcaption>
            </figure>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps = withI18n(["common"], function () {
  const assetsDir = path.join(process.cwd(), "public", "assets");
  let images = [];

  // Ambil semua folder di dalam public/assets
  const folders = fs
    .readdirSync(assetsDir)
    .filter((file) => fs.statSync(path.join(assetsDir, file)).isDirectory());

  // Loop setiap folder dan ambil gambar
  folders.forEach((folder) => {
    const folderPath = path.join(assetsDir, folder);
    const files = fs
      .readdirSync(folderPath)
      .filter((file) => /\.(png|jpe?g|svg|webp)$/i.test(file));

    files.forEach((file) => {
      images.push({
        src: `/assets/${folder}/${file}`,
        alt: `Screenshot project ${folder} - ${file.replace(/\.[^/.]+$/, "")}`, // Alt text penting untuk SEO Google Image
        folder: folder,
        fileName: file,
      });
    });
  });

  return {
    props: {
      images,
    },
  };
});
