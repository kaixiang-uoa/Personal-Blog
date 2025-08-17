'use client';

import { PageBannerProps } from '@/types/components';
import { useSetting } from '@/contexts/SettingsContext';
import { getResponsiveImageUrls } from '@/utils/images';

export default function PageBanner({
  bannerKey,
  title,
  subtitle,
  height = 'default',
  defaultImage,
}: PageBannerProps) {
  // Get banner settings
  const banner = useSetting(`appearance.${bannerKey}`, defaultImage);
  const bannerMobile = useSetting(`appearance.${bannerKey}Mobile`, banner);

  // Process responsive images
  const { desktop: processedBanner, mobile: processedMobileBanner } = getResponsiveImageUrls(
    banner,
    bannerMobile,
    defaultImage || ''
  );

  // Set styles based on height
  const heightClass =
    height === 'large' ? 'min-h-[380px] md:min-h-[420px]' : 'min-h-[280px] md:min-h-[320px]';

  return (
    <div className="flex flex-1 max-w-6xl mx-auto w-full px-4 md:px-6 lg:px-8 py-4">
      <div className="flex flex-col flex-1">
        <div>
          <div className="py-4">
            <div
              className={`flex ${heightClass} flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-6 md:px-10 pb-8 md:pb-10 banner-image`}
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url('${processedBanner}')`,
              }}
            >
              <style jsx>{`
                @media (max-width: 768px) {
                  .banner-image {
                    background-image:
                      linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%),
                      url('${processedMobileBanner}') !important;
                  }
                }
              `}</style>
              <div className="flex flex-col gap-2 text-left max-w-2xl">
                <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                  {title}
                </h1>
                {subtitle && (
                  <h2 className="text-white text-base font-normal leading-normal">{subtitle}</h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
