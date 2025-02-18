"use client"
import { useRouter, useParams } from "next/navigation";
import Navbar from "../components/Navbar";
import TagList from "../components/TagList";

const article = {
  id: 1,
  title: "The Future of Web Development",
  content: "This is the full content of the article. It explores the latest trends and technologies shaping the future of web development.",
  tags: ["Web Development", "Future", "Trends"],
};

export default function ArticlePage() {
  const router = useRouter();
  const { id } = useParams();

  return (
    <main className="min-h-screen bg-gray-900 text-gray-200">
      <Navbar />

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => router.back()}
          className="text-cyan-600 hover:text-cyan-400 mb-4"
        >
          &larr; Back
        </button>

        <article>
          <h1 className="text-3xl font-extrabold mb-4">{article.title}</h1>
          <p className="mb-8">{article.content}</p>
        </article>

        <aside className="mt-8">
          <h2 className="text-xl font-bold mb-2">Tags</h2>
          <TagList />
        </aside>
      </div>

      <footer className="bg-gray-800 py-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} My Personal Blog. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
