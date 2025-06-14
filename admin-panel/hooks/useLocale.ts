"use client";

import { useCallback, useContext } from "react";

import { LocaleContext } from "@/contexts/LocaleContext";

export type Locale = "zh" | "en";

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }

  const { locale, setLocale } = context;

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "zh" ? "en" : "zh"));
  }, [setLocale]);

  return {
    locale,
    setLocale,
    toggleLocale,
    isZh: locale === "zh",
    isEn: locale === "en",
  };
}
