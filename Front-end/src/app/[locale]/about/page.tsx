'use client';
export const dynamic = 'force-dynamic';
export const dynamicParams = false;
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('about');
  
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 获取About相关设置，使用group参数过滤设置
    fetch('/api/settings?group=about')
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status === 404 
            ? 'API endpoint not found. Backend may not be running.' 
            : `Server responded with status: ${res.status}`);
        }
        return res.json();
      })
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
            setError('Error parsing data from server. Please try again later.');
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching about data:', err);
        setError(err.message || 'Failed to connect to the server. Please make sure the backend is running.');
        setLoading(false);
      });
  }, [locale]);

  // 检查对象是否有有效的非空值
  const hasValidContent = (obj: unknown): boolean => {
    if (!obj) return false;
    
    // 检查是否为数组且有元素
    if (Array.isArray(obj)) {
      return obj.length > 0;
    }
    
    // 检查是否为对象且有有效属性值
    if (typeof obj === 'object' && obj !== null) {
      return Object.values(obj).some(val => 
        val !== null && 
        val !== undefined && 
        val !== '' && 
        (typeof val !== 'object' || hasValidContent(val))
      );
    }
    
    // 检查普通值是否有效
    return obj !== null && obj !== undefined && obj !== '';
  };

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

  if (error) {
    return (
      <main className="min-h-screen bg-gray-900 text-gray-200">
        <Navbar />
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">
              {locale === 'zh' ? '连接错误' : 'Connection Error'}
            </h2>
            <p className="mb-4">{error}</p>
            <p className="text-gray-400">
              {locale === 'zh' 
                ? '请确保后端服务器正在运行，然后刷新页面重试。' 
                : 'Please ensure the backend server is running, then refresh to try again.'}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-gray-200">
      <Navbar />

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Introduction Section */}
        {aboutData.intro && (
          <section className="mb-12">
            <h1 className="text-4xl font-extrabold mb-4">{t('title')}</h1>
            <div 
              className="text-lg"
              dangerouslySetInnerHTML={{ __html: aboutData.intro }}
            />
          </section>
        )}

        {/* Contact Info */}
        {hasValidContent(aboutData.contact) && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('contactTitle')}</h2>
            <ul className="list-disc list-inside">
              {aboutData.contact.email && (
                <li>
                  {t('email')}:{' '}
                  <a href={`mailto:${aboutData.contact.email}`} className="text-cyan-600 hover:text-cyan-400">
                    {aboutData.contact.email}
                  </a>
                </li>
              )}
              {aboutData.contact.phone && aboutData.contact.phone !== "(Optional) Your phone number" && (
                <li>{t('phone')}: {aboutData.contact.phone}</li>
              )}
              {aboutData.contact.location && aboutData.contact.location !== "(Optional) Your location" && (
                <li>{t('location')}: {aboutData.contact.location}</li>
              )}
            </ul>
          </section>
        )}

        {/* Skills */}
        {hasValidContent(aboutData.skills) && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('skillsTitle')}</h2>
            <div className="flex flex-wrap gap-2">
              {aboutData.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1.5 bg-cyan-900/40 text-cyan-300 rounded-full border border-cyan-700/50 text-sm font-medium hover:bg-cyan-800/40 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {hasValidContent(aboutData.education) && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('educationTitle')}</h2>
            <ul className="list-disc list-inside">
              {aboutData.education.map((edu, index) => (
                <li key={index}>
                  {edu.degree && edu.institution ? 
                    `${edu.degree}, ${edu.institution} ${edu.year ? `(${edu.year})` : ''}` : 
                    edu.degree || edu.institution
                  }
                  {edu.description && <p className="text-sm text-gray-400 ml-6">{edu.description}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Experience */}
        {hasValidContent(aboutData.experience) && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('experienceTitle')}</h2>
            <ul className="list-disc list-inside">
              {aboutData.experience.map((exp, index) => (
                <li key={index}>
                  {exp.position && exp.company ? 
                    `${exp.position} ${t('at')} ${exp.company} ${exp.period ? `(${exp.period})` : ''}` : 
                    exp.position || exp.company
                  }
                  {exp.description && <p className="text-sm text-gray-400 ml-6">{exp.description}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Projects */}
        {hasValidContent(aboutData.projects) && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('projectsTitle')}</h2>
            <ul className="list-disc list-inside">
              {aboutData.projects.map((project, index) => (
                <li key={index}>
                  {project.name && (
                    <>
                      {project.name}
                      {project.description && `: ${project.description}`}
                      {project.link && (
                        <a 
                          href={project.link} 
                          className="text-cyan-600 hover:text-cyan-400 ml-2" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {t('githubLink')}
                        </a>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Social Links */}
        {hasValidContent(aboutData.social) && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('socialTitle')}</h2>
            <div className="flex flex-wrap gap-3">
              {aboutData.social.github && (
                <a
                  href={aboutData.social.github}
                  className="px-3 py-1.5 bg-gray-800 text-cyan-400 rounded-full border border-gray-700 text-sm font-medium hover:bg-gray-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              )}
              {aboutData.social.linkedin && (
                <a
                  href={aboutData.social.linkedin}
                  className="px-3 py-1.5 bg-gray-800 text-cyan-400 rounded-full border border-gray-700 text-sm font-medium hover:bg-gray-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              )}
              {aboutData.social.twitter && (
                <a
                  href={aboutData.social.twitter}
                  className="px-3 py-1.5 bg-gray-800 text-cyan-400 rounded-full border border-gray-700 text-sm font-medium hover:bg-gray-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              )}
              {aboutData.social.website && (
                <a
                  href={aboutData.social.website}
                  className="px-3 py-1.5 bg-gray-800 text-cyan-400 rounded-full border border-gray-700 text-sm font-medium hover:bg-gray-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('website')}
                </a>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
