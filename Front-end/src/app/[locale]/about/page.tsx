'use client';
export const dynamic = 'force-dynamic';
export const dynamicParams = false;
import { useState, useEffect } from 'react';
import { Navbar } from '@/components';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useSetting } from '@/contexts/SettingsContext';
import { AboutData, ContactInfo, EducationItem, ExperienceItem, ProjectItem, SocialLinks } from '@/types/models';
import { tryParseJSON } from '@/utils';

/**
 * AboutMe Component
 * 
 * A dynamic page component that displays personal information including introduction,
 * contact details, skills, education history, work experience, projects, and social links.
 * Data is fetched from the settings API and supports internationalization.
 * 
 * @component
 * @example
 * ```tsx
 * // This component is rendered automatically by Next.js
 * // when navigating to /[locale]/about
 * ```
 * 
 * @returns {JSX.Element} The about page layout
 */
export default function AboutMe() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const t = useTranslations('about');
  
  // Initialize state with default values
  const [aboutData, setAboutData] = useState<AboutData>({
    intro: '',
    contact: {} as ContactInfo,
    skills: [],
    education: [],
    experience: [],
    projects: [],
    social: {} as SocialLinks
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get banner settings from context
  const aboutBanner = useSetting('appearance.aboutBanner', '/images/about-banner.jpg');
  const aboutBannerMobile = useSetting('appearance.aboutBannerMobile', aboutBanner);

  // Get about page data from settings
  const intro = useSetting('about.intro', '');
  const contactInfo = useSetting('about.contactInfo', '{}');
  const skills = useSetting('about.skills', '[]');
  const education = useSetting('about.education', '[]');
  const experience = useSetting('about.experience', '[]');
  const projects = useSetting('about.projects', '[]');
  const socialLinks = useSetting('about.socialLinks', '{}');

  // Parse and set about page data
  useEffect(() => {
    try {
      setAboutData({
        intro: locale === 'zh' ? intro : intro,
        contact: tryParseJSON<ContactInfo>(contactInfo, {} as ContactInfo),
        skills: tryParseJSON<string[]>(skills, []),
        education: tryParseJSON<EducationItem[]>(education, []),
        experience: tryParseJSON<ExperienceItem[]>(experience, []),
        projects: tryParseJSON<ProjectItem[]>(projects, []),
        social: tryParseJSON<SocialLinks>(socialLinks, {} as SocialLinks)
      });
      setLoading(false);
    } catch (err) {
      // Log detailed parsing errors in development environment
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error parsing JSON data:', err);
      }
      setError('Failed to parse about page data. Please check the data format.');
      setLoading(false);
    }
  }, [locale, intro, contactInfo, skills, education, experience, projects, socialLinks]);

  /**
   * Check if an object has valid non-empty values
   * @param {T} obj - The object to check
   * @returns {boolean} True if the object has valid content
   */
  const hasValidContent = function hasValidContent<T>(obj: T): boolean {
    if (!obj) return false;
    
    // Check if it is an array and has elements
    if (Array.isArray(obj)) {
      return obj.length > 0;
    }
    
    // Check if it is an object and has valid property values
    if (typeof obj === 'object' && obj !== null) {
      return Object.values(obj).some(val => 
        val !== null && 
        val !== undefined && 
        val !== '' && 
        (typeof val !== 'object' || hasValidContent(val))
      );
    }
    
    // Check if the value is valid
    return obj !== null && obj !== undefined && obj !== '';
  };

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#111418]"></div>
        </div>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-600">
              {t('errorTitle')}
            </h2>
            <p className="mb-4 text-red-600">{error}</p>
            <p className="text-[#60748a]">
              {t('errorDescription')}
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Main content
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Banner section */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-4">
        <div className="py-4">
          <div className="flex min-h-[280px] md:min-h-[320px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-6 md:px-10 pb-8 md:pb-10 banner-image"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url('${aboutBanner}')`
              }}>
            <style jsx>{`
              @media (max-width: 768px) {
                .banner-image {
                  background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url('${aboutBannerMobile}') !important;
                }
              }
            `}</style>
            <div className="flex flex-col gap-2 text-left max-w-2xl">
              <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                {t('title')}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Introduction Section */}
        {aboutData.intro && (
          <section className="mb-12">
            <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">{t('title')}</h2>
            <div 
              className="text-foreground text-base leading-normal"
              dangerouslySetInnerHTML={{ __html: aboutData.intro }}
            />
          </section>
        )}

        {/* Contact Info Section */}
        {hasValidContent(aboutData.contact) && (
          <section className="mb-12">
            <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">{t('contactTitle')}</h2>
            <ul className="list-disc list-inside text-foreground">
              {aboutData.contact.email && (
                <li className="py-1">
                  <span className="text-foreground">{t('email')}:</span>{' '}
                  <a href={`mailto:${aboutData.contact.email}`} className="text-cyan-600 hover:text-cyan-700">
                    {aboutData.contact.email}
                  </a>
                </li>
              )}
              {aboutData.contact.phone && aboutData.contact.phone !== "(Optional) Your phone number" && (
                <li className="py-1">{t('phone')}: {aboutData.contact.phone}</li>
              )}
              {aboutData.contact.location && aboutData.contact.location !== "(Optional) Your location" && (
                <li className="py-1">{t('location')}: {aboutData.contact.location}</li>
              )}
            </ul>
          </section>
        )}

        {/* Skills Section */}
        {hasValidContent(aboutData.skills) && (
          <section className="mb-12">
            <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">{t('skillsTitle')}</h2>
            <div className="flex flex-wrap gap-2">
              {aboutData.skills.map((skill: string, index: number) => (
                <span 
                  key={index} 
                  className="px-3 py-1.5 bg-muted text-foreground rounded-full text-sm font-medium hover:bg-muted/80 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {hasValidContent(aboutData.education) && (
          <section className="mb-12">
            <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">{t('educationTitle')}</h2>
            <div className="space-y-4">
              {aboutData.education.map((edu: EducationItem, index: number) => (
                <div key={index} className="border border-border rounded-lg p-4 hover:shadow-sm transition-all">
                  <h3 className="text-foreground font-medium">
                    {edu.degree && edu.school ? 
                      `${edu.degree}, ${edu.school} ${edu.startDate ? `(${edu.startDate})` : ''}` : 
                      edu.degree || edu.school
                    }
                  </h3>
                  {edu.description && <p className="text-muted-foreground text-sm mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {hasValidContent(aboutData.experience) && (
          <section className="mb-12">
            <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">{t('experienceTitle')}</h2>
            <div className="space-y-4">
              {aboutData.experience.map((exp: ExperienceItem, index: number) => (
                <div key={index} className="border border-border rounded-lg p-4 hover:shadow-sm transition-all">
                  <h3 className="text-foreground font-medium">
                    {exp.position && exp.company ? 
                      `${exp.position} ${t('at')} ${exp.company} ${exp.startDate ? `(${exp.startDate})` : ''}` : 
                      exp.position || exp.company
                    }
                  </h3>
                  {exp.description && <p className="text-muted-foreground text-sm mt-1">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {hasValidContent(aboutData.projects) && (
          <section className="mb-12">
            <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">{t('projectsTitle')}</h2>
            <div className="space-y-4">
              {aboutData.projects.map((project: ProjectItem, index: number) => (
                <div key={index} className="border border-border rounded-lg p-4 hover:shadow-sm transition-all">
                  <h3 className="text-foreground font-medium">
                    {project.name}
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 text-cyan-600 hover:text-cyan-700"
                      >
                        {t('viewProject')}
                      </a>
                    )}
                  </h3>
                  {project.description && <p className="text-muted-foreground text-sm mt-1">{project.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Social Links Section */}
        {hasValidContent(aboutData.social) && (
          <section className="mb-12">
            <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">{t('socialTitle')}</h2>
            <div className="flex flex-wrap gap-4">
              {Object.entries(aboutData.social).map(([platform, url]) => (
                url && (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-cyan-600 transition-colors"
                  >
                    {platform}
                  </a>
                )
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
