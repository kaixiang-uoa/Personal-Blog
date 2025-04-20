import React from 'react';

interface Tag {
  _id: string;
  name: string;
  slug: string;
}

interface TagListProps {
  tags: Tag[];
  onTagClick: (tagSlug: string) => void;
  activeTag?: string;
}

const TagList: React.FC<TagListProps> = ({ tags, onTagClick, activeTag }) => {
  // 添加空数组检查，确保tags存在
  if (!tags || !Array.isArray(tags)) {
    return null; // 如果tags不存在或不是数组，不渲染任何内容
  }

  return (
    <div className="py-4 px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl font-bold mb-3">标签</h2>
      <div className="flex flex-wrap gap-2">
        <span
          onClick={() => onTagClick('')}
          className={`px-3 py-1 rounded-full cursor-pointer ${
            !activeTag ? 'bg-cyan-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          全部
        </span>
        {tags.map((tag) => (
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