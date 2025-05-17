// pages/faq.js
import { useState } from "react";
import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import { useRouter } from "next/router";

// Component for a single FAQ item
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex w-full justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </span>
      </button>
      {isOpen && (
        <div
          className="mt-2 prose prose-blue"
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      )}
    </div>
  );
};

export default function FAQ({ faqs }) {
  const router = useRouter();
  return (
    <div className="bg-white">
      <Head>
        <title>FAQ - Your Company</title>
        <meta name="description" content="Frequently Asked Questions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* <h1 className="text-2xl font-bold text-gray-900">
              Frequently Asked Questions
            </h1> */}
            <button
              onClick={() => router.back()}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              ← Back
            </button>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Can't find the answer you're looking for? Contact our{" "}
              <a
                href="mailto:support@example.com"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                customer support
              </a>{" "}
              team.
            </p>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-2">
            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// This function gets called at build time
export async function getStaticProps() {
  // Get the path to the FAQ markdown file
  const faqFilePath = path.join(process.cwd(), "public/document/faq.md");

  // Read the file
  const fileContents = fs.readFileSync(faqFilePath, "utf8");

  // Use gray-matter to parse the frontmatter and content
  const { data, content } = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(gfm) // GitHub Flavored Markdown for tables, etc.
    .use(html)
    .process(content);

  const contentHtml = processedContent.toString();

  // Parse the FAQ content
  // Assuming the content is structured with ## for questions and content below each question is the answer
  const faqMatches = contentHtml.split("<h2>");

  const faqs = [];

  // Skip the first element if it's empty (before the first h2)
  for (let i = 1; i < faqMatches.length; i++) {
    const section = "<h2>" + faqMatches[i];
    const questionMatch = section.match(/<h2>(.*?)<\/h2>/);

    if (questionMatch && questionMatch[1]) {
      const question = questionMatch[1];

      // Get everything after the question heading as the answer
      let answer = section.substring(section.indexOf("</h2>") + 5).trim();

      // Check if there's another h2 in the answer, and if so, cut it off
      const nextH2Index = answer.indexOf("<h2>");
      if (nextH2Index !== -1) {
        answer = answer.substring(0, nextH2Index);
      }

      faqs.push({
        question,
        answer,
      });
    }
  }

  return {
    props: {
      faqs,
    },
  };
}
