// pages/posts/[id].jsx
import React from "react";
import Layout from "components/layout/Landing";
import { getPostData, getAllPostIds } from "lib/posts";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// Import komponen konten yang sudah kita buat
import PostContent from "@/components/blog/post-content";

const POST_CATEGORY = "news"; // Ganti ke "gadget" atau yang lain jika diperlukan

// --- Post Component (Halaman Next.js) ---
function Post({ postData, slug, locale }) {
  // Asumsi untuk artikel statistik, bisa dihitung/diambil dari data postData jika ada
  const articleStats = {
    difficulty: "Intermediate",
    // Ambil kategori dari data postingan jika tersedia, jika tidak, gunakan default
    category: postData.category || "General",
    lastUpdated: postData.date,
    // Gunakan nilai hardcoded atau ambil dari postData
    contributors: postData.contributors || 1,
    codeExamples: postData.codeExamples || 5,
    references: postData.references || 10,
  };

  return (
    <PostContent postData={postData} slug={slug} articleStats={articleStats} />
  );
}

Post.getLayout = function (page) {
  return <Layout>{page}</Layout>;
};

export default Post;

// --- Data Fetching (getStaticProps & getStaticPaths) ---

// Catatan: Karena Anda menyediakan dua versi dengan kategori hardcoded berbeda
// di getStaticProps/getStaticPaths (yaitu "cybersecurity" dan "gadget"),
// kode di bawah ini harus memilih salah satunya. Saya akan memilih "cybersecurity"
// sebagai contoh, Anda mungkin perlu menyesuaikannya agar dinamis jika post Anda
// ada di folder berbeda.

export async function getStaticProps({ params, locale }) {
  const slug = params.id;
  const postData = await getPostData(slug, POST_CATEGORY); // Menggunakan kategori yang dipilih

  // Menambahkan data kategori/stats dasar ke postData jika diperlukan untuk komponen PostContent
  postData.category = POST_CATEGORY;

  return {
    props: {
      postData,
      slug,
      locale,
    },
  };
}

export async function getStaticPaths({ locales }) {
  const postIds = getAllPostIds(POST_CATEGORY); // Menggunakan kategori yang dipilih
  const paths = [];

  postIds.forEach((postId) => {
    for (const locale of locales) {
      paths.push({
        params: {
          id: postId.params.id,
        },
        locale,
      });
    }
  });

  return {
    paths,
    fallback: false,
  };
}
