'use client';
export const dynamic = 'force-dynamic';
export const dynamicParams = false;
import { useState, useEffect } from 'react';
import { Navbar, PageBanner, PageSEO, Footer } from '@/components';
import { useParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useSetting } from '@/contexts/SettingsContext';
import {
  AboutData,
  ContactInfo,
  EducationItem,
  ExperienceItem,
  ProjectItem,
  SocialLinks,
} from '@/types/models';
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
  const locale = (params.locale as string) || 'en';
  const pathname = usePathname();
  const t = useTranslations('about');

  // Initialize state with default values
  const [aboutData, setAboutData] = useState<AboutData>({
    intro: '',
    contact: {} as ContactInfo,
    skills: [],
    education: [],
    experience: [],
    projects: [],
    social: {} as SocialLinks,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Banner settings
  const defaultBannerUrl = '/images/about-banner.jpg';

  // Get about page data from settings
  const intro = useSetting('about.intro', '');
  const introZh = useSetting('about.intro_zh', '');
  const contactInfo = useSetting('about.contactInfo', '{}');
  const skills = useSetting('about.skills', '[]');
  const education = useSetting('about.education', '[]');
  const experience = useSetting('about.experience', '[]');
  const projects = useSetting('about.projects', '[]');
  const socialLinks = useSetting('about.social', '{}');

  // Parse and set about page data
  useEffect(() => {
    try {
      const parsedSkills = tryParseJSON<string[]>(skills, []);
      const parsedEducation = tryParseJSON<EducationItem[]>(education, []);
      const parsedExperience = tryParseJSON<ExperienceItem[]>(experience, []);
      const parsedProjects = tryParseJSON<ProjectItem[]>(projects, []);
      const parsedSocial = tryParseJSON<SocialLinks>(socialLinks, {} as SocialLinks);

      setAboutData({
        intro: locale === 'zh' ? introZh : intro,
        contact: tryParseJSON<ContactInfo>(contactInfo, {} as ContactInfo),
        skills: Array.isArray(parsedSkills)
          ? parsedSkills.map(skill =>
              typeof skill === 'object' && skill !== null && 'value' in skill
                ? (skill as { value: string }).value
                : String(skill)
            )
          : [],
        education: parsedEducation,
        experience: parsedExperience,
        projects: parsedProjects,
        social: parsedSocial,
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
  }, [locale, intro, introZh, contactInfo, skills, education, experience, projects, socialLinks]);

  /**
   * Check if an object has valid non-empty values
   * @param {T} obj - The object to check
   * @returns {boolean} True if the object has valid content
   */
  const hasValidContent = function hasValidContent<T>(obj: T): boolean {
    if (!obj) return false;

    // Check if it is an array and has elements
    if (Array.isArray(obj)) {
      if (obj.length === 0) return false;

      // For arrays, check if at least one element has meaningful content
      return obj.some(item => {
        if (typeof item === 'string') {
          return item.trim() !== '';
        }
        if (typeof item === 'object' && item !== null) {
          // For objects, check if they have at least one non-empty property
          const hasValidProperty = Object.values(item).some(val => {
            if (val === null || val === undefined || val === '') return false;
            if (Array.isArray(val)) return val.length > 0;
            if (typeof val === 'string') return val.trim() !== '';
            return true;
          });

          // For education/experience/projects, require at least one meaningful field
          if (
            item.hasOwnProperty('degree') ||
            item.hasOwnProperty('position') ||
            item.hasOwnProperty('name')
          ) {
            const requiredFields = item.hasOwnProperty('degree')
              ? ['degree', 'institution']
              : item.hasOwnProperty('position')
                ? ['position', 'company']
                : ['name'];

            return requiredFields.some(field => {
              const value = item[field as keyof typeof item];
              return value && typeof value === 'string' && value.trim() !== '';
            });
          }

          return hasValidProperty;
        }
        return item !== null && item !== undefined && item !== '';
      });
    }

    // Check if it is an object and has valid property values
    if (typeof obj === 'object' && obj !== null) {
      return Object.values(obj).some(
        val =>
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
            <h2 className="text-2xl font-bold mb-4 text-red-600">{t('errorTitle')}</h2>
            <p className="mb-4 text-red-600">{error}</p>
            <p className="text-muted-foreground">{t('errorDescription')}</p>
          </div>
        </div>
      </main>
    );
  }

  // Main content
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PageSEO
        locale={locale}
        pathname={pathname}
        type="about"
        keywords={['about', 'author', 'developer', 'portfolio']}
      />

      {/* Banner section */}
      <PageBanner
        bannerKey="aboutBanner"
        title={t('title')}
        height="default"
        defaultImage={defaultBannerUrl}
      />

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Introduction Section */}
        {aboutData.intro && (
          <section className="mb-12">
            <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
              {t('title')}
            </h2>
            <div
              className="text-foreground text-base leading-normal"
              dangerouslySetInnerHTML={{ __html: aboutData.intro }}
            />
          </section>
        )}

        {/* Contact Info Section */}
        {hasValidContent(aboutData.contact) && (
          <section className="mb-12">
            <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
              {t('contactTitle')}
            </h2>
            <ul className="list-disc list-inside text-foreground">
              {aboutData.contact.email && (
                <li className="py-1">
                  <span className="text-foreground">{t('email')}:</span>{' '}
                  <a
                    href={`mailto:${aboutData.contact.email}`}
                    className="text-cyan-600 hover:text-cyan-700"
                  >
                    {aboutData.contact.email}
                  </a>
                </li>
              )}
              {aboutData.contact.phone &&
                aboutData.contact.phone !== '(Optional) Your phone number' && (
                  <li className="py-1">
                    {t('phone')}: {aboutData.contact.phone}
                  </li>
                )}
              {aboutData.contact.location &&
                aboutData.contact.location !== '(Optional) Your location' && (
                  <li className="py-1">
                    {t('location')}: {aboutData.contact.location}
                  </li>
                )}
            </ul>
          </section>
        )}

        {/* Skills Section */}
        {hasValidContent(aboutData.skills) && (
          <section className="mb-12">
            <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
              {t('skillsTitle')}
            </h2>
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
        {(() => {
          const hasEducation = hasValidContent(aboutData.education);
          return (
            hasEducation && (
              <section className="mb-12">
                <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
                  {t('educationTitle')}
                </h2>
                <div className="space-y-4">
                  {aboutData.education.map((edu: EducationItem, index: number) => (
                    <div
                      key={index}
                      className="border border-border rounded-lg p-4 hover:shadow-sm transition-all"
                    >
                      <div className="flex flex-col gap-1">
                        <h3 className="text-foreground font-medium text-lg">{edu.degree}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-muted-foreground">
                          {edu.institution && (
                            <span className="text-sm font-medium">{edu.institution}</span>
                          )}
                          {edu.year && <span className="text-sm">{edu.year}</span>}
                        </div>
                        {edu.description && (
                          <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                            {edu.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          );
        })()}

        {/* Experience Section */}
        {(() => {
          const hasExperience = hasValidContent(aboutData.experience);
          return (
            hasExperience && (
              <section className="mb-12">
                <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
                  {t('experienceTitle')}
                </h2>
                <div className="space-y-4">
                  {aboutData.experience.map((exp: ExperienceItem, index: number) => (
                    <div
                      key={index}
                      className="border border-border rounded-lg p-4 hover:shadow-sm transition-all"
                    >
                      <div className="flex flex-col gap-1">
                        <h3 className="text-foreground font-medium text-lg">{exp.position}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-muted-foreground">
                          {exp.company && (
                            <span className="text-sm font-medium">{exp.company}</span>
                          )}
                          {exp.period && <span className="text-sm">{exp.period}</span>}
                        </div>
                        {exp.description && (
                          <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          );
        })()}

        {/* Projects Section */}
        {(() => {
          const hasProjects = hasValidContent(aboutData.projects);
          return (
            hasProjects && (
              <section className="mb-12">
                <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
                  {t('projectsTitle')}
                </h2>
                <div className="space-y-4">
                  {aboutData.projects.map((project: ProjectItem, index: number) => (
                    <div
                      key={index}
                      className="border border-border rounded-lg p-4 hover:shadow-sm transition-all"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-start justify-between">
                          <h3 className="text-foreground font-medium text-lg">{project.name}</h3>
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-600 hover:text-cyan-700 text-sm font-medium"
                            >
                              {t('viewProject')}
                            </a>
                          )}
                        </div>
                        {project.description && (
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {project.description}
                          </p>
                        )}
                        {project.tech && project.tech.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {project.tech.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          );
        })()}

        {/* Social Links Section */}
        {hasValidContent(aboutData.social) && (
          <section className="mb-12">
            <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
              {t('socialTitle')}
            </h2>
            <div className="flex flex-wrap gap-3">
              {aboutData.social.github && (
                <a
                  href={aboutData.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="font-medium">GitHub</span>
                </a>
              )}

              {aboutData.social.linkedin && (
                <a
                  href={aboutData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="font-medium">LinkedIn</span>
                </a>
              )}

              {aboutData.social.twitter && (
                <a
                  href={aboutData.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  <span className="font-medium">Twitter</span>
                </a>
              )}

              {aboutData.social.website && (
                <a
                  href={aboutData.social.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  <span className="font-medium">Website</span>
                </a>
              )}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </main>
  );
}
