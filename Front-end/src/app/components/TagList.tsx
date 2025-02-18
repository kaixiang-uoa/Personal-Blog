const tags = ["Web Development", "Design", "Serverless", "React", "CSS"];

export default function TagList() {
  return (
    <div className="flex justify-center mt-4">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="bg-cyan-600 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-cyan-700">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
} 