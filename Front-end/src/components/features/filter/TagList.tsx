import React from 'react';

/**
 * Interface for tag data structure
 * @interface Tag
 * @property {string} _id - Unique identifier for the tag
 * @property {string} name - Display name of the tag
 * @property {string} slug - URL-friendly identifier for the tag
 */
interface Tag {
  _id: string;
  name: string;
  slug: string;
}

/**
 * Props interface for the TagList component
 * @interface TagListProps
 * @property {Tag[]} tags - Array of tags to display
 * @property {function} onTagClick - Callback function when a tag is clicked
 * @property {string} [activeTag] - Currently selected tag slug
 */
interface TagListProps {
  tags: Tag[];
  onTagClick: (tagSlug: string) => void;
  activeTag?: string;
}

/**
 * TagList Component
 * 
 * A component that displays a list of tags with selection functionality.
 * Includes an "All" option and highlights the currently selected tag.
 * 
 * @component
 * @example
 * ```tsx
 * <TagList
 *   tags={availableTags}
 *   onTagClick={handleTagClick}
 *   activeTag="react"
 * />
 * ```
 * 
 * @param {TagListProps} props - The component props
 * @returns {JSX.Element | null} A list of clickable tags or null if tags are invalid
 */
const TagList: React.FC<TagListProps> = ({ tags, onTagClick, activeTag }) => {
  // Validate tags array before rendering
  if (!tags || !Array.isArray(tags)) {
    return null;
  }

  return (
    <div className="py-4 px-4 sm:px-6 lg:px-8">
      {/* Section header */}
      <h2 className="text-xl font-bold mb-3">Tags</h2>
      {/* Tag list container */}
      <div className="flex flex-wrap gap-2">
        {/* "All" option */}
        <span
          onClick={() => onTagClick('')}
          className={`px-3 py-1 rounded-full cursor-pointer ${
            !activeTag ? 'bg-cyan-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          All
        </span>
        {/* Individual tags */}
        {tags.map(tag => (
          <span
            key={tag._id}
            onClick={() => onTagClick(tag.slug)}
            className={`px-3 py-1 rounded-full cursor-pointer ${
              activeTag === tag.slug ? 'bg-cyan-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagList;
