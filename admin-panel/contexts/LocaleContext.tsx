"use client";

import { createContext, useState, ReactNode } from "react";

import { Locale } from "@/hooks/useLocale";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale | ((prev: Locale) => Locale)) => void;
}

export const LocaleContext = createContext<LocaleContextType | null>(null);

interface LocaleProviderProps {
  children: ReactNode;
  defaultLocale?: Locale;
}

export function LocaleProvider({
  children,
  defaultLocale = "zh",
}: LocaleProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
