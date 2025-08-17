/**
 * Predefined list of categories
 * @constant {string[]}
 */
const categories = ['Technology', 'Design', 'Lifestyle', 'Travel'];

/**
 * CategoryList Component
 *
 * A simple component that displays a list of predefined categories.
 * Each category is clickable and has hover effects.
 *
 * @component
 * @example
 * ```tsx
 * <CategoryList />
 * ```
 *
 * @returns {JSX.Element} A list of clickable categories
 */
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
