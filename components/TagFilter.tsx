import React, { useState, useEffect } from "react";

/**
 * TagFilter Component
 * Displays a list of filterable tags for blog posts
 */
export const TagFilter = ({ tags, onChange, selectedTags = [] }) => {
  const [selected, setSelected] = useState(selectedTags);
  const [isExpanded, setIsExpanded] = useState(false);

  // Maximum number of tags to show when collapsed
  const visibleTagsCount = 8;

  // Sync internal state with external state
  useEffect(() => {
    setSelected(selectedTags);
  }, [selectedTags]);

  const handleTagClick = (tag) => {
    let newSelected;

    if (selected.includes(tag)) {
      // Remove tag if already selected
      newSelected = selected.filter((t) => t !== tag);
    } else {
      // Add tag if not selected
      newSelected = [...selected, tag];
    }

    setSelected(newSelected);
    onChange(newSelected);
  };

  const clearAllTags = () => {
    setSelected([]);
    onChange([]);
  };

  // Determine which tags to display based on expanded state
  const visibleTags = isExpanded ? tags : tags.slice(0, visibleTagsCount);
  const hasMoreTags = tags.length > visibleTagsCount;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Filter by Topic
        </h3>
        {selected.length > 0 && (
          <button
            onClick={clearAllTags}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {visibleTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
              selected.includes(tag)
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {tag}
          </button>
        ))}

        {hasMoreTags && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {isExpanded
              ? "Show less"
              : `+${tags.length - visibleTagsCount} more`}
          </button>
        )}
      </div>

      {selected.length > 0 && (
        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Showing articles tagged with: {selected.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default TagFilter;
