
export default function TOC({ headings }) {
  if (!headings || headings.length < 3) return null;

  const handleClick = (e, slug) => {
    e.preventDefault();
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });

      // Highlight the section briefly
      element.classList.add("highlight-section");
      setTimeout(() => {
        element.classList.remove("highlight-section");
      }, 1500);
    }
  };

  return (
    <div className="toc-container bg-gray-50 dark:bg-gray-800 rounded-lg p-4 my-6 sticky top-24 max-h-[80vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-bold mb-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
        Contents
      </h3>
      <ul className="space-y-2">
        {headings.map((heading, index) => (
          <li
            key={index}
            className={`
              toc-item
              ${heading.level === 2 ? "font-medium" : "text-sm opacity-90"}
              hover:text-blue-600 dark:hover:text-blue-400
              transition-colors
            `}
            style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
          >
            <a
              href={`#${heading.slug}`}
              onClick={(e) => handleClick(e, heading.slug)}
              className="block py-1 border-l-2 border-transparent hover:border-blue-500 pl-2"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
