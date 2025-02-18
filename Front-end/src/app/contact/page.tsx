
import Navbar from "../components/Navbar";

export default function Contact() {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-200">
      <Navbar />

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold mb-4">Contact Me</h1>
        <p className="mb-8">
          If you have any questions, suggestions, or just want to say hi, feel free to reach out to me through the contact form below. I'm always open to connecting with like-minded individuals and exploring new opportunities.
        </p>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
            <input type="text" id="name" className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input type="email" id="email" className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
            <textarea id="message" rows={4} className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"></textarea>
          </div>
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
            Send Message
          </button>
        </form>
      </div>

      <footer className="bg-gray-800 py-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} My Personal Blog. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
} 