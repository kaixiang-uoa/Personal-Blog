'use client';
export const dynamic = 'force-dynamic';
export const dynamicParams = false;
import Navbar from '../../components/Navbar';

export default function AboutMe() {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-200">
      <Navbar />

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Introduction Section */}
        <section className="mb-12">
          <h1 className="text-4xl font-extrabold mb-4">About Me</h1>
          <p className="text-lg">
            Hello! I&apos;m a passionate developer with a love for technology and innovation. I
            enjoy creating solutions that make a difference and sharing my knowledge with others.
          </p>
        </section>

        {/* Contact Info */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
          <ul className="list-disc list-inside">
            <li>
              Email:{' '}
              <a href="mailto:your.email@example.com" className="text-cyan-600 hover:text-cyan-400">
                your.email@example.com
              </a>
            </li>
          </ul>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Professional Skills</h2>
          <ul className="list-disc list-inside">
            <li>JavaScript, TypeScript, React, Next.js</li>
            <li>Node.js, Express, MongoDB</li>
            <li>HTML, CSS, Tailwind CSS</li>
            <li>Git, GitHub, CI/CD</li>
          </ul>
        </section>

        {/* Education */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Education</h2>
          <ul className="list-disc list-inside">
            <li>Bachelor of Science in Computer Science, Your University</li>
            <li>Additional Certifications or Courses</li>
          </ul>
        </section>

        {/* Experience */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Experience</h2>
          <ul className="list-disc list-inside">
            <li>Software Developer at Company A (Year - Year)</li>
            <li>Intern at Company B (Year - Year)</li>
          </ul>
        </section>

        {/* Projects */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Projects</h2>
          <ul className="list-disc list-inside">
            <li>
              Project A: Description and{' '}
              <a href="#" className="text-cyan-600 hover:text-cyan-400">
                GitHub Link
              </a>
            </li>
            <li>
              Project B: Description and{' '}
              <a href="#" className="text-cyan-600 hover:text-cyan-400">
                GitHub Link
              </a>
            </li>
          </ul>
        </section>

        {/* Social */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Connect with Me</h2>
          <ul className="list-disc list-inside">
            <li>
              <a
                href="https://github.com/yourusername"
                className="text-cyan-600 hover:text-cyan-400"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/yourusername"
                className="text-cyan-600 hover:text-cyan-400"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
