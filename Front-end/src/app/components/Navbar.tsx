'use client';
import { useState } from 'react';
import { Link } from '@/i18n/navigation'; // 使用国际化 Link
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('nav');

  return (
    <nav className="bg-white shadow-md">
      <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-2xl font-bold text-cyan-600">
            KaiXiang's Blog
          </Link>
          <div className="flex justify-between items-center h-16">
            <div className="hidden md:flex md:space-x-8">
              <Link
                href="/"
                className="text-gray-900 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                {t('home')}
              </Link>
              <Link
                href="/about"
                className="text-gray-900 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                {t('about')}
              </Link>
              <Link
                href="/contact"
                className="text-gray-900 hover:text-cyan-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                {t('contact')}
              </Link>
              {/* 添加语言切换器 */}
              <LanguageSwitcher />
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-cyan-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="text-gray-900 hover:text-cyan-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            {t('home')}
          </Link>
          <Link
            href="/about"
            className="text-gray-900 hover:text-cyan-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            {t('about')}
          </Link>
          <Link
            href="/contact"
            className="text-gray-900 hover:text-cyan-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            {t('contact')}
          </Link>
          {/* 在移动菜单中也添加语言切换器 */}
          <div className="px-3 py-2">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
