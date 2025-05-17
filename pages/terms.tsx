// pages/terms.js
import { useState, useEffect } from "react";
import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// Function to get the terms content
export async function getStaticProps({ locale }) {
  const termsPath = path.join(process.cwd(), "public", "document", "terms.md");
  const fileContents = fs.readFileSync(termsPath, "utf8");

  // Use gray-matter to parse the metadata and content
  const { data, content } = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).use(gfm).process(content);

  const contentHtml = processedContent.toString();

  // Extract headings for table of contents
  const headingRegex = /^##\s+(.+)$/gm;
  const matches = [...content.matchAll(headingRegex)];
  const sections = matches.map((match) => {
    const title = match[1].trim();
    const anchor = title
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-");
    return { title, anchor };
  });

  return {
    props: {
      termsContent: contentHtml,
      sections,
      metadata: data,
      ...(await serverSideTranslations(locale, ["common", "order"])),
    },
  };
}

export default function TermsAndConditions({
  termsContent,
  sections,
  metadata,
}) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Function to handle scroll and update active section
    const handleScroll = () => {
      const headings = document.querySelectorAll("h2[id]");
      const scrollPosition = window.scrollY;

      headings.forEach((heading) => {
        const sectionTop = heading.offsetTop;
        if (scrollPosition >= sectionTop - 100) {
          setActiveSection(heading.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (anchor) => {
    const element = document.getElementById(anchor);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  // Add IDs to h2 elements for navigation
  useEffect(() => {
    const contentDiv = document.getElementById("terms-content");
    if (contentDiv) {
      const headings = contentDiv.querySelectorAll("h2");
      headings.forEach((heading) => {
        const id = heading.textContent
          .toLowerCase()
          .replace(/[^\w\s]/g, "")
          .replace(/\s+/g, "-");
        heading.id = id;

        // Add styling to headings
        heading.classList.add(
          "text-2xl",
          "font-bold",
          "mt-8",
          "mb-4",
          "pt-6",
          "border-t",
          "border-gray-100"
        );
      });

      // Style h3 headings
      const subHeadings = contentDiv.querySelectorAll("h3");
      subHeadings.forEach((heading) => {
        heading.classList.add("text-xl", "font-semibold", "mt-6", "mb-3");
      });

      // Style paragraphs
      const paragraphs = contentDiv.querySelectorAll("p");
      paragraphs.forEach((p) => {
        p.classList.add("mb-4", "text-gray-700");
      });

      // Style lists
      const lists = contentDiv.querySelectorAll("ul, ol");
      lists.forEach((list) => {
        if (list.tagName === "UL") {
          list.classList.add("mb-4", "ml-6", "list-disc");
        } else {
          list.classList.add("mb-4", "ml-6", "list-decimal");
        }

        const items = list.querySelectorAll("li");
        items.forEach((item) => {
          item.classList.add("mb-2");
        });
      });

      // Style links
      const links = contentDiv.querySelectorAll("a");
      links.forEach((link) => {
        link.classList.add("text-blue-600", "hover:underline");
      });
    }
  }, [termsContent]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Terms & Conditions</title>
        <meta
          name="description"
          content={
            metadata.description || "Terms and conditions of our service"
          }
        />
      </Head>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Terms & Conditions
            </h1>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              ← Back
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Table of Contents - Desktop */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Table of Contents
                </h2>
                <nav className="space-y-1">
                  {sections.map((section, index) => (
                    <a
                      key={index}
                      href={`#${section.anchor}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(section.anchor);
                      }}
                      className={`block py-2 px-3 text-sm rounded-md hover:bg-gray-50 
                        ${
                          activeSection === section.anchor
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-700 hover:text-gray-900"
                        }`}
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="mt-6 lg:mt-0 lg:col-span-9">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              {/* Table of Contents - Mobile */}
              <div className="lg:hidden p-4 border-b border-gray-200">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                    <span className="text-gray-900 font-medium">
                      Table of Contents
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg
                        fill="none"
                        height="24"
                        width="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </summary>
                  <div className="mt-3 pl-2 pr-4 border-l-2 border-gray-200">
                    <nav className="space-y-1">
                      {sections.map((section, index) => (
                        <a
                          key={index}
                          href={`#${section.anchor}`}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(section.anchor);
                          }}
                          className={`block py-2 text-sm ${
                            activeSection === section.anchor
                              ? "text-blue-700 font-medium"
                              : "text-gray-700 hover:text-gray-900"
                          }`}
                        >
                          {section.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                </details>
              </div>

              <div className="px-6 py-8">
                <div id="terms-content" className="prose prose-blue max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: termsContent }} />
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {metadata.version && `Version ${metadata.version} - `}
                  Last updated:{" "}
                  {metadata.lastUpdated || new Date().toLocaleDateString()}
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                      ></path>
                    </svg>
                    Print
                  </button>
                  <button
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Back to top
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
