'use client';
export const dynamic = 'force-dynamic';
export const dynamicParams = false;
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { useParams } from 'next/navigation';

// 定义About数据接口
interface AboutData {
  intro: string;
  contact: any;
  skills: string[];
  education: any[];
  experience: any[];
  projects: any[];
  social: any;
}

export default function AboutMe() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const [aboutData, setAboutData] = useState<AboutData>({
    intro: '',
    contact: {},
    skills: [],
    education: [],
    experience: [],
    projects: [],
    social: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 获取About相关设置，使用group参数过滤设置
    fetch('/api/settings?group=about')
      .then(res => res.json())
      .then(response => {
        if (response.success && response.data) {
          const data = response.data;
          
          // 根据当前语言选择合适的内容
          const intro = locale === 'zh' && data['about.intro_zh'] 
            ? data['about.intro_zh'] 
            : data['about.intro'] || '';
            
          try {
            setAboutData({
              intro,
              contact: data['about.contact'] ? JSON.parse(data['about.contact']) : {},
              skills: data['about.skills'] ? JSON.parse(data['about.skills']) : [],
              education: data['about.education'] ? JSON.parse(data['about.education']) : [],
              experience: data['about.experience'] ? JSON.parse(data['about.experience']) : [],
              projects: data['about.projects'] ? JSON.parse(data['about.projects']) : [],
              social: data['about.social'] ? JSON.parse(data['about.social']) : {}
            });
          } catch (err) {
            console.error('Error parsing JSON data:', err);
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching about data:', err);
        setLoading(false);
      });
  }, [locale]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-900 text-gray-200">
        <Navbar />
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-gray-200">
      <Navbar />

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Introduction Section */}
        <section className="mb-12">
          <h1 className="text-4xl font-extrabold mb-4">About Me</h1>
          <div 
            className="text-lg"
            dangerouslySetInnerHTML={{ __html: aboutData.intro }}
          />
        </section>

        {/* Contact Info */}
        {aboutData.contact && Object.keys(aboutData.contact).length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
            <ul className="list-disc list-inside">
              {aboutData.contact.email && (
                <li>
                  Email:{' '}
                  <a href={`mailto:${aboutData.contact.email}`} className="text-cyan-600 hover:text-cyan-400">
                    {aboutData.contact.email}
                  </a>
                </li>
              )}
              {aboutData.contact.phone && (
                <li>Phone: {aboutData.contact.phone}</li>
              )}
              {aboutData.contact.location && (
                <li>Location: {aboutData.contact.location}</li>
              )}
            </ul>
          </section>
        )}

        {/* Skills */}
        {aboutData.skills && aboutData.skills.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Professional Skills</h2>
            <ul className="list-disc list-inside">
              {aboutData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Education */}
        {aboutData.education && aboutData.education.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Education</h2>
            <ul className="list-disc list-inside">
              {aboutData.education.map((edu, index) => (
                <li key={index}>
                  {edu.degree}, {edu.institution} ({edu.year})
                  {edu.description && <p className="text-sm text-gray-400 ml-6">{edu.description}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Experience */}
        {aboutData.experience && aboutData.experience.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Experience</h2>
            <ul className="list-disc list-inside">
              {aboutData.experience.map((exp, index) => (
                <li key={index}>
                  {exp.position} at {exp.company} ({exp.period})
                  {exp.description && <p className="text-sm text-gray-400 ml-6">{exp.description}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Projects */}
        {aboutData.projects && aboutData.projects.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Projects</h2>
            <ul className="list-disc list-inside">
              {aboutData.projects.map((project, index) => (
                <li key={index}>
                  {project.name}: {project.description}{' '}
                  {project.link && (
                    <a href={project.link} className="text-cyan-600 hover:text-cyan-400" target="_blank" rel="noopener noreferrer">
                      GitHub Link
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Social */}
        {aboutData.social && Object.keys(aboutData.social).length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Connect with Me</h2>
            <ul className="list-disc list-inside">
              {aboutData.social.github && (
                <li>
                  <a
                    href={aboutData.social.github}
                    className="text-cyan-600 hover:text-cyan-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
              )}
              {aboutData.social.linkedin && (
                <li>
                  <a
                    href={aboutData.social.linkedin}
                    className="text-cyan-600 hover:text-cyan-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
              {aboutData.social.twitter && (
                <li>
                  <a
                    href={aboutData.social.twitter}
                    className="text-cyan-600 hover:text-cyan-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                </li>
              )}
              {aboutData.social.website && (
                <li>
                  <a
                    href={aboutData.social.website}
                    className="text-cyan-600 hover:text-cyan-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website
                  </a>
                </li>
              )}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
