'use client';

import { useState } from 'react';
import { Tag as TagIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export interface TagProps {
  _id: string;
  name: string;
  slug: string;
  description?: string; // ensure this is optional
}

export interface TagFilterProps {
  tags: TagProps[];
  activeTags: string[];
  onTagsChangeAction: (tags: string[]) => void;
}

export default function TagFilter({ tags, activeTags, onTagsChangeAction }: TagFilterProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>(activeTags || []);

  const handleTagClick = (tagSlug: string) => {
    let newSelectedTags: string[];

    if (selectedTags.includes(tagSlug)) {
      newSelectedTags = selectedTags.filter(t => t !== tagSlug);
    } else {
      newSelectedTags = [...selectedTags, tagSlug];
    }

    setSelectedTags(newSelectedTags);
    onTagsChangeAction(newSelectedTags);
  };

  return (
    <div className="py-4">
      <div className="flex items-center mb-3">
        <TagIcon className="h-5 w-5 mr-2 text-cyan-500" />
        <h3 className="text-lg font-medium">Popular Tags</h3>
      </div>

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
