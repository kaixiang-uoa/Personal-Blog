const categories = ['Technology', 'Design', 'Lifestyle', 'Travel'];

export default function CategoryList() {
  return (
    <ul className="list-disc list-inside mt-4">
      {categories.map(category => (
        <li key={category} className="text-cyan-600 cursor-pointer hover:underline">
          {category}
        </li>
      ))}
    </ul>
  );
}
