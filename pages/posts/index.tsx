import Head from "next/head";
import Layout from "components/layout/Landing";
import { getSortedPostsData } from "lib/posts";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import {
  TextField,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Snackbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkIcon from "@mui/icons-material/Link";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

interface PostMeta {
  id: string;
  date: string;
  title: string;
  desc: string;
  image: string;
  category?: string; // Added optional category field
  readTime?: string; // Added optional read time field
}

const POSTS_PER_PAGE = 9; // Increased to 6 posts per page

export default function Home({ allPostsData }: { allPostsData: PostMeta[] }) {
  const router = useRouter();
  const { search, category } = router.query;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<PostMeta[]>(allPostsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // Share functionality states
  const [shareMenuAnchorEl, setShareMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const [sharePostId, setSharePostId] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { t } = useTranslation("common");

  // Extract unique categories from posts
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    allPostsData.forEach((post) => {
      if (post.category) uniqueCategories.add(post.category);
    });
    return Array.from(uniqueCategories);
  }, [allPostsData]);

  // Update search term and category when URL query changes
  useEffect(() => {
    if (search && typeof search === "string") {
      setSearchTerm(search);
    } else {
      setSearchTerm("");
    }

    if (category && typeof category === "string") {
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }

    // Reset to first page when search or category changes
    setCurrentPage(1);
  }, [search, category]);

  // Filter posts based on search term and category
  useEffect(() => {
    let filtered = [...allPostsData];

    // Filter by search term
    if (searchTerm.trim() !== "") {
      const lowercaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(lowercaseSearch) ||
          post.desc.toLowerCase().includes(lowercaseSearch)
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, allPostsData]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Get meta description
  const metaDescription = useMemo(() => {
    if (searchTerm) {
      return `Hasil pencarian untuk "${searchTerm}" di blog kami. Temukan artikel menarik tentang lilin.`;
    }
    return allPostsData.length > 0
      ? allPostsData[0].desc
      : "Kumpulan cerita dan tips mengenai lilin.";
  }, [searchTerm, allPostsData]);

  // Format date function
  const formatPostDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      return date.toLocaleDateString("id-ID", options);
    } catch (error) {
      return dateString;
    }
  };

  // Handle search input change and form submission
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search parameter
    router.push({
      pathname: router.pathname,
      query: {
        ...(searchTerm ? { search: searchTerm } : {}),
        ...(selectedCategory ? { category: selectedCategory } : {}),
      },
    });
  };

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);

    router.push({
      pathname: router.pathname,
      query: {
        ...(searchTerm ? { search: searchTerm } : {}),
        ...(newCategory ? { category: newCategory } : {}),
      },
    });
  };
  // Share functionality handlers
  const handleShareClick = (
    event: React.MouseEvent<HTMLElement>,
    postId: string
  ) => {
    setShareMenuAnchorEl(event.currentTarget);
    setSharePostId(postId);
  };

  const handleShareMenuClose = () => {
    setShareMenuAnchorEl(null);
  };

  const getPostUrl = (postId: string) => {
    // Create the full URL for sharing
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    return `${baseUrl}/posts/${postId}`;
  };

  const handleShare = (platform: string) => {
    if (!sharePostId) return;

    const postUrl = getPostUrl(sharePostId);
    const post = allPostsData.find((p) => p.id === sharePostId);
    const title = post?.title || "Blog Lilin Article";
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(postUrl);

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
        break;
      case "copy":
        if (typeof navigator !== "undefined") {
          navigator.clipboard.writeText(postUrl).then(
            () => {
              setSnackbarMessage("Link berhasil disalin!");
              setSnackbarOpen(true);
            },
            () => {
              setSnackbarMessage("Gagal menyalin link");
              setSnackbarOpen(true);
            }
          );
        }
        break;
    }

    if (shareUrl && typeof window !== "undefined") {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }

    handleShareMenuClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Layout>
      <Head>
        <title>
          {searchTerm
            ? `Hasil Pencarian untuk "${searchTerm}" - Blog Lilin`
            : selectedCategory
            ? `${selectedCategory} - Blog Lilin`
            : "Blog Lilin - Kumpulan Cerita dan Tips"}
        </title>
        <meta name="description" content={metaDescription} />
      </Head>
      <main className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-600">
              {t("blog.title")}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              {t("blog.description")}
            </p>

            {/* Search form */}
            <form
              onSubmit={handleSearchSubmit}
              className="max-w-md mx-auto mb-6 relative"
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: <SearchIcon className="text-gray-400 mr-2" />,
                  style: {
                    borderRadius: "9999px",
                    backgroundColor: "white",
                  },
                  className:
                    "shadow-sm hover:shadow-md transition-all duration-200",
                }}
              />
              <Button
                type="submit"
                variant="contained"
                className="!absolute !right-0 !h-full !rounded-r-full !px-5 !bg-gradient-to-r !from-purple-500 !to-blue-600 !transition-all !duration-200"
              >
                Cari
              </Button>
            </form>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => handleCategorySelect(category)}
                  color={selectedCategory === category ? "primary" : "default"}
                  variant={
                    selectedCategory === category ? "filled" : "outlined"
                  }
                  className="!text-sm !transition-all !duration-200"
                />
              ))}
            </div>

            {/* Show search results info if searching */}
            {(searchTerm || selectedCategory) && (
              <div className="text-sm text-center max-w-md mx-auto text-gray-500 dark:text-gray-400">
                {filteredPosts.length > 0 ? (
                  <p>
                    Menemukan {filteredPosts.length} hasil
                    {searchTerm && ` untuk "${searchTerm}"`}
                    {selectedCategory &&
                      ` dalam kategori "${selectedCategory}"`}
                  </p>
                ) : (
                  <p>
                    Tidak ada hasil
                    {searchTerm && ` untuk "${searchTerm}"`}
                    {selectedCategory &&
                      ` dalam kategori "${selectedCategory}"`}
                  </p>
                )}
              </div>
            )}
          </section>

          {filteredPosts.length > 0 ? (
            <>
              {/* Featured Post */}
              {currentPage === 1 && currentPosts.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                    Artikel Unggulan
                  </h2>
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                    <div className="md:flex">
                      <div className="md:flex-shrink-0 md:w-2/5 bg-gray-300 dark:bg-gray-700 h-60 md:h-auto">
                        <div className="w-full h-full">
                          <img
                            src={
                              currentPosts[0]?.image ||
                              `https://picsum.photos/seed/${currentPosts[0].id}/1200/630`
                            }
                            alt={currentPosts[0].title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="p-8 md:w-3/5">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <CalendarTodayIcon
                              fontSize="small"
                              className="mr-1"
                            />
                            {formatPostDate(currentPosts[0].date)}
                          </span>
                          {currentPosts[0].category && (
                            <Chip
                              label={currentPosts[0].category}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          )}
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {currentPosts[0].readTime || "5 min read"}
                          </span>
                        </div>
                        <Link href={`/posts/${currentPosts[0].id}`}>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 mb-4">
                            {currentPosts[0].title}
                          </h3>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                          {currentPosts[0].desc}
                        </p>
                        <div className="flex justify-between items-center">
                          <Link href={`/posts/${currentPosts[0].id}`}>
                            <Button
                              variant="outlined"
                              className="!rounded-full !bg-transparent !border !border-blue-500 !text-blue-500 !hover:bg-blue-50 !dark:hover:bg-blue-900 !transition-all !duration-300"
                            >
                              Baca Selengkapnya
                            </Button>
                          </Link>
                          <div className="flex gap-2">
                            {/* <Tooltip title="Simpan">
                              <IconButton
                                size="small"
                                className="!text-gray-500 !hover:text-blue-500 !transition-colors !duration-300"
                              >
                                <BookmarkBorderIcon fontSize="small" />
                              </IconButton>
                            </Tooltip> */}
                            <Tooltip title="Bagikan">
                              <IconButton
                                size="small"
                                className="!text-gray-500 !hover:text-blue-500 !transition-colors !duration-300"
                                onClick={(e) =>
                                  handleShareClick(e, currentPosts[0].id)
                                }
                              >
                                <ShareIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Regular Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(currentPage === 1 ? currentPosts.slice(1) : currentPosts).map(
                  ({
                    id,
                    date,
                    title,
                    desc,
                    category,
                    readTime,
                    image,
                  }: PostMeta) => (
                    <article
                      key={id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
                    >
                      <div className="h-40 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                        <div className="w-full h-full">
                          <img
                            src={
                              image ||
                              `https://picsum.photos/seed/${id}/1200/630`
                            }
                            alt={title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="p-6 flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <CalendarTodayIcon
                              fontSize="small"
                              className="mr-1"
                              style={{ fontSize: "0.75rem" }}
                            />
                            {formatPostDate(date)}
                          </span>
                          {category && (
                            <Chip
                              label={category}
                              size="small"
                              className="!text-xs"
                              color="primary"
                              variant="outlined"
                            />
                          )}
                        </div>
                        <Link href={`/posts/${id}`}>
                          <h2 className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 mb-2 line-clamp-2">
                            {title}
                          </h2>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm">
                          {desc}
                        </p>
                        <div className="flex justify-between items-center mt-auto">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {readTime || "3 min read"}
                          </span>
                          <div className="flex gap-1">
                            <Tooltip title="Simpan">
                              <IconButton
                                size="small"
                                className="!text-gray-500 !hover:text-blue-500 !transition-colors !duration-300"
                              >
                                <BookmarkBorderIcon
                                  fontSize="small"
                                  style={{ fontSize: "1rem" }}
                                />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Bagikan">
                              <IconButton
                                size="small"
                                className="!text-gray-500 !hover:text-blue-500 !transition-colors !duration-300"
                                onClick={(e) => handleShareClick(e, id)}
                              >
                                <ShareIcon
                                  fontSize="small"
                                  style={{ fontSize: "1rem" }}
                                />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </article>
                  )
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-7xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t("blog.not_found.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t("blog.not_found.description")}
              </p>
              <Button
                variant="contained"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(null);
                  router.push("/");
                }}
                className="!bg-gradient-to-r !from-blue-500 !to-purple-600 !rounded-full !px-6 !py-2"
              >
                Lihat Semua Artikel
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-16">
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center"
                >
                  <ArrowBackIosNewIcon
                    fontSize="small"
                    style={{ fontSize: "0.75rem" }}
                  />
                  <span className="ml-1">Sebelumnya</span>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 border border-gray-300 dark:border-gray-600 ${
                        currentPage === page
                          ? "bg-blue-500 text-white border-blue-500 dark:border-blue-500"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      } transition-colors duration-200 hidden md:block`}
                    >
                      {page}
                    </button>
                  )
                )}

                <span className="px-4 py-2 border-t border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 md:hidden">
                  {currentPage} / {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center"
                >
                  <span className="mr-1">Selanjutnya</span>
                  <ArrowForwardIosIcon
                    fontSize="small"
                    style={{ fontSize: "0.75rem" }}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Share Menu */}
        <Menu
          anchorEl={shareMenuAnchorEl}
          open={Boolean(shareMenuAnchorEl)}
          onClose={handleShareMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <MenuItem
            onClick={() => handleShare("facebook")}
            className="hover:!bg-blue-50 dark:hover:!bg-blue-900"
          >
            <FacebookIcon className="mr-2 text-blue-600" fontSize="small" />
            Facebook
          </MenuItem>
          <MenuItem
            onClick={() => handleShare("twitter")}
            className="hover:!bg-blue-50 dark:hover:!bg-blue-900"
          >
            <TwitterIcon className="mr-2 text-blue-400" fontSize="small" />
            Twitter
          </MenuItem>
          <MenuItem
            onClick={() => handleShare("linkedin")}
            className="hover:!bg-blue-50 dark:hover:!bg-blue-900"
          >
            <LinkedInIcon className="mr-2 text-blue-700" fontSize="small" />
            LinkedIn
          </MenuItem>
          <MenuItem
            onClick={() => handleShare("whatsapp")}
            className="hover:!bg-blue-50 dark:hover:!bg-blue-900"
          >
            <WhatsAppIcon className="mr-2 text-green-500" fontSize="small" />
            WhatsApp
          </MenuItem>
          <MenuItem
            onClick={() => handleShare("copy")}
            className="hover:!bg-blue-50 dark:hover:!bg-blue-900"
          >
            <ContentCopyIcon
              className="mr-2 text-gray-600 dark:text-gray-400"
              fontSize="small"
            />
            Salin Link
          </MenuItem>
        </Menu>

        {/* Notification Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </main>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  // Get posts and add sample categories and read times
  const allPostsData = getSortedPostsData(locale).map((post, index) => {
    // Add sample categories and read times (in a real app, these would come from the actual data)
    const categories = [
      "Sejarah Lilin",
      "Tutorial",
      "Tips & Trik",
      "Ulasan Produk",
      "Inspirasi",
      "Edukasi",
      "Lilin Ibadah",
      "Aromaterapi",
      "Lilin Taper",
      "Lilin Kristal",
    ];
    const readTimes = [
      "3 min read",
      "5 min read",
      "7 min read",
      "4 min read",
      "6 min read",
    ];

    return {
      ...post,
      category: categories[index % categories.length],
      readTime: readTimes[index % readTimes.length],
    };
  });

  return {
    props: {
      allPostsData,
      ...(await serverSideTranslations(locale, ["common", "order"])),
    },
  };
}
