'use client';

import { useState } from 'react';
import { Tag as TagIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

/**
 * Tag interface representing a tag in the system
 * @interface TagProps
 * @property {string} _id - Unique identifier for the tag
 * @property {string} name - Display name of the tag
 * @property {string} slug - URL-friendly identifier for the tag
 * @property {string} [description] - Optional description of the tag
 */
export interface TagProps {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

/**
 * Props interface for the TagFilter component
 * @interface TagFilterProps
 * @property {TagProps[]} tags - Array of available tags
 * @property {string[]} activeTags - Array of currently selected tag slugs
 * @property {function} onTagsChangeAction - Callback function when tags selection changes
 */
export interface TagFilterProps {
  tags: TagProps[];
  activeTags: string[];
  onTagsChangeAction: (tags: string[]) => void;
}

/**
 * TagFilter Component
 * 
 * A component that displays a scrollable list of tags with multi-select functionality.
 * Tags can be toggled on/off, and the component maintains the selected state.
 * 
 * @component
 * @example
 * ```tsx
 * <TagFilter
 *   tags={availableTags}
 *   activeTags={['react', 'typescript']}
 *   onTagsChangeAction={handleTagsChange}
 * />
 * ```
 * 
 * @param {TagFilterProps} props - The component props
 * @returns {JSX.Element} A scrollable tag filter component
 */
export default function TagFilter({ tags, activeTags, onTagsChangeAction }: TagFilterProps) {
  // Initialize selected tags state with active tags
  const [selectedTags, setSelectedTags] = useState<string[]>(activeTags || []);

  /**
   * Handle tag click event
   * Toggles the selected state of a tag and updates the parent component
   * @param {string} tagSlug - The slug of the clicked tag
   */
  const handleTagClick = (tagSlug: string) => {
    let newSelectedTags: string[];

    if (selectedTags.includes(tagSlug)) {
      // Remove tag if already selected
      newSelectedTags = selectedTags.filter(t => t !== tagSlug);
    } else {
      // Add tag if not selected
      newSelectedTags = [...selectedTags, tagSlug];
    }

    setSelectedTags(newSelectedTags);
    onTagsChangeAction(newSelectedTags);
  };

  return (
    <div className="py-4">
      {/* Header section with icon and title */}
      <div className="flex items-center mb-3">
        <TagIcon className="h-5 w-5 mr-2 text-cyan-500" />
        <h3 className="text-lg font-medium">Popular Tags</h3>
      </div>

      {/* Scrollable tag list */}
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Badge
              key={tag._id}
              variant={selectedTags.includes(tag.slug) ? 'default' : 'secondary'}
              className={`
                cursor-pointer transition-all hover:scale-105
                ${
                  selectedTags.includes(tag.slug)
                    ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                }
              `}
              onClick={() => handleTagClick(tag.slug)}
            >
              {tag.name}
            </Badge>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
