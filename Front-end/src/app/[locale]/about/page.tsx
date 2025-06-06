'use client';
export const dynamic = 'force-dynamic';
export const dynamicParams = false;
import { useState, useEffect } from 'react';
import { Navbar } from '@/components';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useSetting } from '@/contexts/SettingsContext';
import { settingApi } from '@/services/settingApi';
import { AboutData, SettingItem } from '@/types/models/setting';
import { tryParseJSON } from '@/utils';

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

  // get about banner image url from settings
  const aboutBanner = useSetting('appearance.aboutBanner', '/images/about-banner.jpg');

  // get about banner image url for mobile from settings
  const aboutBannerMobile = useSetting('appearance.aboutBannerMobile', aboutBanner);

  useEffect(() => {
    // use settingApi to get settings for about group
    settingApi.getSettingsByGroup('about')
      .then(settingsData => {
        try {
          // console.log('settingsData', settingsData);
          // parse stored about page data
          const aboutSettings = settingsData.reduce((acc: Record<string, any>, item: SettingItem) => {
            if (item.key && item.value) {
              acc[item.key.replace('about.', '')] = item.value;
            }
            return acc;
          }, {} as Record<string, any>);
          // select data based on current language
          setAboutData({
            intro: locale === 'zh' ? aboutSettings.intro : aboutSettings.intro,
            contact: tryParseJSON(aboutSettings.contactInfo, {}),
            skills: tryParseJSON(aboutSettings.skills, []),
            education: tryParseJSON(aboutSettings.education, []),
            experience: tryParseJSON(aboutSettings.experience, []),
            projects: tryParseJSON(aboutSettings.projects, []),
            social: tryParseJSON(aboutSettings.socialLinks, {})
          });
        } catch (err) {
          // only log detailed parsing errors in development environment
          if (process.env.NODE_ENV !== 'production') {
            console.error('Error parsing JSON data:', err);
          }
          setError('Failed to parse about page data. Please check the data format.');
        }
        setLoading(false);
      })
      .catch(err => {
        // only log detailed errors in development environment
        if (process.env.NODE_ENV !== 'production') {
          console.error('Error fetching about data:', err);
        }
        setError(err.message || 'Failed to connect to the server. Please make sure the backend is running.');
        setLoading(false);
      });
  }, [locale]);

  // check if object has valid non-empty values
  const hasValidContent = (obj: unknown): boolean => {
    if (!obj) return false;
    
    // check if it is an array and has elements
    if (Array.isArray(obj)) {
      return obj.length > 0;
    }
    
    // check if it is an object and has valid property values
    if (typeof obj === 'object' && obj !== null) {
      return Object.values(obj).some(val => 
        val !== null && 
        val !== undefined && 
        val !== '' && 
        (typeof val !== 'object' || hasValidContent(val))
      );
    }
    
    // check if the value is valid
    return obj !== null && obj !== undefined && obj !== '';
  };

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

  if (error) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-600">
              {locale === 'zh' ? '连接错误' : 'Connection Error'}
            </h2>
            <p className="mb-4 text-red-600">{error}</p>
            <p className="text-[#60748a]">
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
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Banner section similar to home page */}
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

        {/* Contact Info */}
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

        {/* Skills */}
        {hasValidContent(aboutData.skills) && (
          <section className="mb-12">
            <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">{t('skillsTitle')}</h2>
            <div className="flex flex-wrap gap-2">
              {aboutData.skills.map((skill, index) => (
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

        {/* Education */}
        {hasValidContent(aboutData.education) && (
          <section className="mb-12">
            <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">{t('educationTitle')}</h2>
            <div className="space-y-4">
              {aboutData.education.map((edu, index) => (
                <div key={index} className="border border-border rounded-lg p-4 hover:shadow-sm transition-all">
                  <h3 className="text-foreground font-medium">
                    {edu.degree && edu.institution ? 
                      `${edu.degree}, ${edu.institution} ${edu.year ? `(${edu.year})` : ''}` : 
                      edu.degree || edu.institution
                    }
                  </h3>
                  {edu.description && <p className="text-muted-foreground text-sm mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {hasValidContent(aboutData.experience) && (
          <section className="mb-12">
            <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">{t('experienceTitle')}</h2>
            <div className="space-y-4">
              {aboutData.experience.map((exp, index) => (
                <div key={index} className="border border-border rounded-lg p-4 hover:shadow-sm transition-all">
                  <h3 className="text-foreground font-medium">
                    {exp.position && exp.company ? 
                      `${exp.position} ${t('at')} ${exp.company} ${exp.period ? `(${exp.period})` : ''}` : 
                      exp.position || exp.company
                    }
                  </h3>
                  {exp.description && <p className="text-muted-foreground text-sm mt-1">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {hasValidContent(aboutData.projects) && (
          <section className="mb-12">
            <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">{t('projectsTitle')}</h2>
            <div className="space-y-4">
              {aboutData.projects.map((project, index) => (
                <div key={index} className="border border-border rounded-lg p-4 hover:shadow-sm transition-all">
                  {project.name && (
                    <div>
                      <h3 className="text-foreground font-medium">{project.name}</h3>
                      {project.description && <p className="text-muted-foreground text-sm mt-1">{project.description}</p>}
                      {project.link && (
                        <a 
                          href={project.link} 
                          className="text-cyan-600 hover:text-cyan-700 text-sm mt-2 inline-block" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {t('githubLink')} →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Social Links */}
        {hasValidContent(aboutData.social) && (
          <section className="mb-12">
            <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">{t('socialTitle')}</h2>
            <div className="flex flex-wrap gap-3">
              {aboutData.social.github && (
                <a
                  href={aboutData.social.github}
                  className="px-3 py-1.5 bg-muted text-foreground rounded-full text-sm font-medium hover:bg-muted/80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              )}
              {aboutData.social.linkedin && (
                <a
                  href={aboutData.social.linkedin}
                  className="px-3 py-1.5 bg-muted text-foreground rounded-full text-sm font-medium hover:bg-muted/80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              )}
              {aboutData.social.twitter && (
                <a
                  href={aboutData.social.twitter}
                  className="px-3 py-1.5 bg-muted text-foreground rounded-full text-sm font-medium hover:bg-muted/80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              )}
              {aboutData.social.website && (
                <a
                  href={aboutData.social.website}
                  className="px-3 py-1.5 bg-muted text-foreground rounded-full text-sm font-medium hover:bg-muted/80 transition-colors"
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
