import Link from "next/link";
import Navbar from "./components/Navbar";
import ArticleCard from "./components/ArticleCard";
import TagList from "./components/TagList";
import CategoryList from "./components/CategoryList";

const articles = [
  {
    id: 1,
    title: "The Future of Web Development",
    summary: "Explore the latest trends and technologies shaping the future of web development.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Mastering Responsive Design",
    summary: "Learn the key principles and techniques for creating truly responsive websites.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,  
    title: "The Power of Serverless Architecture",
    summary: "Discover how serverless computing is revolutionizing application development.",
    image: "/placeholder.svg?height=200&width=300",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-200">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">Welcome to My Personal Blog</h1>
          <p className="mt-3 text-xl sm:mt-4">
            Dive into my thoughts, experiences, and insights on technology and life.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <input
          type="text"
          placeholder="Search articles..."
          className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </section>
      
      <TagList />
      {/* Featured Articles */}
      <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white mb-8">Featured Articles</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 py-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} My Personal Blog. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
